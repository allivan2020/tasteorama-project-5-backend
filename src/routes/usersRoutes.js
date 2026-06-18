import { Router } from 'express'
import { celebrate, Segments } from 'celebrate'
import { authenticate } from '../middleware/authenticate.js'
import { uploadAvatar } from '../utils/cloudinary.js'
import { ctrlWrapper } from '../utils/ctrlWrapper.js'
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

const router = Router()

router.get('/current', authenticate, ctrlWrapper(getCurrent))
router.get(
  '/',
  celebrate({ [Segments.QUERY]: paginationSchema }),
  ctrlWrapper(getUsers),
)
router.get('/:id', authenticate, ctrlWrapper(getUserWithRecipes))
router.patch(
  '/avatar',
  authenticate,
  uploadAvatar.single('avatar'),
  ctrlWrapper(patchAvatar),
)
router.patch(
  '/',
  authenticate,
  celebrate(updateUserSchema),
  ctrlWrapper(patchUser),
)

export default router
