-- Script para agregar columnas de recuperación de contraseña a la tabla usuarios
-- Ejecutar este script en la base de datos si las columnas no existen

ALTER TABLE usuarios 
ADD COLUMN IF NOT EXISTS reset_token VARCHAR(255) NULL,
ADD COLUMN IF NOT EXISTS reset_token_expires DATETIME NULL;

-- Agregar índice para mejorar búsquedas de tokens
CREATE INDEX IF NOT EXISTS idx_reset_token ON usuarios(reset_token);
