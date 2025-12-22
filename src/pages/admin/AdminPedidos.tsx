import { LayoutAdmin } from '../../layouts/LayoutAdmin';
import { Search, Plus } from 'lucide-react';
import { useState } from 'react';

export function AdminPedidos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstatus, setFilterEstatus] = useState('todos');

  const pedidos = [];
  // TODO: Connect to actual API to fetch pedidos

  return (
    <LayoutAdmin activeTab="pedidos">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-100">Pedidos</h2>
            <p className="text-slate-400 mt-1">Gestión de todos los pedidos</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-green-500 text-slate-950 font-semibold rounded-xl hover:from-cyan-400 hover:to-green-400 transition-all">
            <Plus className="w-5 h-5" />
            Nuevo Pedido
          </button>
        </div>

        {/* Filters */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-4 border border-slate-700/50 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Buscar por folio, cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
            </div>
            <select
              value={filterEstatus}
              onChange={(e) => setFilterEstatus(e.target.value)}
              className="px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
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

        {/* Empty State */}
        {pedidos.length === 0 ? (
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-12 border border-slate-700/50 text-center">
            <h3 className="text-xl font-semibold text-slate-200 mb-2">Sin pedidos</h3>
            <p className="text-slate-400 mb-4">No hay pedidos registrados aún</p>
            <p className="text-xs text-slate-500">TODO: Conectar con BD para cargar pedidos</p>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 overflow-hidden">
            {/* Table will go here */}
          </div>
        )}
      </div>
    </LayoutAdmin>
  );
}
