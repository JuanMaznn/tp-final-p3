import express from 'express';
import { testConexion } from './db/test.js';
import especialidadesRoutes from './src/router/especialidades.routes.js';
import obrasSocialesRoutes from './src/router/obrasSociales.routes.js';

const app = express();
app.use(express.json());

// Probar conexión al inicio
await testConexion();

// Ruta base de chequeo
app.get('/', (req, res) => {
  res.status(200).send({ estado: 'ok', ms: 'api ok' });
});

// --- VINCULAR RUTAS MODULARES ---
app.use('/especialidades', especialidadesRoutes);
app.use('/obras-sociales', obrasSocialesRoutes);

process.loadEnvFile();
const PUERTO = process.env.PUERTO || 3000;

app.listen(PUERTO, () => {
  console.log(`Servidor iniciado en puerto ${PUERTO}`);
});