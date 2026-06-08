import PDFDocument from 'pdfkit';

export const generarPDFAdmin = async (estadisticas) => {
  const doc = new PDFDocument({ margin: 30 });
  const buffers = [];
  doc.on('data', (chunk) => buffers.push(chunk));

  doc.fontSize(18).text('Estadísticas de Atenciones', { align: 'center' });
  doc.moveDown();
  doc
    .fontSize(10)
    .text(`Generado: ${new Date().toLocaleDateString()}`, { align: 'right' });
  doc.moveDown();

  doc.fontSize(14).text('Resumen');
  doc.fontSize(10);
  doc.text(`Total turnos: ${estadisticas.resumen.total_turnos}`);
  doc.text(`Atendidos: ${estadisticas.resumen.atendidos}`);
  doc.text(`Pendientes: ${estadisticas.resumen.pendientes}`);
  doc.text(
    `Ingresos totales: $${Number(estadisticas.resumen.ingresos_totales).toFixed(2)}`,
  );
  doc.moveDown();

  doc.fontSize(14).text('Por Médico');
  doc.fontSize(10);
  estadisticas.porMedico.forEach((m) => {
    doc.text(
      `${m.apellido}, ${m.nombres} — Turnos: ${m.total_turnos} (At: ${m.atendidos} / Pend: ${m.pendientes}) — $${Number(m.ingresos).toFixed(2)}`,
    );
  });
  doc.moveDown();

  doc.fontSize(14).text('Por Especialidad');
  doc.fontSize(10);
  estadisticas.porEspecialidad.forEach((e) => {
    doc.text(
      `${e.especialidad} — Turnos: ${e.total_turnos} (At: ${e.atendidos} / Pend: ${e.pendientes}) — $${Number(e.ingresos).toFixed(2)}`,
    );
  });
  doc.moveDown();

  doc.fontSize(14).text('Por Obra Social');
  doc.fontSize(10);
  estadisticas.porObraSocial.forEach((o) => {
    doc.text(
      `${o.obra_social} — Turnos: ${o.total_turnos} (At: ${o.atendidos} / Pend: ${o.pendientes}) — $${Number(o.ingresos).toFixed(2)}`,
    );
  });

  doc.end();
  return new Promise((resolve) => {
    doc.on('end', () => resolve(Buffer.concat(buffers)));
  });
};

export const generarPDFMedico = async (estadisticas, nombreMedico) => {
  const doc = new PDFDocument({ margin: 30 });
  const buffers = [];
  doc.on('data', (chunk) => buffers.push(chunk));

  doc.fontSize(18).text('Mis Estadísticas', { align: 'center' });
  doc.moveDown();
  doc.fontSize(10).text(`Médico: ${nombreMedico}`, { align: 'right' });
  doc.text(`Generado: ${new Date().toLocaleDateString()}`, { align: 'right' });
  doc.moveDown();

  doc.fontSize(14).text('Resumen');
  doc.fontSize(10);
  doc.text(`Total turnos: ${estadisticas.resumen.total_turnos}`);
  doc.text(`Atendidos: ${estadisticas.resumen.atendidos}`);
  doc.text(`Pendientes: ${estadisticas.resumen.pendientes}`);
  doc.text(
    `Ingresos totales: $${Number(estadisticas.resumen.ingresos_totales).toFixed(2)}`,
  );
  doc.moveDown();

  doc.fontSize(14).text('Por Paciente');
  doc.fontSize(10);
  estadisticas.porPaciente.forEach((p) => {
    doc.text(
      `${p.apellido}, ${p.nombres} — Turnos: ${p.total_turnos} (At: ${p.atendidos} / Pend: ${p.pendientes}) — $${Number(p.ingresos).toFixed(2)}`,
    );
  });

  doc.end();
  return new Promise((resolve) => {
    doc.on('end', () => resolve(Buffer.concat(buffers)));
  });
};
