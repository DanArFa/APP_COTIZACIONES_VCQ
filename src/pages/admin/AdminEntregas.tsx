import { LayoutAdmin } from '../../layouts/LayoutAdmin';
import { Truck } from 'lucide-react';

export function AdminEntregas() {
  return (
    <LayoutAdmin activeTab="entregas">
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-100">Entregas</h2>
          <p className="text-slate-400 mt-1">Gestión de entregas y logística</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-12 border border-slate-700/50 text-center">
          <Truck className="w-16 h-16 text-slate-500 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold text-slate-200 mb-2">Sin entregas</h3>
          <p className="text-slate-400 mb-4">Aquí aparecerán las entregas programadas</p>
          <p className="text-xs text-slate-500">TODO: Conectar con BD para cargar entregas</p>
        </div>
      </div>
    </LayoutAdmin>
  );
}
