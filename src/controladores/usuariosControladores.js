import UsuariosServicio from '../servicios/usuariosServicio.js';

export default class UsuariosControlador {
  constructor() {
    this.usuariosServicio = new UsuariosServicio();
  }

  buscarTodos = async (req, res) => {
    try {
      const usuarios = await this.usuariosServicio.buscarTodos();
      res.status(200).json({ estado: true, usuarios });
    } catch (error) {
      console.log('Error en GET /usuarios', error);
      res.status(500).json({ estado: false, mensaje: 'Error interno.' });
    }
  };

  buscarPorId = async (req, res) => {
    try {
      const usuario = await this.usuariosServicio.buscarPorId(req.params.id_usuario);
      if (!usuario) {
        return res.status(404).json({ estado: false, mensaje: 'Usuario no encontrado.' });
      }
      res.status(200).json({ estado: true, usuario });
    } catch (error) {
      console.log('Error en GET /usuarios/:id', error);
      res.status(500).json({ estado: false, mensaje: 'Error interno.' });
    }
  };

  crear = async (req, res) => {
    try {
      const datos = { ...req.body };
      if (req.file) datos.foto_path = req.file.filename;

      const resultado = await this.usuariosServicio.crear(datos);

      if (resultado.error) {
        res.status(400).json({ estado: false, mensaje: resultado.error });
        return;
      }

      res.status(201).json({
        estado: true,
        mensaje: 'Usuario creado.',
        datos: resultado,
      });
    } catch (err) {
      console.log('Error en POST /usuarios', err);
      res.status(500).json({ estado: false, mensaje: 'Error interno.' });
    }
  };

  modificar = async (req, res) => {
    try {
      const id_usuario = req.params.id_usuario;
      const datos = { ...req.body };
      delete datos.id_usuario;
      if (req.file) datos.foto_path = req.file.filename;

      const modificado = await this.usuariosServicio.modificar(id_usuario, datos);

      if (!modificado) {
        res.status(404).json({
          estado: false,
          mensaje: 'Usuario no encontrado.',
        });
        return;
      }

      res.status(200).json({
        estado: true,
        mensaje: 'Usuario modificado.',
      });
    } catch (err) {
      console.log('Error en PUT /usuarios', err);
      res.status(500).json({
        estado: false,
        mensaje: 'Error interno.',
      });
    }
  };

  eliminar = async (req, res) => {
    try {
      const id_usuario = req.params.id_usuario;

      const eliminado = await this.usuariosServicio.eliminar(id_usuario);

      if (!eliminado) {
        res.status(404).json({
          estado: false,
          mensaje: 'Usuario no encontrado.',
        });
        return;
      }

      res.status(200).json({
        estado: true,
        mensaje: 'Usuario desactivado.',
      });
    } catch (err) {
      console.log('Error en DELETE /usuarios', err);
      res.status(500).json({
        estado: false,
        mensaje: 'Error interno.',
      });
    }
  };
}
