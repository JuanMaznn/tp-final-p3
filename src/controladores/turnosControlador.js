import Turnos from '../servicios/turnosServicio.js';

export default class TurnosControlador {
  constructor() {
    this.turnos = new Turnos();
  }

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

  crear = async (req, res) => {
    try {
      const { id_medico, id_paciente, fecha_hora } = req.body;
      const turno = { id_medico, id_paciente, fecha_hora };

      const nuevoTurno = await this.turnos.crear(turno, req.user);

      if (nuevoTurno?.error) {
        const status =
          nuevoTurno.error === 'Solo puedes crear turnos para tu propio perfil.'
            ? 403
            : nuevoTurno.error === 'El medico no existe.' ||
                nuevoTurno.error === 'El paciente no existe.'
              ? 400
              : 500;

        return res.status(status).json({
          estado: false,
          mensaje: nuevoTurno.error,
        });
      }

      if (!nuevoTurno) {
        return res.status(400).json({
          estado: false,
          mensaje: 'No se pudo crear el turno.',
        });
      }

      res.status(201).json({
        estado: true,
        mensaje: 'Turno creado correctamente.',
        turno: nuevoTurno,
      });
    } catch (error) {
      console.log(`Error en POST /turnos ${error}`);
      res.status(500).json({
        estado: false,
        mensaje: 'Error interno.',
      });
    }
  };

  buscarId = async (req, res) => {
    try {
      const turno = await this.turnos.buscarPorId(
        req.params.id_turno,
        req.user,
      );
      if (!turno) {
        res
          .status(404)
          .json({ estado: false, mensaje: 'Turno no encontrado o no tienes acceso' });
        return;
      }
      res.status(200).json({ estado: true, turno });
    } catch (error) {
      console.log(`Error en GET /turnos/id ${error}`);
      res.status(500).json({ estado: false, mensaje: 'Error interno' });
    }
  };

  modificar = async (req, res) => {
    try {
      const { id_medico, id_paciente, fecha_hora } = req.body;
      const resultado = await this.turnos.modificar(req.params.id_turno, {
        id_medico,
        id_paciente,
        fecha_hora,
      });

      if (resultado?.error) {
        const status =
          resultado.error === 'El medico no existe.' ||
          resultado.error === 'El paciente no existe.'
            ? 400
            : resultado.error === 'Turno no encontrado.'
              ? 404
              : 500;

        return res.status(status).json({
          estado: false,
          mensaje: resultado.error,
        });
      }

      if (!resultado) {
        return res.status(404).json({
          estado: false,
          mensaje: 'Turno no encontrado o datos invalidos',
        });
      }

      res
        .status(200)
        .json({ estado: true, mensaje: 'Turno modificado.', turno: resultado });
    } catch (error) {
      console.log(`Error en PUT /turnos/id ${error}`);
      res.status(500).json({ estado: false, mensaje: 'Error interno' });
    }
  };

  marcarAtendido = async (req, res) => {
    try {
      const { id_turno } = req.params;
      const result = await this.turnos.marcarAtendido(id_turno, req.user);
      if (!result) {
        return res.status(404).json({
          estado: false,
          mensaje: 'Turno no encontrado o no te pertenece',
        });
      }
      res
        .status(200)
        .json({ estado: true, mensaje: 'Turno marcado como atendido' });
    } catch (error) {
      console.log(`Error en PATCH /turnos/${error}`);
      res.status(500).json({ estado: false, mensaje: 'Error interno' });
    }
  };
}
