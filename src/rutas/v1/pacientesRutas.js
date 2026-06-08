import express from 'express';
import { check, param } from 'express-validator';
import { validarCampos } from '../../middlewares/validarCampos.js';
import PacientesControlador from '../../controladores/pacientesControlador.js';
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';

const router = express.Router();
const pacientesControlador = new PacientesControlador();

router.put(
  '/:id_paciente/obra-social',
  autorizarUsuarios([3]),
  [
    param('id_paciente').isInt().withMessage('id_paciente debe ser entero.'),
    check('id_obra_social')
      .isInt()
      .withMessage('id_obra_social debe ser entero.'),
    validarCampos,
  ],
  pacientesControlador.asociarObraSocial,
);

export { router };
