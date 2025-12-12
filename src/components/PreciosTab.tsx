import { useState, useEffect } from 'react';
import { getPrecios } from '../services/precios';
import { Precio } from '../types';

export default function PreciosTab() {
  const [precios, setPrecios] = useState<Precio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPrecios();
  }, []);

  async function loadPrecios() {
    setLoading(true);
    const data = await getPrecios();
    setPrecios(data);
    setLoading(false);
  }

  if (loading) {
    return <div className="text-slate-400">Cargando precios...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-100 mb-2">Lista de precios</h2>
      <p className="text-sm text-slate-400 mb-6">Datos sincronizados con Supabase</p>

      <div className="overflow-x-auto">
        <div className="max-h-[500px] overflow-y-auto rounded-xl border border-slate-700/50">
          <table className="w-full text-sm">
            <thead className="bg-slate-800/50 sticky top-0">
              <tr>
                <th className="text-left px-4 py-3 text-slate-400 font-medium">Producto</th>
                <th className="text-right px-4 py-3 text-slate-400 font-medium">Precio instalador</th>
                <th className="text-right px-4 py-3 text-slate-400 font-medium">Precio público</th>
                <th className="text-right px-4 py-3 text-slate-400 font-medium">Precio corte</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {precios.map((precio, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3 text-slate-200 font-medium">{precio.PRODUCTO}</td>
                  <td className="px-4 py-3 text-right text-slate-300">${precio.PRECIO_INSTALADOR.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right text-slate-300">${precio.PRECIO_PUBLICO.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right text-slate-300">${precio.PRECIO_CORTE.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
