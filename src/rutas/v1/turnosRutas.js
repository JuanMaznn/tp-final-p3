import express from 'express';
import { check, param } from 'express-validator';
import { validarCampos } from '../../middlewares/validarCampos.js';

import TransformarDTO from '../../middlewares/transformarDTOs.js';
import TurnosControlador from '../../controladores/turnosControlador.js';
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';

const router = express.Router();

const turnosControlador = new TurnosControlador();
const transformarDTO = new TransformarDTO();

router.get('/', autorizarUsuarios([1, 2]), turnosControlador.buscarTodos);

router.post(
  '/',
  autorizarUsuarios([2, 3]),
  [
    check('id_medico').notEmpty().withMessage('El id_medico es obligatorio.'),
    check('id_paciente')
      .notEmpty()
      .withMessage('El id_paciente es obligatorio.'),
    check('fecha_hora').notEmpty().withMessage('La fecha_hora es obligatorio.'),
    validarCampos,
  ],
  transformarDTO.turnosCrearDTO,
  turnosControlador.crear,
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
