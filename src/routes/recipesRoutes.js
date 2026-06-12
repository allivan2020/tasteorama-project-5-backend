import { Router } from 'express'
import { celebrate } from 'celebrate'
import { getAllRecipesSchema } from '../validations/recipesValidation.js'
import { getAllRecipes } from '../controllers/recipesController.js'

const router = Router()

router.get('/recipes', celebrate(getAllRecipesSchema), getAllRecipes)

export default router
