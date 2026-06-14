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

| Rol | ID | Descripción |
|-----|----|-------------|
| Médico | 1 | Gestiona turnos propios y los marca como atendidos |
| Paciente | 2 | Reserva turnos y consulta los suyos |
| Administrador | 3 | CRUD completo de especialidades, obras sociales, médicos, estadísticas |

## Endpoints

### Autenticación

**POST /api/v1/auth/login**
```
Body: { "email": "lopmar@correo.com", "contrasenia": "123456" }
Respuesta: { "estado": true, "token": "..." }
```

---

### Especialidades (Admin: rol 3)

| Método | Endpoint | Rol | Descripción |
|--------|----------|-----|-------------|
| GET | /api/v1/especialidades | Todos | Lista especialidades activas |
| GET | /api/v1/especialidades/:id | Todos | Obtiene una especialidad |
| POST | /api/v1/especialidades | 3 | Crea especialidad |
| PUT | /api/v1/especialidades/:id | 3 | Actualiza especialidad |
| DELETE | /api/v1/especialidades/:id | 3 | Eliminación lógica (activo=0) |

---

### Médicos

| Método | Endpoint | Rol | Descripción |
|--------|----------|-----|-------------|
| GET | /api/v1/medicos | 2 | Lista todos los médicos |
| GET | /api/v1/medicos/especialidad/:id | 2 | Médicos por especialidad |
| POST | /api/v1/medicos/:id_medico/obras-sociales | 3 | Asocia obras sociales a un médico |
| PUT | /api/v1/medicos/:id_medico/especialidad | 3 | Cambia la especialidad de un médico |

---

### Obras Sociales (Admin: rol 3)

| Método | Endpoint | Rol | Descripción |
|--------|----------|-----|-------------|
| GET | /api/v1/obras-sociales | Todos | Lista obras sociales activas |
| GET | /api/v1/obras-sociales/:id | Todos | Obtiene una obra social |
| POST | /api/v1/obras-sociales | 3 | Crea obra social |
| PUT | /api/v1/obras-sociales/:id | 3 | Actualiza obra social |
| DELETE | /api/v1/obras-sociales/:id | 3 | Eliminación lógica (activo=0) |

---

### Turnos

| Método | Endpoint | Rol | Descripción |
|--------|----------|-----|-------------|
| GET | /api/v1/turnos | 1, 2 | Lista turnos del usuario autenticado |
| POST | /api/v1/turnos | 2, 3 | Crea una reserva de turno |
| PUT | /api/v1/turnos/:id_turno/atender | 1 | Marca turno como atendido |

**POST /api/v1/turnos**
```json
{
  "id_medico": 1,
  "id_paciente": 1,
  "fecha_hora": "2026-06-15 10:00:00"
}
```

Formato esperado para `fecha_hora`: `YYYY-MM-DD HH:mm:ss`
Ejemplo valido: `2026-06-15 10:00:00`

El `valor_total` se calcula automáticamente según la obra social del paciente:
- Si la obra social es **particular**: `valor_total = medicos.valor_consulta`
- Si la obra social **no es particular**: `valor_total = valor_consulta - (descuento * valor_consulta)`

---

### Pacientes (Admin: rol 3)

| Método | Endpoint | Rol | Descripción |
|--------|----------|-----|-------------|
| PUT | /api/v1/pacientes/:id_paciente/obra-social | 3 | Asocia una obra social a un paciente |

**PUT /api/v1/pacientes/:id_paciente/obra-social**
```json
{
  "id_obra_social": 2
}
```

---

### Estadísticas

| Método | Endpoint | Rol | Descripción |
|--------|----------|-----|-------------|
| GET | /api/v1/estadisticas | 3 | Estadísticas generales (SP) |
| GET | /api/v1/estadisticas/medico | 1 | Estadísticas del médico autenticado |

**Respuesta admin:**
```json
{
  "estado": true,
  "mensaje": "Estadísticas obtenidas.",
  "resumen": { "total_turnos": 13, "atendidos": 1, "pendientes": 12, "ingresos_totales": 0 },
  "porMedico": [
    { "apellido": "Lopez", "nombres": "Marcelo", "total_turnos": 8, "atendidos": 1, "pendientes": 7, "ingresos": 0 }
  ],
  "porEspecialidad": [
    { "especialidad": "CLÍNICA", "total_turnos": 8, "atendidos": 1, "pendientes": 7, "ingresos": 0 }
  ],
  "porObraSocial": [
    { "obra_social": "OSDE", "total_turnos": 5, "atendidos": 0, "pendientes": 5, "ingresos": 0 }
  ]
}
```

**Respuesta médico:**
```json
{
  "estado": true,
  "mensaje": "Estadísticas del médico.",
  "resumen": { "total_turnos": 8, "atendidos": 1, "pendientes": 7, "ingresos_totales": 0 },
  "porPaciente": [
    { "apellido": "Lopez", "nombres": "Jacinto", "total_turnos": 8, "atendidos": 1, "pendientes": 7, "ingresos": 0 }
  ]
}
```

---

## Stored Procedures

Los archivos en `sql/` contienen los procedimientos almacenados. Ejecutarlos en MySQL:

```sh
mysql -u root -p prog3_turnos < sql/sp_estadisticas.sql
```

---

## Colección Bruno

En `ColeccionClinicaMedicaBruno/` se encuentran los archivos de la colección de **Bruno** para testear todos los endpoints.

---

## Integrantes

- Leandro Martinez
- Tamara Soledad Martinez
- Lucas Ruiz
- Matías Gabriel Terrera
- Juan Manuel Zornn

## Licencia

Este proyecto está bajo la Licencia MIT.
