import { pool } from './conexion.js';

export default class ObrasSociales {
  buscarTodas = async () => {
    const sql = 'SELECT * FROM obras_sociales WHERE activo = 1';
    const [rows] = await pool.query(sql);
    return rows;
  };

  buscarPorId = async (id) => {
    const sql =
      'SELECT * FROM obras_sociales WHERE activo = 1 AND id_obra_social = ?';
    const [rows] = await pool.execute(sql, [id]);
    return rows;
  };

  crear = async (datos) => {
    const { nombre, descripcion, porcentajeDescuento, esParticular } = datos;
    const sql = `
    INSERT INTO obras_sociales (nombre, descripcion, porcentaje_descuento, es_particular)
    VALUES (?, ?, ?, ?)
  `;
    const [result] = await pool.execute(sql, [
      nombre,
      descripcion,
      porcentajeDescuento,
      esParticular,
    ]);
    return result;
  };

  actualizar = async (id, datos) => {
    const { nombre, descripcion, porcentajeDescuento, esParticular } = datos;
    const sql = `
    UPDATE obras_sociales
    SET nombre = ?, descripcion = ?, porcentaje_descuento = ?, es_particular = ?
    WHERE id_obra_social = ?
  `;
    const [result] = await pool.execute(sql, [
      nombre,
      descripcion,
      porcentajeDescuento,
      esParticular,
      id,
    ]);
    return result;
  };

  eliminar = async (id) => {
    const sql = 'UPDATE obras_sociales SET activo = 0 WHERE id_obra_social = ?';
    const [rows] = await pool.execute(sql, [id]);
    return rows;
  };
}
