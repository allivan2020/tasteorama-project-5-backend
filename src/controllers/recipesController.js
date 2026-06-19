import { Recipe } from '../models/recipe.js'
import { User } from '../models/user.js'
import { Ingredient } from '../models/ingredient.js'
import { uploadRecipeToCloudinary } from '../utils/cloudinary.js'

export const getAllRecipes = async (req, res) => {
  const { category, ingredient, search, page = 1, perPage = 12 } = req.query

  const filter = {}
  const skip = (page - 1) * perPage

  if (category) {
    filter.category = category
  }

  if (ingredient) {
    const foundIngredient = await Ingredient.find({
      name: { $regex: ingredient, $options: 'i' },
    }).select('_id')

    filter['ingredients.id'] = {
      $in: foundIngredient.map((item) => item._id),
    }
  }

  if (search) {
    filter.title = { $regex: search, $options: 'i' }
  }

  const [totalRecipes, recipes] = await Promise.all([
    Recipe.countDocuments(filter),
    Recipe.find(filter).skip(skip).limit(perPage),
  ])

  const totalPages = Math.ceil(totalRecipes / perPage)

  res.status(200).json({
    page,
    perPage,
    totalRecipes,
    totalPages,
    recipes,
  })
}

export const getOwnRecipes = async (req, res) => {
  const userId = req.user._id
  const { page = 1, perPage = 12 } = req.query
  const filter = { owner: userId }
  const skip = (page - 1) * perPage

  const [totalRecipes, recipes] = await Promise.all([
    Recipe.countDocuments(filter),
    Recipe.find(filter)
      .sort({ createdAt: -1, _id: -1 })
      .skip(skip)
      .limit(perPage),
  ])

  const totalPages = Math.ceil(totalRecipes / perPage)

  res.status(200).json({
    page,
    perPage,
    totalRecipes,
    totalPages,
    recipes,
  })
}

export const getRecipeById = async (req, res) => {
  const { id } = req.params

  const recipe = await Recipe.findById(id)

  if (!recipe) {
    return res.status(404).json({
      message: 'Recipe not found',
    })
  }

  res.status(200).json(recipe)
}

export const createOwnRecipe = async (req, res) => {
  const owner = req.user._id;

  try {
    const { title, category, instructions, description, time, ingredients, cals } = req.body;

    const recipeData = {
      title,
      category,
      instructions,
      description,
      time,
      ingredients: typeof ingredients === 'string' ? JSON.parse(ingredients) : ingredients,
      owner,
      cals,
    };

    if (req.file) {
      const result = await uploadRecipeToCloudinary(req.file.buffer);
      recipeData.thumb = result.secure_url;
    }

    const recipe = await Recipe.create(recipeData);

    res.status(201).json(recipe);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    console.error("Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getFavoriteRecipes = async (req, res) => {
  const userId = req.user._id
  const user = await User.findById(userId).populate('favorites')
  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    })
  }

  const { category, ingredient } = req.query
  let recipes = user.favorites || []

  if (category) {
    recipes = recipes.filter((recipe) => recipe.category === category)
  }

  if (ingredient) {
    const foundIngredients = await Ingredient.find({
      name: { $regex: ingredient, $options: 'i' },
    }).select('_id')

    const ingredientIds = foundIngredients.map((i) => i._id)

    recipes = recipes.filter((recipe) =>
      recipe.ingredients.some((item) => ingredientIds.includes(item.id)),
    )
  }

  res.status(200).json({
    recipes
  })
}
export const addFavoriteRecipes = async (req, res) => {
  const { recipeId } = req.params

  const recipe = await Recipe.findById(recipeId)

  if (!recipe) {
    return res.status(404).json({
      message: 'Recipe not found',
    })
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: {
        favorites: recipeId,
      },
    },
    {
      returnDocument: 'after',
    },
  )

  res.status(201).json({
    message: 'Recipe added to favorites',
    favorites: user.favorites,
  })
}

export const deleteFavoriteRecipes = async (req, res) => {
  const { recipeId } = req.params

  const userFavoriteRecipe = await User.findOne({
    _id: req.user._id,
    favorites: recipeId,
  })

  if (!userFavoriteRecipe) {
    return res.status(404).json({
      message: 'Recipe not found in favorites',
    })
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: {
        favorites: recipeId,
      },
    },
    {
      new: true,
    },
  )

  res.status(200).json({
    message: 'Recipe removed from favorites',
    favorites: user.favorites,
  })
}
