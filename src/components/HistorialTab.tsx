import { useState, useEffect } from 'react';
import { Download, X, Eye, FileDown, Calendar } from 'lucide-react';
import { User, Cotizacion } from '../types';
import { getCotizaciones } from '../services/cotizaciones';
import { generateCotizacionPDF } from '../utils/pdf';

interface HistorialTabProps {
  currentUser: User;
}

export default function HistorialTab({ currentUser }: HistorialTabProps) {
  const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>([]);
  const [selectedCotizacion, setSelectedCotizacion] = useState<Cotizacion | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filterDateFrom, setFilterDateFrom] = useState<string>('');
  const [filterDateTo, setFilterDateTo] = useState<string>('');
  const [showDateFilter, setShowDateFilter] = useState(false);

  useEffect(() => {
    loadHistorial();
  }, [currentUser.ID_USUARIO]);

  const loadHistorial = async () => {
    setIsLoading(true);
    const data = await getCotizaciones(currentUser.ID_USUARIO);
    setCotizaciones(data);
    setIsLoading(false);
  };

  const isAdmin = currentUser.ROL === 'ADMIN';
  let filteredCotizaciones = cotizaciones
    .filter(c => isAdmin || c.USUARIO === currentUser.USUARIO)
    .sort((a, b) => b.ID_COTIZACION - a.ID_COTIZACION);

  if (filterDateFrom || filterDateTo) {
    filteredCotizaciones = filteredCotizaciones.filter(c => {
      const cotDate = c.FECHA;
      if (filterDateFrom && filterDateTo) {
        return cotDate >= filterDateFrom && cotDate <= filterDateTo;
      } else if (filterDateFrom) {
        return cotDate >= filterDateFrom;
      } else if (filterDateTo) {
        return cotDate <= filterDateTo;
      }
      return true;
    });
  }

  const handleExportCSV = () => {
    if (filteredCotizaciones.length === 0) {
      alert('No hay cotizaciones para exportar');
      return;
    }

    const headers = [
      'ID_COTIZACION',
      'FECHA',
      'CLIENTE',
      'PRODUCTO',
      'SUBTOTAL',
      'IVA',
      'TOTAL',
      'USUARIO',
      'OBSERVACIONES',
    ];

    const rows = filteredCotizaciones.map(c => {
      return [
        c.ID_COTIZACION,
        c.FECHA,
        `"${c.CLIENTE.replace(/"/g, '""')}"`,
        `"${c.PRODUCTO.replace(/"/g, '""')}"`,
        c.SUBTOTAL.toFixed(2),
        c.IVA.toFixed(2),
        c.TOTAL.toFixed(2),
        c.USUARIO,
        `"${c.OBSERVACIONES.replace(/"/g, '""')}"`,
      ].join(',');
    });

    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cotizaciones_vcq.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 mb-1">Historial de Cotizaciones</h2>
          <p className="text-sm text-slate-400">
            {isAdmin ? 'Viendo todas las cotizaciones' : 'Viendo solo tus cotizaciones'} ({filteredCotizaciones.length})
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-slate-800/50 border border-slate-600/50 text-slate-300 rounded-lg hover:bg-slate-700/50 hover:border-slate-500/50 transition-all duration-200"
        >
          <Download className="w-4 h-4" />
          Exportar CSV
        </button>
      </div>

      <div className="mb-6 bg-gradient-to-br from-slate-800/40 to-slate-800/20 rounded-xl p-5 border border-slate-700/40 shadow-lg">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                <Calendar className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-200">Filtrar por fecha</h3>
                <p className="text-xs text-slate-500">Selecciona un rango de fechas</p>
              </div>
            </div>
            <button
              onClick={() => setShowDateFilter(!showDateFilter)}
              className="px-4 py-2 text-sm font-medium bg-cyan-500/15 border border-cyan-500/50 text-cyan-300 rounded-lg hover:bg-cyan-500/25 transition-all"
            >
              {showDateFilter ? 'Ocultar filtro' : 'Mostrar filtro'}
            </button>
          </div>

          {showDateFilter && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-700/30">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">
                  Fecha desde
                </label>
                <input
                  type="date"
                  value={filterDateFrom}
                  onChange={(e) => setFilterDateFrom(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">
                  Fecha hasta
                </label>
                <input
                  type="date"
                  value={filterDateTo}
                  onChange={(e) => setFilterDateTo(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setFilterDateFrom('');
                    setFilterDateTo('');
                  }}
                  className="w-full px-4 py-2 text-sm font-medium bg-slate-800/50 border border-slate-600/50 text-slate-300 rounded-lg hover:bg-slate-700/50 hover:border-slate-500/50 transition-all"
                >
                  Limpiar filtro
                </button>
              </div>
            </div>
          )}

          {(filterDateFrom || filterDateTo) && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-400">Mostrando:</span>
              <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded-full font-medium">
                {filterDateFrom && filterDateTo
                  ? `${filterDateFrom} hasta ${filterDateTo}`
                  : filterDateFrom
                  ? `Desde ${filterDateFrom}`
                  : `Hasta ${filterDateTo}`}
              </span>
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-slate-400">Cargando cotizaciones...</div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="max-h-[600px] overflow-y-auto rounded-xl border border-slate-700/50">
            <table className="w-full text-sm">
              <thead className="bg-slate-800/50 sticky top-0">
                <tr>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">ID</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Fecha</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Cliente</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Producto</th>
                  <th className="text-right px-4 py-3 text-slate-400 font-medium">Total</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Usuario</th>
                  <th className="text-center px-4 py-3 text-slate-400 font-medium">Detalles</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                {filteredCotizaciones.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                      No hay cotizaciones registradas
                    </td>
                  </tr>
                ) : (
                  filteredCotizaciones.map((cot) => (
                    <tr key={cot.ID_COTIZACION} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 py-3 text-slate-200 font-medium">{cot.ID_COTIZACION}</td>
                      <td className="px-4 py-3 text-slate-300">{cot.FECHA}</td>
                      <td className="px-4 py-3 text-slate-300">{cot.CLIENTE}</td>
                      <td className="px-4 py-3 text-slate-300 text-xs">{cot.PRODUCTO}</td>
                      <td className="px-4 py-3 text-right text-green-400 font-semibold">
                        ${cot.TOTAL.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-xs">{cot.USUARIO}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => setSelectedCotizacion(cot)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-all"
                        >
                          <Eye className="w-4 h-4" />
                          Ver
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedCotizacion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700/50 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-slate-900 border-b border-slate-700/50 flex items-center justify-between p-6">
              <h3 className="text-xl font-bold text-slate-100">
                Cotización #{selectedCotizacion.ID_COTIZACION}
              </h3>
              <button
                onClick={() => setSelectedCotizacion(null)}
                className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-400">Cliente</p>
                  <p className="text-lg font-semibold text-slate-100">{selectedCotizacion.CLIENTE}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Fecha</p>
                  <p className="text-lg font-semibold text-slate-100">{selectedCotizacion.FECHA}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Producto</p>
                  <p className="text-lg font-semibold text-slate-100">{selectedCotizacion.PRODUCTO}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Usuario</p>
                  <p className="text-lg font-semibold text-slate-100">{selectedCotizacion.USUARIO}</p>
                </div>
              </div>

              <div className="border-t border-slate-700/50 pt-4">
                <h4 className="text-sm font-semibold text-slate-300 mb-3">Piezas Agregadas</h4>
                <div className="space-y-2">
                  {selectedCotizacion.PIEZAS && selectedCotizacion.PIEZAS.length > 0 ? (
                    selectedCotizacion.PIEZAS.map((pieza, idx) => (
                      <div key={idx} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-sm font-semibold text-slate-200">{pieza.figura}</p>
                            <p className="text-xs text-slate-400">Cantidad: {pieza.cantidad}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-cyan-400 font-semibold">
                              {(pieza.areaM2 * pieza.cantidad).toFixed(3)} m²
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">No hay piezas registradas</p>
                  )}
                </div>
              </div>

              {selectedCotizacion.OBSERVACIONES && (
                <div className="border-t border-slate-700/50 pt-4">
                  <h4 className="text-sm font-semibold text-slate-300 mb-2">Observaciones</h4>
                  <p className="text-sm text-slate-300 bg-slate-800/50 border border-slate-700/50 rounded-lg p-3">
                    {selectedCotizacion.OBSERVACIONES}
                  </p>
                </div>
              )}

              <div className="border-t border-slate-700/50 pt-4 bg-slate-800/50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Tipo de Precio</span>
                  <span className="text-slate-200 font-medium">{selectedCotizacion.TIPO_PRECIO}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Precio m²</span>
                  <span className="text-slate-200 font-medium">${selectedCotizacion.PRECIO_UNITARIO.toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-700/50 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Subtotal</span>
                    <span className="text-slate-200 font-medium">${selectedCotizacion.SUBTOTAL.toFixed(2)}</span>
                  </div>
                </div>
                {selectedCotizacion.APLICAR_IVA && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">IVA 16%</span>
                    <span className="text-slate-200 font-medium">${selectedCotizacion.IVA.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-slate-700/50 pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-200 font-semibold">Total</span>
                    <span className="text-cyan-400 text-xl font-bold">${selectedCotizacion.TOTAL.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => generateCotizacionPDF(selectedCotizacion)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500/20 border border-green-500/50 text-green-300 font-medium rounded-lg hover:bg-green-500/30 transition-all"
                >
                  <FileDown className="w-4 h-4" />
                  Descargar PDF
                </button>
                <button
                  onClick={() => setSelectedCotizacion(null)}
                  className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-600/50 text-slate-300 font-medium rounded-lg hover:bg-slate-700/50 transition-all"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
