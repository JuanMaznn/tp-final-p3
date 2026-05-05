import { pool } from "../../db/conexion.js";

export default class ObrasSociales {
    buscarTodas = async () => {
        const [rows] = await pool.query('SELECT * FROM obras_sociales WHERE activo = 1');
        return rows;
    };

    // --- NUEVO MÉTODO ---
    buscarPorId = async (id) => {
        const sql = 'SELECT * FROM obras_sociales WHERE activo = 1 AND id_obra_social = ?';
        const [rows] = await pool.execute(sql, [id]);
        return rows;
    };

    crear = async (datos) => {
        const { nombre, descripcion, porcentaje_descuento, es_particular } = datos;
        const [result] = await pool.execute(
            'INSERT INTO obras_sociales (nombre, descripcion, porcentaje_descuento, es_particular) VALUES (?, ?, ?, ?)',
            [nombre, descripcion, porcentaje_descuento, es_particular]
        );
        return result;
    };
}