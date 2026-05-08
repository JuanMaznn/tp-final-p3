export const validarObraSocial = (req, res, next) => {
  const { nombre, porcentaje_descuento } = req.body;

  if (!nombre || nombre.trim() === '') {
    return res.status(400).json({ error: 'El nombre es obligatorio.' });
  }

  if (porcentaje_descuento < 0 || porcentaje_descuento > 100) {
    return res
      .status(400)
      .json({ error: 'El porcentaje debe estar entre 0 y 100.' });
  }

  next();
};
