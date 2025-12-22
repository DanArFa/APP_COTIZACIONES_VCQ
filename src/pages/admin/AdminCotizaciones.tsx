import { useState, useEffect } from 'react';
import { ShieldCheck, LogOut, Calculator, Users, FileText, ClipboardList, DollarSign, Wrench, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import PreciosTab from '../../components/PreciosTab';
import ProcesosTab from '../../components/ProcesosTab';
import CotizadorTab from '../../components/CotizadorTab';
import HistorialTab from '../../components/HistorialTab';
import ClientesTab from '../../components/ClientesTab';
import RegistroTab from '../../components/RegistroTab';
import UsuariosTab from '../../components/UsuariosTab';

type TabType = 'precios' | 'procesos' | 'cotizador' | 'historial' | 'clientes' | 'registro' | 'usuarios';

export function AdminCotizaciones() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('cotizador');

  useEffect(() => {
    if (user?.ROL === 'ADMIN') {
      setActiveTab('precios');
    } else {
      setActiveTab('cotizador');
    }
  }, [user?.ROL]);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const isAdmin = user.ROL === 'ADMIN';

  const tabs = [
    { id: 'precios' as TabType, label: 'Precios', icon: DollarSign, adminOnly: false },
    { id: 'procesos' as TabType, label: 'Procesos', icon: Wrench, adminOnly: false },
    { id: 'cotizador' as TabType, label: 'Cotizador', icon: Calculator, adminOnly: false },
    { id: 'historial' as TabType, label: 'Historial', icon: FileText, adminOnly: false },
    { id: 'clientes' as TabType, label: 'Clientes', icon: Users, adminOnly: true },
    { id: 'registro' as TabType, label: 'Registro', icon: ClipboardList, adminOnly: true },
    { id: 'usuarios' as TabType, label: 'Usuarios', icon: ShieldCheck, adminOnly: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-6 mb-6 border border-slate-700/50 shadow-2xl backdrop-blur-sm">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <h1 className="text-2xl font-bold text-slate-100 mb-2">
                Cotizador Vidrios VCQ
              </h1>
              <p className="text-sm text-slate-400">
                {user.NOMBRE} · {user.ROL === 'ADMIN' ? 'Administrador' : 'Vendedor'}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/app/admin')}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800/50 border border-slate-600/50 rounded-full hover:bg-slate-700/50 hover:border-slate-500/50 transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver al Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800/50 border border-slate-600/50 rounded-full hover:bg-slate-700/50 hover:border-slate-500/50 transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                Cerrar sesión
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mt-6">
            {tabs.map(tab => {
              if (tab.adminOnly && !isAdmin) return null;

              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-cyan-500/15 border border-cyan-500/50 text-cyan-300 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-800/30 border border-slate-700/30 text-slate-400 hover:bg-slate-700/40 hover:border-slate-600/40 hover:text-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-6 border border-slate-700/50 shadow-2xl backdrop-blur-sm">
          {activeTab === 'precios' && <PreciosTab currentUser={user} />}
          {activeTab === 'procesos' && <ProcesosTab />}
          {activeTab === 'cotizador' && <CotizadorTab currentUser={user} />}
          {activeTab === 'historial' && <HistorialTab currentUser={user} />}
          {activeTab === 'clientes' && <ClientesTab />}
          {activeTab === 'registro' && <RegistroTab />}
          {activeTab === 'usuarios' && <UsuariosTab />}
        </div>
      </div>
    </div>
  );
}
