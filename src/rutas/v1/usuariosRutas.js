import express from 'express';
import multer from 'multer';
import { check, param } from 'express-validator';
import { validarCampos } from '../../middlewares/validarCampos.js';
import UsuariosControlador from '../../controladores/usuariosControladores.js';
import { storage } from '../../config/multer.js';
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';

const upload = multer({ storage });
const router = express.Router();
const usuariosControlador = new UsuariosControlador();

router.post(
  '/',
  upload.single('foto'),
  [
    check('documento').notEmpty().withMessage('Documento obligatorio'),
    check('apellido').notEmpty().withMessage('Apellido obligatorio'),
    check('nombres').notEmpty().withMessage('Nombres obligatorio'),
    check('email').isEmail().withMessage('Email inválido'),
    check('contrasenia').notEmpty().withMessage('Contraseña obligatoria'),
    check('rol').isInt({ min: 1, max: 3 }).withMessage('Rol debe ser 1, 2 o 3'),
    validarCampos,
  ],
  usuariosControlador.crear,
);

router.put(
  '/:id_usuario',
  autorizarUsuarios([3]),
  upload.single('foto'),
  [
    param('id_usuario', 'Debe ser entero').isInt(),
    validarCampos,
  ],
  usuariosControlador.modificar,
);

export { router };
