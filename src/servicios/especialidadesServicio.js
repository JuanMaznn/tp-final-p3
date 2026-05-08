import Especialidades from '../db/especialidades.js';

export default class EspecialidadesServicio {
  // El profesor usa un método para buscar todo, tal cual la imagen
  constructor() {
    this.especialidades = new Especialidades();
  }
  buscarTodas = async () => {
    return this.especialidades.buscarTodas();
  };

  // Siguiendo la lógica, agregarías los otros métodos
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
