import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API Turnos Medicos',
    version: '1.0.0',
    description: 'API para gestion de turnos medicos con Express + MySQL',
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
    schemas: {},
    responses: {},
    requestBodies: {},
    parameters: {},
  },
  paths: {},
};

const mergeSection = (targetSection, sourceSection = {}) => {
  for (const [key, value] of Object.entries(sourceSection)) {
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      targetSection[key] &&
      typeof targetSection[key] === 'object' &&
      !Array.isArray(targetSection[key])
    ) {
      targetSection[key] = { ...targetSection[key], ...value };
      continue;
    }
    targetSection[key] = value;
  }
};

const docsDir = path.resolve(__dirname, '../../docs');
const files = fs.readdirSync(docsDir).filter((f) => f.endsWith('.json'));

for (const file of files) {
  const content = JSON.parse(fs.readFileSync(path.join(docsDir, file), 'utf-8'));
  const pathContent = content.paths ?? Object.fromEntries(
    Object.entries(content).filter(([key]) => key !== 'components'),
  );
  Object.assign(swaggerDocument.paths, pathContent);

  if (content.components) {
    mergeSection(swaggerDocument.components, content.components);
  }
}

export { swaggerUi, swaggerDocument };
