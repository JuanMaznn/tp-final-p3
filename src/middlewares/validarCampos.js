import { validationResult } from 'express-validator';

// Esta es la que te pedía el error en la terminal
export const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
};
