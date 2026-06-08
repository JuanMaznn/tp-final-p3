import Medicos from '../db/medicos.js';
import MedicosRespuestaDTO from '../dtos/medicosRespuestaDTO.js';

export default class MedicosServicio {
  constructor() {
    this.medicos = new Medicos();
  }

  buscarPorId = (id_medico) => {
    return this.medicos.buscarPorId(id_medico);
  };

  buscarTodos = async () => {
    const datos = await this.medicos.buscarTodos();
    return datos.map((row) => new MedicosRespuestaDTO(row));
  };

  asociarMedicoObrasSociales = async (id_medico, obras_sociales) => {
    return this.medicos.relacionarConObraSocial(id_medico, obras_sociales);
  };

  asociarMedicoEspecialidad = async (id_medico, id_especialidad) => {
    const medico = await this.medicos.buscarPorId(id_medico);
    if (!medico) return null;
    return this.medicos.actualizarEspecialidad(id_medico, id_especialidad);
  };
  buscarPorEspecialidad = async (id_especialidad) => {
    return this.medicos.buscarPorEspecialidad(id_especialidad);
  };
}
