import Especialidades from '../db/especialidades.js';

export default class EspecialidadesServicio {
  constructor() {
    this.especialidades = new Especialidades();
  }

  buscarTodas = async () => {
    return this.especialidades.buscarTodas();
  };

  buscarPorId = async (id) => {
    return this.especialidades.buscarPorId(id);
  };

  crear = async (nombre) => {
    return this.especialidades.crear(nombre);
  };

  actualizar = async (id, nombre) => {
    return this.especialidades.actualizar(id, nombre);
  };

  eliminar = async (id) => {
    return this.especialidades.eliminar(id);
  };
}
