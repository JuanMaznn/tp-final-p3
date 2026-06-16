# Trabajo Practico Final Integrador

## Descripción

API REST para gestión de turnos médicos desarrollada en **Node.js + Express 5** con **MySQL**.
Autenticación mediante **JWT** y autorización por **roles** (médico, paciente, administrador).

## Actividades EXTRAS

● Sistema de auditoría: historial de acciones por usuario.
● Registro de usuarios: pacientes, médicos y administradores.
● Reinicio de contraseña para los usuarios.

## Instalación

### Clonar el repositorio

```sh
git clone https://github.com/JuanMaznn/tp-final-p3.git
cd tp-final-p3
```

### Instalar dependencias

```sh
npm install
```

### Configurar variables de entorno

Crear archivo `.env` en la raíz:

```
PUERTO=3000
DB_HOST='127.0.0.1'
DB_DATABASE='prog3_turnos'
DB_USER='prog3user'
DB_PASSWORD='tu_contraseña'
JWT_SECRET="sec"
```

### Base de datos

Ejecutar en **este orden** con un usuario con permisos de creación (root):

#### 1. Crear BD + tablas base + datos semilla

```sh
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS prog3_turnos;"
mysql -u root -p prog3_turnos < sql/schema.sql
```

#### 2. Fix porcentaje descuento

```sh
mysql -u root -p prog3_turnos < sql/fix_porcentaje_descuento.sql
```

⚠️ Convierte porcentajes guardados como enteros (ej: `20`) a decimales (`0.20`).
Ejecutar **antes** de crear obras sociales nuevas.

#### 3. Tabla auditoría (feature extra)

```sh
mysql -u root -p prog3_turnos < sql/tabla-auditoria.sql
```

#### 4. Columnas recuperación de contraseña (feature extra)

```sh
mysql -u root -p prog3_turnos < sql/agregar_columnas_recuperacion.sql
```

#### 5. Stored procedures

```sh
mysql -u root -p prog3_turnos < src/procedimientos/sp_estadisticas_atenciones.sql
```

⚠️ Importante: además de crear el stored procedure, hay que otorgarle permiso
de ejecución al usuario de MySQL que usa la aplicación (`DB_USER` del archivo `.env`).

Ejemplo:

```sql
GRANT EXECUTE ON PROCEDURE prog3_turnos.sp_estadisticas_atenciones TO 'prog3user'@'localhost';
FLUSH PRIVILEGES;
```

### Resumen migraciones (copy-paste)

```sh
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS prog3_turnos;"
mysql -u root -p prog3_turnos < sql/schema.sql
mysql -u root -p prog3_turnos < sql/fix_porcentaje_descuento.sql
mysql -u root -p prog3_turnos < sql/tabla-auditoria.sql
mysql -u root -p prog3_turnos < sql/agregar_columnas_recuperacion.sql
mysql -u root -p prog3_turnos < src/procedimientos/sp_estadisticas_atenciones.sql
```

### Ejecutar el servidor

#### Modo Desarrollo

```sh
npm run dev
```

#### Modo Producción

```sh
npm start
```

## Roles del sistema

| Rol           | ID  | Descripción                                                            |
| ------------- | --- | ---------------------------------------------------------------------- |
| Médico        | 1   | Gestiona turnos propios y los marca como atendidos                     |
| Paciente      | 2   | Reserva turnos y consulta los suyos                                    |
| Administrador | 3   | CRUD completo de especialidades, obras sociales, médicos, estadísticas |

## Integrantes

- Leandro Martinez
- Tamara Soledad Martinez
- Lucas Ruiz
- Matías Gabriel Terrera
- Juan Manuel Zornn
