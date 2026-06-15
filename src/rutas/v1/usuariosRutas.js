import express from 'express';
import multer from 'multer';
import passport from 'passport';
import { check, param } from 'express-validator';
import { validarCampos } from '../../middlewares/validarCampos.js';
import UsuariosControlador from '../../controladores/usuariosControladores.js';
import { storage } from '../../config/multer.js';
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';

const upload = multer({ storage });
const router = express.Router();
const usuariosControlador = new UsuariosControlador();

router.get('/', autorizarUsuarios([3]), usuariosControlador.buscarTodos);

router.post(
  '/',
  autorizarUsuarios([3]),
  upload.single('foto'),
  [
    check('documento').notEmpty().withMessage('Documento obligatorio'),
    check('apellido').notEmpty().withMessage('Apellido obligatorio'),
    check('nombres').notEmpty().withMessage('Nombres obligatorio'),
    check('email').isEmail().withMessage('Email inválido'),
    check('contrasenia').notEmpty().withMessage('Contraseña obligatoria'),
    check('rol').isInt({ min: 1, max: 3 }).withMessage('Rol debe ser 1, 2 o 3'),
    check('id_obra_social')
      .if((value, { req }) => req.body.rol == 2)
      .isInt({ min: 1 })
      .withMessage('id_obra_social debe ser un entero positivo'),
    check('id_especialidad')
      .if((value, { req }) => req.body.rol == 1)
      .isInt({ min: 1 })
      .withMessage('id_especialidad debe ser un entero positivo'),
    check('matricula')
      .if((value, { req }) => req.body.rol == 1)
      .isInt({ min: 1 })
      .withMessage('Matrícula debe ser un entero positivo'),
    check('valor_consulta')
      .if((value, { req }) => req.body.rol == 1)
      .isFloat({ min: 1 })
      .withMessage('Valor consulta debe ser un número positivo'),
    validarCampos,
  ],
  usuariosControlador.crear,
);

router.put(
  '/:id_usuario',
  autorizarUsuarios([3]),
  [
    param('id_usuario', 'El parámetro debe ser entero').isInt(),
    check('documento').optional(),
    check('apellido').optional(),
    check('nombres').optional(),
    check('email').optional().isEmail().withMessage('Email inválido'),
    check('contrasenia').optional(),
    check('foto_path').optional(),
    check('rol')
      .optional()
      .isInt({ min: 1, max: 3 })
      .withMessage('Rol debe ser 1, 2 o 3'),
    check('id_obra_social')
      .if((value, { req }) => req.body.rol !== undefined && req.body.rol == 2)
      .isInt({ min: 1 })
      .withMessage('id_obra_social debe ser un entero positivo'),
    check('id_especialidad')
      .if((value, { req }) => req.body.rol !== undefined && req.body.rol == 1)
      .isInt({ min: 1 })
      .withMessage('id_especialidad debe ser un entero positivo'),
    check('matricula')
      .if((value, { req }) => req.body.rol !== undefined && req.body.rol == 1)
      .isInt({ min: 1 })
      .withMessage('Matrícula debe ser un entero positivo'),
    check('valor_consulta')
      .if((value, { req }) => req.body.rol !== undefined && req.body.rol == 1)
      .isFloat({ min: 1 })
      .withMessage('Valor consulta debe ser un número positivo'),
    validarCampos,
  ],
  upload.single('foto'),
  usuariosControlador.modificar,
);

router.delete(
  '/:id_usuario',
  autorizarUsuarios([3]),
  [param('id_usuario', 'Debe ser entero').isInt(), validarCampos],
  usuariosControlador.eliminar,
);

export { router };
