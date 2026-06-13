import Pacientes from '../db/pacientes.js';
import ObrasSocialesServicio from './obrasSocialesServicio.js';

export default class PacientesServicio {
  constructor() {
    this.pacientes = new Pacientes();
    this.obrasSociales = new ObrasSocialesServicio();
  }

  buscarPorId = (id_paciente) => {
    return this.pacientes.buscarPorId(id_paciente);
  };

  buscarPorIdUsuario = (id_usuario) => {
    return this.pacientes.buscarPorIdUsuario(id_usuario);
  };
  asociarObraSocial = async (id_paciente, id_obra_social) => {
    const paciente = await this.pacientes.buscarPorId(id_paciente);
    if (!paciente) return null;
    const os = await this.obrasSociales.buscarPorId(id_obra_social);
    if (os.length === 0) return { error: 'La obra social no existe o está inactiva' };
    return this.pacientes.actualizarObraSocial(id_paciente, id_obra_social);
  };
}
