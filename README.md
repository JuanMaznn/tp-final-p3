# Trabajo Practico Final Integrador

## Descripción

API REST para gestión de turnos médicos desarrollada en **Node.js + Express 5** con **MySQL**.
Autenticación mediante **JWT** y autorización por **roles** (médico, paciente, administrador).

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

> **Importante:** Usar `127.0.0.1` en vez de `localhost` para evitar problemas de permisos MySQL con el usuario `'prog3user'@'%'`.

### Base de datos

1. Crear la base de datos y las tablas necesarias.

2. Otorgar permisos al usuario `prog3user`:

```sql
GRANT SELECT, INSERT, UPDATE, EXECUTE ON `prog3_turnos`.* TO 'prog3user'@'%';
FLUSH PRIVILEGES;
```

3. Ejecutar el script de stored procedures:

```sh
mysql -u root -p prog3_turnos < sql/sp_estadisticas.sql
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

## Licencia

Este proyecto está bajo la Licencia MIT.

node scripts/probar-endpoints.mjs
