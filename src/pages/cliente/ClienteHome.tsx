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
      <div className="space-y-8">
        {/* Header con CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-100 mb-2">Mis Pedidos</h1>
            <p className="text-slate-400">Rastreo y gestión de tus solicitudes de vidrio</p>
          </div>
          <button
            onClick={() => navigate('/app/cliente/nuevo-pedido')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-green-500 text-slate-950 font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 group hover:from-cyan-400 hover:to-green-400"
          >
            <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
            Nuevo Pedido
          </button>
        </div>

        {/* Empty State */}
        {pedidos.length === 0 ? (
          <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl p-16 border border-slate-700/50 text-center hover:shadow-xl transition-all duration-300">
            <div className="p-4 rounded-2xl bg-cyan-500/10 inline-block mx-auto mb-6">
              <Clock className="w-12 h-12 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-100 mb-2">Aún no tienes pedidos</h3>
            <p className="text-slate-400 mb-8 max-w-sm mx-auto">Comienza creando tu primer pedido de figuras de vidrio personalizadas</p>
            <button
              onClick={() => navigate('/app/cliente/nuevo-pedido')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-green-500/20 text-cyan-300 border border-cyan-500/50 rounded-lg hover:from-cyan-500/30 hover:to-green-500/30 hover:border-cyan-500/70 transition-all group font-medium"
            >
              <Plus className="w-4 h-4 transition-transform group-hover:scale-125" />
              Crear Primer Pedido
            </button>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/30 px-6 py-4 border-b border-slate-700/50">
              <h3 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse"></div>
                Tus Pedidos Activos
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/30 border-b border-slate-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Folio</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Fecha</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Estatus</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {pedidos.map((pedido, idx) => (
                    <tr key={pedido.id} className="hover:bg-slate-800/50 transition-all duration-200 group">
                      <td className="px-6 py-4 text-slate-300 font-mono font-semibold">{pedido.folio}</td>
                      <td className="px-6 py-4 text-slate-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-500" />
                          <span className="group-hover:text-slate-300 transition-colors">{new Date(pedido.fecha).toLocaleDateString('es-MX')}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold border ${estatusColor(pedido.estatus)}`}>
                          {pedido.estatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-slate-200 font-bold group-hover:text-cyan-300 transition-colors">
                        <div className="flex items-center justify-end gap-1">
                          <DollarSign className="w-4 h-4" />
                          {pedido.total.toLocaleString('es-MX', { maximumFractionDigits: 2 })}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="px-3 py-1.5 text-cyan-400 hover:text-cyan-300 text-sm font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 rounded-lg transition-all">
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
