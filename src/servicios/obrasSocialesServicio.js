import { pool } from '../db/conexion.js';
import ObrasSociales from '../db/obrasSociales.js';

export default class ObrasSocialesServicio {
  constructor() {
    this.obrasSociales = new ObrasSociales();
  }

  buscarTodas = async () => {
    return this.obrasSociales.buscarTodas();
  };

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
