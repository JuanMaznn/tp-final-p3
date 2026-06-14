import ObrasSociales from '../db/obrasSociales.js';

export default class ObrasSocialesServicio {
  constructor() {
    this.obras_sociales = new ObrasSociales();
  }

  buscarTodas = async () => {
    return this.obras_sociales.buscarTodas();
  };

  buscarPorId = async (id_obra_social) => {
    return this.obras_sociales.buscarPorId(id_obra_social);
  };

  modificar = async (id_obra_social, obra_social) => {
    const existe = await this.obras_sociales.buscarPorId(id_obra_social);
    if (existe.length === 0) return null;
    await this.obras_sociales.actualizar(id_obra_social, obra_social);
    return this.buscarPorId(id_obra_social);
  };

  crear = async (obra_social) => {
    return this.obras_sociales.crear(obra_social);
  };

  eliminar = async (id_obra_social) => {
    const existe = await this.obras_sociales.buscarPorId(id_obra_social);
    if (existe.length === 0) return null;
    return this.obras_sociales.eliminar(id_obra_social);
  };
}
