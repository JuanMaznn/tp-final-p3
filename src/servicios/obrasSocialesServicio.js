import ObrasSociales from '../db/obrasSociales.js';

export default class ObrasSocialesServicio {
  constructor() {
    this.obrasSociales = new ObrasSociales();
  }

  buscarTodas = async () => {
    return this.obrasSociales.buscarTodas();
  };

  buscarPorId = async (idObraSocial) => {
    return this.obrasSociales.buscarPorId(idObraSocial);
  };

  modificar = async (idObraSocial, obraSocial) => {
    const existe = await this.obrasSociales.buscarPorId(idObraSocial);
    if (existe.length === 0) return null;
    await this.obrasSociales.actualizar(idObraSocial, obraSocial);
    return this.buscarPorId(idObraSocial);
  };

  crear = async (obraSocial) => {
    const result = await this.obrasSociales.crear(obraSocial);
    return this.buscarPorId(result.insertId);
  };

  eliminar = async (idObraSocial) => {
    const existe = await this.obrasSociales.buscarPorId(idObraSocial);
    if (existe.length === 0) return null;
    return this.obrasSociales.eliminar(idObraSocial);
  };
}
