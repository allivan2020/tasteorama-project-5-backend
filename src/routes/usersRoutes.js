import { Router } from 'express'
import { celebrate } from 'celebrate'

import { authenticate } from '../middleware/authenticate.js'
import { uploadAvatar } from '../config/cloudinary.js'
import {
  getUsers,
  getUserWithRecipes,
  getCurrent,
  patchAvatar,
  patchUser,
} from '../controllers/usersController.js'
import {
  updateUserSchema,
  paginationSchema,
} from '../validations/usersValidation.js'
import { Segments } from 'celebrate'

const router = Router()

// Public: get current authenticated user
router.get('/api/users/current', authenticate, getCurrent)

// Public: get paginated list of users
router.get(
  '/api/users',
  celebrate({ [Segments.QUERY]: paginationSchema }),
  getUsers
)

// Bug #1 fix: added `authenticate` — endpoint must require authorization
router.get('/api/users/:id', authenticate, getUserWithRecipes)

// Bug #3 fix: use `uploadAvatar` from cloudinary config instead of local multer
router.patch(
  '/api/users/avatar',
  authenticate,
  uploadAvatar.single('avatar'),
  patchAvatar
)

// Bug #2 fix: updateUserSchema already contains [Segments.BODY] wrapper,
// so pass it directly to celebrate() without double-wrapping
router.patch(
  '/api/users',
  authenticate,
  celebrate(updateUserSchema),
  patchUser
)

export default router