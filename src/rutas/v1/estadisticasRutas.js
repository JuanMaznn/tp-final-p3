import express from 'express';
import EstadisticasControlador from '../../controladores/estadisticasControlador.js';
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';

const router = express.Router();
const estadisticasControlador = new EstadisticasControlador();

router.get('/', autorizarUsuarios([3]), estadisticasControlador.obtener);
router.get(
  '/medico',
  autorizarUsuarios([1]),
  estadisticasControlador.obtenerPorMedico,
);
router.get(
  '/pdf',
  autorizarUsuarios([3]),
  estadisticasControlador.descargarPDF,
);
router.get(
  '/medico/pdf',
  autorizarUsuarios([1]),
  estadisticasControlador.descargarPDFMedico,
);

export { router };
