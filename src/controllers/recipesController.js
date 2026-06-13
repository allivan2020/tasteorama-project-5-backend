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
    const foundIngredient = await Ingredient.findOne({
      name: { $regex: ingredient, $options: 'i' },
    })

    if (!foundIngredient) {
      return res.status(200).json({
        page: Number(page),
        perPage: Number(perPage),
        totalRecipes: 0,
        totalPages: 0,
        recipes: [],
      })
    }

    filter['ingredients.id'] = foundIngredient._id
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
    page: Number(page),
    perPage: Number(perPage),
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
