import EstadisticasServicio from '../servicios/estadisticasServicio.js';

export default class EstadisticasControlador {
  constructor() {
    this.estadisticas = new EstadisticasServicio();
  }

  obtener = async (req, res) => {
    try {
      const resultado = await this.estadisticas.obtener();

      res.status(200).json({
        estado: true,
        mensaje: 'Estadísticas obtenidas.',
        ...resultado,
      });
    } catch (error) {
      console.log(`Error en GET /estadisticas ${error}`);
      res.status(500).json({ estado: false, mensaje: 'Error interno.' });
    }
  };
  obtenerPorMedico = async (req, res) => {
    try {
      const resultado = await this.estadisticas.obtenerPorMedico(
        req.user.id_usuario,
      );

      res.status(200).json({
        estado: true,
        mensaje: 'Estadísticas del médico.',
        ...resultado,
      });
    } catch (error) {
      console.log(`Error en GET /estadisticas/medico ${error}`);
      res.status(500).json({ estado: false, mensaje: 'Error interno.' });
    }
  };
  descargarPDF = async (req, res) => {
    try {
      const resultado = await this.estadisticas.obtener();
      const { generarPDFAdmin } =
        await import('../reportes/reporteEstadisticas.js');
      const pdf = await generarPDFAdmin(resultado);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=estadisticas.pdf',
      );
      res.send(pdf);
    } catch (error) {
      console.log(`Error en GET /estadisticas/pdf ${error}`);
      res.status(500).json({ estado: false, mensaje: 'Error al generar PDF.' });
    }
  };

  descargarPDFMedico = async (req, res) => {
    try {
      const resultado = await this.estadisticas.obtenerPorMedico(
        req.user.id_usuario,
      );
      const { generarPDFMedico } =
        await import('../reportes/reporteEstadisticas.js');
      const pdf = await generarPDFMedico(resultado, req.user.usuario);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=estadisticas_medico.pdf',
      );
      res.send(pdf);
    } catch (error) {
      console.log(`Error en GET /estadisticas/medico/pdf ${error}`);
      res.status(500).json({ estado: false, mensaje: 'Error al generar PDF.' });
    }
  };
}
