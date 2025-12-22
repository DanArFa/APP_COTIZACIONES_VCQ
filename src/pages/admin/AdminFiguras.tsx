import { LayoutAdmin } from '../../layouts/LayoutAdmin';
import AdminFigurasTab from '../../components/AdminFigurasTab';

export function AdminFiguras() {
  return (
    <LayoutAdmin activeTab="figuras">
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-100">Figuras de Vidrio</h2>
          <p className="text-slate-400 mt-1">Gestiona las figuras estándar disponibles para los clientes</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-slate-700/50">
          <AdminFigurasTab />
        </div>
      </div>
    </LayoutAdmin>
  );
}
