import { User } from '../models/user.js'
import { Recipe } from '../models/recipe.js'


export const getAllUsers = async ({ page = 1, limit = 10 }) => {
  const skip = (Number(page) - 1) * Number(limit)

  const [users, total] = await Promise.all([
    User.find({}, 'username avatar createdAt').skip(skip).limit(Number(limit)),
    User.countDocuments(),
  ])

  return {
    users,
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(total / Number(limit)),
  }
}


export const getUserById = async (id) => {
  const user = await User.findById(id, 'username avatar createdAt')
  if (!user) return null

  const recipes = await Recipe.find({ owner: id }).select(
    'title category thumb time description'
  )

  return { user, recipes }
}


export const getCurrentUser = async (userId) => {
  return User.findById(userId, '-password')
}

// Приватний: оновити аватар
export const updateUserAvatar = async (userId, avatarUrl) => {
  return User.findByIdAndUpdate(
    userId,
    { avatar: avatarUrl },
    { new: true, select: '-password' }
  )
}

// Приватний: оновити дані юзера (тільки username)
export const updateUserData = async (userId, data) => {
  return User.findByIdAndUpdate(
    userId,
    { username: data.username },
    { new: true, select: '-password', runValidators: true }
  )
}