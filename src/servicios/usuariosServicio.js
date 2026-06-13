import Usuarios from '../db/usuarios.js';

export default class UsuariosServicio {
  constructor() {
    this.usuarios = new Usuarios();
  }

  buscarPorId = (id_usuario) => {
    return this.usuarios.buscarPorId(id_usuario);
  };

  buscar = (email, contrasenia) => {
    return this.usuarios.buscar(email, contrasenia);
  };

  crear = async (datos) => {
    const existe = await this.usuarios.buscarPorEmail(datos.email);
    if (existe) return { error: 'El email ya está registrado' };

    const id_usuario = await this.usuarios.crear(datos);
    if (!id_usuario) return { error: 'No se pudo crear el usuario' };

    if (datos.rol == 1) {
      if (!datos.id_especialidad || !datos.matricula || !datos.valor_consulta) {
        return { error: 'Faltan datos del médico (id_especialidad, matricula, valor_consulta)' };
      }
      await this.usuarios.crearMedico(id_usuario, datos);
    } else if (datos.rol == 2) {
      if (!datos.id_obra_social) return { error: 'Falta id_obra_social para el paciente' };
      await this.usuarios.crearPaciente(id_usuario, datos.id_obra_social);
    }

    return { id_usuario };
  };

  modificar = async (id_usuario, datos) => {
    const existe = await this.usuarios.buscarPorId(id_usuario);
    if (!existe) return null;
    return this.usuarios.modificar(id_usuario, datos);
  };
}
