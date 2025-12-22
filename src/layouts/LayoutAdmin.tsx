import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, BarChart3, Calculator, ClipboardList, Truck, Package, DollarSign, Database, Layers } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface LayoutAdminProps {
  children: ReactNode;
  activeTab?: string;
}

export function LayoutAdmin({ children, activeTab }: LayoutAdminProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/app/admin' },
    { id: 'cotizaciones', label: 'Cotizaciones', icon: Calculator, path: '/app/admin/cotizaciones' },
    { id: 'figuras', label: 'Figuras', icon: Layers, path: '/app/admin/figuras' },
    { id: 'pedidos', label: 'Pedidos', icon: ClipboardList, path: '/app/admin/pedidos' },
    { id: 'produccion', label: 'Producción', icon: Package, path: '/app/admin/produccion' },
    { id: 'entregas', label: 'Entregas', icon: Truck, path: '/app/admin/entregas' },
    { id: 'stock', label: 'Stock', icon: Package, path: '/app/admin/stock' },
    { id: 'facturacion', label: 'Facturación', icon: DollarSign, path: '/app/admin/facturacion' },
    { id: 'catalogo', label: 'Catálogos', icon: Database, path: '/app/admin/catalogo' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex">
      {/* Sidebar */}
      <div className={`${
        sidebarOpen ? 'w-64' : 'w-20'
      } bg-gradient-to-b from-slate-800/80 to-slate-900/80 backdrop-blur-xl border-r border-slate-700/50 transition-all duration-300 flex flex-col shadow-xl`}>
        {/* Logo/Title */}
        <div className="p-6 border-b border-slate-700/30">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-green-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <BarChart3 className="w-6 h-6 text-slate-950 font-bold" />
              </div>
              {sidebarOpen && (
                <div>
                  <p className="text-xs text-slate-400 font-medium">VCQ</p>
                  <h2 className="text-lg font-bold text-slate-100">Admin</h2>
                </div>
              )}
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-700/50 rounded-lg text-slate-400 hover:text-slate-300 transition-all"
              title={sidebarOpen ? 'Contraer' : 'Expandir'}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto scroll-smooth">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                title={!sidebarOpen ? item.label : ''}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-green-500/10 border border-cyan-500/50 text-cyan-300 shadow-lg shadow-cyan-500/10'
                    : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/30'
                } group`}
              >
                <Icon className="w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110" />
                {sidebarOpen && <span className="truncate">{item.label}</span>}
                {isActive && sidebarOpen && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-cyan-400"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-slate-700/30 space-y-3">
          {sidebarOpen && (
            <div className="p-3 bg-gradient-to-br from-slate-700/30 to-slate-800/30 rounded-lg border border-slate-700/20">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Conectado como</p>
              <p className="text-sm font-medium text-slate-100 truncate">{user?.NOMBRE}</p>
              <p className="text-xs text-slate-400 mt-1 capitalize">{user?.ROL}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 bg-gradient-to-r from-red-500/10 to-red-500/5 border border-red-500/30 rounded-lg hover:from-red-500/20 hover:to-red-500/10 hover:border-red-500/50 hover:text-red-300 transition-all duration-200 justify-center group"
          >
            <LogOut className="w-4 h-4 transition-transform group-hover:scale-110" />
            {sidebarOpen && 'Cerrar Sesión'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gradient-to-br from-slate-950/50 via-slate-900/50 to-slate-950/50">
        <div className="min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
}
