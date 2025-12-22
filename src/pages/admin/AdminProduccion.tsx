import { LayoutAdmin } from '../../layouts/LayoutAdmin';
import { Kanban } from 'lucide-react';

export function AdminProduccion() {
  return (
    <LayoutAdmin activeTab="produccion">
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-100">Producción</h2>
          <p className="text-slate-400 mt-1">Gestión de etapas de producción</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-12 border border-slate-700/50 text-center">
          <Kanban className="w-16 h-16 text-slate-500 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold text-slate-200 mb-2">Tablero Kanban</h3>
          <p className="text-slate-400 mb-4">Vista de etapas de producción</p>
          <p className="text-xs text-slate-500">TODO: Implementar tablero Kanban con datos de BD</p>
        </div>
      </div>
    </LayoutAdmin>
  );
}
