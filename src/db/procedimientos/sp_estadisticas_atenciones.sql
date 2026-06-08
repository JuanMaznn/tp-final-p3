CREATE PROCEDURE sp_estadisticas_atenciones()
BEGIN
    SELECT COUNT(*) AS total_turnos,
           SUM(atentido = 1) AS atendidos,
           SUM(atentido = 0) AS pendientes,
           COALESCE(SUM(valor_total), 0) AS ingresos_totales;

    SELECT u.apellido, u.nombres, COUNT(*) AS turnos,
           COALESCE(SUM(tr.valor_total), 0) AS ingresos
    FROM turnos_reservas tr
    JOIN medicos m ON tr.id_medico = m.id_medico
    JOIN usuarios u ON m.id_usuario = u.id_usuario
    GROUP BY m.id_medico;

    SELECT e.nombre AS especialidad, COUNT(*) AS turnos,
           COALESCE(SUM(tr.valor_total), 0) AS ingresos
    FROM turnos_reservas tr
    JOIN medicos m ON tr.id_medico = m.id_medico
    JOIN especialidades e ON m.id_especialidad = e.id_especialidad
    GROUP BY e.id_especialidad;

    SELECT os.nombre AS obra_social, COUNT(*) AS turnos,
           COALESCE(SUM(tr.valor_total), 0) AS ingresos
    FROM turnos_reservas tr
    JOIN obras_sociales os ON tr.id_obra_social = os.id_obra_social
    GROUP BY os.id_obra_social;
END;