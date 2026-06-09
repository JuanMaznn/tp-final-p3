import {pool} from './conexion.js';

export default class Medicos{
    buscarTodos = async () => {
        const sql = "SELECT * FROM v_medicos";
        const [rows] = await pool.execute(sql);
        return rows;
    }

    buscarId = async (id) => {
        const sql = "SELECT * FROM medicos WHERE id_medico = ?";
        const [rows] = await pool.execute(sql, [id])
        return rows;
    }

    crear = async (datos) => {
        const {id_usuario, id_especialidad, matricula, descripcion, valor_consulta} = datos
        const sql = 'INSERT INTO medicos (id_usuario, id_especialidad, matricula, descripcion, valor_consulta) VALUES (?,?,?,?,?)'
        const [result] = await pool.execute(sql, [
            id_usuario,
            id_especialidad,
            matricula,
            descripcion,
            valor_consulta
        ]);
        return result;
    }


    actualizar = async (id_medico, datos) => {
        const sql = "UPDATE medicos SET id_especialidad = ?, matricula = ?, descripcion = ?, valor_consulta = ? WHERE id_medico = ?";

        const [result] = await pool.execute(sql, [
            datos.id_especialidad,
            datos.matricula,
            datos.descripcion,
            datos.valor_consulta,
            id_medico
        ]);

        console.log("resultado real", result);
        
        return result.affectedRows > 0;;
    }

    relacionarConObraSocial = async (id_medico, obras_sociales) => {
        const conexion = await pool.getConnection();

        try {
            await conexion.beginTransaction();
            for(const os of obras_sociales){
                const sql = `INSERT INTO medicos_obras_sociales (id_medico, id_obra_social) VALUES (?,?);`
                await conexion.execute(sql, [id_medico, os.id_obra_social]);
            }

            await conexion.commit();
            await conexion.release();

            return true;
        } catch (error) {
            await conexion.rollback();
            await conexion.release();
            return false
        }
    }
}