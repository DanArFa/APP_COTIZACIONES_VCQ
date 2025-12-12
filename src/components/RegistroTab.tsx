import { useState, useEffect } from 'react';
import { Download, Calendar } from 'lucide-react';
import { getRegistroCotizaciones, RegistroCotizacion } from '../services/registro';

export default function RegistroTab() {
  const [registros, setRegistros] = useState<RegistroCotizacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterDateFrom, setFilterDateFrom] = useState<string>('');
  const [filterDateTo, setFilterDateTo] = useState<string>('');
  const [showDateFilter, setShowDateFilter] = useState(false);

  useEffect(() => {
    loadRegistros();
  }, []);

  async function loadRegistros() {
    setLoading(true);
    const data = await getRegistroCotizaciones();
    setRegistros(data);
    setLoading(false);
  }

  let sortedRegistros = [...registros].sort((a, b) => b.ID_COT - a.ID_COT);

  if (filterDateFrom || filterDateTo) {
    sortedRegistros = sortedRegistros.filter(r => {
      const regDate = r.Fecha;
      if (filterDateFrom && filterDateTo) {
        return regDate >= filterDateFrom && regDate <= filterDateTo;
      } else if (filterDateFrom) {
        return regDate >= filterDateFrom;
      } else if (filterDateTo) {
        return regDate <= filterDateTo;
      }
      return true;
    });
  }

  const handleExportCSV = () => {
    if (sortedRegistros.length === 0) {
      alert('No hay registros para exportar');
      return;
    }

    const headers = [
      'ID_COT',
      'FECHA',
      'CLIENTE',
      'PRODUCTO',
      'DIMENSIONES',
      'CANTIDAD',
      'AREA_M2',
      'PROCESOS',
      'TOTAL',
      'USUARIO',
    ];

    const rows = sortedRegistros.map(r => [
      r.ID_COT,
      r.Fecha,
      `"${r.Cliente.replace(/"/g, '""')}"`,
      `"${r.Producto.replace(/"/g, '""')}"`,
      `"${r.Dimensiones}"`,
      r.Cantidad,
      r.Área_m2.toFixed(3),
      `"${r.Procesos.replace(/"/g, '""')}"`,
      r.Total,
      r.Usuario,
    ].join(','));

    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'registro_cotizaciones_vcq.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <div className="text-slate-400">Cargando registro...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-100 mb-1">Registro de cotización (detalle)</h2>
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

      <div className="overflow-x-auto">
        <div className="max-h-[500px] overflow-y-auto rounded-xl border border-slate-700/50">
          <table className="w-full text-sm">
            <thead className="bg-slate-800/50 sticky top-0">
              <tr>
                <th className="text-left px-4 py-3 text-slate-400 font-medium whitespace-nowrap">ID Cot.</th>
                <th className="text-left px-4 py-3 text-slate-400 font-medium">Fecha</th>
                <th className="text-left px-4 py-3 text-slate-400 font-medium">Cliente</th>
                <th className="text-left px-4 py-3 text-slate-400 font-medium">Producto</th>
                <th className="text-left px-4 py-3 text-slate-400 font-medium">Dimensiones</th>
                <th className="text-center px-4 py-3 text-slate-400 font-medium">Cant.</th>
                <th className="text-right px-4 py-3 text-slate-400 font-medium">Área m²</th>
                <th className="text-left px-4 py-3 text-slate-400 font-medium">Procesos</th>
                <th className="text-right px-4 py-3 text-slate-400 font-medium">Total</th>
                <th className="text-left px-4 py-3 text-slate-400 font-medium">Usuario</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {sortedRegistros.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-slate-500">
                    No hay registros de cotizaciones
                  </td>
                </tr>
              ) : (
                sortedRegistros.map((reg) => (
                  <tr key={reg.ID_COT} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 text-slate-200 font-medium">{reg.ID_COT}</td>
                    <td className="px-4 py-3 text-slate-300 whitespace-nowrap">{reg.Fecha}</td>
                    <td className="px-4 py-3 text-slate-300">{reg.Cliente}</td>
                    <td className="px-4 py-3 text-slate-300 text-xs">{reg.Producto}</td>
                    <td className="px-4 py-3 text-slate-300 whitespace-nowrap text-xs">
                      {reg.Dimensiones}
                    </td>
                    <td className="px-4 py-3 text-center text-slate-300">{reg.Cantidad}</td>
                    <td className="px-4 py-3 text-right text-slate-300">{reg.Área_m2.toFixed(3)}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs max-w-xs truncate" title={reg.Procesos}>
                      {reg.Procesos || 'Sin procesos'}
                    </td>
                    <td className="px-4 py-3 text-right text-green-400 font-semibold">
                      ${reg.Total}
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{reg.Usuario}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
