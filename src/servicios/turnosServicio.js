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

  buscarPorId = async (idTurno, usuario) => {
    const turno = await this.turnos.buscarPorId(idTurno);
    if (!turno) return null;

    if (usuario.rol === 3) return turno;

    if (usuario.rol === 1) {
      const medico = await this.medicos.buscarId(turno.id_medico);
      if (medico && medico.id_usuario === usuario.id_usuario) return turno;
      return null;
    }

    const paciente = await this.pacientes.buscarPorId(turno.id_paciente);
    if (paciente && paciente.id_usuario === usuario.id_usuario) return turno;
    return null;
  };

  modificar = async (idTurno, datos) => {
    const turno = await this.turnos.buscarPorId(idTurno);
    if (!turno) return null;

    const medico = await this.medicos.buscarId(datos.id_medico);
    if (!medico) return null;

    const paciente = await this.pacientes.buscarPorId(datos.id_paciente);
    if (!paciente) return null;

    let valor = medico.valor_consulta;
    if (paciente.id_obra_social) {
      const obra_social = await this.obrasSociales.buscarPorId(
        paciente.id_obra_social,
      );
      if (obra_social[0] && obra_social[0].es_particular === 0) {
        valor = valor - obra_social[0].porcentaje_descuento * valor;
      }
    }

    const turnoActualizado = {
      id_medico: datos.id_medico,
      id_paciente: datos.id_paciente,
      fecha_hora: datos.fecha_hora,
      valor_total: valor,
    };

    const ok = await this.turnos.modificar(idTurno, turnoActualizado);
    return ok ? turnoActualizado : null;
  };

  buscarTodos = async (usuario) => {
    if (usuario.rol === 3) {
      return this.turnos.buscarTodos();
    }
    if (usuario.rol === 1) {
      return this.turnos.turnosDeUnMedico(usuario.id_usuario);
    }
    return this.turnos.turnosDeUnPaciente(usuario.id_usuario);
  };

  crear = async (turno) => {
    const medico = await this.medicos.buscarId(turno.id_medico);

    const paciente = await this.pacientes.buscarPorId(turno.id_paciente);

    let valor = medico.valor_consulta;

    if (paciente.id_obra_social) {
      const obra_social = await this.obrasSociales.buscarPorId(
        paciente.id_obra_social,
      );
      if (obra_social[0] && obra_social[0].es_particular === 0) {
        valor = valor - obra_social[0].porcentaje_descuento * valor;
      }
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
