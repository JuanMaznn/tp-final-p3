import jwt from 'jsonwebtoken';
import passport from 'passport';

export const autenticarJWT = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, usuario, info) => {
    if (err) {
      return res.status(500).json({
        estado: false,
        mensaje: 'Error en la autenticación',
      });
    }
    if (!usuario) {
      return res.status(401).json({
        estado: false,
        mensaje: 'Token no válido o expirado',
      });
    }
    req.user = usuario;
    next();
  })(req, res, next);
};

export default autenticarJWT;
