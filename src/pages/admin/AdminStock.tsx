import { LayoutAdmin } from '../../layouts/LayoutAdmin';
import { Box } from 'lucide-react';

export function AdminStock() {
  return (
    <LayoutAdmin activeTab="stock">
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-100">Stock</h2>
          <p className="text-slate-400 mt-1">Inventario y disponibilidad de productos</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-12 border border-slate-700/50 text-center">
          <Box className="w-16 h-16 text-slate-500 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold text-slate-200 mb-2">Sin productos</h3>
          <p className="text-slate-400 mb-4">Gestión de inventario</p>
          <p className="text-xs text-slate-500">TODO: Conectar con BD para cargar stock</p>
        </div>
      </div>
    </LayoutAdmin>
  );
}
