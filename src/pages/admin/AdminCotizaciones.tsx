import { LayoutAdmin } from '../../layouts/LayoutAdmin';
import CotizadorTab from '../../components/CotizadorTab';
import { useAuth } from '../../hooks/useAuth';

export function AdminCotizaciones() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <LayoutAdmin activeTab="cotizaciones">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-slate-100">Cotizador</h2>
          <p className="text-slate-400 mt-1">Crear y gestionar cotizaciones</p>
        </div>
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-6 border border-slate-700/50">
          <CotizadorTab currentUser={user} />
        </div>
      </div>
    </LayoutAdmin>
  );
}
