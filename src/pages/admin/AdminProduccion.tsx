import { LayoutAdmin } from '../../layouts/LayoutAdmin';
import { Package } from 'lucide-react';
import EmptyState from '../../components/EmptyState';

export function AdminProduccion() {
  return (
    <LayoutAdmin activeTab="produccion">
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="border-b border-slate-700/50 pb-6">
          <h1 className="text-4xl font-bold text-slate-100 mb-2">Etapas de Producción</h1>
          <p className="text-slate-400 max-w-2xl">Supervisa el progreso de todos los proyectos en el taller, desde corte hasta acabado final</p>
        </div>

        {/* Content */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-12 border border-slate-700/50">
          <EmptyState
            icon={Package}
            title="Tablero de Producción"
            description="Aquí se mostrarán las etapas de producción con vista Kanban cuando haya pedidos activos"
          />
        </div>
      </div>
    </LayoutAdmin>
  );
}
