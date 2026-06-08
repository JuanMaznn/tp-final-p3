import swaggerJsDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Turnos Médicos',
      version: '1.0.0',
      description: 'API para gestión de turnos médicos con Express + MySQL',
    },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/rutas/v1/*.js'],
};

export default swaggerJsDoc(options);
