import Estadisticas from '../db/estadisticas.js';

export default class EstadisticasServicio {
  constructor() {
    this.estadisticas = new Estadisticas();
  }

  obtener = () => {
    return this.estadisticas.obtener();
  };

  obtenerPorMedico = (id_usuario) => {
    return this.estadisticas.obtenerPorMedico(id_usuario);
  };
}
