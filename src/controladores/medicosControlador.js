import MedicosServicio from '../servicios/medicosServicio.js';

export default class MedicosControlador {
  constructor() {
    this.medicos = new MedicosServicio();
  }

  buscarTodos = async (req, res) => {
    try {
      const medicos = await this.medicos.buscarTodos();

      res.status(200).json({
        estado: true,
        mensaje: 'Médicos encontrados.',
        medicos: medicos,
      });
    } catch (error) {
      console.log(`Error en GET /medicos ${error}`);
      res.status(500).json({
        estado: false,
        mensaje: 'Error al obtener médicos',
      });
    }
  };

  buscarId = async (req, res) => {
    try {
      const { id_medico } = req.params;
      const medico = await this.medicos.buscarId(id_medico);
      if (!medico) {
        return res
          .status(404)
          .json({ estado: false, msg: 'Médico no encontrado' });
      }
      res.status(200).json({
        estado: true,
        medico: medico,
      });
    } catch (error) {
      console.log(`error en get /medicos/:id ${error}`);
      res.status(500).json({
        estado: false,
        msg: 'Error al obtener el medico',
      });
    }
  };
  crear = async (req, res) => {
    try {
      const {
        id_usuario,
        id_especialidad,
        matricula,
        descripcion,
        valor_consulta,
      } = req.body;

      const result = await this.medicos.crear({
        id_usuario,
        id_especialidad,
        matricula,
        descripcion,
        valor_consulta,
      });

      if (result?.error) {
        return res.status(400).json({ estado: false, msg: result.error });
      }

      res.status(201).json({
        estado: true,
        msg: `Medico creado `,
      });
    } catch (error) {
      console.log(`error al crear el medico ${error}`);

      res.status(500).json({
        estado: false,
        msg: 'Error al crear el medico',
      });
    }
  };

  /*  asociarMedicoObrasSociales = async (req, res) => {
    try {
      const { id_medico, obras_sociales } = req.dto;

      const relacion = await this.medicos.asociarMedicoObrasSociales(
        id_medico,
        obras_sociales,
      );

      if (!relacion) {
        return res.status(400).json({
          estado: false,
          mensaje: 'No se crearon las relaciones',
        });
      }

      return res.status(201).json({
        estado: 'ok',
        mensaje: 'Médico y obras sociales relacionadas',
      });
    } catch (error) {
      console.log(`Error en POST /medicos/obras-sociales ${error}`);
      res.status(500).json({
        estado: false,
        mensaje: 'Error interno.',
      });
    }
  }; */
  asociarMedicoObrasSociales = async (req, res) => {
    try {
      const { id_medico } = req.params;
      const { obras_sociales } = req.body;

      const relacion = await this.medicos.asociarMedicoObrasSociales(
        id_medico,
        obras_sociales,
      );

      if (relacion?.error) {
        return res.status(400).json({ estado: false, mensaje: relacion.error });
      }

      if (relacion === null) {
        return res.status(404).json({
          estado: false,
          mensaje: 'Médico no encontrado',
        });
      }

      if (!relacion) {
        return res.status(400).json({
          estado: false,
          mensaje: 'No se crearon las relaciones',
        });
      }

      return res.status(201).json({
        estado: 'ok',
        mensaje: 'Médico y obras sociales relacionadas',
      });
    } catch (error) {
      console.log(`Error en POST /medicos/obras-sociales ${error}`);
      res.status(500).json({
        estado: false,
        mensaje: 'Error interno.',
      });
    }
  };

  actualizar = async (req, res) => {
    try {
      const { id_medico } = req.params;
      const { id_especialidad, matricula, descripcion, valor_consulta } =
        req.body;

      const actualizado = await this.medicos.actualizar(id_medico, {
        id_especialidad,
        matricula,
        descripcion,
        valor_consulta,
      });

      if (actualizado?.error) {
        return res.status(400).json({ estado: false, msg: actualizado.error });
      }

      if (actualizado === null) {
        return res.status(404).json({
          estado: false,
          msg: 'Médico no encontrado',
        });
      }

      if (!actualizado) {
        return res.status(400).json({
          estado: false,
          msg: 'No se pudo actualizar el médico',
        });
      }

      res.status(200).json({
        estado: true,
        msg: 'Medico modificado',
      });
    } catch (error) {
      console.log(`error ${error}`);
      res.status(500).json({
        estado: false,
        msg: 'Error al modificar el medico',
      });
    }
  };

  asociarEspecialidad = async (req, res) => {
    try {
      const { id_medico } = req.params;
      const { id_especialidad } = req.body;
      const result = await this.medicos.asociarMedicoEspecialidad(
        id_medico,
        id_especialidad,
      );
      if (result?.error)
        return res
          .status(400)
          .json({ estado: false, mensaje: result.error });
      if (result === null)
        return res
          .status(404)
          .json({ estado: false, mensaje: 'Médico no encontrado' });
      res.status(200).json({
        estado: true,
        mensaje: 'Especialidad asociada correctamente',
      });
    } catch (error) {
      console.log(`Error en PUT /medicos/:id_medico/especialidad ${error}`);
      res.status(500).json({ estado: false, mensaje: 'Error interno' });
    }
  };

  buscarPorEspecialidad = async (req, res) => {
    try {
      const { id_especialidad } = req.params;
      const medicos = await this.medicos.buscarPorEspecialidad(id_especialidad);
      if (medicos?.error)
        return res.status(404).json({ estado: false, mensaje: medicos.error });
      res.status(200).json({ estado: true, medicos });
    } catch (error) {
      console.log(`Error en GET /medicos ${error}`);
      res.status(500).json({ estado: false, mensaje: 'Error interno' });
    }
  };
}
