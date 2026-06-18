import { Segments } from 'celebrate'

import { Joi} from 'celebrate'

export const updateUserSchema = {
  [Segments.BODY]: Joi.object({
    username: Joi.string().min(2).max(16).required(),
  }),
}

export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
})