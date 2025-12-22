import { LayoutAdmin } from '../../layouts/LayoutAdmin';
import AdminFigurasTab from '../../components/AdminFigurasTab';

export function AdminFiguras() {
  return (
    <LayoutAdmin activeTab="figuras">
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="border-b border-slate-700/50 pb-6">
          <h1 className="text-4xl font-bold text-slate-100 mb-2">Figuras de Vidrio</h1>
          <p className="text-slate-400 max-w-2xl">Gestiona las figuras estándar disponibles para que los clientes personalicen sus pedidos. Agrega, edita o desactiva figuras según sea necesario.</p>
        </div>

        {/* Content */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-6 lg:p-8 border border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
          <AdminFigurasTab />
        </div>
      </div>
    </LayoutAdmin>
  );
}
