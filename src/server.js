import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './db/initMongoDB.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errors } from 'celebrate'
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import recipesRoutes from './routes/recipesRoutes.js'

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();


app.use(helmet())
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use(recipesRoutes)

app.use(notFoundHandler)
app.use(errors())
app.use(errorHandler)

const startServer = async () => {
  try {
    await connectDB()

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (err) {
    console.error('Server failed to start:', err)
    process.exit(1)
  }
}

startServer()
