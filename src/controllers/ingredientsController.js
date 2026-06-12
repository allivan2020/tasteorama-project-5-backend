import { Ingredient } from '../models/ingredient.js'

export const getIngredients = async (req, res) => {
  const { search } = req.query
  const ingredientsQuery = Ingredient.find()

  if (search) {
    ingredientsQuery.where({
      name: { $regex: search, $options: 'i' },
    })
  }

  const ingredients = await ingredientsQuery
  res.status(200).json(ingredients)
}

// export const getIngredients = async (req, res) => {
//   const { search } = req.query

//   const ingredientsQuery = Ingredient.find({
//     name: req.name,
//   })

//   if (search) {
//     ingredientsQuery.where({
//       name: { $regex: search, $options: 'i' },
//     })
//   }

//   const [ingredients] = await Promise.all([ingredientsQuery.countDocuments()])

//   res.status(200).json({
//     ingredients,
//   })
// }
