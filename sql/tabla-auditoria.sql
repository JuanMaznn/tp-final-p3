-- =====================================================================
-- Migracion: tabla auditoria (feature extra)
-- Agrega la tabla de auditoria sobre el schema base existente.
-- =====================================================================

CREATE TABLE IF NOT EXISTS auditoria (
  id_auditoria  INT          NOT NULL AUTO_INCREMENT,
  id_usuario    INT UNSIGNED NULL,
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
