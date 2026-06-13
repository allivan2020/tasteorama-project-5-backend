import { isValidObjectId } from 'mongoose'

export const isValidId = (req, res, next) => {
  const { id } = req.params

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: 'Invalid id',
    })
  }

  next()
}
