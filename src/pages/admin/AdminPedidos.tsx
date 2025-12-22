import { LayoutAdmin } from '../../layouts/LayoutAdmin';
import { Search, Plus, ClipboardList } from 'lucide-react';
import { useState } from 'react';
import EmptyState from '../../components/EmptyState';

export function AdminPedidos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstatus, setFilterEstatus] = useState('todos');

  const pedidos = [];

  return (
    <LayoutAdmin activeTab="pedidos">
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-700/50 pb-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-100 mb-2">Pedidos</h1>
            <p className="text-slate-400">Gestiona todos los pedidos de clientes, desde recepción hasta entrega</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-green-500 text-slate-950 font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 group hover:from-cyan-400 hover:to-green-400 self-start sm:self-auto">
            <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
            Nuevo Pedido
          </button>
        </div>

        {/* Filters Card */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-5 border border-slate-700/50 shadow-lg">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 min-w-0">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Por folio, cliente o referencia..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div className="min-w-[200px]">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Estatus</label>
              <select
                value={filterEstatus}
                onChange={(e) => setFilterEstatus(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
              >
                <option value="todos">Todos los estatus</option>
                <option value="recibido">Recibido</option>
                <option value="produccion">En producción</option>
                <option value="listo">Listo</option>
                <option value="ruta">En ruta</option>
                <option value="entregado">Entregado</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        {pedidos.length === 0 ? (
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-12 border border-slate-700/50">
            <EmptyState
              icon={ClipboardList}
              title="Sin pedidos registrados"
              description="Cuando los clientes creen pedidos, aparecerán en esta sección para seguimiento"
              action={{
                label: 'Ver Cotizaciones',
                onClick: () => window.location.href = '/app/admin/cotizaciones',
              }}
            />
          </div>
        ) : (
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
            {/* Table will go here */}
          </div>
        )}
      </div>
    </LayoutAdmin>
  );
}
