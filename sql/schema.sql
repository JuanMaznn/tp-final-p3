-- =====================================================================
-- Base de datos: prog3_turnos (API de turnos medicos)
-- Script idempotente y re-ejecutable. Crea todo el esquema desde cero.
-- Motor: InnoDB | Charset: utf8mb4 | MySQL 8
-- NOTA: Los stored procedures (sp_estadisticas_atenciones) se cargan
--       aparte; aqui solo se garantiza que existan sus tablas/columnas.
-- =====================================================================

CREATE DATABASE IF NOT EXISTS prog3_turnos
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE prog3_turnos;

-- ---------------------------------------------------------------------
-- Catalogo de roles (referenciado por usuarios.rol)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS roles (
  id_rol  TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre  VARCHAR(50)      NOT NULL,
  PRIMARY KEY (id_rol),
  UNIQUE KEY uq_roles_nombre (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- especialidades (catalogo, soft-delete)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS especialidades (
  id_especialidad  INT          NOT NULL AUTO_INCREMENT,
  nombre           VARCHAR(120) NOT NULL,
  activo           TINYINT(1)   NOT NULL DEFAULT 1,
  PRIMARY KEY (id_especialidad)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- obras_sociales (catalogo, soft-delete)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS obras_sociales (
  id_obra_social        INT           NOT NULL AUTO_INCREMENT,
  nombre                VARCHAR(255)  NOT NULL,
  descripcion           VARCHAR(255)  NULL DEFAULT NULL,
  porcentaje_descuento  DECIMAL(5,2)  NOT NULL DEFAULT 0,
  es_particular         TINYINT(1)    NOT NULL DEFAULT 0,
  activo                TINYINT(1)    NOT NULL DEFAULT 1,
  PRIMARY KEY (id_obra_social)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- usuarios (FK rol -> roles)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS usuarios (
  id_usuario   INT              NOT NULL AUTO_INCREMENT,
  documento    VARCHAR(20)      NOT NULL,
  apellido     VARCHAR(255)     NOT NULL,
  nombres      VARCHAR(255)     NOT NULL,
  email        VARCHAR(255)     NOT NULL,
  contrasenia  CHAR(64)         NOT NULL,
  rol          TINYINT UNSIGNED NOT NULL,
  foto_path    VARCHAR(255)     NOT NULL DEFAULT '',
  activo       TINYINT(1)       NOT NULL DEFAULT 1,
  PRIMARY KEY (id_usuario),
  UNIQUE KEY uq_usuarios_documento (documento),
  UNIQUE KEY uq_usuarios_email (email),
  KEY idx_usuarios_rol (rol),
  CONSTRAINT fk_usuarios_rol
    FOREIGN KEY (rol) REFERENCES roles (id_rol)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- medicos (1:1 con usuarios; FK especialidad)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS medicos (
  id_medico        INT           NOT NULL AUTO_INCREMENT,
  id_usuario       INT           NOT NULL,
  id_especialidad  INT           NOT NULL,
  matricula        INT           NOT NULL,
  descripcion      TEXT          NULL,
  valor_consulta   DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id_medico),
  UNIQUE KEY uq_medicos_id_usuario (id_usuario),
  KEY idx_medicos_especialidad (id_especialidad),
  CONSTRAINT fk_medicos_usuario
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_medicos_especialidad
    FOREIGN KEY (id_especialidad) REFERENCES especialidades (id_especialidad)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- pacientes (1:1 con usuarios; FK obra social)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pacientes (
  id_paciente     INT NOT NULL AUTO_INCREMENT,
  id_usuario      INT NOT NULL,
  id_obra_social  INT NOT NULL,
  PRIMARY KEY (id_paciente),
  UNIQUE KEY uq_pacientes_id_usuario (id_usuario),
  KEY idx_pacientes_obra_social (id_obra_social),
  CONSTRAINT fk_pacientes_usuario
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_pacientes_obra_social
    FOREIGN KEY (id_obra_social) REFERENCES obras_sociales (id_obra_social)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- medicos_obras_sociales (tabla puente N:M, PK compuesta)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS medicos_obras_sociales (
  id_medico       INT NOT NULL,
  id_obra_social  INT NOT NULL,
  PRIMARY KEY (id_medico, id_obra_social),
  KEY idx_mos_obra_social (id_obra_social),
  CONSTRAINT fk_mos_medico
    FOREIGN KEY (id_medico) REFERENCES medicos (id_medico)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_mos_obra_social
    FOREIGN KEY (id_obra_social) REFERENCES obras_sociales (id_obra_social)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- turnos_reservas (tabla central de turnos)
-- NOTA: 'atentido' es el nombre real de la columna (typo en el codigo,
--       se mantiene tal cual lo usan la API y el stored procedure).
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS turnos_reservas (
  id_turno_reserva  INT           NOT NULL AUTO_INCREMENT,
  id_medico         INT           NOT NULL,
  id_paciente       INT           NOT NULL,
  id_obra_social    INT           NOT NULL,
  fecha_hora        DATETIME      NOT NULL,
  valor_total       DECIMAL(10,2) NOT NULL,
  atentido          TINYINT(1)    NOT NULL DEFAULT 0,
  PRIMARY KEY (id_turno_reserva),
  KEY idx_tr_medico (id_medico),
  KEY idx_tr_paciente (id_paciente),
  KEY idx_tr_obra_social (id_obra_social),
  CONSTRAINT fk_tr_medico
    FOREIGN KEY (id_medico) REFERENCES medicos (id_medico)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_tr_paciente
    FOREIGN KEY (id_paciente) REFERENCES pacientes (id_paciente)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_tr_obra_social
    FOREIGN KEY (id_obra_social) REFERENCES obras_sociales (id_obra_social)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- VISTAS requeridas por la API (turnos.js / medicos.js / pacientes.js)
-- ---------------------------------------------------------------------
CREATE OR REPLACE VIEW v_medicos AS
SELECT
  m.id_medico        AS id_medico,
  m.id_usuario       AS id_usuario,
  m.id_especialidad  AS id_especialidad,
  m.matricula        AS matricula,
  m.descripcion      AS descripcion,
  m.valor_consulta   AS valor_consulta,
  u.nombres          AS nombres,
  u.apellido         AS apellido,
  u.email            AS email
FROM medicos AS m
INNER JOIN usuarios AS u ON u.id_usuario = m.id_usuario;

CREATE OR REPLACE VIEW v_pacientes AS
SELECT
  p.id_paciente   AS id_paciente,
  p.id_usuario    AS id_usuario,
  u.nombres       AS nombres,
  u.apellido      AS apellido,
  u.email         AS email,
  os.id_obra_social          AS id_obra_social,
  os.nombre                  AS descripcion_obra_social
FROM pacientes AS p
INNER JOIN usuarios AS u  ON u.id_usuario = p.id_usuario
INNER JOIN obras_sociales AS os ON os.id_obra_social = p.id_obra_social;

-- ---------------------------------------------------------------------
-- auditoria (log inmutable de acciones por usuario - feature extra)
-- Solo INSERT (registro) + SELECT (consulta). Sin soft-delete: nunca se borra.
-- Se auditan las acciones de usuarios YA AUTENTICADOS. id_usuario es NULL-able
-- por robustez: la FK ON DELETE SET NULL conserva el registro si el usuario se borrara.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS auditoria (
  id_auditoria  INT          NOT NULL AUTO_INCREMENT,
  id_usuario    INT          NULL,
  metodo        VARCHAR(10)  NOT NULL,
  ruta          VARCHAR(255) NOT NULL,
  accion        VARCHAR(50)  NOT NULL,
  entidad       VARCHAR(50)  NULL,
  id_entidad    INT          NULL,
  status_code   SMALLINT     NOT NULL,
  fecha_hora    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_auditoria),
  KEY idx_auditoria_usuario (id_usuario),
  KEY idx_auditoria_fecha (fecha_hora),
  CONSTRAINT fk_auditoria_usuario
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
    ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================================
-- DATOS SEMILLA OBLIGATORIOS
-- =====================================================================

-- Roles fijos exigidos por la logica de negocio (usuariosServicio.js / rutas)
INSERT INTO roles (id_rol, nombre) VALUES
  (1, 'medico'),
  (2, 'paciente'),
  (3, 'administrador')
ON DUPLICATE KEY UPDATE nombre = VALUES(nombre);

-- Obra social 'Particular' (es_particular = 1, sin descuento).
-- Necesaria porque pacientes.id_obra_social es FK NOT NULL.
INSERT INTO obras_sociales (id_obra_social, nombre, descripcion, porcentaje_descuento, es_particular, activo)
VALUES (1, 'Particular', 'Atencion particular sin cobertura', 0.00, 1, 1)
ON DUPLICATE KEY UPDATE nombre = VALUES(nombre);

-- Especialidad semilla activa (medicos.id_especialidad es FK NOT NULL).
INSERT INTO especialidades (id_especialidad, nombre, activo)
VALUES (1, 'Clinica Medica', 1)
ON DUPLICATE KEY UPDATE nombre = VALUES(nombre);

-- Usuario administrador inicial (rol = 3) para autenticar y operar el ABM.
-- contrasenia = SHA2('admin123', 256). La API compara con SHA2(?, 256).
INSERT INTO usuarios (id_usuario, documento, apellido, nombres, email, contrasenia, rol, foto_path, activo)
VALUES (1, '00000000', 'Administrador', 'Admin', 'admin@turnos.local', SHA2('admin123', 256), 3, '', 1)
ON DUPLICATE KEY UPDATE email = VALUES(email);
