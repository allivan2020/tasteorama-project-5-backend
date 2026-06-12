import { Joi, Segments } from 'celebrate'

export const getIngredientsSchema = {
  [Segments.QUERY]: Joi.object({
    search: Joi.string().trim().max(64).allow(''),
  }),
}
