import { pool } from './conexion.js';

export default class Especialidades {
  buscarTodas = async () => {
    const sql = 'SELECT * FROM especialidades WHERE activo = 1';
    const [rows] = await pool.query(sql);
    return rows;
  };

  buscarPorId = async (id) => {
    const sql =
      'SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ?';
    const [rows] = await pool.execute(sql, [id]);
    return rows;
  };
  crear = async (nombre) => {
    const sql = 'INSERT INTO especialidades (nombre) VALUES (?)';

    const [result] = await pool.execute(sql, [nombre]);
    return result;
  };

  actualizar = async (id, nombre) => {
    const sql =
      'UPDATE especialidades SET nombre = ? WHERE id_especialidad = ?';
    const [result] = await pool.execute(sql, [nombre, id]);
    return result;
  };

  eliminar = async (id) => {
    const sql =
      'UPDATE especialidades SET activo = 0 WHERE id_especialidad = ?';
    const [rows] = await pool.execute(sql, [id]);
    return rows;
  };
}
