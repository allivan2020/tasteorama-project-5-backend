import { Recipe } from '../models/recipe.js'

export const getAllRecipes = async (req, res) => {
  const { category, ingredient, search, page = 1, perPage = 12 } = req.query

  const filter = {}
  const skip = (page - 1) * perPage

  if (category) {
    filter.category = category
  }

  // if (ingredient) {
  //   const foundIngredient = await Ingredient.findOne({
  //     name: { $regex: ingredient, $options: 'i' },
  //   })
  //   filter['ingredients.id'] = foundIngredient._id
  // }

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

export const getFavoriteRecipes = async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId)
    .populate('favorites');

  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }

  res.status(200).json({
    recipes: user.favorites || [],
  });
};
