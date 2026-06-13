import { Router } from 'express'
import { celebrate, Segments } from 'celebrate'
import multer from 'multer'

import { authenticate } from '../middleware/authenticate.js'
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

const router = Router()
const upload = multer({ dest: 'temp/' }) 

router.get('/api/users/current', authenticate, getCurrent)

router.get(
  '/api/users',
  celebrate({ [Segments.QUERY]: paginationSchema }),
  getUsers
)

router.get('/api/users/:id', getUserWithRecipes)

router.patch(
  '/api/users/avatar',
  authenticate,
  upload.single('avatar'),
  patchAvatar
)

router.patch(
  '/api/users',
  authenticate,
  celebrate({ [Segments.BODY]: updateUserSchema }),
  patchUser
)

export default router