import { Joi, Segments } from 'celebrate'

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    username: Joi.string()
      .trim()
      .min(2)
      .max(16)
      .pattern(new RegExp('^[a-zA-Zа-яА-ЯіІїЇєЄґҐ][a-zA-Z0-9а-яА-ЯіІїЇєЄґҐ_.-]*$'))
      .required()
      .empty(false)
      .messages({
        'string.empty': 'The username cannot be empty',
        'any.required': 'The username is required',
        'string.min': 'The username must be at least 2 characters long',
        'string.max': 'The username cannot exceed 16 characters',
        'string.pattern.base': 'The username must start with a letter and can only contain letters, numbers, dots, hyphens, or underscores',
      }),
    email: Joi.string()
      .trim()
      .email({ allowUnicode: false })
      .lowercase()
      .max(128)
      .required()
      .empty(false)
      .messages({
        'string.email':
          'Email must be a valid email address and contain only Latin characters',
        'string.empty': 'Email cannot be empty',
        'any.required': 'The email is required',
      }),
    password: Joi.string()
      .min(8)
      .max(128)
      .required()
      .empty(false)
      .pattern(new RegExp('^\\S+$'))
      .messages({
        'string.empty': 'Password cannot be empty or consist only of spaces',
        'string.min': 'Password must be at least 8 characters long',
        'string.max': 'Password cannot exceed 128 characters',
        'any.required': 'The password is required',
        'string.pattern.base': 'Password cannot contain any spaces',
      }),
  }),
}

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string()
      .trim()
      .email({ allowUnicode: false })
      .lowercase()
      .max(128)
      .required()
      .empty(false)
      .messages({
        'string.email':
          'Email must be a valid email address and contain only Latin characters',
        'string.empty': 'Email cannot be empty',
        'any.required': 'The email is required',
      }),
    password: Joi.string()
      .min(8)
      .max(128)
      .required()
      .empty(false)
      .pattern(new RegExp('^\\S+$'))
      .messages({
        'string.empty': 'Password cannot be empty or consist only of spaces',
        'string.min': 'Password must be at least 8 characters long',
        'string.max': 'Password cannot exceed 128 characters',
        'string.pattern.base': 'Password cannot contain any spaces',
        'any.required': 'The password is required',
      }),
  }),
}
