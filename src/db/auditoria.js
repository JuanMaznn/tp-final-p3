import { pool } from './conexion.js';

export default class Auditoria {
  // Registra una acción en el log. INSERT puro: la auditoría es un log inmutable.
  registrar = async (datos) => {
    const {
      id_usuario = null,
      metodo,
      ruta,
      accion,
      entidad = null,
      id_entidad = null,
      status_code,
    } = datos;
    const sql = `INSERT INTO auditoria
                  (id_usuario, metodo, ruta, accion, entidad, id_entidad, status_code)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await pool.execute(sql, [
      id_usuario,
      metodo,
      ruta,
      accion,
      entidad,
      id_entidad,
      status_code,
    ]);
    if (result.affectedRows === 0) return null;
    return result.insertId;
  };

  // Lista el historial con filtros opcionales y paginación, más datos del actor.
  buscarTodos = async (filtros = {}) => {
    const { id_usuario, entidad, metodo, accion, desde, hasta } = filtros;
    const condiciones = [];
    const params = [];

    if (id_usuario) {
      condiciones.push('a.id_usuario = ?');
      params.push(id_usuario);
    }
    if (entidad) {
      condiciones.push('a.entidad = ?');
      params.push(entidad);
    }
    if (metodo) {
      condiciones.push('a.metodo = ?');
      params.push(metodo);
    }
    if (accion) {
      condiciones.push('a.accion = ?');
      params.push(accion);
    }
    if (desde) {
      condiciones.push('a.fecha_hora >= ?');
      params.push(desde);
    }
    if (hasta) {
      condiciones.push('a.fecha_hora <= ?');
      params.push(hasta);
    }

    const where = condiciones.length ? `WHERE ${condiciones.join(' AND ')}` : '';
    // limit/offset se validan como enteros aguas arriba y se interpolan
    // directamente (algunas versiones de MySQL no aceptan LIMIT/OFFSET como ?).
    const limit = Number.isInteger(filtros.limit) ? filtros.limit : 50;
    const offset = Number.isInteger(filtros.offset) ? filtros.offset : 0;

    const sql = `SELECT a.id_auditoria, a.id_usuario,
                        CONCAT(u.nombres, ' ', u.apellido) AS usuario,
                        u.email AS usuario_email,
                        a.metodo, a.ruta, a.accion, a.entidad, a.id_entidad,
                        a.status_code, a.fecha_hora
                 FROM auditoria AS a
                 LEFT JOIN usuarios AS u ON u.id_usuario = a.id_usuario
                 ${where}
                 ORDER BY a.fecha_hora DESC, a.id_auditoria DESC
                 LIMIT ${limit} OFFSET ${offset}`;
    const [rows] = await pool.query(sql, params);
    return rows;
  };

  buscarPorId = async (id_auditoria) => {
    const sql = `SELECT a.id_auditoria, a.id_usuario,
                        CONCAT(u.nombres, ' ', u.apellido) AS usuario,
                        u.email AS usuario_email,
                        a.metodo, a.ruta, a.accion, a.entidad, a.id_entidad,
                        a.status_code, a.fecha_hora
                 FROM auditoria AS a
                 LEFT JOIN usuarios AS u ON u.id_usuario = a.id_usuario
                 WHERE a.id_auditoria = ?`;
    const [rows] = await pool.execute(sql, [id_auditoria]);
    return rows[0] || null;
  };
}
