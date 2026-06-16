DELIMITER $$

DROP PROCEDURE IF EXISTS sp_estadisticas_atenciones $$

CREATE PROCEDURE sp_estadisticas_atenciones(IN p_id_usuario INT)
BEGIN
    IF p_id_usuario IS NULL THEN
        SELECT COUNT(*) AS total_turnos,
               SUM(atentido = 1) AS atendidos,
               SUM(atentido = 0) AS pendientes,
               COALESCE(SUM(valor_total), 0) AS ingresos_totales
        FROM turnos_reservas;

        SELECT u.apellido, u.nombres,
               COUNT(*) AS turnos,
               COALESCE(SUM(tr.valor_total), 0) AS ingresos
        FROM turnos_reservas tr
        JOIN medicos m ON tr.id_medico = m.id_medico
        JOIN usuarios u ON m.id_usuario = u.id_usuario
        GROUP BY m.id_medico;

        SELECT e.nombre AS especialidad,
               COUNT(*) AS turnos,
               COALESCE(SUM(tr.valor_total), 0) AS ingresos
        FROM turnos_reservas tr
        JOIN medicos m ON tr.id_medico = m.id_medico
        JOIN especialidades e ON m.id_especialidad = e.id_especialidad
        GROUP BY e.id_especialidad;

        SELECT os.nombre AS obra_social,
               COUNT(*) AS turnos,
               COALESCE(SUM(tr.valor_total), 0) AS ingresos
        FROM turnos_reservas tr
        JOIN obras_sociales os ON tr.id_obra_social = os.id_obra_social
        GROUP BY os.id_obra_social;
    ELSE
        SELECT COUNT(*) AS total_turnos,
               SUM(tr.atentido = 1) AS atendidos,
               SUM(tr.atentido = 0) AS pendientes,
               COALESCE(SUM(tr.valor_total), 0) AS ingresos_totales
        FROM turnos_reservas tr
        JOIN medicos m ON tr.id_medico = m.id_medico
        WHERE m.id_usuario = p_id_usuario;

        SELECT u.apellido, u.nombres,
               COUNT(*) AS total_turnos,
               SUM(tr.atentido = 1) AS atendidos,
               SUM(tr.atentido = 0) AS pendientes,
               COALESCE(SUM(tr.valor_total), 0) AS ingresos
        FROM turnos_reservas tr
        JOIN medicos m ON tr.id_medico = m.id_medico
        JOIN pacientes p ON tr.id_paciente = p.id_paciente
        JOIN usuarios u ON p.id_usuario = u.id_usuario
        WHERE m.id_usuario = p_id_usuario
        GROUP BY p.id_paciente;
    END IF;
END $$

DELIMITER ;