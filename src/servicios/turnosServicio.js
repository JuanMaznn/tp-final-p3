import Turnos from '../db/turnos.js';
import MedicosServicio from '../servicios/medicosServicio.js';
import PacientesServicio from '../servicios/pacientesServicio.js';
import ObrasSocialesServicio from '../servicios/obrasSocialesServicio.js';

export default class TurnosServicio {
  constructor() {
    this.turnos = new Turnos();
    this.medicos = new MedicosServicio();
    this.pacientes = new PacientesServicio();
    this.obrasSociales = new ObrasSocialesServicio();
  }

  // buscarPorId = async (idTurno) => {}

  // modificar = async () => {}

  buscarTodos = async (usuario) => {
    // SI ES MEDICO
    if (usuario.rol === 1) {
      return this.turnos.turnosDeUnMedico(usuario.id_usuario);
    } else {
      // SI ES PACIENTE
      return this.turnos.turnosDeUnPaciente(usuario.id_usuario);
    }
  };

  crear = async (turno) => {
    const medico = await this.medicos.buscarPorId(turno.id_medico);

    const paciente = await this.pacientes.buscarPorId(turno.id_paciente);

    const obra_social = await this.obrasSociales.buscarPorId(
      paciente.id_obra_social,
    );

    let valor = medico.valor_consulta;

    if (obra_social[0].es_particular === 0) {
      valor = valor - obra_social[0].porcentaje_descuento * valor;
    }

    turno.valor_total = valor;
    turno.id_obra_social = paciente.id_obra_social;

    const id_nuevo = await this.turnos.crear(turno);
    return id_nuevo;
  };

  marcarAtendido = async (idTurno, idMedico) => {
    const turno = await this.turnos.turnoPerteneceAMedico(idTurno, idMedico);
    if (!turno) return null;
    return this.turnos.marcarAtendido(idTurno);
  };
}
