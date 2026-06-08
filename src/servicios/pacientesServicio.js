import Pacientes from '../db/pacientes.js';

export default class PacientesServicio {
  constructor() {
    this.pacientes = new Pacientes();
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
    return this.pacientes.actualizarObraSocial(id_paciente, id_obra_social);
  };
}
