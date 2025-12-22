import { LayoutAdmin } from '../../layouts/LayoutAdmin';
import { Receipt } from 'lucide-react';

export function AdminFacturacion() {
  return (
    <LayoutAdmin activeTab="facturacion">
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-100">Facturación</h2>
          <p className="text-slate-400 mt-1">Gestión de facturas e ingresos</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-12 border border-slate-700/50 text-center">
          <Receipt className="w-16 h-16 text-slate-500 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold text-slate-200 mb-2">Sin facturas</h3>
          <p className="text-slate-400 mb-4">Registro de facturas y movimientos</p>
          <p className="text-xs text-slate-500">TODO: Conectar con BD para cargar facturas</p>
        </div>
      </div>
    </LayoutAdmin>
  );
}
