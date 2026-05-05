import EspecialidadesServicio from "../service/especialidadesServicio.js";

const servicio = new EspecialidadesServicio();

export const getEspecialidades = async (req, res) => {
    try {
        const especialidades = await servicio.buscarTodos();
        res.status(200).json({ estado: 'ok', especialidades });
    } catch (error) {
        res.status(500).json({ estado: false, msg: 'Error al obtener especialidades' });
    }
};

export const getEspecialidadById = async (req, res) => {
    try {
        const { id_especialidad } = req.params;
        const especialidad = await servicio.buscarPorId(id_especialidad);
        res.status(200).json({ estado: 'ok', especialidad });
    } catch (error) {
        res.status(500).json({ estado: false, msg: 'Error interno' });
    }
};

// ACÁ ESTÁ EL CAMBIO IMPORTANTE:
export const createEspecialidad = async (req, res) => { 
    try {
        const { nombre } = req.body;
        const result = await servicio.crear(nombre);
        res.status(201).json({ estado: true, msg: `ID Creado ${result.insertId}` });
    } catch (error) {
        res.status(500).json({ estado: false, msg: 'Error al crear' });
    }
};

export const updateEspecialidad = async (req, res) => {
    try {
        const { id_especialidad } = req.params;
        const { nombre } = req.body;
        await servicio.actualizar(id_especialidad, nombre);
        res.status(200).json({ estado: true, msg: 'Especialidad modificada' });
    } catch (error) {
        res.status(500).json({ estado: false, msg: 'Error al modificar' });
    }
};

export const deleteEspecialidad = async (req, res) => {
    try {
        const { id_especialidad } = req.params;
        await servicio.eliminar(id_especialidad);
        res.status(200).json({ estado: true, msg: 'Especialidad eliminada' });
    } catch (error) {
        res.status(500).json({ estado: false, msg: 'Error al eliminar' });
    }
};