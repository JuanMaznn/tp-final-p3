import Medicos from '../db/medicos.js';
import EspecialidadesServicio from './especialidadesServicio.js';
import ObrasSocialesServicio from './obrasSocialesServicio.js';

export default class MedicosServicio {
  constructor() {
    this.medicos = new Medicos();
    this.especialidades = new EspecialidadesServicio();
    this.obrasSociales = new ObrasSocialesServicio();
  }

  buscarTodos = async () => {
    return this.medicos.buscarTodos();
  };
  buscarId = async (id) => {
    return this.medicos.buscarId(id);
  };

  buscarPorEspecialidad = async (id_especialidad) => {
    const esp = await this.especialidades.buscarPorId(id_especialidad);
    if (esp.length === 0)
      return { error: 'Especialidad no encontrada o inactiva' };
    return this.medicos.buscarPorEspecialidad(id_especialidad);
  };

  actualizar = async (id_medico, datos) => {
    const medico = await this.medicos.buscarId(id_medico);
    if (!medico) return null;
    const especialidad = await this.especialidades.buscarPorId(
      datos.id_especialidad,
    );
    if (especialidad.length === 0)
      return { error: 'La especialidad no existe o está inactiva' };
    return this.medicos.actualizar(id_medico, datos);
  };

  asociarMedicoObrasSociales = async (id_medico, obras_sociales) => {
    const medico = await this.medicos.buscarId(id_medico);
    if (!medico) return null;
    for (const obra_social of obras_sociales) {
      const exists = await this.obrasSociales.buscarPorId(
        obra_social.id_obra_social,
      );
      if (exists.length === 0)
        return {
          error: `La obra social ID ${obra_social.id_obra_social} no existe o está inactiva`,
        };
    }
    return this.medicos.relacionarConObraSocial(id_medico, obras_sociales);
  };

  asociarMedicoEspecialidad = async (id_medico, id_especialidad) => {
    const medico = await this.medicos.buscarId(id_medico);
    if (!medico) return null;
    const especialidad = await this.especialidades.buscarPorId(id_especialidad);
    if (especialidad.length === 0)
      return { error: 'La especialidad no existe o está inactiva' };
    return this.medicos.actualizarEspecialidad(id_medico, id_especialidad);
  };
}
