import { LayoutAdmin } from '../../layouts/LayoutAdmin';
import { Box } from 'lucide-react';
import EmptyState from '../../components/EmptyState';

export function AdminStock() {
  return (
    <LayoutAdmin activeTab="stock">
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="border-b border-slate-700/50 pb-6">
          <h1 className="text-4xl font-bold text-slate-100 mb-2">Inventario</h1>
          <p className="text-slate-400 max-w-2xl">Monitorea disponibilidad de materiales y productos para mantener la producción eficiente</p>
        </div>

        {/* Content */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-12 border border-slate-700/50">
          <EmptyState
            icon={Box}
            title="Gestión de Inventario"
            description="El sistema de inventario está en desarrollo para monitorear materiales y productos disponibles"
          />
        </div>
      </div>
    </LayoutAdmin>
  );
}
