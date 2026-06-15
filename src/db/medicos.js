import { pool } from './conexion.js';

export default class Medicos {
  buscarTodos = async () => {
    const sql = 'SELECT * FROM v_medicos';
    const [rows] = await pool.execute(sql);
    return rows;
  };

  buscarId = async (id_medico) => {
    const sql = `SELECT m.* FROM medicos m
                 INNER JOIN usuarios u ON u.id_usuario = m.id_usuario
                 WHERE m.id_medico = ? AND u.activo = 1`;
    const [medico] = await pool.execute(sql, [id_medico]);
    return medico[0];
  };

  actualizar = async (id_medico, datos) => {
    const sql =
      'UPDATE medicos SET id_especialidad = ?, matricula = ?, descripcion = ?, valor_consulta = ? WHERE id_medico = ?';

    const [result] = await pool.execute(sql, [
      datos.id_especialidad,
      datos.matricula,
      datos.descripcion,
      datos.valor_consulta,
      id_medico,
    ]);

    console.log('resultado real', result);

    return result.affectedRows > 0;
  };

  relacionarConObraSocial = async (id_medico, obras_sociales) => {
    const conexion = await pool.getConnection();

    try {
      await conexion.beginTransaction();

      for (const os of obras_sociales) {
        const sql = `INSERT INTO medicos_obras_sociales (id_medico, id_obra_social) VALUES (?,?);`;
        await conexion.execute(sql, [id_medico, os.id_obra_social]);
      }

      await conexion.commit();
      await conexion.release();

      return true;
    } catch (error) {
      await conexion.rollback();
      await conexion.release();
      return false;
    }
  };

  actualizarEspecialidad = async (id_medico, id_especialidad) => {
    const sql = 'UPDATE medicos SET id_especialidad = ? WHERE id_medico = ?';
    const [result] = await pool.execute(sql, [id_especialidad, id_medico]);
    return result.affectedRows > 0;
  };

  buscarPorEspecialidad = async (id_especialidad) => {
    const sql = `SELECT m.id_medico, u.apellido, u.nombres, u.email
                 FROM medicos m
                 INNER JOIN usuarios u ON u.id_usuario = m.id_usuario
                 WHERE m.id_especialidad = ?
                   AND EXISTS (SELECT 1 FROM especialidades e WHERE e.id_especialidad = m.id_especialidad AND e.activo = 1)`;
    const [rows] = await pool.execute(sql, [id_especialidad]);
    return rows;
  };
}
