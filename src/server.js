import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { connectDB } from './db/initMongoDB.js'

import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(authRoutes)

const startServer = async () => {
  try {
    await connectDB()

    const PORT = process.env.PORT || 3000

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (err) {
    console.error('Server failed to start:', err)
    process.exit(1)
  }
}

startServer()
