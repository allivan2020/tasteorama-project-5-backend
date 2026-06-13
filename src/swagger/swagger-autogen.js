import swaggerAutogen from 'swagger-autogen'

const doc = {
  info: {
    title: 'Tasteorama API',
    description: 'API documentation',
  },
  servers: [
    {
      url: 'https://tasteorama-project-5-backend.onrender.com',
      description: 'Продакшн сервер (Render)',
    },
    {
      url: 'http://localhost:3000',
      description: 'Локальний сервер',
    },
  ],
}

const outputFile = './src/swagger-output.json'
const endpointsFiles = ['./src/server.js']

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc)
