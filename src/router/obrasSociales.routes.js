import { Router } from 'express';
import { getObrasSociales, createObraSocial } from '../controllers/obrasSociales.controller.js';
import { validarObraSocial } from '../middlewares/validarCampos.js';

const router = Router();

router.get('/', getObrasSociales);
router.post('/', [validarObraSocial], createObraSocial);

export default router;