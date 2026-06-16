import { pool } from '../db/conexion.js';
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

  buscarTodos = () => {
    return this.usuarios.buscarTodos();
  };

  crear = async (datos) => {
    const existeEmail = await this.usuarios.buscarPorEmail(datos.email);
    if (existeEmail) return { error: 'El email ya está registrado' };

    const existeDoc = await this.usuarios.buscarPorDocumento(datos.documento);
    if (existeDoc) return { error: 'El documento ya está registrado' };

    datos.rol = Number(datos.rol);

    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const id_usuario = await this.usuarios.crear(datos, connection);
      if (!id_usuario) {
        await connection.rollback();
        return { error: 'No se pudo crear el usuario' };
      }

      if (datos.rol === 1) {
        await this.usuarios.crearMedico(id_usuario, datos, connection);
      } else if (datos.rol === 2) {
        await this.usuarios.crearPaciente(id_usuario, datos.id_obra_social, connection);
      }

      await connection.commit();
      return { id_usuario };
    } catch (err) {
      await connection.rollback();
      return { error: 'Error al crear el perfil. Verifique que los datos sean válidos.' };
    } finally {
      connection.release();
    }
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

  solicitarRecuperacionContrasenia = async (email) => {
    const usuario = await this.usuarios.buscarPorEmail(email);
    if (!usuario) {
      return { error: 'No existe un usuario con ese email' };
    }

    // Generar token aleatorio
    const token = Math.random().toString(36).substring(2, 15) + 
                  Math.random().toString(36).substring(2, 15);

    const tokenCreado = await this.usuarios.crearTokenRecuperacion(email, token);
    if (!tokenCreado) {
      return { error: 'No se pudo generar el token de recuperación' };
    }

    // En un entorno real, aquí se enviaría el email con el token
    // Por ahora, devolvemos el token para testing
    return { 
      mensaje: 'Token de recuperación generado exitosamente',
      token: token,
      nota: 'En producción, este token se enviaría por email'
    };
  };

  validarTokenRecuperacion = async (token) => {
    const tokenValido = await this.usuarios.validarTokenRecuperacion(token);
    if (!tokenValido) {
      return { error: 'Token inválido o expirado' };
    }
    return { 
      mensaje: 'Token válido',
      email: tokenValido.email 
    };
  };

  restablecerContrasenia = async (token, nuevaContrasenia) => {
    const tokenValido = await this.usuarios.validarTokenRecuperacion(token);
    if (!tokenValido) {
      return { error: 'Token inválido o expirado' };
    }

    const actualizada = await this.usuarios.actualizarContraseniaConToken(token, nuevaContrasenia);
    if (!actualizada) {
      return { error: 'No se pudo actualizar la contraseña' };
    }

    return { mensaje: 'Contraseña actualizada exitosamente' };
  };
}
