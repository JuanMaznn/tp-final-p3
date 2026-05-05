import { pool } from '../../db/conexion.js';

export const getObrasSociales = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM obras_sociales');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener obras sociales" });
    }
};

export const createObraSocial = async (req, res) => {
    const { nombre, descripcion, porcentaje_descuento, es_particular } = req.body;
    try {
        await pool.query(
            'INSERT INTO obras_sociales (nombre, descripcion, porcentaje_descuento, es_particular) VALUES (?, ?, ?, ?)',
            [nombre, descripcion, porcentaje_descuento, es_particular]
        );
        res.status(201).json({ msg: "Obra social creada con éxito" });
    } catch (error) {
        res.status(500).json({ msg: "Error al crear" });
    }
};