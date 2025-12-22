import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, FileDown, Plus, X, ChevronDown, ChevronUp, Trash2, ArrowLeft } from 'lucide-react';
import jsPDF from 'jspdf';
import { User, ProcesoDetalle, Pieza } from '../types';
import { PRECIOS, PROCESOS } from '../data';
import { FIGURAS, calcularArea, getFiguraById, TipoFigura } from '../data/figuras';
import { loadCotizaciones, saveCotizaciones, getNextCotizacionId } from '../utils/storage';
import { createRegistroCotizacion } from '../services/registro';
import { createHistorialCotizacion } from '../services/historial';
import { saveCotizacion } from '../services/cotizaciones';
import { getClientes } from '../services/clientes';

interface CotizadorTabProps {
  currentUser: User;
}

type TipoPrecio = 'INSTALADOR' | 'PUBLICO' | 'CORTE';

interface PiezaTemp extends Pieza {
  expanded?: boolean;
}

export default function CotizadorTab({ currentUser }: CotizadorTabProps) {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState('');
  const [clientes, setClientes] = useState<Array<{ ID_CLIENTE: string; NOMBRE: string }>>([]);
  const [modoCliente, setModoCliente] = useState<'seleccionar' | 'nuevo'>('seleccionar');
  const [observaciones, setObservaciones] = useState('');
  const [productoIdx, setProductoIdx] = useState(0);
  const [tipoPrecio, setTipoPrecio] = useState<TipoPrecio>('INSTALADOR');
  const [aplicarIVA, setAplicarIVA] = useState(true);
  const [piezas, setPiezas] = useState<PiezaTemp[]>([]);

  const [figuraSeleccionada, setFiguraSeleccionada] = useState<TipoFigura>('RECTANGULO');
  const [camposFigura, setCamposFigura] = useState<Record<string, number>>({});
  const [cantidadPieza, setCantidadPieza] = useState('1');
  const [procesoSeleccionado, setProcesoSeleccionado] = useState(0);
  const [cantidadProceso, setCantidadProceso] = useState('1');
  const [piezaParaProceso, setPiezaParaProceso] = useState<string | null>(null);

  const producto = PRECIOS[productoIdx];

  useEffect(() => {
    loadClientes();
  }, []);

  async function loadClientes() {
    const data = await getClientes();
    setClientes(data);
  }

  const getPrecioUnitario = (): number => {
    if (tipoPrecio === 'PUBLICO') return producto.PRECIO_PUBLICO;
    if (tipoPrecio === 'CORTE') return producto.PRECIO_CORTE;
    return producto.PRECIO_INSTALADOR;
  };

  const figuraActual = getFiguraById(figuraSeleccionada);

  const agregarPieza = () => {
    if (!figuraActual) return;
    const areaM2 = calcularArea(figuraSeleccionada, camposFigura);
    if (areaM2 === 0) {
      alert('Por favor completa todos los campos de la figura');
      return;
    }

    const newPieza: PiezaTemp = {
      id: Date.now().toString(),
      figura: figuraActual.nombre,
      campos: { ...camposFigura },
      cantidad: parseFloat(cantidadPieza) || 1,
      procesos: [],
      areaM2,
      expanded: true,
    };

    setPiezas([...piezas, newPieza]);
    setCamposFigura({});
    setCantidadPieza('1');
  };

  const eliminarPieza = (id: string) => {
    setPiezas(piezas.filter(p => p.id !== id));
  };

  const togglePieza = (id: string) => {
    setPiezas(piezas.map(p => p.id === id ? { ...p, expanded: !p.expanded } : p));
  };

  const agregarProcesoAPieza = (piezaId: string) => {
    const proceso = PROCESOS[procesoSeleccionado];
    const cantidad = parseFloat(cantidadProceso) || 1;

    setPiezas(piezas.map(p => {
      if (p.id === piezaId) {
        return {
          ...p,
          procesos: [
            ...p.procesos,
            {
              PROCESO: proceso.PROCESO,
              CANTIDAD: cantidad,
              PRECIO_UNIT: proceso.PRECIO_UNIT,
              IMPORTE: cantidad * proceso.PRECIO_UNIT,
            }
          ]
        };
      }
      return p;
    }));

    setCantidadProceso('1');
  };

  const eliminarProceso = (piezaId: string, procesoIdx: number) => {
    setPiezas(piezas.map(p => {
      if (p.id === piezaId) {
        return {
          ...p,
          procesos: p.procesos.filter((_, idx) => idx !== procesoIdx)
        };
      }
      return p;
    }));
  };

  const precioM2 = getPrecioUnitario();
  const totalAreaM2 = piezas.reduce((sum, p) => sum + p.areaM2 * p.cantidad, 0);
  const subtotalVidrio = totalAreaM2 * precioM2;
  const totalProcesos = piezas.reduce((sum, p) => sum + p.procesos.reduce((s, pr) => s + pr.IMPORTE, 0), 0);
  const subtotal = subtotalVidrio + totalProcesos;
  const iva = aplicarIVA ? subtotal * 0.16 : 0;
  const total = subtotal + iva;

  const handleGuardar = async () => {
    if (!cliente.trim()) {
      alert('Por favor ingresa el nombre del cliente');
      return;
    }

    if (piezas.length === 0) {
      alert('Por favor agrega al menos una pieza a la cotización');
      return;
    }

    const id = getNextCotizacionId();
    const fecha = new Date().toISOString().slice(0, 10);

    const cotizacion = {
      ID_COTIZACION: id,
      FECHA: fecha,
      CLIENTE: cliente.trim(),
      SUBTOTAL: subtotal,
      IVA: iva,
      TOTAL: total,
      USUARIO: currentUser.USUARIO,
      ID_USUARIO: currentUser.ID_USUARIO,
      OBSERVACIONES: observaciones.trim(),
      APLICAR_IVA: aplicarIVA,
      TIPO_PRECIO: tipoPrecio,
      PRECIO_UNITARIO: precioM2,
      PRECIO_INSTALADOR: producto.PRECIO_INSTALADOR,
      PRECIO_PUBLICO: producto.PRECIO_PUBLICO,
      PRECIO_CORTE: producto.PRECIO_CORTE,
      PRODUCTO: producto.PRODUCTO,
      PIEZAS: piezas,
      PROCESOS: [],
    };

    const result = await saveCotizacion(cotizacion);

    if (!result.success) {
      alert(`Error al guardar: ${result.error}`);
      return;
    }

    const lista = loadCotizaciones();
    lista.push(cotizacion);
    saveCotizaciones(lista);

    const piezasTexto = piezas.map(p => `${p.figura} x${p.cantidad}`).join(', ');
    const procesosTexto = piezas.some(p => p.procesos.length > 0)
      ? piezas.flatMap(p => p.procesos.map(pr => `${pr.PROCESO} x${pr.CANTIDAD}`)).join(', ')
      : 'Sin procesos';

    await createRegistroCotizacion({
      Fecha: fecha,
      Cliente: cliente.trim(),
      Producto: producto.PRODUCTO,
      Dimensiones: piezasTexto,
      Cantidad: piezas.length,
      Área_m2: totalAreaM2,
      Procesos: procesosTexto,
      Total: total.toFixed(2),
      Usuario: currentUser.USUARIO,
    });

    await createHistorialCotizacion({
      ID_COTIZACION: id.toString(),
      FECHA: fecha,
      CLIENTE: cliente.trim(),
      SUBTOTAL: subtotal.toFixed(2),
      IVA: iva.toFixed(2),
      TOTAL: total.toFixed(2),
      USUARIO: currentUser.USUARIO,
      OBSERVACIONES: observaciones.trim(),
    });

    alert(`Cotización guardada exitosamente (ID: ${id})`);
    setCliente('');
    setModoCliente('seleccionar');
    setObservaciones('');
    setPiezas([]);
    setProductoIdx(0);
    setTipoPrecio('INSTALADOR');
    setAplicarIVA(true);
    await loadClientes();
  };

  const handleDescargarPDF = () => {
    if (piezas.length === 0) {
      alert('Agrega piezas antes de descargar el PDF');
      return;
    }

    const doc = new jsPDF();
    const clienteNombre = cliente.trim() || 'SIN NOMBRE';
    const fecha = new Date().toISOString().slice(0, 10);
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
    doc.text(fecha, rightMargin, yPos + 16, { align: 'right' });

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
    doc.text(clienteNombre, margin + 20, yPos);

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

    piezas.forEach((pieza) => {
      if (yPos > pageHeight - 70) {
        doc.addPage();
        yPos = 30;
      }

      const piezaArea = pieza.areaM2 * pieza.cantidad;
      const piezaImporte = piezaArea * precioM2;

      const figuraLines = doc.splitTextToSize(pieza.figura, colWidths[0] - 2);
      doc.text(figuraLines, colPositions[0], yPos);
      doc.text(String(pieza.cantidad), colPositions[1], yPos);
      doc.text(piezaArea.toFixed(3), colPositions[2], yPos);
      doc.text(`$${piezaImporte.toFixed(2)}`, colPositions[3], yPos);

      yPos += Math.max(6, figuraLines.length * 4.5);
    });

    yPos += 4;
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, rightMargin, yPos);

    yPos += 10;
    const summaryX = rightMargin - 60;

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Subtotal:', summaryX, yPos);
    doc.text(`$${subtotalVidrio.toFixed(2)}`, rightMargin, yPos, { align: 'right' });

    yPos += 8;
    if (aplicarIVA) {
      doc.text('IVA 16%:', summaryX, yPos);
      doc.text(`$${iva.toFixed(2)}`, rightMargin, yPos, { align: 'right' });
      yPos += 8;
    }

    doc.setFontSize(12);
    doc.text('Total:', summaryX, yPos);
    doc.text(`$${total.toFixed(2)}`, rightMargin, yPos, { align: 'right' });

    if (observaciones.trim()) {
      yPos += 12;

      if (yPos > pageHeight - 40) {
        doc.addPage();
        yPos = 30;
      }

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(8);
      doc.text(`Observaciones: ${observaciones}`, margin, yPos);
    }

    const safeCliente = clienteNombre.replace(/[^a-zA-Z0-9_-]/g, '_');
    doc.save(`cotizacion_${safeCliente}.pdf`);
  };

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/app/admin')}
        className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-slate-100 hover:bg-slate-800/50 rounded-lg transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        Regresar
      </button>

      <div>
        <h2 className="text-2xl font-bold text-slate-100 mb-1">Cotizador Principal</h2>
        <p className="text-sm text-slate-400">
          Agrega múltiples figuras geométricas y genera cotizaciones profesionales
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
              Información General
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Cliente
                </label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setModoCliente('seleccionar')}
                      className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                        modoCliente === 'seleccionar'
                          ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300'
                          : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:bg-slate-700/50'
                      }`}
                    >
                      Seleccionar
                    </button>
                    <button
                      onClick={() => setModoCliente('nuevo')}
                      className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                        modoCliente === 'nuevo'
                          ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300'
                          : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:bg-slate-700/50'
                      }`}
                    >
                      Nuevo
                    </button>
                  </div>

                  {modoCliente === 'seleccionar' ? (
                    <select
                      value={cliente}
                      onChange={(e) => setCliente(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                    >
                      <option value="">Selecciona un cliente</option>
                      {clientes
                        .sort((a, b) => parseInt(a.ID_CLIENTE) - parseInt(b.ID_CLIENTE))
                        .map((c) => (
                          <option key={c.ID_CLIENTE} value={c.NOMBRE}>
                            {c.NOMBRE}
                          </option>
                        ))
                      }
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={cliente}
                      onChange={(e) => setCliente(e.target.value)}
                      placeholder="Nombre del cliente"
                      className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Producto
                </label>
                <select
                  value={productoIdx}
                  onChange={(e) => setProductoIdx(parseInt(e.target.value))}
                  className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                >
                  {PRECIOS.map((p, idx) => (
                    <option key={idx} value={idx}>{p.PRODUCTO}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Tipo de Precio
                  </label>
                  <select
                    value={tipoPrecio}
                    onChange={(e) => setTipoPrecio(e.target.value as TipoPrecio)}
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                  >
                    <option value="INSTALADOR">Instalador</option>
                    <option value="PUBLICO">Público</option>
                    <option value="CORTE">Corte</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Precio m²
                  </label>
                  <input
                    type="text"
                    value={`$${precioM2.toFixed(2)}`}
                    readOnly
                    className="w-full px-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-lg text-cyan-400 font-semibold cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Observaciones
                </label>
                <textarea
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  placeholder="Notas especiales..."
                  rows={3}
                  className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all resize-none"
                />
              </div>

              <button
                onClick={() => setAplicarIVA(!aplicarIVA)}
                className={`w-full px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  aplicarIVA
                    ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300'
                    : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:bg-slate-700/50'
                }`}
              >
                IVA {aplicarIVA ? 'Sí' : 'No'}
              </button>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
              Agregar Pieza
            </h3>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Figura
              </label>
              <select
                value={figuraSeleccionada}
                onChange={(e) => setFiguraSeleccionada(e.target.value as TipoFigura)}
                className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
              >
                {FIGURAS.map(f => (
                  <option key={f.id} value={f.id}>{f.nombre}</option>
                ))}
              </select>
            </div>

            {figuraActual && (
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-3">
                  Dimensiones
                </label>
                <div className="grid gap-3">
                  {figuraActual.campos.map(campo => (
                    <div key={campo.id}>
                      <label className="block text-sm font-medium text-slate-300 mb-1">
                        {campo.label}
                      </label>
                      <input
                        type="number"
                        value={camposFigura[campo.id] || ''}
                        onChange={(e) => setCamposFigura({
                          ...camposFigura,
                          [campo.id]: parseFloat(e.target.value) || 0
                        })}
                        placeholder={campo.placeholder}
                        className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Cantidad de piezas
              </label>
              <input
                type="number"
                value={cantidadPieza}
                onChange={(e) => setCantidadPieza(e.target.value)}
                min="1"
                className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
              />
            </div>

            <button
              onClick={agregarPieza}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500/20 border border-green-500/50 text-green-300 font-medium rounded-lg hover:bg-green-500/30 transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              Agregar Pieza
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                Piezas Agregadas ({piezas.length})
              </h3>

              {piezas.length === 0 ? (
                <p className="text-sm text-slate-500 italic">No hay piezas agregadas</p>
              ) : (
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {piezas.map(pieza => (
                    <div key={pieza.id} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1">
                          <button
                            onClick={() => togglePieza(pieza.id)}
                            className="flex items-center justify-between w-full text-left hover:text-cyan-400 transition-colors"
                          >
                            <div>
                              <p className="text-sm font-semibold text-slate-200">{pieza.figura}</p>
                              <p className="text-xs text-slate-400">x{pieza.cantidad} piezas</p>
                            </div>
                            {pieza.expanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <button
                          onClick={() => eliminarPieza(pieza.id)}
                          className="p-1.5 hover:bg-red-500/20 rounded-lg text-red-400 transition-all"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {pieza.expanded && (
                        <div className="border-t border-slate-700/50 pt-3 mt-3 space-y-3">
                          <div className="text-xs space-y-1">
                            <div className="flex justify-between">
                              <span className="text-slate-400">Área total:</span>
                              <span className="text-slate-200 font-medium">{(pieza.areaM2 * pieza.cantidad).toFixed(3)} m²</span>
                            </div>
                          </div>

                          <div className="border-t border-slate-700/30 pt-3">
                            <div className="text-xs font-semibold text-slate-300 mb-2">Procesos</div>
                            {pieza.procesos.length > 0 ? (
                              <div className="space-y-2 mb-3">
                                {pieza.procesos.map((proc, idx) => (
                                  <div key={idx} className="flex justify-between items-center bg-slate-900/50 rounded p-2 text-xs">
                                    <div>
                                      <p className="text-slate-200">{proc.PROCESO}</p>
                                      <p className="text-slate-400">x{proc.CANTIDAD}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-cyan-400 font-medium">${proc.IMPORTE.toFixed(2)}</span>
                                      <button
                                        onClick={() => eliminarProceso(pieza.id, idx)}
                                        className="p-1 hover:bg-red-500/20 rounded text-red-400 transition-all"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-slate-500 text-xs mb-3 italic">Sin procesos agregados</p>
                            )}

                            {piezaParaProceso === pieza.id ? (
                              <div className="bg-slate-900/50 border border-slate-700/50 rounded p-2 space-y-2">
                                <select
                                  value={procesoSeleccionado}
                                  onChange={(e) => setProcesoSeleccionado(parseInt(e.target.value))}
                                  className="w-full px-2 py-1.5 bg-slate-900/50 border border-slate-700 rounded text-slate-100 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
                                >
                                  {PROCESOS.map((p, idx) => (
                                    <option key={idx} value={idx}>{p.PROCESO}</option>
                                  ))}
                                </select>

                                <input
                                  type="number"
                                  value={cantidadProceso}
                                  onChange={(e) => setCantidadProceso(e.target.value)}
                                  min="1"
                                  className="w-full px-2 py-1.5 bg-slate-900/50 border border-slate-700 rounded text-slate-100 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
                                  placeholder="Cantidad"
                                />

                                <div className="flex gap-2">
                                  <button
                                    onClick={() => agregarProcesoAPieza(pieza.id)}
                                    className="flex-1 px-2 py-1.5 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 text-xs font-medium rounded hover:bg-cyan-500/30 transition-all"
                                  >
                                    Agregar
                                  </button>
                                  <button
                                    onClick={() => setPiezaParaProceso(null)}
                                    className="flex-1 px-2 py-1.5 bg-slate-800/50 border border-slate-700 text-slate-400 text-xs font-medium rounded hover:bg-slate-700/50 transition-all"
                                  >
                                    Cancelar
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button
                                onClick={() => setPiezaParaProceso(pieza.id)}
                                className="w-full px-2 py-1.5 bg-slate-800/50 border border-slate-700 text-slate-400 text-xs font-medium rounded hover:bg-slate-700/50 transition-all"
                              >
                                + Agregar proceso
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-slate-700/50 rounded-xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-slate-300 mb-4">Resumen Totales</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Área total (m²)</span>
                  <span className="text-slate-200 font-medium">{totalAreaM2.toFixed(3)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Subtotal vidrio</span>
                  <span className="text-slate-200 font-medium">${subtotalVidrio.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Procesos</span>
                  <span className="text-slate-200 font-medium">${totalProcesos.toFixed(2)}</span>
                </div>

                <div className="border-t border-slate-700/50 pt-3">
                  <div className="flex justify-between">
                    <span className="text-slate-300 font-medium">Subtotal</span>
                    <span className="text-slate-200 font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                {aplicarIVA && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">IVA 16%</span>
                    <span className="text-slate-200 font-medium">${iva.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t border-slate-700/50 pt-3 bg-slate-900/30 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-200 font-semibold">Total</span>
                    <span className="text-cyan-400 text-xl font-bold">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleGuardar}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-green-500 text-slate-950 font-semibold rounded-lg hover:from-cyan-400 hover:to-green-400 transition-all duration-200 shadow-lg shadow-cyan-500/20"
            >
              <Save className="w-4 h-4" />
              Guardar
            </button>
            <button
              onClick={handleDescargarPDF}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-800/50 border border-slate-600/50 text-slate-300 font-medium rounded-lg hover:bg-slate-700/50 transition-all duration-200"
            >
              <FileDown className="w-4 h-4" />
              PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
