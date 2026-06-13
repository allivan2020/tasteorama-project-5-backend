import { Router } from 'express'
import { celebrate } from 'celebrate'

import {
  getAllRecipes,
  getFavoriteRecipes,
  getOwnRecipes,
} from '../controllers/recipesController.js';

import { getAllRecipesSchema } from '../validations/recipesValidation.js'
import { authenticate } from '../middleware/authenticate.js'


const router = Router()

router.get('/recipes', celebrate(getAllRecipesSchema), getAllRecipes)

router.get('/recipes/favorites', authenticate, getFavoriteRecipes)

router.get(
  '/recipes/own',
  authenticate,
  getOwnRecipes,
);

export default router;

