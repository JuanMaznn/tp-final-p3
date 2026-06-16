import { pool } from './conexion.js';

export default class Estadisticas {
  obtener = async () => {
    const [results] = await pool.execute('CALL sp_estadisticas_atenciones(?)', [
      null,
    ]);

    return {
      resumen: results[0][0],
      porMedico: results[1],
      porEspecialidad: results[2],
      porObraSocial: results[3],
    };
  };

  obtenerPorMedico = async (id_usuario) => {
    const [results] = await pool.execute('CALL sp_estadisticas_atenciones(?)', [
      id_usuario,
    ]);

    return {
      resumen: results[0][0],
      porPaciente: results[1],
    };
  };
}
