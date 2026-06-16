import express from 'express';
import AuditoriaControlador from '../../controladores/auditoriaControlador.js';
import { param, query } from 'express-validator';
import { validarCampos } from '../../middlewares/validarCampos.js';
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';

const router = express.Router();

const auditoriaControlador = new AuditoriaControlador();

// Validaciones de los filtros opcionales (query string), reutilizables.
const filtrosQuery = [
  query('entidad').optional().isString(),
  query('accion').optional().isString(),
  query('metodo')
    .optional()
    .isIn(['GET', 'POST', 'PUT', 'PATCH', 'DELETE'])
    .withMessage('Método HTTP inválido.'),
  query('desde')
    .optional()
    .isISO8601()
    .withMessage('desde debe ser una fecha válida (ISO 8601).'),
  query('hasta')
    .optional()
    .isISO8601()
    .withMessage('hasta debe ser una fecha válida (ISO 8601).'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 200 })
    .withMessage('limit debe estar entre 1 y 200.'),
  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('offset debe ser mayor o igual a 0.'),
];

// Historial completo con filtros opcionales. Solo administrador.
router.get(
  '/',
  autorizarUsuarios([3]),
  [
    query('id_usuario')
      .optional()
      .isInt({ min: 1 })
      .withMessage('id_usuario debe ser un entero.'),
    ...filtrosQuery,
    validarCampos,
  ],
  auditoriaControlador.buscarTodos,
);

// Historial de acciones de un usuario puntual. Solo administrador.
router.get(
  '/usuario/:id_usuario',
  autorizarUsuarios([3]),
  [
    param('id_usuario', 'El ID debe ser un número entero').isInt({ min: 1 }),
    ...filtrosQuery,
    validarCampos,
  ],
  auditoriaControlador.buscarPorUsuario,
);

// Detalle de un registro puntual. Solo administrador.
router.get(
  '/:id_auditoria',
  autorizarUsuarios([3]),
  [
    param('id_auditoria', 'El ID debe ser un número entero').isInt({ min: 1 }),
    validarCampos,
  ],
  auditoriaControlador.buscarPorId,
);

export { router };
