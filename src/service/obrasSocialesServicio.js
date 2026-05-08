import { pool } from '../db/conexion.js';

/* export default class ObrasSociales {
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
        const { nombre, descripcion, porcentajeDescuento, esParticular } = datos;
        const [result] = await pool.execute(
            'INSERT INTO obras_sociales (nombre, descripcion, porcentaje_descuento, es_particular) VALUES (?, ?, ?, ?)',
            [nombre, descripcion, porcentaje_descuento, es_particular]
        );
        return result;
    };
} */

import ObrasSociales from '../db/obrasSociales.js';

export default class ObrasSocialesServicio {
  // El profesor usa un método para buscar todo, tal cual la imagen
  constructor() {
    this.obrasSociales = new ObrasSociales();
  }

  buscarTodas = async () => {
    return this.obrasSociales.buscarTodas();
  };

  // Siguiendo la lógica, agregarías los otros métodos
  buscarPorId = async (id) => {
    return this.obrasSociales.buscarPorId(id);
  };

  crear = async (datos) => {
    return this.obrasSociales.crear(datos);
  };

  actualizar = async (id, datos) => {
    return this.obrasSociales.actualizar(id, datos);
  };

  eliminar = async (id) => {
    return this.obrasSociales.eliminar(id);
  };
}
