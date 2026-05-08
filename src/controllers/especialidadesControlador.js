import EspecialidadesServicio from '../service/especialidadesServicio.js';

export default class EspecialidadesControlador {
  constructor() {
    this.especialidades = new EspecialidadesServicio();
  }
  buscarTodas = async (req, res) => {
    try {
      const especialidades = await this.especialidades.buscarTodas();
      res.status(200).json({ estado: true, especialidades: especialidades });
    } catch (error) {
      console.log(`Error en GET /especialidad ${error}`);
      res
        .status(500)
        .json({ estado: false, msg: 'Error al obtener especialidades' });
    }
  };

  buscarPorId = async (req, res) => {
    try {
      const { id_especialidad } = req.params;
      const especialidad =
        await this.especialidades.buscarPorId(id_especialidad);
      if (especialidad.length === 0) {
        return res
          .status(404)
          .send({ estado: false, msg: 'Especialidad no encontrada' });
      }
      res.status(200).json({ estado: 'ok', especialidad: especialidad });
    } catch (error) {
      console.log(`Error en GET /especialidad/:id ${error}`);
      res
        .status(500)
        .json({ estado: false, msg: 'Error al obtener la especialidad' });
    }
  };

  crear = async (req, res) => {
    try {
      const { nombre } = req.body;
      const result = await this.especialidades.crear(nombre);
      res
        .status(201)
        .json({ estado: true, msg: `ID Creado ${result.insertId}` });
    } catch (error) {
      res
        .status(500)
        .json({ estado: false, msg: 'Error al crear especialidad' });
    }
  };

  actualizar = async (req, res) => {
    try {
      const { id_especialidad } = req.params;
      const { nombre } = req.body;

      const especialidad =
        await this.especialidades.buscarPorId(id_especialidad);
      if (especialidad.length === 0) {
        return res
          .status(404)
          .json({ estado: false, msg: 'Especialidad no encontrada' });
      }

      const result = await this.especialidades.actualizar(
        id_especialidad,
        nombre,
      );

      if (result.affectedRows > 0) {
        return res
          .status(200)
          .json({ estado: true, msg: 'Especialidad modificada' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ estado: false, msg: 'Error al editar especialidad' });
    }
  };

  eliminar = async (req, res) => {
    try {
      const { id_especialidad } = req.params;
      const especialidad =
        await this.especialidades.buscarPorId(id_especialidad);
      if (especialidad.length === 0) {
        return res
          .status(404)
          .json({ estado: false, msg: 'Especialidad no encontrada' });
      }
      const result = await this.especialidades.eliminar(id_especialidad);
      if (result.affectedRows > 0) {
        res.status(200).send({ estado: true, msg: 'Especialidad eliminada.' });
      }
    } catch (error) {
      res.status(500).json({ estado: false, msg: 'Error al eliminar' });
    }
  };
}
/* 
export const getEspecialidades = async (req, res) => {
  try {
    const especialidades = await servicio.buscarTodos();
    res.status(200).json({ estado: 'ok', especialidades });
  } catch (error) {
    res
      .status(500)
      .json({ estado: false, msg: 'Error al obtener especialidades' });
  }
};

export const getEspecialidadById = async (req, res) => {
  try {
    const { id_especialidad } = req.params;
    const especialidad = await servicio.buscarPorId(id_especialidad);
    res.status(200).json({ estado: 'ok', especialidad });
  } catch (error) {
    res.status(500).json({ estado: false, msg: 'Error interno' });
  }
};

// ACÁ ESTÁ EL CAMBIO IMPORTANTE:
export const createEspecialidad = async (req, res) => {
  try {
    const { nombre } = req.body;
    const result = await servicio.crear(nombre);
    res.status(201).json({ estado: true, msg: `ID Creado ${result.insertId}` });
  } catch (error) {
    res.status(500).json({ estado: false, msg: 'Error al crear' });
  }
};

export const updateEspecialidad = async (req, res) => {
  try {
    const { id_especialidad } = req.params;
    const { nombre } = req.body;
    await servicio.actualizar(id_especialidad, nombre);
    res.status(200).json({ estado: true, msg: 'Especialidad modificada' });
  } catch (error) {
    res.status(500).json({ estado: false, msg: 'Error al modificar' });
  }
};

export const deleteEspecialidad = async (req, res) => {
  try {
    const { id_especialidad } = req.params;
    await servicio.eliminar(id_especialidad);
    res.status(200).json({ estado: true, msg: 'Especialidad eliminada' });
  } catch (error) {
    res.status(500).json({ estado: false, msg: 'Error al eliminar' });
  }
}; */
