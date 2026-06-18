import createError from 'http-errors'
import {
  getAllUsers,
  getUserById,
  getCurrentUser,
  updateUserAvatar,
  updateUserData,
} from '../services/usersService.js'
import { uploadToCloudinary } from '../utils/cloudinary.js'

// GET /api/users
export const getUsers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query
  const result = await getAllUsers({ page, limit })
  res.json(result)
}

// GET /api/users/:id
export const getUserWithRecipes = async (req, res) => {
  const result = await getUserById(req.params.id)
  if (!result) throw createError(404, 'User not found')
  res.json(result)
}

// GET /api/users/current
export const getCurrent = async (req, res) => {
  const user = await getCurrentUser(req.user._id)
  if (!user) throw createError(404, 'User not found')
  res.json(user)
}

// PATCH /api/users/avatar
export const patchAvatar = async (req, res) => {
  if (!req.file) throw createError(400, 'Avatar file is required')

  const result = await uploadToCloudinary(req.file.buffer)
  const avatarUrl = result.secure_url

  const user = await updateUserAvatar(req.user._id, avatarUrl)
  res.status(201).json({ avatar: user.avatar })
}

// PATCH /api/users
export const patchUser = async (req, res) => {
  const user = await updateUserData(req.user._id, req.body)
  if (!user) throw createError(404, 'User not found')
  res.status(201).json(user)
}
