import { Joi, Segments } from 'celebrate';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    username: Joi.string().trim().max(16).required(),
    email: Joi.string().email().trim().lowercase().max(128).required(),
    password: Joi.string().min(8).max(128).required(),
  }),
};

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().trim().lowercase().max(128).required(),
    password: Joi.string().min(8).max(128).required(),
  }),
};
