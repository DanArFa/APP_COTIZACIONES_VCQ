import { useState, useEffect } from 'react';
import { Download, Calendar } from 'lucide-react';
import { getRegistroCotizaciones, RegistroCotizacion } from '../services/registro';

export default function RegistroTab() {
  const [registros, setRegistros] = useState<RegistroCotizacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAllHistory, setShowAllHistory] = useState(true);
  const [filterDate, setFilterDate] = useState<string>('');

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

  if (!showAllHistory && filterDate) {
    sortedRegistros = sortedRegistros.filter(r => r.Fecha === filterDate);
  }

  const uniqueDates = [...new Set(registros.map(r => r.Fecha))].sort().reverse();

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

      <div className="mb-6 bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-medium text-slate-300">Filtrar por fecha</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setShowAllHistory(true);
                setFilterDate('');
              }}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                showAllHistory
                  ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300'
                  : 'bg-slate-800/50 border border-slate-600/50 text-slate-400 hover:bg-slate-700/50'
              }`}
            >
              Todo el historial
            </button>
            {uniqueDates.map(date => (
              <button
                key={date}
                onClick={() => {
                  setShowAllHistory(false);
                  setFilterDate(date);
                }}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                  !showAllHistory && filterDate === date
                    ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300'
                    : 'bg-slate-800/50 border border-slate-600/50 text-slate-400 hover:bg-slate-700/50'
                }`}
              >
                {date}
              </button>
            ))}
          </div>
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
