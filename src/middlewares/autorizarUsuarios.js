export default function autorizarUsuarios(perfilAutorizados = []) {
  return (req, res, next) => {
    const usuario = req.user;

    if (!usuario) {
      return res.status(401).json({
        estado: false,
        mensaje: 'Usuario no autenticado',
      });
    }

    if (!perfilAutorizados.includes(usuario.rol)) {
      return res.status(403).json({
        estado: false,
        mensaje: 'Acceso Denegado: Perfil no autorizado',
      });
    }

    next();
  };
}
