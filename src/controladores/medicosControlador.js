import { json } from "express";
import MedicosServicio from "../servicios/medicosServicio.js";

export default class MedicosControlador {

    constructor() {
        this.medicos = new MedicosServicio();
    }

    buscarTodos = async (req, res) => {
        try {
            const medicos = await this.medicos.buscarTodos();

            res.status(200).json({
                estado: true, medicos: medicos
            })
        } catch (error) {
            console.log(`Error en GET /medicos ${error}`);
            res.status(500).json({
                estado: false, msg: 'Error al obtener medicos'
            })

        }
    }

    buscarId = async (req, res) => {
        try {
            const { id_medico } = req.params;
            const medico = await this.medicos.buscarId(id_medico);
            res
                .status(200)
                .json({
                    estado: true,
                    medico: medico
                })
        } catch (error) {
            console.log(`error en get /medicos/:id ${error}`);
            res
            .status(500)
            .json({
                estado: false,
                msg : 'Error al obtener el medico'
            })
        }
    }

    crear = async (req, res) => {
        try {
            const {id_usuario, id_especialidad, matricula, descripcion, valor_consulta} = req.body

            const result = await this.medicos.crear({
                id_usuario,
                id_especialidad,
                matricula,
                descripcion,
                valor_consulta
            })

            res
            .status(201)
            .json( {
                estado: true,
                msg : `Medico creado `
            });
        } catch (error) {
            console.log(`error al crear el medico ${error}`);
            
            res
            .status(500)
            .json({
                estado: false,
                msg : 'Error al crear el medico'
            })
        }
    }


    asociarMedicoObrasSociales = async (req, res) => {
        try {

            const { id_medico } = req.params;
            const { obras_sociales } = req.body;

            const relacion = await this.medicos.asociarMedicoObrasSociales(id_medico, obras_sociales);

            if (!relacion) {
                return res.status(400).json({
                    'estado': false,
                    'mensaje': 'No se crearon las relaciones'
                })
            }

            return res.status(201).json({
                estado: 'ok',
                mensaje: 'Médico y obras sociales relacionadas'
            });

        } catch (error) {
            console.log(`Error en POST /medicos/obras-sociales ${error}`);
            res.status(500).json(
                {
                    'estado': false,
                    'mensaje': 'Error interno.'
                }
            );
        }
    }

    actualizar = async (req, res) => {
        try {
            const { id_medico } = req.params;
            const { id_especialidad, matricula, descripcion, valor_consulta } = req.body;

            const actualizado = await this.medicos.actualizar(id_medico, {
                id_especialidad,
                matricula,
                descripcion,
                valor_consulta
            });

            if (!actualizado) {
                return res.status(404).json({ estado: false, msg: 'Médico no encontrado' });
            }

            res
                .status(200)
                .json({
                    estado: true,
                    msg: 'Medico modificado'
                })
        } catch (error) {
            console.log(`error ${error}`)
            res.
                status(500)
                .json({
                    estado: false,
                    msg: 'Error al modificar el medico'
                })
        }
    }
}