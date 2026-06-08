import Turnos from '../servicios/turnosServicio.js';

export default class TurnosControlador {
  constructor() {
    this.turnos = new Turnos();
  }

  crear = async (req, res) => {
    try {
      const turno = req.dto;

      const nuevoTurno = await this.turnos.crear(turno);

      if (!nuevoTurno || nuevoTurno.length === 0) {
        res.status(400).json({
          estado: false,
          mensaje: 'No se pudo crear el turno.',
        });
        return;
      }

      res.status(201).json({
        estado: true,
        mensaje: 'Turno Creado.',
        datos: nuevoTurno,
      });
    } catch (error) {
      console.log(`Error en POST /turnos ${error}`);
      res.status(500).json({
        estado: false,
        mensaje: 'Error interno.',
      });
    }
  };

  buscarTodos = async (req, res) => {
    try {
      const turnos = await this.turnos.buscarTodos(req.user);

      res.status(200).json({
        estado: true,
        mensaje: 'Turnos encontrados.',
        turnos: turnos,
      });
    } catch (error) {
      console.log(`Error en GET /turnos ${error}`);
      res.status(500).json({
        estado: false,
        mensaje: 'Error interno',
      });
    }
  };
  marcarAtendido = async (req, res) => {
    try {
      const { id_turno } = req.params;
      const result = await this.turnos.marcarAtendido(
        id_turno,
        req.user.id_usuario,
      );
      if (!result)
        return res
          .status(404)
          .json({
            estado: false,
            mensaje: 'Turno no encontrado o no te pertenece',
          });
      res
        .status(200)
        .json({ estado: true, mensaje: 'Turno marcado como atendido' });
    } catch (error) {
      console.log(`Error en PATCH /turnos/${error}`);
      res.status(500).json({ estado: false, mensaje: 'Error interno' });
    }
  };
}
