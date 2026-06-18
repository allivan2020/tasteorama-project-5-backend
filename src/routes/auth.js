import { Router } from 'express';
import { celebrate } from 'celebrate';
import { registerUser, loginUser, logoutUser, refreshUserSession } from '../controllers/auth.js';
import { registerUserSchema, loginUserSchema } from '../validations/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middleware/authenticate.js'

const router = Router();

router.post(
  '/register',
  celebrate(registerUserSchema),
  ctrlWrapper(registerUser),
)
router.post('/login', celebrate(loginUserSchema), ctrlWrapper(loginUser))
router.post('/logout', authenticate, ctrlWrapper(logoutUser))
router.post('/refresh', ctrlWrapper(refreshUserSession))

export default router;
