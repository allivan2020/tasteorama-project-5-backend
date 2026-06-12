import { Router } from 'express'
import { Ingredient } from '../models/ingredient.js'
import { getIngredients } from '../controllers/ingredientsController.js'

const router = Router()

router.get('/ingredients', getIngredients)

export default router
