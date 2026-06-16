import AuditoriaServicio from '../servicios/auditoriaServicio.js';

// Arma los filtros y la paginación a partir del query string.
const construirFiltros = (query) => {
  const { id_usuario, entidad, metodo, accion, desde, hasta, limit, offset } =
    query;
  return {
    id_usuario: id_usuario ? Number(id_usuario) : undefined,
    entidad,
    metodo: metodo ? metodo.toUpperCase() : undefined,
    accion: accion ? accion.toUpperCase() : undefined,
    desde,
    hasta,
    limit: limit ? Math.min(Number(limit), 200) : 50,
    offset: offset ? Number(offset) : 0,
  };
};

export default class AuditoriaControlador {
  constructor() {
    this.auditoria = new AuditoriaServicio();
  }

  buscarTodos = async (req, res) => {
    try {
      const auditorias = await this.auditoria.buscarTodos(
        construirFiltros(req.query),
      );
      res.status(200).json({
        estado: true,
        mensaje: 'Registros de auditoría encontrados.',
        auditorias,
      });
    } catch (error) {
      console.log(`Error en GET /auditoria ${error}`);
      res.status(500).json({ estado: false, mensaje: 'Error interno.' });
    }
  };

  buscarPorUsuario = async (req, res) => {
    try {
      const { id_usuario } = req.params;
      const auditorias = await this.auditoria.buscarPorUsuario(
        Number(id_usuario),
        construirFiltros(req.query),
      );
      res.status(200).json({
        estado: true,
        mensaje: `Historial de acciones del usuario ${id_usuario}.`,
        auditorias,
      });
    } catch (error) {
      console.log(`Error en GET /auditoria/usuario/:id ${error}`);
      res.status(500).json({ estado: false, mensaje: 'Error interno.' });
    }
  };

  buscarPorId = async (req, res) => {
    try {
      const { id_auditoria } = req.params;
      const auditoria = await this.auditoria.buscarPorId(id_auditoria);
      if (!auditoria) {
        return res.status(404).json({
          estado: false,
          mensaje: 'Registro de auditoría no encontrado.',
        });
      }
      res.status(200).json({
        estado: true,
        mensaje: 'Registro de auditoría encontrado.',
        auditoria,
      });
    } catch (error) {
      console.log(`Error en GET /auditoria/:id ${error}`);
      res.status(500).json({ estado: false, mensaje: 'Error interno.' });
    }
  };
}
