import { Joi, Segments } from 'celebrate'

export const getAllRecipesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(12),
    category: Joi.string().allow(''),
    ingredient: Joi.string().allow(''),
    search: Joi.string().allow(''),
  }),
}

export const getOwnRecipesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(12),
  }),
}

export const createOwnRecipeSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().trim().required(),
    category: Joi.string().trim().required(),
    instructions: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    thumb: Joi.string().trim().optional(),
    time: Joi.string().trim().required(),
    cals: Joi.string().trim().optional(),
    ingredients: Joi.array()
      .items(
        Joi.object({
          id: Joi.string().hex().length(24).required(),
          measure: Joi.string().trim().required(),
        }),
      )
      .min(1)
      .required(),
  }).required(),
}
