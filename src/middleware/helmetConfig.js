import helmet from 'helmet'

export const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'validator.swagger.io'],
      connectSrc: [
        "'self'",
        'https://tasteorama-project-5-backend.onrender.com',
        'http://localhost:3000',
      ],
    },
  },
})
