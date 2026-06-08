import { pool } from './conexion.js';

export default class Estadisticas {
  obtener = async () => {
    const [results] = await pool.execute('CALL sp_estadisticas_atenciones()');
    return {
      resumen: results[0][0],
      porMedico: results[1],
      porEspecialidad: results[2],
      porObraSocial: results[3],
    };
  };
  obtenerPorMedico = async (id_usuario) => {
    const [resumen] = await pool.execute(
      `SELECT COUNT(*) AS total_turnos,
              SUM(tr.atentido = 1) AS atendidos,
              SUM(tr.atentido = 0) AS pendientes,
              COALESCE(SUM(tr.valor_total), 0) AS ingresos_totales
       FROM turnos_reservas tr
       JOIN medicos m ON tr.id_medico = m.id_medico
       WHERE m.id_usuario = ?`,
      [id_usuario],
    );
    const [porPaciente] = await pool.execute(
      `SELECT u.apellido, u.nombres,
              COUNT(*) AS total_turnos,
              SUM(tr.atentido = 1) AS atendidos,
              SUM(tr.atentido = 0) AS pendientes,
              COALESCE(SUM(tr.valor_total), 0) AS ingresos
       FROM turnos_reservas tr
       JOIN medicos m ON tr.id_medico = m.id_medico
       JOIN pacientes p ON tr.id_paciente = p.id_paciente
       JOIN usuarios u ON p.id_usuario = u.id_usuario
       WHERE m.id_usuario = ?
       GROUP BY p.id_paciente`,
      [id_usuario],
    );
    return { resumen: resumen[0], porPaciente };
  };
}
