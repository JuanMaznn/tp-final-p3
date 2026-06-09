import ObrasSocialesServicio from '../servicios/obrasSocialesServicio.js';

export default class ObrasSocialesControlador {
  constructor() {
    this.obrasSociales = new ObrasSocialesServicio();
  }
  buscarTodas = async (req, res) => {
    try {
      const obrasSociales = await this.obrasSociales.buscarTodas();
      res.status(200).json({ estado: true, obrasSociales: obrasSociales });
    } catch (error) {
      console.log(`Error en GET /obras-sociales ${error}`);
      res
        .status(500)
        .json({ estado: false, msg: 'Error al obtener Obras Sociales' });
    }
  };

  buscarPorId = async (req, res) => {
    try {
      const { id_obra_social } = req.params;
      const obraSocial = await this.obrasSociales.buscarPorId(id_obra_social);
      
      if (obraSocial.length === 0) {
        return res
          .status(404)
          .json({ estado: false, msg: 'Obra Social no encontrada' });
      }
      res.status(200).json({ estado: true, obraSocial: obraSocial });
    } catch (error) {
      console.log(`Error en GET /obras-sociales/:id ${error}`);
      res
        .status(500)
        .json({ estado: false, msg: 'Error al obtener la Obra Social' });
    }
  };

  crear = async (req, res) => {
    try {
      const { nombre, descripcion, porcentajeDescuento, esParticular } =
        req.body;

      const result = await this.obrasSociales.crear({
        nombre,
        descripcion,
        porcentajeDescuento,
        esParticular,
      });

      res.status(201).json({
        estado: true,
        msg: `Obra Social creada. ID ${result.insertId}`,
      });
    } catch (error) {
      res
        .status(500)
        .json({ estado: false, msg: 'Error al crear Obra Social' });
    }
  };

  actualizar = async (req, res) => {
    try {
      const { id_obra_social } = req.params;
      const { nombre, descripcion, porcentajeDescuento, esParticular } =
        req.body;

      const obraSocial = await this.obrasSociales.buscarPorId(id_obra_social);
      if (obraSocial.length === 0) {
        return res
          .status(404)
          .json({ estado: false, msg: 'Obra Social no encontrada' });
      }

      const result = await this.obrasSociales.actualizar(id_obra_social, {
        nombre,
        descripcion,
        porcentajeDescuento,
        esParticular,
      });

      if (result.affectedRows > 0) {
        return res
          .status(200)
          .json({ estado: true, msg: 'Obra Social modificada' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ estado: false, msg: 'Error al editar Obra Social' });
    }
  };

  eliminar = async (req, res) => {
    try {
      const { id_obra_social } = req.params;
      const obraSocial = await this.obrasSociales.buscarPorId(id_obra_social);
      if (obraSocial.length === 0) {
        return res
          .status(404)
          .json({ estado: false, msg: 'Obra Social no encontrada' });
      }
      const result = await this.obrasSociales.eliminar(id_obra_social);
      if (result.affectedRows > 0) {
        res.status(200).json({ estado: true, msg: 'Obra Social eliminada.' });
      }
    } catch (error) {
      res.status(500).json({ estado: false, msg: 'Error al eliminar' });
    }
  };
}
