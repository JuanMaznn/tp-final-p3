import Especialidades from '../db/especialidades.js';

export default class EspecialidadesServicio {
  constructor() {
    this.especialidades = new Especialidades();
  }

  buscarTodas = async () => {
    return this.especialidades.buscarTodas();
  };

  buscarPorId = async (id) => {
    const especialidad = await this.especialidades.buscarPorId(id);

    if(!especialidad || especialidad.length === 0){
      const error = new Error('La especialidad no se encontro')
      error.status = 404;
      throw error;
    }
    return especialidad[0];
  };

  crear = async (nombre) => {
    return this.especialidades.crear(nombre);
  };

  actualizar = async (id, nombre) => {
    await this.buscarPorId(id);
    return this.especialidades.actualizar(id, nombre);
  };

  eliminar = async (id) => {
    await this.buscarPorId(id);
    return this.especialidades.eliminar(id);
  };
}
