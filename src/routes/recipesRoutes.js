import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  getAllRecipes,
  getFavoriteRecipes,
} from '../controllers/recipesController.js';

import { getAllRecipesSchema } from '../validations/recipesValidation.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.get(
  '/recipes',
  celebrate(getAllRecipesSchema),
  getAllRecipes,
);

router.get(
  '/recipes/favorites',
  authenticate,
  getFavoriteRecipes,
);

export default router;