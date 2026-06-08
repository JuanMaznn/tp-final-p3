import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const swaggerDocument = {
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
  paths: {},
};

const docsDir = path.resolve(__dirname, '../../docs');
const files = fs.readdirSync(docsDir).filter((f) => f.endsWith('.json'));

for (const file of files) {
  const content = JSON.parse(fs.readFileSync(path.join(docsDir, file), 'utf-8'));
  Object.assign(swaggerDocument.paths, content);
}

export { swaggerUi, swaggerDocument };
