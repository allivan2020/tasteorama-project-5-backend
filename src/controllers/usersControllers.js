import createError from 'http-errors'
import {
  getAllUsers,
  getUserById,
  getCurrentUser,
  updateUserAvatar,
  updateUserData,
} from '../services/usersService.js'

// GET /api/users
export const getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query
    const result = await getAllUsers({ page, limit })
    res.json(result)
  } catch (err) {
    next(err)
  }
}

// GET /api/users/:id
export const getUserWithRecipes = async (req, res, next) => {
  try {
    const result = await getUserById(req.params.id)
    if (!result) throw createError(404, 'User not found')
    res.json(result)
  } catch (err) {
    next(err)
  }
}

// GET /api/users/current
export const getCurrent = async (req, res, next) => {
  try {
    const user = await getCurrentUser(req.user._id)
    if (!user) throw createError(404, 'User not found')
    res.json(user)
  } catch (err) {
    next(err)
  }
}

// PATCH /api/users/avatar
// Bug #3 fix: cloudinary storage puts the public URL in req.file.path
// (multer-storage-cloudinary sets it there), so we read it correctly
export const patchAvatar = async (req, res, next) => {
  try {
    if (!req.file) throw createError(400, 'Avatar file is required')

    // multer-storage-cloudinary stores the secure URL in req.file.path
    const avatarUrl = req.file.path

    const user = await updateUserAvatar(req.user._id, avatarUrl)
    res.status(201).json({ avatar: user.avatar })
  } catch (err) {
    next(err)
  }
}

// PATCH /api/users
export const patchUser = async (req, res, next) => {
  try {
    const user = await updateUserData(req.user._id, req.body)
    if (!user) throw createError(404, 'User not found')
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
}