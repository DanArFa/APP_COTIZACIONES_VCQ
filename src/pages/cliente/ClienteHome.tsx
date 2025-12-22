import { useState, useEffect } from 'react';
import { Plus, Calendar, DollarSign, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LayoutCliente } from '../../layouts/LayoutCliente';

interface Pedido {
  id: string;
  folio: string;
  fecha: string;
  estatus: 'Recibido' | 'En producción' | 'Listo' | 'En ruta' | 'Entregado';
  total: number;
}

export function ClienteHome() {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    loadPedidos();
  }, []);

  const loadPedidos = async () => {
    try {
      // TODO: Connect to actual API endpoint
      // For now, showing empty state
      setPedidos([]);
    } catch (error) {
      console.error('Error loading pedidos:', error);
    }
  };

  const estatusColor = (estatus: string) => {
    const colors: Record<string, string> = {
      'Recibido': 'bg-blue-500/15 text-blue-300 border-blue-500/50',
      'En producción': 'bg-yellow-500/15 text-yellow-300 border-yellow-500/50',
      'Listo': 'bg-purple-500/15 text-purple-300 border-purple-500/50',
      'En ruta': 'bg-orange-500/15 text-orange-300 border-orange-500/50',
      'Entregado': 'bg-green-500/15 text-green-300 border-green-500/50',
    };
    return colors[estatus] || 'bg-slate-500/15 text-slate-300';
  };

  return (
    <LayoutCliente activeTab="home">
      <div className="space-y-6">
        {/* Header con CTA */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-100">Mis Pedidos</h2>
            <p className="text-slate-400 mt-1">Rastreo y gestión de tus pedidos</p>
          </div>
          <button
            onClick={() => navigate('/app/cliente/nuevo-pedido')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-green-500 text-slate-950 font-semibold rounded-xl hover:from-cyan-400 hover:to-green-400 transition-all shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Crear Pedido
          </button>
        </div>

        {/* Empty State */}
        {pedidos.length === 0 ? (
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-12 border border-slate-700/50 text-center">
            <Clock className="w-16 h-16 text-slate-500 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-slate-200 mb-2">No hay pedidos aún</h3>
            <p className="text-slate-400 mb-6">Crea tu primer pedido para comenzar</p>
            <button
              onClick={() => navigate('/app/cliente/nuevo-pedido')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 rounded-lg hover:bg-cyan-500/30 transition-all"
            >
              <Plus className="w-4 h-4" />
              Crear Pedido Ahora
            </button>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Folio</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Fecha</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Estatus</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">Total</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {pedidos.map(pedido => (
                    <tr key={pedido.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 text-slate-300 font-mono">{pedido.folio}</td>
                      <td className="px-6 py-4 text-slate-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(pedido.fecha).toLocaleDateString('es-MX')}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${estatusColor(pedido.estatus)}`}>
                          {pedido.estatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-slate-300 font-semibold">
                        <div className="flex items-center justify-end gap-1">
                          <DollarSign className="w-4 h-4" />
                          {pedido.total.toLocaleString('es-MX', { maximumFractionDigits: 2 })}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                          Ver Detalle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </LayoutCliente>
  );
}
