import { isValidObjectId } from 'mongoose'

export const isValidId = (req, res, next) => {
  const { id, recipeId } = req.params

  const value = id || recipeId

  if (!isValidObjectId(value)) {
    return res.status(400).json({
      message: 'Invalid id',
    })
  }

  next()
}
