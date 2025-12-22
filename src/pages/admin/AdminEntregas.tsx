import { LayoutAdmin } from '../../layouts/LayoutAdmin';
import { Truck } from 'lucide-react';
import EmptyState from '../../components/EmptyState';

export function AdminEntregas() {
  return (
    <LayoutAdmin activeTab="entregas">
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="border-b border-slate-700/50 pb-6">
          <h1 className="text-4xl font-bold text-slate-100 mb-2">Entregas</h1>
          <p className="text-slate-400 max-w-2xl">Coordina entregas, rastrea envíos y gestiona la logística de pedidos completados</p>
        </div>

        {/* Content */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-12 border border-slate-700/50">
          <EmptyState
            icon={Truck}
            title="Sin entregas programadas"
            description="Las entregas aparecerán aquí cuando los pedidos estén listos para envío"
          />
        </div>
      </div>
    </LayoutAdmin>
  );
}
