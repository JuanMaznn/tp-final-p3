import Auditoria from '../db/auditoria.js';

export default class AuditoriaServicio {
  constructor() {
    this.auditoria = new Auditoria();
  }

  registrar = async (datos) => {
    return this.auditoria.registrar(datos);
  };

  buscarTodos = async (filtros) => {
    return this.auditoria.buscarTodos(filtros);
  };

  // Historial de un usuario puntual: reutiliza el filtrado de buscarTodos.
  buscarPorUsuario = async (id_usuario, filtros = {}) => {
    return this.auditoria.buscarTodos({ ...filtros, id_usuario });
  };

  buscarPorId = async (id_auditoria) => {
    return this.auditoria.buscarPorId(id_auditoria);
  };
}
