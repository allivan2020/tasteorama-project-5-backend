import { Router } from 'express'
import { getIngredients } from '../controllers/ingredientsController.js'
import { ctrlWrapper } from '../utils/ctrlWrapper.js'

const router = Router()

router.get('/', ctrlWrapper(getIngredients))

export default router
