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
    const existeEmail = await this.usuarios.buscarPorEmail(datos.email);
    if (existeEmail) return { error: 'El email ya está registrado' };

    const existeDoc = await this.usuarios.buscarPorDocumento(datos.documento);
    if (existeDoc) return { error: 'El documento ya está registrado' };

    datos.rol = Number(datos.rol);

    const id_usuario = await this.usuarios.crear(datos);
    if (!id_usuario) return { error: 'No se pudo crear el usuario' };

    try {
      if (datos.rol === 1) {
        await this.usuarios.crearMedico(id_usuario, datos);
      } else if (datos.rol === 2) {
        await this.usuarios.crearPaciente(id_usuario, datos.id_obra_social);
      }
    } catch (err) {
      await this.usuarios.desactivar(id_usuario);
      return { error: 'Error al crear el perfil. Verifique que los datos sean válidos.' };
    }

    return { id_usuario };
  };

  modificar = async (id_usuario, datos) => {
    const existe = await this.usuarios.buscarPorId(id_usuario);
    if (!existe) return null;
    return this.usuarios.modificar(id_usuario, datos);
  };

  eliminar = async (id_usuario) => {
    const existe = await this.usuarios.buscarPorId(id_usuario);
    if (!existe) return null;
    await this.usuarios.desactivar(id_usuario);
    return true;
  };
}
