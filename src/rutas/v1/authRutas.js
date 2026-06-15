import express from 'express';
import AuthController from '../../controladores/authControlador.js';

import { check, param } from 'express-validator';
import { validarCampos } from '../../middlewares/validarCampos.js';

const router = express.Router();
const authController = new AuthController();

router.post(
  '/login',
  [
    check('email')
      .notEmpty()
      .withMessage('El correo electrónico es requerido!.')
      .isEmail()
      .withMessage('Revisar el formato del correo electrónico.'),
    check('contrasenia').notEmpty().withMessage('La contraseña es requerida.'),
    validarCampos,
  ],
  authController.login,
);

router.post(
  '/recuperar',
  [
    check('email')
      .notEmpty()
      .withMessage('El correo electrónico es requerido.')
      .isEmail()
      .withMessage('Revisar el formato del correo electrónico.'),
    validarCampos,
  ],
  authController.solicitarRecuperacion,
);

router.get(
  '/validar-token/:token',
  [
    param('token').notEmpty().withMessage('El token es requerido.'),
    validarCampos,
  ],
  authController.validarToken,
);

router.post(
  '/restablecer/:token',
  [
    param('token').notEmpty().withMessage('El token es requerido.'),
    check('contrasenia')
      .notEmpty()
      .withMessage('La nueva contraseña es requerida.')
      .isLength({ min: 6 })
      .withMessage('La contraseña debe tener al menos 6 caracteres.'),
    validarCampos,
  ],
  authController.restablecerContrasenia,
);

export { router };
