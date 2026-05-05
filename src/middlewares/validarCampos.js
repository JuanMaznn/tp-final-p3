import { validationResult } from 'express-validator';

// Esta es la que te pedía el error en la terminal
export const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
};

// Esta es tu validación manual para Obra Social
export const validarObraSocial = (req, res, next) => {
    const { nombre, porcentaje_descuento } = req.body;

    if (!nombre || nombre.trim() === "") {
        return res.status(400).json({ error: "El nombre es obligatorio." });
    }

    if (porcentaje_descuento < 0 || porcentaje_descuento > 100) {
        return res.status(400).json({ error: "El porcentaje debe estar entre 0 y 100." });
    }

    next();
};