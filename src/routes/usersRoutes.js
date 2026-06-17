import { Router } from 'express'
import { celebrate } from 'celebrate'

import { authenticate } from '../middleware/authenticate.js'
import { uploadAvatar } from '../utils/cloudinary.js'
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
} from '../validations/userValidation.js'
import { Segments } from 'celebrate'

const router = Router()

router.get('/api/users/current', authenticate, getCurrent)

router.get(
  '/api/users',
  celebrate({ [Segments.QUERY]: paginationSchema }),
  getUsers
)

router.get('/api/users/:id', authenticate, getUserWithRecipes)

router.patch(
  '/api/users/avatar',
  authenticate,
  uploadAvatar.single('avatar'),
  patchAvatar
  /*
    #swagger.summary = 'Оновлення аватара'
    #swagger.description = 'Завантаження нового зображення профілю.'
    #swagger.consumes = ['multipart/form-data']
    #swagger.requestBody = {
      required: true,
      content: {
        'multipart/form-data': {
          schema: {
            type: 'object',
            required: ['avatar'],
            properties: {
              avatar: { type: 'string', format: 'binary' }
            }
          }
        }
      }
    }
  */
)

router.patch(
  '/api/users',
  authenticate,
  celebrate(updateUserSchema),
  patchUser
  /*
    #swagger.summary = 'Оновлення профілю'
    #swagger.description = 'Зміна особистих даних користувача.'
    #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['username'],
            properties: {
              username: { type: 'string', example: 'JohnDoe' }
            }
          }
        }
      }
    }
  */
)

export default router
