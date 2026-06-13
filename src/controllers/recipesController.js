import { Recipe } from '../models/recipe.js'
import { User } from '../models/user.js'
import { Ingredient } from '../models/ingredient.js'

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

  const recipes = await Recipe.find({ owner: userId })

  res.status(200).json({
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
  const owner = req.user._id

  const recipe = await Recipe.create({
    ...req.body,
    owner,
  })

  res.status(201).json(recipe)
}

export const getFavoriteRecipes = async (req, res) => {
  const userId = req.user._id

  const user = await User.findById(userId).populate('favorites')

  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    })
  }

  res.status(200).json({
    recipes: user.favorites || [],
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
