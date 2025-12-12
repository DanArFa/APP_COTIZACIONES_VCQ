import { jsPDF } from 'jspdf';
import { Cotizacion } from '../types';

export function generateCotizacionPDF(cotizacion: Cotizacion): void {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const rightMargin = pageWidth - margin;
  let yPos = 15;

  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.5);
  doc.rect(margin, yPos, 60, 25);

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(0, 0, 0);
  doc.text('VCQ', margin + 30, yPos + 12, { align: 'center' });

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Vidrios y Cristales de Querétaro', margin + 30, yPos + 18, { align: 'center' });

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Tipo de Comprobante:', rightMargin - 75, yPos + 8);
  doc.text('COTIZACIÓN', rightMargin, yPos + 8, { align: 'right' });

  doc.setFont('Helvetica', 'bold');
  doc.text('Fecha:', rightMargin - 75, yPos + 16);
  doc.setFont('Helvetica', 'normal');
  doc.text(cotizacion.FECHA, rightMargin, yPos + 16, { align: 'right' });

  yPos = 45;
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('VIDRIOS Y CRISTALES DE QUERÉTARO, S.A. DE C.V.', margin, yPos);

  yPos += 5;
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('R.F.C. VCQ000612J7A', margin, yPos);

  yPos += 4;
  doc.text('AVENIDA REAL SAN PABLO No. 47 COL. SAN PABLO C.P. 76130', margin, yPos);

  yPos += 4;
  doc.text('SANTIAGO DE QUERÉTARO, QRO.', margin, yPos);

  yPos += 4;
  doc.text('TEL Y FAX: (442)217 1124, 217 6393, 210 1796, 210 4644, 210 4645', margin, yPos);

  yPos += 4;
  doc.text('LADA SIN COSTO: 800-557-6780', margin, yPos);

  yPos += 4;
  doc.text('REGISTRO PATRONAL I.M.S.S: E23-60876106', margin, yPos);

  yPos += 4;
  doc.text('E-MAIL: vcqro@hotmail.com', margin, yPos);

  yPos += 4;
  doc.text('Régimen Fiscal: 601 General de Ley Personas Morales', margin, yPos);

  yPos += 8;
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, rightMargin, yPos);

  yPos += 8;
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('Cliente:', margin, yPos);
  doc.setFont('Helvetica', 'normal');
  doc.text(cotizacion.CLIENTE, margin + 20, yPos);

  yPos += 10;
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, rightMargin, yPos);

  yPos += 8;
  const colWidths = [90, 30, 30, 35];
  const colPositions = [
    margin,
    margin + colWidths[0],
    margin + colWidths[0] + colWidths[1],
    margin + colWidths[0] + colWidths[1] + colWidths[2]
  ];

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('Descripción', colPositions[0], yPos);
  doc.text('Cantidad', colPositions[1], yPos);
  doc.text('Área (m²)', colPositions[2], yPos);
  doc.text('V.Unit/Importe', colPositions[3], yPos);

  yPos += 3;
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, rightMargin, yPos);

  yPos += 6;
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8);

  if (cotizacion.PIEZAS && cotizacion.PIEZAS.length > 0) {
    cotizacion.PIEZAS.forEach((pieza) => {
      if (yPos > pageHeight - 70) {
        doc.addPage();
        yPos = 30;
      }

      const figuraLines = doc.splitTextToSize(pieza.figura, colWidths[0] - 2);
      doc.text(figuraLines, colPositions[0], yPos);
      doc.text(String(pieza.cantidad), colPositions[1], yPos);
      doc.text((pieza.areaM2 * pieza.cantidad).toFixed(3), colPositions[2], yPos);
      doc.text(`$${(pieza.areaM2 * pieza.cantidad * cotizacion.PRECIO_UNITARIO).toFixed(2)}`, colPositions[3], yPos);

      yPos += Math.max(6, figuraLines.length * 4.5);
    });
  }

  yPos += 4;
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, rightMargin, yPos);

  yPos += 10;
  const summaryX = rightMargin - 60;

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Subtotal:', summaryX, yPos);
  doc.text(`$${cotizacion.SUBTOTAL.toFixed(2)}`, rightMargin, yPos, { align: 'right' });

  yPos += 8;
  if (cotizacion.APLICAR_IVA) {
    doc.text('IVA 16%:', summaryX, yPos);
    doc.text(`$${cotizacion.IVA.toFixed(2)}`, rightMargin, yPos, { align: 'right' });
    yPos += 8;
  }

  doc.setFontSize(12);
  doc.text('Total:', summaryX, yPos);
  doc.text(`$${cotizacion.TOTAL.toFixed(2)}`, rightMargin, yPos, { align: 'right' });

  if (cotizacion.OBSERVACIONES) {
    yPos += 12;

    if (yPos > pageHeight - 40) {
      doc.addPage();
      yPos = 30;
    }

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(`Observaciones: ${cotizacion.OBSERVACIONES}`, margin, yPos);
  }

  doc.save(`cotizacion_${cotizacion.ID_COTIZACION}.pdf`);
}
