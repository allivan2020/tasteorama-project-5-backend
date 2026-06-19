import createHttpError from 'http-errors'

export const parseRecipeFormData = (req, res, next) => {
  try {
    req.body = req.body || {}

    if (typeof req.body.ingredients === 'string') {
      try {
        req.body.ingredients = JSON.parse(req.body.ingredients)
      } catch {
        throw createHttpError(400, 'Ingredients must be valid JSON')
      }
    }

    if (req.file && !req.body.thumb) {
      req.body.thumb = req.file.originalname || 'recipe image'
    }

    next()
  } catch (error) {
    next(error)
  }
}
