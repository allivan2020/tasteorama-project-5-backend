import { Router } from 'express'
import { celebrate } from 'celebrate'

import {
  createOwnRecipe,
  getAllRecipes,
  getFavoriteRecipes,
  getRecipeById,
  getOwnRecipes,
  deleteFavoriteRecipes,
  addFavoriteRecipes,
} from '../controllers/recipesController.js'

import {
  createOwnRecipeSchema,
  getAllRecipesSchema,
} from '../validations/recipesValidation.js'

import { authenticate } from '../middleware/authenticate.js'
import { isValidId } from '../middleware/isValidId.js'
import { ctrlWrapper } from '../utils/ctrlWrapper.js'

const router = Router()


router.get('/', celebrate(getAllRecipesSchema), ctrlWrapper(getAllRecipes))


router.get('/own', authenticate, ctrlWrapper(getOwnRecipes))
router.get('/favorites', authenticate, ctrlWrapper(getFavoriteRecipes))


router.get('/:id', isValidId, ctrlWrapper(getRecipeById))

router.post(
  '/',
  authenticate,
  celebrate(createOwnRecipeSchema),
  ctrlWrapper(createOwnRecipe),
)
router.post(
  '/favorites/:recipeId',
  authenticate,
  isValidId,
  ctrlWrapper(addFavoriteRecipes),
)
router.delete(
  '/favorites/:recipeId',
  authenticate,
  isValidId,
  ctrlWrapper(deleteFavoriteRecipes),
)

export default router
