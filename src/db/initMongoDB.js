import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)

    console.log('MongoDB connected')

    // 🔥 проверка реального соединения
    const result = await mongoose.connection.db.admin().ping()
    console.log('Ping result:', result)
  } catch (error) {
    console.error('DB connection error:', error.message)
    process.exit(1)
  }
}
