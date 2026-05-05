import { pool } from "../../db/conexion.js";

export default class Especialidades {
    // El profesor usa un método para buscar todo, tal cual la imagen
    buscarTodos = async () => {
        const sql = 'SELECT * FROM especialidades WHERE activo = 1';
        const [rows] = await pool.query(sql);
        return rows;
    };

    // Siguiendo la lógica, agregarías los otros métodos
    buscarPorId = async (id) => {
        const sql = 'SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ?';
        const [rows] = await pool.execute(sql, [id]);
        return rows;
    };
}