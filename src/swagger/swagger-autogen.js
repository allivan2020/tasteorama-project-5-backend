import swaggerAutogen from 'swagger-autogen'

const doc = {
  info: {
    title: 'Tasteorama API',
    description: 'API documentation',
  },
  host: 'localhost:3000',
  schemes: ['http'],
}

const outputFile = './src/swagger-output.json'
const endpointsFiles = ['./src/server.js']

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc)
