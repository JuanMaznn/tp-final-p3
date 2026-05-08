import express from 'express';
import { testConexion } from './db/test.js';
import { router as v1EspecialidadesRutas } from './router/v1/especialidadesRutas.js';
import { router as v1ObrasSociales } from './router/v1/obrasSocialesRutas.js';

const app = express();
app.use(express.json());

// Probar conexión al inicio
await testConexion();

// Ruta base de chequeo
app.get('/', (req, res) => {
  res.status(200).send({ estado: true, msg: 'API ok' });
});

// --- VINCULAR RUTAS MODULARES ---
app.use('/api/v1/especialidades', v1EspecialidadesRutas);
app.use('/api/v1/obras-sociales', v1ObrasSociales);

process.loadEnvFile();
const PUERTO = process.env.PUERTO || 3000;

app.listen(PUERTO, () => {
  console.log(`Servidor iniciado en puerto ${PUERTO}`);
});
