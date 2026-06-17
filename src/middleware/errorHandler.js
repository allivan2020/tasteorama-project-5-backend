import { isCelebrateError } from 'celebrate'

export const errorHandler = (err, req, res, next) => {
  console.error('Error Middleware:', err)

  // Celebrate validation errors → 400
  if (isCelebrateError(err)) {
    const details = []
    err.details.forEach((value) => {
      details.push(...value.details.map((d) => d.message))
    })
    return res.status(400).json({
      message: details.join('; ') || 'Validation error',
    })
  }

  // http-errors (createError) → status from error
  if (err.status || err.statusCode) {
    const status = err.status || err.statusCode
    return res.status(status).json({
      message: err.message || 'Error',
    })
  }

  // Everything else → 500
  const isProd = process.env.NODE_ENV === 'production'

  res.status(500).json({
    message: isProd
      ? 'Something went wrong. Please try again later.'
      : err.message,
  })
}
