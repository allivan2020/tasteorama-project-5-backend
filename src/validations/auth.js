import { Joi, Segments } from 'celebrate'

const emailValidation = Joi.string()
  .trim()
  .email({ allowUnicode: false })
  .lowercase()
  .max(128)
  .required()
  .messages({
    'string.email':
      'Email must be a valid email address and contain only Latin characters',
    'string.empty': 'Email cannot be empty',
    'any.required': 'The email is required',
  })

const passwordValidation = Joi.string()
  .min(8)
  .max(128)
  .required()
  .pattern(new RegExp('^\\S+$'))
  .messages({
    'string.min': 'Password must be at least 8 characters long',
    'string.max': 'Password cannot exceed 128 characters',
    'any.required': 'The password is required',
    'string.pattern.base': 'Password cannot contain any spaces',
  })

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    username: Joi.string()
      .trim()
      .min(2)
      .max(16)
      .pattern(
        new RegExp('^[a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9]+([_.-][a-zA-Z0-9]+)*$'),
      )
      .required()
      .messages({
        'string.empty': 'The username cannot be empty',
        'any.required': 'The username is required',
        'string.min': 'The username must be at least 2 characters long',
        'string.max': 'The username cannot exceed 16 characters',
        'string.pattern.base':
          'The username must start and end with a letter or number. You can use a single dot, hyphen, or underscore inside the name, but not multiple ones in a row.',
      }),
    email: emailValidation,
    password: passwordValidation,
  }),
}

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: emailValidation,
    password: passwordValidation,
  }),
}
