import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, BarChart3, Calculator, ClipboardList, Truck, Package, DollarSign, Database } from 'lucide-react';
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
      } bg-gradient-to-b from-slate-800/50 to-slate-900/50 border-r border-slate-700/50 transition-all duration-300 flex flex-col`}>
        {/* Logo/Title */}
        <div className="p-4 border-b border-slate-700/30">
          <div className="flex items-center justify-between">
            {sidebarOpen && <h2 className="text-xl font-bold text-slate-100">VCQ Admin</h2>}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 hover:bg-slate-700/50 rounded-lg text-slate-400"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                title={!sidebarOpen ? item.label : ''}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                  isActive
                    ? 'bg-cyan-500/15 border border-cyan-500/50 text-cyan-300'
                    : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/30'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-slate-700/30">
          {sidebarOpen && (
            <div className="mb-3 p-2 bg-slate-800/30 rounded-lg">
              <p className="text-xs text-slate-400">Usuario</p>
              <p className="text-sm font-medium text-slate-200 truncate">{user?.NOMBRE}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800/50 border border-slate-600/50 rounded-lg hover:bg-slate-700/50 transition-all justify-center"
          >
            <LogOut className="w-4 h-4" />
            {sidebarOpen && 'Salir'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
