const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Indigitall test API',
      version: '1.0.0',
      description: 'API documentation for Indigitall test'
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Development server'
      }
    ],
    components: {
      parameters: {
        AcceptLanguage: {
          name: 'Accept-Language',
          in: 'header',
          description: 'Language preference for the response',
          required: false,
          schema: {
            type: 'string',
            example: 'es-ES,es;q=0.9,en-US,en;q=0.8'
          }
        }
      }
    }
  },
  apis: ['./src/docs/swagger/*.js']
}

const swaggerSpec = swaggerJsdoc(options)

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

module.exports = setupSwagger
