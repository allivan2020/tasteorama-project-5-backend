import { Router } from 'express';
import { celebrate } from 'celebrate';
import { registerUser, loginUser } from '../controllers/auth.js';
import { registerUserSchema, loginUserSchema } from '../validations/auth.js';

const router = Router();

router.post('/auth/register', celebrate(registerUserSchema), registerUser);
router.post('/auth/login', celebrate(loginUserSchema), loginUser);

export default router;
