import { useState, useEffect } from 'react';
import { getProcesos } from '../services/procesos';
import { Proceso } from '../types';

export default function ProcesosTab() {
  const [procesos, setProcesos] = useState<Proceso[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProcesos();
  }, []);

  async function loadProcesos() {
    setLoading(true);
    const data = await getProcesos();
    setProcesos(data);
    setLoading(false);
  }

  if (loading) {
    return <div className="text-slate-400">Cargando procesos...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-100 mb-6">Procesos</h2>

      <div className="overflow-x-auto">
        <div className="max-h-[500px] overflow-y-auto rounded-xl border border-slate-700/50">
          <table className="w-full text-sm">
            <thead className="bg-slate-800/50 sticky top-0">
              <tr>
                <th className="text-left px-4 py-3 text-slate-400 font-medium">Proceso</th>
                <th className="text-right px-4 py-3 text-slate-400 font-medium">Precio unitario (MXN)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {procesos.map((proceso, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3 text-slate-200 font-medium">{proceso.PROCESO}</td>
                  <td className="px-4 py-3 text-right text-slate-300">${proceso.PRECIO_UNIT.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
