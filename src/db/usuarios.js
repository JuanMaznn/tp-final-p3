import { pool } from './conexion.js';

export default class Usuarios {
  buscarPorId = async (id_usuario) => {
    const sql = `SELECT * FROM usuarios WHERE id_usuario = ? AND activo = 1`;
    const [usuario] = await pool.execute(sql, [id_usuario]);
    return usuario[0];
  };

  buscarTodos = async () => {
    const sql = 'SELECT id_usuario, documento, apellido, nombres, email, rol, foto_path, activo FROM usuarios WHERE activo = 1';
    const [rows] = await pool.execute(sql);
    return rows;
  };

  buscar = async (email, contrasenia) => {
    const sql = `SELECT u.id_usuario, CONCAT(u.nombres, ' ', u.apellido) as usuario, u.rol
                 FROM usuarios AS u
                 WHERE u.email = ?
                   AND u.contrasenia = SHA2(?, 256)
                   AND u.activo = 1;`;
    const [result] = await pool.execute(sql, [email, contrasenia]);
    return result[0];
  };

  buscarPorEmail = async (email) => {
    const sql = 'SELECT id_usuario FROM usuarios WHERE email = ? AND activo = 1';
    const [rows] = await pool.execute(sql, [email]);
    return rows[0] || null;
  };

  buscarPorDocumento = async (documento) => {
    const sql = 'SELECT id_usuario FROM usuarios WHERE documento = ? AND activo = 1';
    const [rows] = await pool.execute(sql, [documento]);
    return rows[0] || null;
  };

  desactivar = async (id_usuario, connection) => {
    const conn = connection || pool;
    const sql = 'UPDATE usuarios SET activo = 0 WHERE id_usuario = ?';
    await conn.execute(sql, [id_usuario]);
  };

  crear = async (datos, connection) => {
    const conn = connection || pool;
    const { documento, apellido, nombres, email, contrasenia, rol, foto_path } =
      datos;
    const sql = `INSERT INTO usuarios (documento, apellido, nombres, email, contrasenia, rol, foto_path, activo)
                 VALUES (?, ?, ?, ?, SHA2(?, 256), ?, ?, 1)`;
    const [result] = await conn.execute(sql, [
      documento,
      apellido,
      nombres,
      email,
      contrasenia,
      rol,
      foto_path || '',
    ]);
    return result.insertId || null;
  };

  crearMedico = async (id_usuario, datos, connection) => {
    const conn = connection || pool;
    const { id_especialidad, matricula, descripcion, valor_consulta } = datos;
    const sql = `INSERT INTO medicos (id_usuario, id_especialidad, matricula, descripcion, valor_consulta)
                 VALUES (?, ?, ?, ?, ?)`;
    await conn.execute(sql, [
      id_usuario,
      id_especialidad,
      matricula,
      descripcion || '',
      valor_consulta,
    ]);
  };

  crearPaciente = async (id_usuario, id_obra_social, connection) => {
    const conn = connection || pool;
    const sql =
      'INSERT INTO pacientes (id_usuario, id_obra_social) VALUES (?, ?)';
    await conn.execute(sql, [id_usuario, id_obra_social]);
  };

  modificar = async (id_usuario, datos) => {
    const sql = `UPDATE usuarios SET ? WHERE id_usuario = ?;`;
    const [result] = await pool.query(sql, [datos, id_usuario]);
    return result.affectedRows > 0;
  };

  crearTokenRecuperacion = async (email, token) => {
    const sql = `UPDATE usuarios 
                 SET reset_token = ?, 
                     reset_token_expires = DATE_ADD(NOW(), INTERVAL 1 HOUR) 
                 WHERE email = ? AND activo = 1`;
    const [result] = await pool.execute(sql, [token, email]);
    return result.affectedRows > 0;
  };

  validarTokenRecuperacion = async (token) => {
    const sql = `SELECT id_usuario, email 
                 FROM usuarios 
                 WHERE reset_token = ? 
                   AND reset_token_expires > NOW() 
                   AND activo = 1`;
    const [rows] = await pool.execute(sql, [token]);
    return rows[0] || null;
  };

  actualizarContraseniaConToken = async (token, nuevaContrasenia) => {
    const sql = `UPDATE usuarios 
                 SET contrasenia = SHA2(?, 256),
                     reset_token = NULL,
                     reset_token_expires = NULL
                 WHERE reset_token = ? 
                   AND reset_token_expires > NOW()
                   AND activo = 1`;
    const [result] = await pool.execute(sql, [nuevaContrasenia, token]);
    return result.affectedRows > 0;
  };
}
