import express from 'express';
import { check, param } from 'express-validator';
import { validarCampos } from '../../middlewares/validarCampos.js';

import TurnosControlador from '../../controladores/turnosControlador.js';
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';

const router = express.Router();

const turnosControlador = new TurnosControlador();

router.get('/', autorizarUsuarios([1, 2, 3]), turnosControlador.buscarTodos);

router.post(
  '/',
  autorizarUsuarios([2, 3]),
  [
    check('id_medico')
      .notEmpty()
      .withMessage('El id_medico es obligatorio.')
      .bail()
      .isInt()
      .withMessage('El id_medico debe ser un numero entero.'),
    check('id_paciente')
      .notEmpty()
      .withMessage('El id_paciente es obligatorio.')
      .bail()
      .isInt()
      .withMessage('El id_paciente debe ser un numero entero.'),
    check('fecha_hora')
      .notEmpty()
      .withMessage('La fecha_hora es obligatoria.')
      .bail()
      .matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
      .withMessage('La fecha_hora debe tener formato YYYY-MM-DD HH:mm:ss.'),
    validarCampos,
  ],
  turnosControlador.crear,
);

router.get(
  '/:id_turno',
  autorizarUsuarios([1, 2, 3]),
  [
    param('id_turno').isInt().withMessage('id_turno debe ser entero.'),
    validarCampos,
  ],
  turnosControlador.buscarId,
);

router.put(
  '/:id_turno',
  autorizarUsuarios([3]),
  [
    param('id_turno').isInt().withMessage('id_turno debe ser entero.'),
    check('id_medico')
      .notEmpty()
      .withMessage('El id_medico es obligatorio.')
      .bail()
      .isInt()
      .withMessage('El id_medico debe ser un numero entero.'),
    check('id_paciente')
      .notEmpty()
      .withMessage('El id_paciente es obligatorio.')
      .bail()
      .isInt()
      .withMessage('El id_paciente debe ser un numero entero.'),
    check('fecha_hora')
      .notEmpty()
      .withMessage('La fecha_hora es obligatoria.')
      .bail()
      .matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
      .withMessage('La fecha_hora debe tener formato YYYY-MM-DD HH:mm:ss.'),
    validarCampos,
  ],
  turnosControlador.modificar,
);

router.put(
  '/:id_turno/atender',
  autorizarUsuarios([1]),
  [
    param('id_turno').isInt().withMessage('id_turno debe ser entero.'),
    validarCampos,
  ],
  turnosControlador.marcarAtendido,
);

export { router };
