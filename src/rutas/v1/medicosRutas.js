import express from 'express';
import { check, param } from 'express-validator';
import { validarCampos } from '../../middlewares/validarCampos.js';
import MedicosControlador from '../../controladores/medicosControlador.js';
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';

const router = express.Router();

const medicosControlador = new MedicosControlador();

router.get('/', autorizarUsuarios([1, 2, 3]), medicosControlador.buscarTodos);

router.get(
  '/especialidad/:id_especialidad',
  autorizarUsuarios([1, 2, 3]),
  [
    param('id_especialidad').isInt().withMessage('Debe ser entero.'),
    validarCampos,
  ],
  medicosControlador.buscarPorEspecialidad,
);

router.get(
  '/:id_medico',
  autorizarUsuarios([1, 2, 3]),
  [
    param('id_medico', 'El ID debe ser un número entero').isInt(),
    validarCampos,
  ],
  medicosControlador.buscarId,
);

/* router.put(
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
); */

router.put(
  '/:id_medico/obras-sociales',
  autorizarUsuarios([3]),
  [
    param('id_medico')
      .notEmpty()
      .withMessage('El id_medico es obligatorio.')
      .isInt()
      .withMessage('El id_medico debe ser un número entero.'),
    check('obras_sociales')
      .notEmpty()
      .withMessage(
        'Debe enviar un array de obras sociales con el campo "obras_sociales"',
      )
      .bail()
      .isArray({ min: 1 })
      .withMessage('Debe enviar al menos una obra social'),
    check('obras_sociales.*.id_obra_social')
      .notEmpty()
      .withMessage('Cada obra social debe tener id_obra_social.')
      .isInt()
      .withMessage('id_obra_social debe ser un número entero.'),
    validarCampos,
  ],
  medicosControlador.asociarMedicoObrasSociales,
);

router.put(
  '/:id_medico',
  autorizarUsuarios([3]),
  [
    param('id_medico').isInt().withMessage('El id debe ser entero'),
    check('id_especialidad')
      .notEmpty()
      .withMessage('La especialidad es obligatoria')
      .bail()
      .isInt()
      .withMessage('La especialidad debe ser un número'),
    check('descripcion')
      .notEmpty()
      .withMessage('La descripción es obligatoria'),
    check('matricula')
      .notEmpty()
      .withMessage('La matrícula es obligatoria')
      .bail()
      .isInt()
      .withMessage('La matrícula debe ser un número entero'),
    check('valor_consulta')
      .notEmpty()
      .withMessage('El valor de consulta es obligatorio')
      .bail()
      .isNumeric()
      .withMessage('El valor debe ser un número'),
    validarCampos,
  ],
  medicosControlador.actualizar,
);

router.put(
  '/:id_medico/especialidad',
  autorizarUsuarios([3]),
  [
    param('id_medico').isInt().withMessage('id_medico debe ser entero.'),
    check('id_especialidad')
      .notEmpty()
      .withMessage('id_especialidad es obligatorio')
      .bail()
      .isInt()
      .withMessage('id_especialidad debe ser un número entero'),
    validarCampos,
  ],
  medicosControlador.asociarEspecialidad,
);

export { router };
