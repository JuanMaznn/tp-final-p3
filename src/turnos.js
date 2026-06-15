import express from 'express';
import { testConexion } from './db/test.js';
import { router as v1EspecialidadesRutas } from './rutas/v1/especialidadesRutas.js';
import { router as v1ObrasSociales } from './rutas/v1/obrasSocialesRutas.js';
import { router as v1TurnosReservas } from './rutas/v1/turnosRutas.js';
import { router as v1MedicosRutas } from './rutas/v1/medicosRutas.js';
import { router as v1AuthRutas } from './rutas/v1/authRutas.js';
import { router as pacientesRutas } from './rutas/v1/pacientesRutas.js';
import { router as v1EstadisticasRutas } from './rutas/v1/estadisticasRutas.js';
import { router as v1UsuariosRutas } from './rutas/v1/usuariosRutas.js';
import { router as v1AuditoriaRutas } from './rutas/v1/auditoriaRutas.js';
import { swaggerUi, swaggerDocument } from './config/swagger.js';
import cors from 'cors';
import passport from 'passport';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// estrategias
import { estrategia, validacion } from './config/passport.js';

// middleware de auditoría
import auditoria from './middlewares/auditoria.js';

const app = express();
app.use(express.json());

// CORS
app.use(cors());

// morgan
app.use(morgan('dev'));

// ruta de uploads
app.use('/uploads', express.static(path.join(__dirname, './publico')));

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

// SWAGGER
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// VINCULAR RUTAS MODULARES / usar passport acá
// El middleware `auditoria` corre DESPUÉS de passport (ya hay req.user) y
// registra cada acción del usuario al finalizar la respuesta.
app.use(
  '/api/v1/especialidades',
  passport.authenticate('jwt', { session: false }),
  auditoria,
  v1EspecialidadesRutas,
);
app.use(
  '/api/v1/obras-sociales',
  passport.authenticate('jwt', { session: false }),
  auditoria,
  v1ObrasSociales,
);
app.use(
  '/api/v1/turnos',
  passport.authenticate('jwt', { session: false }),
  auditoria,
  v1TurnosReservas,
);
app.use(
  '/api/v1/medicos',
  passport.authenticate('jwt', { session: false }),
  auditoria,
  v1MedicosRutas,
);
app.use(
  '/api/v1/pacientes',
  passport.authenticate('jwt', { session: false }),
  auditoria,
  pacientesRutas,
);
app.use(
  '/api/v1/estadisticas',
  passport.authenticate('jwt', { session: false }),
  auditoria,
  v1EstadisticasRutas,
);
app.use(
  '/api/v1/usuarios',
  passport.authenticate('jwt', { session: false }),
  auditoria,
  v1UsuariosRutas,
);
// Consulta del historial (solo admin). SIN el middleware `auditoria` para no
// auto-registrar las consultas al propio log.
app.use(
  '/api/v1/auditoria',
  passport.authenticate('jwt', { session: false }),
  v1AuditoriaRutas,
);
app.use('/api/v1/auth', v1AuthRutas);

process.loadEnvFile();
const PUERTO = process.env.PUERTO || 3000;

app.listen(PUERTO, () => {
  console.log(`Servidor iniciado en puerto ${PUERTO}`);
});
