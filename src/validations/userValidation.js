
import Joi from 'joi'
import { Segments } from 'celebrate'
 
// Bug #2 fix: updateUserSchema is already wrapped in [Segments.BODY],
// so celebrate(updateUserSchema) works without double-wrapping
export const updateUserSchema = {
  [Segments.BODY]: Joi.object({
    username: Joi.string().min(2).max(16).required(),
  }),
}
 
// paginationSchema is used as a plain Joi object inside celebrate({ [Segments.QUERY]: ... })
// in the route, so it stays unwrapped here
export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
})
 