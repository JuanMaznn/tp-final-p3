SET SQL_SAFE_UPDATES = 0;
UPDATE obras_sociales SET porcentaje_descuento = porcentaje_descuento / 100;
SET SQL_SAFE_UPDATES = 1;
