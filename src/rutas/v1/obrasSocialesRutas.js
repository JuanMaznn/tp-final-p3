import express from 'express';
import ObrasSocialesControlador from '../../controladores/obrasSocialesControlador.js';
import { check, param } from 'express-validator';
import { validarCampos } from '../../middlewares/validarCampos.js';

const router = express.Router();

const obrasSocialesControlador = new ObrasSocialesControlador();

router.get('/', obrasSocialesControlador.buscarTodas);
router.get(
  '/:id_obra_social',
  [
    param('id_obra_social', 'El ID debe ser un número entero').isInt(),
    validarCampos,
  ],
  obrasSocialesControlador.buscarPorId,
);
router.post(
  '/',
  [
    check('nombre')
      .notEmpty()
      .withMessage('El nombre es obligatorio.')
      .isLength({ max: 120 })
      .withMessage('El nombre no debe ser mayor a 120 caracteres.'),
    check('descripcion')
      .notEmpty()
      .withMessage('La descripción es obligatorio.')
      .isLength({ max: 255 })
      .withMessage('El nombre no debe ser mayor a 120 caracteres.'),
    check('porcentajeDescuento')
      .notEmpty()
      .withMessage('El porcentaje de descuento es obligatorio.')
      .isFloat({ min: 0, max: 100 })
      .withMessage('El porcentaje de descuento debe estar entre 0 y 100.'),
    check('esParticular')
      .notEmpty()
      .withMessage('El campo esParticular es obligatorio.')
      .isBoolean()
      .withMessage('El campo esParticular debe ser booleano (true/false).'),
    validarCampos,
  ],
  obrasSocialesControlador.crear,
);
router.put(
  '/:id_obra_social',
  [
    param('id_obra_social', 'El ID debe ser un número entero').isInt(),
    check('nombre')
      .notEmpty()
      .withMessage('El nombre es obligatorio.')
      .isLength({ max: 120 })
      .withMessage('El nombre no debe ser mayor a 120 caracteres.'),
    check('descripcion')
      .notEmpty()
      .withMessage('La descripción es obligatoria.')
      .isLength({ max: 255 })
      .withMessage('La descripción no debe ser mayor a 120 caracteres.'),
    check('porcentajeDescuento')
      .notEmpty()
      .withMessage('El porcentaje de descuento es obligatorio.')
      .isFloat({ min: 0, max: 100 })
      .withMessage('El porcentaje de descuento debe estar entre 0 y 100.'),
    check('esParticular')
      .notEmpty()
      .withMessage('El campo esParticular es obligatorio.')
      .isBoolean()
      .withMessage('El campo esParticular debe ser booleano (true/false).'),
    validarCampos,
  ],
  obrasSocialesControlador.actualizar,
);
router.delete(
  '/:id_obra_social',
  [
    param('id_especialidad', 'El ID debe ser un número entero').isInt(),
    validarCampos,
  ],
  obrasSocialesControlador.eliminar,
);

export { router };
