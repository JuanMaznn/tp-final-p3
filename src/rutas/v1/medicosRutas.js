import express from 'express';
import { check, param } from 'express-validator';
import { validarCampos } from '../../middlewares/validarCampos.js';
import TransformarDTO from '../../middlewares/transformarDTOs.js';
import MedicosControlador from '../../controladores/medicosControlador.js';
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';

const router = express.Router();

const medicosControlador = new MedicosControlador();
const transformarDTO = new TransformarDTO();

router.get('/', autorizarUsuarios([2]), medicosControlador.buscarTodos);
router.get(
  '/especialidad/:id_especialidad',
  autorizarUsuarios([2]),
  [
    param('id_especialidad').isInt().withMessage('Debe ser entero.'),
    validarCampos,
  ],
  medicosControlador.buscarPorEspecialidad,
);

router.post(
  '/:id_medico/obras-sociales',
  autorizarUsuarios([3]),
  [
    param('id_medico')
      .notEmpty()
      .withMessage('El id_medico es obligatorio.')
      .isInt()
      .withMessage('El id_medico debe ser un número entero.'),
    check('obras_sociales')
      .isArray()
      .withMessage('obras_sociales debe ser un array.')
      .notEmpty()
      .withMessage('obras_sociales no puede estar vacío.'),
    check('obras_sociales.*.id_obra_social')
      .notEmpty()
      .withMessage('Cada obra social debe tener id_obra_social.')
      .isInt()
      .withMessage('id_obra_social debe ser un número entero.'),
    validarCampos,
  ],
  transformarDTO.medicosAsociarDTO,
  medicosControlador.asociarMedicoObrasSociales,
);

router.put(
  '/:id_medico/especialidad',
  autorizarUsuarios([3]),
  [
    param('id_medico').isInt().withMessage('id_medico debe ser entero.'),
    check('id_especialidad')
      .notEmpty()
      .isInt()
      .withMessage('id_especialidad es obligatorio y debe ser entero.'),
    validarCampos,
  ],
  medicosControlador.asociarEspecialidad,
);

export { router };
