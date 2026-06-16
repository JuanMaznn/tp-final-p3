import jwt from 'jsonwebtoken';
import passport from 'passport';
import UsuariosServicio from '../servicios/usuariosServicio.js';

export default class AuthController {
  login = async (req, res) => {
    passport.authenticate('local', { session: false }, (err, usuario, info) => {
      if (err || !usuario) {
        return res.status(400).json({
          estado: false,
          mensaje: 'Solicitud incorrecta.',
        });
      }
      req.login(usuario, { session: false }, (err) => {
        if (err) {
          res.send(err);
        }
        const token = jwt.sign(
          { id_usuario: usuario.id_usuario, rol: usuario.rol },
          process.env.JWT_SECRET,
          {
            expiresIn: '1h',
          }
        );

        return res.json({
          estado: true,
          token: token,
        });
      });
    })(req, res);
  };

  solicitarRecuperacion = async (req, res) => {
    const { email } = req.body;
    const usuariosServicio = new UsuariosServicio();
    const resultado = await usuariosServicio.solicitarRecuperacionContrasenia(email);

    if (resultado.error) {
      return res.status(400).json({
        estado: false,
        mensaje: resultado.error,
      });
    }

    return res.json({
      estado: true,
      ...resultado,
    });
  };

  validarToken = async (req, res) => {
    const { token } = req.params;
    const usuariosServicio = new UsuariosServicio();
    const resultado = await usuariosServicio.validarTokenRecuperacion(token);

    if (resultado.error) {
      return res.status(400).json({
        estado: false,
        mensaje: resultado.error,
      });
    }

    return res.json({
      estado: true,
      ...resultado,
    });
  };

  restablecerContrasenia = async (req, res) => {
    const { token } = req.params;
    const { contrasenia } = req.body;
    const usuariosServicio = new UsuariosServicio();
    const resultado = await usuariosServicio.restablecerContrasenia(token, contrasenia);

    if (resultado.error) {
      return res.status(400).json({
        estado: false,
        mensaje: resultado.error,
      });
    }

    return res.json({
      estado: true,
      ...resultado,
    });
  };
}
