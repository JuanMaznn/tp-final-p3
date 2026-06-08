import { pool } from './conexion.js';

export default class Pacientes {
  buscarPorId = async (id_paciente) => {
    const sql = `SELECT * FROM pacientes WHERE id_paciente = ?`;
    const [paciente] = await pool.execute(sql, [id_paciente]);
    return paciente[0];
  };

  buscarPorIdUsuario = async (id_usuario) => {
    const sql = `SELECT * FROM v_pacientes WHERE id_usuario = ?`;
    const [paciente] = await pool.execute(sql, [id_usuario]);
    return paciente[0];
  };
  actualizarObraSocial = async (id_paciente, id_obra_social) => {
    const sql = 'UPDATE pacientes SET id_obra_social = ? WHERE id_paciente = ?';
    const [result] = await pool.execute(sql, [id_obra_social, id_paciente]);
    return result.affectedRows > 0;
  };
}
