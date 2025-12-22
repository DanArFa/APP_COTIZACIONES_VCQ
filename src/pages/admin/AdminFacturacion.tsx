import { LayoutAdmin } from '../../layouts/LayoutAdmin';
import { Receipt } from 'lucide-react';
import EmptyState from '../../components/EmptyState';

export function AdminFacturacion() {
  return (
    <LayoutAdmin activeTab="facturacion">
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="border-b border-slate-700/50 pb-6">
          <h1 className="text-4xl font-bold text-slate-100 mb-2">Facturación</h1>
          <p className="text-slate-400 max-w-2xl">Gestiona facturas, ingresos, pagos e historial financiero de todos los pedidos</p>
        </div>

        {/* Content */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-12 border border-slate-700/50">
          <EmptyState
            icon={Receipt}
            title="Sistema de Facturación"
            description="Las facturas y registros de pago aparecerán aquí cuando haya pedidos completados"
          />
        </div>
      </div>
    </LayoutAdmin>
  );
}
