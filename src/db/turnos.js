import { pool } from './conexion.js';

export default class TurnosReservas {
  crear = async (turnoReserva) => {
    const { id_medico, id_paciente, id_obra_social, fecha_hora, valor_total } =
      turnoReserva;
    const sql = `INSERT INTO turnos_reservas (id_medico, id_paciente, id_obra_social, fecha_hora, valor_total, atentido)
             VALUES (?,?,?,?,?, 0)`;
    const [result] = await pool.execute(sql, [
      id_medico,
      id_paciente,
      id_obra_social,
      fecha_hora,
      valor_total,
    ]);
    if (result.affectedRows === 0) {
      return null;
    }
    return result.insertId;
  };

  marcarAtendido = async (idTurno) => {
    const sql =
      'UPDATE turnos_reservas SET atentido = 1 WHERE id_turno_reserva = ?';
    const [result] = await pool.execute(sql, [idTurno]);
    return result.affectedRows > 0;
  };

  turnoPerteneceAMedico = async (idTurno, idMedico) => {
    const sql =
      'SELECT * FROM turnos_reservas WHERE id_turno_reserva = ? AND id_medico = ?';
    const [rows] = await pool.execute(sql, [idTurno, idMedico]);
    return rows[0] || null;
  };
  turnosDeUnMedico = async (id_usuario) => {
    const sql = `SELECT tr.id_turno_reserva, tr.fecha_hora, tr.valor_total, tr.atentido,
                        vp.nombres AS paciente_nombres, vp.apellido AS paciente_apellido,
                        vp.descripcion_obra_social AS obra_social
                    FROM usuarios AS u
                    INNER JOIN medicos AS m ON m.id_usuario = u.id_usuario
                    INNER JOIN turnos_reservas AS tr ON tr.id_medico = m.id_medico
                    INNER JOIN v_pacientes AS vp ON tr.id_paciente = vp.id_paciente
                    WHERE u.id_usuario = ?;`;
    const [turnos] = await pool.execute(sql, [id_usuario]);
    return turnos;
  };

  turnosDeUnPaciente = async (id_usuario) => {
    const sql = `SELECT tr.id_turno_reserva, tr.fecha_hora, tr.valor_total, tr.atentido,
                        vm.nombres AS medico_nombres, vm.apellido AS medico_apellido
                    FROM usuarios AS u
                    INNER JOIN pacientes AS p ON p.id_usuario = u.id_usuario
                    INNER JOIN turnos_reservas AS tr ON tr.id_paciente = p.id_paciente
                    INNER JOIN v_medicos AS vm ON tr.id_medico = vm.id_medico
                    WHERE u.id_usuario = ?;`;
    const [turnos] = await pool.execute(sql, [id_usuario]);
    return turnos;
  };
}
