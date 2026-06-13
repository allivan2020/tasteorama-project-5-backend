import dotenv from 'dotenv'
import express from 'express'
import { errors } from 'celebrate'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'

import { connectDB } from './db/initMongoDB.js'
import { errorHandler } from './middleware/errorHandler.js'
import { notFoundHandler } from './middleware/notFoundHandler.js'
import { swaggerSpec } from './swagger/swagger.js'

<<<<<<< HEAD
import usersRoutes from './routes/usersRoutes.js'
=======
>>>>>>> 8297d87632b760b9275ab0d69ac3b5e4df70244b
import recipesRoutes from './routes/recipesRoutes.js'
import ingredientsRoutes from './routes/ingredientsRoutes.js'
import categoriesRoutes from './routes/categoriesRoutes.js'

import authRoutes from './routes/auth.js'

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(helmet())
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec),
)
<<<<<<< HEAD
app.use(usersRoutes)
=======

>>>>>>> 8297d87632b760b9275ab0d69ac3b5e4df70244b
app.use(recipesRoutes)
app.use(ingredientsRoutes)
app.use(categoriesRoutes)
app.use(authRoutes)

app.use(notFoundHandler)
app.use(errors())
app.use(errorHandler)

const startServer = async () => {
  try {
    await connectDB()

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
      console.log(`Swagger docs: http://localhost:${PORT}/api-docs`)
    })
  } catch (err) {
    console.error('Server failed to start:', err)
    process.exit(1)
  }
}

startServer()
