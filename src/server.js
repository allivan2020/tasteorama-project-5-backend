import dotenv from 'dotenv'
import express from 'express'
import { errors } from 'celebrate'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger-output.json' with { type: 'json' }

import { connectDB } from './db/initMongoDB.js'
import { errorHandler } from './middleware/errorHandler.js'
import { notFoundHandler } from './middleware/notFoundHandler.js'
import { helmetConfig } from './middleware/helmetConfig.js'

import usersRoutes from './routes/usersRoutes.js'
import recipesRoutes from './routes/recipesRoutes.js'
import ingredientsRoutes from './routes/ingredientsRoutes.js'
import categoriesRoutes from './routes/categoriesRoutes.js'
import authRoutes from './routes/auth.js'

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express() // 👈 ВАЖНО: СНАЧАЛА app

app.use(helmetConfig)
app.use(express.json())
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
)
app.use(cookieParser())

// Swagger
const swaggerOptions = {
  swaggerOptions: {
    servers: [
      {
        url: process.env.BASE_URL || `http://localhost:${PORT}`,
        description: 'Current environment server',
      },
    ],
  },
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

// Routes
app.use(usersRoutes)
app.use(recipesRoutes)
app.use(ingredientsRoutes)
app.use(categoriesRoutes)
app.use(authRoutes)

// Errors
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
