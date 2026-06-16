import Estadisticas from '../db/estadisticas.js';

export default class EstadisticasServicio {
  constructor() {
    this.estadisticas = new Estadisticas();
  }

  obtener = async () => {
    return this.estadisticas.obtener();
  };

  obtenerPorMedico = async (id_usuario) => {
    return this.estadisticas.obtenerPorMedico(id_usuario);
  };
}
