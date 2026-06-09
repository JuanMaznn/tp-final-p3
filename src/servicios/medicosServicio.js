import Medicos from '../db/medicos.js'

export default class MedicosServicio{
    constructor(){
        this.medicos = new Medicos();
    }

    buscarTodos = async () => {
        return this.medicos.buscarTodos();
    }

    buscarId = async (id) => {
        return this.medicos.buscarId(id);
    }
    
    crear = async (datos) => {
        return this.medicos.crear(datos);
    }

    actualizar = async (id_medico, datos) => {
        return this.medicos.actualizar(id_medico, datos);
    }

    asociarMedicoObrasSociales = async (id_medico, obras_sociales) => {
        return this.medicos.relacionarConObraSocial(id_medico, obras_sociales);
    }
}