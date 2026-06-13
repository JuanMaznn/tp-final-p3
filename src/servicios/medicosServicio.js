import Medicos from '../db/medicos.js';
import EspecialidadesServicio from './especialidadesServicio.js';
import ObrasSocialesServicio from './obrasSocialesServicio.js';

export default class MedicosServicio {
  constructor() {
    this.medicos = new Medicos();
    this.especialidades = new EspecialidadesServicio();
    this.obrasSociales = new ObrasSocialesServicio();
  }

  /* buscarTodos = async () => {
    const datos = await this.medicos.buscarTodos();
    return datos.map((row) => new MedicosRespuestaDTO(row));
  }; */

  buscarTodos = async () => {
    return this.medicos.buscarTodos();
  };

  /* buscarPorId = (id_medico) => {
    return this.medicos.buscarPorId(id_medico);
  }; */

  buscarId = async (id) => {
    return this.medicos.buscarId(id);
  };

  buscarPorEspecialidad = async (id_especialidad) => {
    const esp = await this.especialidades.buscarPorId(id_especialidad);
    if (esp.length === 0) return { error: 'Especialidad no encontrada o inactiva' };
    return this.medicos.buscarPorEspecialidad(id_especialidad);
  };

  crear = async (datos) => {
    const esp = await this.especialidades.buscarPorId(datos.id_especialidad);
    if (esp.length === 0) return { error: 'La especialidad no existe o está inactiva' };
    return this.medicos.crear(datos);
  };

  actualizar = async (id_medico, datos) => {
    const medico = await this.medicos.buscarId(id_medico);
    if (!medico) return null;
    const esp = await this.especialidades.buscarPorId(datos.id_especialidad);
    if (esp.length === 0) return { error: 'La especialidad no existe o está inactiva' };
    return this.medicos.actualizar(id_medico, datos);
  };

  asociarMedicoObrasSociales = async (id_medico, obras_sociales) => {
    const medico = await this.medicos.buscarId(id_medico);
    if (!medico) return null;
    for (const os of obras_sociales) {
      const exists = await this.obrasSociales.buscarPorId(os.id_obra_social);
      if (exists.length === 0) return { error: `La obra social ID ${os.id_obra_social} no existe o está inactiva` };
    }
    return this.medicos.relacionarConObraSocial(id_medico, obras_sociales);
  };

  asociarMedicoEspecialidad = async (id_medico, id_especialidad) => {
    const medico = await this.medicos.buscarId(id_medico);
    if (!medico) return null;
    const esp = await this.especialidades.buscarPorId(id_especialidad);
    if (esp.length === 0) return { error: 'La especialidad no existe o está inactiva' };
    return this.medicos.actualizarEspecialidad(id_medico, id_especialidad);
  };
}
