import { useState, useEffect } from 'react';
import { LogOut, Calculator, FileText, ClipboardList, DollarSign, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import NavigationBar from '../../components/NavigationBar';
import TabNavigation from '../../components/TabNavigation';
import PreciosTab from '../../components/PreciosTab';
import ProcesosTab from '../../components/ProcesosTab';
import CotizadorTab from '../../components/CotizadorTab';
import HistorialTab from '../../components/HistorialTab';
import RegistroTab from '../../components/RegistroTab';

type TabType = 'precios' | 'procesos' | 'cotizador' | 'historial' | 'registro';

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
    { id: 'cotizador' as TabType, label: 'Cotizador', icon: Calculator, description: 'Crear nueva cotización', adminOnly: false },
    { id: 'historial' as TabType, label: 'Historial', icon: FileText, description: 'Ver cotizaciones anteriores', adminOnly: false },
    { id: 'precios' as TabType, label: 'Precios', icon: DollarSign, description: 'Gestionar precios', adminOnly: false },
    { id: 'procesos' as TabType, label: 'Procesos', icon: Wrench, description: 'Configurar procesos', adminOnly: false },
    ...(isAdmin ? [
      { id: 'registro' as TabType, label: 'Registro', icon: ClipboardList, description: 'Registro de operaciones', adminOnly: true },
    ] : []),
  ];

  const visibleTabs = tabs.filter(tab => !tab.adminOnly || isAdmin);

  const logoutButton = (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 bg-gradient-to-r from-red-500/10 to-red-500/5 border border-red-500/30 rounded-lg hover:from-red-500/20 hover:to-red-500/10 hover:border-red-500/50 hover:text-red-300 transition-all duration-200 group"
      title="Cerrar sesión"
    >
      <LogOut className="w-4 h-4 transition-transform group-hover:scale-110" />
      <span className="hidden sm:inline">Cerrar sesión</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col">
      {/* Navigation Header */}
      <NavigationBar
        title="Sistema de Cotizaciones"
        description={`Bienvenido, ${user.NOMBRE} • ${isAdmin ? 'Administrador' : 'Vendedor'}`}
        onBack={() => navigate('/app/admin')}
        backLabel="Volver al Dashboard"
        actions={logoutButton}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tabs Navigation */}
          <div className="mb-8">
            <TabNavigation
              tabs={visibleTabs}
              activeTab={activeTab}
              onChange={(tabId) => setActiveTab(tabId as TabType)}
            />
          </div>

          {/* Tab Content */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-6 lg:p-8 border border-slate-700/50 shadow-2xl backdrop-blur-sm">
            <div className="animate-fadeIn">
              {activeTab === 'precios' && <PreciosTab currentUser={user} />}
              {activeTab === 'procesos' && <ProcesosTab />}
              {activeTab === 'cotizador' && <CotizadorTab currentUser={user} />}
              {activeTab === 'historial' && <HistorialTab currentUser={user} />}
              {activeTab === 'registro' && <RegistroTab />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
