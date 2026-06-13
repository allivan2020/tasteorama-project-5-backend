import { Router } from 'express'
import { celebrate } from 'celebrate'

import {
  createOwnRecipe,
  getAllRecipes,
  getFavoriteRecipes,
  getRecipeById,
  getOwnRecipes,
} from '../controllers/recipesController.js'

import {
  createOwnRecipeSchema,
  getAllRecipesSchema,
} from '../validations/recipesValidation.js'
import { authenticate } from '../middleware/authenticate.js'
import { isValidId } from '../middleware/isValidId.js'

const router = Router()

router.get('/recipes', celebrate(getAllRecipesSchema), getAllRecipes)

router.post(
  '/recipes',
  authenticate,
  celebrate(createOwnRecipeSchema),
  createOwnRecipe,
)

/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Get all recipes
 *     tags:
 *       - Recipes
 *     responses:
 *       200:
 *         description: List of recipes
 */

router.get('/recipes/favorites', authenticate, getFavoriteRecipes)

router.get('/recipes/own', authenticate, getOwnRecipes)

router.get('/recipes/:id', isValidId, getRecipeById)

export default router
