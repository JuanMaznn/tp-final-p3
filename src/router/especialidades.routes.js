import { Router } from 'express';
import { check, param } from 'express-validator';
import { validarCampos } from '../middlewares/validarCampos.js';
import {
  getEspecialidades,
  getEspecialidadById,
  createEspecialidad,
  updateEspecialidad,
  deleteEspecialidad,
} from '../controllers/especialidadesControlador.js';

const router = Router();

// Obtener todas las especialidades
router.get('/', getEspecialidades);

// Obtener una por ID
router.get(
  '/:id_especialidad',
  [
    param('id_especialidad', 'El ID debe ser un número entero').isInt(),
    validarCampos,
  ],
  getEspecialidadById,
);

// Crear una nueva
router.post(
  '/',
  [check('nombre', 'El nombre es obligatorio.').notEmpty(), validarCampos],
  createEspecialidad,
);

// Modificar una existente
router.put(
  '/:id_especialidad',
  [
    param('id_especialidad', 'El ID debe ser un número entero').isInt(),
    check(
      'nombre',
      'El nombre es obligatorio y no debe superar los 120 caracteres',
    )
      .notEmpty()
      .isLength({ max: 120 }),
    validarCampos,
  ],
  updateEspecialidad,
);

// Borrado lógico
router.delete(
  '/:id_especialidad',
  [
    param('id_especialidad', 'El ID debe ser un número entero').isInt(),
    validarCampos,
  ],
  deleteEspecialidad,
);

export default router;
