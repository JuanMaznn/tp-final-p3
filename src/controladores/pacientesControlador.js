import PacientesServicio from '../servicios/pacientesServicio.js';

export default class PacientesControlador {
  constructor() {
    this.pacientes = new PacientesServicio();
  }

  buscarTodos = async (req, res) => {
    try {
      const pacientes = await this.pacientes.buscarTodos();
      res.status(200).json({
        estado: true,
        mensaje: 'Pacientes encontrados.',
        pacientes,
      });
    } catch (error) {
      console.log(`Error en GET /pacientes ${error}`);
      res.status(500).json({
        estado: false,
        mensaje: 'Error al obtener pacientes',
      });
    }
  };

  buscarPorId = async (req, res) => {
    try {
      const { id_paciente } = req.params;
      const paciente = await this.pacientes.buscarPorId(id_paciente);
      if (!paciente) {
        return res
          .status(404)
          .json({ estado: false, msg: 'Paciente no encontrado' });
      }
      res.status(200).json({
        estado: true,
        paciente,
      });
    } catch (error) {
      console.log(`Error en GET /pacientes/:id ${error}`);
      res.status(500).json({
        estado: false,
        msg: 'Error al obtener el paciente',
      });
    }
  };

  asociarObraSocial = async (req, res) => {
    try {
      const { id_paciente } = req.params;
      const { id_obra_social } = req.body;
      const result = await this.pacientes.asociarObraSocial(
        id_paciente,
        id_obra_social,
      );

      if (result?.error) {
        res.status(400).json({ estado: false, mensaje: result.error });
        return;
      }

      if (result === null) {
        res
          .status(404)
          .json({ estado: false, mensaje: 'Paciente no encontrado.' });
        return;
      }

      res
        .status(200)
        .json({ estado: true, mensaje: 'Obra social asociada correctamente.' });
    } catch (error) {
      console.log(`Error en PUT /pacientes/:id/obra-social ${error}`);
      res.status(500).json({ estado: false, mensaje: 'Error interno.' });
    }
  };
}
