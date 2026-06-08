import express from 'express';
import { testConexion } from './db/test.js';
import { router as v1EspecialidadesRutas } from './rutas/v1/especialidadesRutas.js';
import { router as v1ObrasSociales } from './rutas/v1/obrasSocialesRutas.js';
import { router as v1TurnosReservas } from './rutas/v1/turnosRutas.js';
import { router as v1MedicosRutas } from './rutas/v1/medicosRutas.js';
import { router as v1AuthRutas } from './rutas/v1/authRutas.js';
import { router as pacientesRutas } from './rutas/v1/pacientesRutas.js';
import { router as v1EstadisticasRutas } from './rutas/v1/estadisticasRutas.js';
import { swaggerUi, swaggerDocument } from './config/swagger.js';
import cors from 'cors';
import passport from 'passport';
import morgan from 'morgan';

// IMPORTAMOS LA ESTRATEGIA A USAR Y LA FORMA DE VALIDAR.
import { estrategia, validacion } from './config/passport.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// CONFIGURACION PASSPORT
passport.use(estrategia);
passport.use(validacion);
app.use(passport.initialize());

// Probar conexión al inicio
await testConexion();

// Ruta base de chequeo
app.get('/', (req, res) => {
  res.status(200).json({ estado: true, msg: 'API ok' });
});

// --- SWAGGER ---
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --- VINCULAR RUTAS MODULARES ---
app.use(
  '/api/v1/especialidades',
  passport.authenticate('jwt', { session: false }),
  v1EspecialidadesRutas,
);
app.use(
  '/api/v1/obras-sociales',
  passport.authenticate('jwt', { session: false }),
  v1ObrasSociales,
);
app.use(
  '/api/v1/turnos',
  passport.authenticate('jwt', { session: false }),
  v1TurnosReservas,
);
app.use(
  '/api/v1/medicos',
  passport.authenticate('jwt', { session: false }),
  v1MedicosRutas,
);
app.use(
  '/api/v1/pacientes',
  passport.authenticate('jwt', { session: false }),
  pacientesRutas,
);
app.use(
  '/api/v1/estadisticas',
  passport.authenticate('jwt', { session: false }),
  v1EstadisticasRutas,
);
app.use('/api/v1/auth', v1AuthRutas);

process.loadEnvFile();
const PUERTO = process.env.PUERTO || 3000;

app.listen(PUERTO, () => {
  console.log(`Servidor iniciado en puerto ${PUERTO}`);
});
