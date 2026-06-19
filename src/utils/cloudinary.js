import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Зберігаємо файл в пам'яті (buffer), потім вручну відправляємо в cloudinary
const storage = multer.memoryStorage()
export const uploadAvatar = multer({ storage })
export const uploadRecipeImage = multer({ storage })

export const uploadToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'avatars',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 200, height: 200, crop: 'fill' }],
        ...options,
      },
      (error, result) => {
        if (error) reject(error)
        else resolve(result)
      }
    )
    stream.end(buffer)
  })
}

export const uploadRecipeToCloudinary = (buffer) =>
  uploadToCloudinary(buffer, {
    folder: 'recipes',
    transformation: [{ width: 1200, crop: 'limit' }],
  })

export default cloudinary
