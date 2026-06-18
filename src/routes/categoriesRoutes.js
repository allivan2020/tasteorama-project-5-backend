import { Router } from 'express'
import { getCategories } from '../controllers/categoriesController.js'
import { ctrlWrapper } from '../utils/ctrlWrapper.js'

const router = Router()

router.get('/', ctrlWrapper(getCategories))

export default router
