import path from 'path';
import { fileURLToPath } from 'url';
import PDFDocument from 'pdfkit';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logoPath = path.resolve(__dirname, '../assets/grupoH.png');

const colors = {
  primary: '#2E7CC0',
  secondary: '#8BC53F',
  text: '#1F2937',
  muted: '#6B7280',
  panel: '#F3F8FC',
  line: '#D6E4F0',
  white: '#FFFFFF',
};

const formatCurrency = (value) => `$${Number(value || 0).toFixed(2)}`;

const createDocument = () => {
  const doc = new PDFDocument({ margin: 36, size: 'A4' });
  const buffers = [];
  doc.on('data', (chunk) => buffers.push(chunk));
  return { doc, buffers };
};

const finalizeDocument = (doc, buffers) =>
  new Promise((resolve) => {
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.end();
  });

const drawHeader = (doc, subtitle, extraLine) => {
  doc.rect(0, 0, doc.page.width, 110).fill(colors.primary);

  doc.roundedRect(34, 22, 72, 72, 14).fill(colors.white);
  doc.image(logoPath, 40, 28, { fit: [60, 60], align: 'center' });

  doc.fillColor(colors.white).fontSize(24).font('Helvetica-Bold');
  doc.text('Grupo H Clínica Médica', 122, 30, { lineBreak: false });

  doc.fontSize(11).font('Helvetica');
  doc.fillColor('#DCEEFF');
  doc.text(subtitle, 122, 62);

  doc.fontSize(10).fillColor('#EAF4FF');
  doc.text(extraLine, 122, 80);

  doc.fillColor(colors.text);
  doc.y = 132;
};

const drawSectionTitle = (doc, title) => {
  doc.moveDown(0.6);
  doc.fillColor(colors.primary).font('Helvetica-Bold').fontSize(14);
  doc.text(title);
  doc.moveTo(doc.x, doc.y + 4).lineTo(doc.page.width - 36, doc.y + 4).strokeColor(colors.line).lineWidth(1).stroke();
  doc.moveDown(0.8);
};

const drawSummaryCards = (doc, resumen) => {
  const cards = [
    ['Total turnos', resumen.total_turnos],
    ['Atendidos', resumen.atendidos],
    ['Pendientes', resumen.pendientes],
    ['Ingresos', formatCurrency(resumen.ingresos_totales)],
  ];

  const startX = 36;
  const topY = doc.y;
  const gap = 10;
  const cardWidth = 125;
  const cardHeight = 58;

  cards.forEach(([label, value], index) => {
    const x = startX + index * (cardWidth + gap);
    const fillColor = index === 3 ? '#EDF8E3' : colors.panel;
    const labelColor = index === 3 ? '#4B7F1E' : colors.muted;
    const valueColor = index === 3 ? '#4B7F1E' : colors.text;

    doc.roundedRect(x, topY, cardWidth, cardHeight, 10).fill(fillColor);
    doc.fillColor(labelColor).font('Helvetica').fontSize(9);
    doc.text(label, x + 12, topY + 12, { width: cardWidth - 24 });
    doc.fillColor(valueColor).font('Helvetica-Bold').fontSize(15);
    doc.text(String(value), x + 12, topY + 28, { width: cardWidth - 24 });
  });

  doc.y = topY + cardHeight + 16;
};

const ensureSpace = (doc, neededHeight = 80) => {
  if (doc.y + neededHeight <= doc.page.height - 40) return;
  doc.addPage();
  doc.y = 40;
};

const drawListBlock = (doc, title, rows) => {
  ensureSpace(doc, 70);
  drawSectionTitle(doc, title);

  if (rows.length === 0) {
    doc.fillColor(colors.muted).font('Helvetica').fontSize(10);
    doc.text('Sin datos para mostrar.');
    return;
  }

  rows.forEach((row, index) => {
    ensureSpace(doc, 42);
    const boxY = doc.y;
    const bg = index % 2 === 0 ? colors.white : '#F9FBFD';

    doc.roundedRect(36, boxY, doc.page.width - 72, 34, 8).fillAndStroke(bg, colors.line);
    doc.fillColor(colors.text).font('Helvetica-Bold').fontSize(10);
    doc.text(row.title, 48, boxY + 9, { width: 260 });

    doc.fillColor(colors.muted).font('Helvetica').fontSize(9);
    doc.text(row.detail, 320, boxY + 10, {
      width: doc.page.width - 368,
      align: 'right',
    });

    doc.y = boxY + 42;
  });
};

export const generarPDFAdmin = async (estadisticas) => {
  const { doc, buffers } = createDocument();

  drawHeader(
    doc,
    'Reporte de estadísticas generales',
    `Emitido el ${new Date().toLocaleDateString('es-AR')}`,
  );

  drawSectionTitle(doc, 'Resumen');
  drawSummaryCards(doc, estadisticas.resumen);

  drawListBlock(
    doc,
    'Por Médico',
    estadisticas.porMedico.map((m) => ({
      title: `${m.apellido}, ${m.nombres}`,
      detail: `Turnos: ${m.turnos} | ${formatCurrency(m.ingresos)}`,
    })),
  );

  drawListBlock(
    doc,
    'Por Especialidad',
    estadisticas.porEspecialidad.map((e) => ({
      title: e.especialidad,
      detail: `Turnos: ${e.turnos} | ${formatCurrency(e.ingresos)}`,
    })),
  );

  drawListBlock(
    doc,
    'Por Obra Social',
    estadisticas.porObraSocial.map((o) => ({
      title: o.obra_social,
      detail: `Turnos: ${o.turnos} | ${formatCurrency(o.ingresos)}`,
    })),
  );

  return finalizeDocument(doc, buffers);
};

export const generarPDFMedico = async (estadisticas, nombreMedico) => {
  const { doc, buffers } = createDocument();

  drawHeader(
    doc,
    'Reporte de estadísticas del médico',
    `${nombreMedico} | Emitido el ${new Date().toLocaleDateString('es-AR')}`,
  );

  drawSectionTitle(doc, 'Resumen');
  drawSummaryCards(doc, estadisticas.resumen);

  drawListBlock(
    doc,
    'Por Paciente',
    estadisticas.porPaciente.map((p) => ({
      title: `${p.apellido}, ${p.nombres}`,
      detail: `Turnos: ${p.total_turnos} | At: ${p.atendidos} | Pend: ${p.pendientes} | ${formatCurrency(p.ingresos)}`,
    })),
  );

  return finalizeDocument(doc, buffers);
};
