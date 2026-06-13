import express from 'express';
import { check, param } from 'express-validator';
import { validarCampos } from '../../middlewares/validarCampos.js';
import MedicosControlador from '../../controladores/medicosControlador.js';
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';

const router = express.Router();

const medicosControlador = new MedicosControlador();

router.get('/', autorizarUsuarios([1, 2, 3]), medicosControlador.buscarTodos);

router.get(
  '/:id_medico',
  autorizarUsuarios([1, 2, 3]),
  [
    param('id_medico', 'El ID debe ser un número entero').isInt(),
    validarCampos,
  ],
  medicosControlador.buscarId,
);

router.get(
  '/especialidad/:id_especialidad',
  autorizarUsuarios([1, 2, 3]),
  [
    param('id_especialidad').isInt().withMessage('Debe ser entero.'),
    validarCampos,
  ],
  medicosControlador.buscarPorEspecialidad,
);

/* router.post(
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
  medicosControlador.asociarMedicoObrasSociales,
);

router.post(
  '/',
  autorizarUsuarios([3]),
  [
    check('id_usuario').isInt().withMessage('id_usuario debe ser entero'),
    check('id_especialidad')
      .isInt()
      .withMessage('id_especialidad debe ser entero'),
    check('matricula').notEmpty().withMessage('Matricula no puede estar vacio'),
    check('descripcion').notEmpty(),
    check('valor_consulta')
      .isNumeric()
      .withMessage('valor_consulta debe ser numérico'),
    validarCampos,
  ],
  medicosControlador.crear,
);

router.put(
  '/:id_medico',
  autorizarUsuarios([3]),
  [
    param('id_medico').isInt().withMessage('El id debe ser entero'),
    check('id_especialidad')
      .isInt()
      .withMessage('La especialidad debe ser un numero'),
    check('descripcion').notEmpty(),
    check('matricula').notEmpty().withMessage('La matricula es obligatoria'),
    check('valor_consulta')
      .isNumeric()
      .withMessage('El valor debe de ser un numero'),
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
      .isInt()
      .withMessage('id_especialidad es obligatorio y debe ser entero.'),
    validarCampos,
  ],
  medicosControlador.asociarEspecialidad,
);

export { router };
