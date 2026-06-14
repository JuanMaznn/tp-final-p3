import express from 'express';
import { check, param } from 'express-validator';
import { validarCampos } from '../../middlewares/validarCampos.js';
import PacientesControlador from '../../controladores/pacientesControlador.js';
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';

const router = express.Router();
const pacientesControlador = new PacientesControlador();

router.get('/', autorizarUsuarios([1, 3]), pacientesControlador.buscarTodos);

router.get(
  '/:id_paciente',
  autorizarUsuarios([1, 3]),
  [
    param('id_paciente', 'El ID debe ser un número entero').isInt(),
    validarCampos,
  ],
  pacientesControlador.buscarPorId,
);

router.put(
  '/:id_paciente/obra-social',
  autorizarUsuarios([3]),
  [
    param('id_paciente').isInt().withMessage('id_paciente debe ser entero.'),
    check('id_obra_social')
      .notEmpty().withMessage('id_obra_social es obligatorio').bail()
      .isInt()
      .withMessage('id_obra_social debe ser entero.'),
    validarCampos,
  ],
  pacientesControlador.asociarObraSocial,
);

export { router };
