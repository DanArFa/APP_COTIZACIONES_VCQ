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
    <div className="min-h-screen bg-glass-obsidian flex relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-glass-cyan/5 via-transparent to-glass-cyan/5" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-glass-cyan/10 rounded-full blur-3xl" />

      {/* Sidebar */}
      <div className={`${
        sidebarOpen ? 'w-64' : 'w-20'
      } glass-panel backdrop-blur-2xl border-r border-white/10 transition-all duration-300 flex flex-col shadow-glass-lg relative z-10`}>
        {/* Logo/Title */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-glass-cyan/20 backdrop-blur-sm flex items-center justify-center shadow-glow-cyan border border-glass-cyan/30">
                <BarChart3 className="w-6 h-6 text-glass-cyan" />
              </div>
              {sidebarOpen && (
                <div>
                  <p className="text-xs text-glass-frost/50 font-medium uppercase tracking-wider">VCQ</p>
                  <h2 className="text-lg font-light text-glass-frost tracking-wide">Admin</h2>
                </div>
              )}
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/5 rounded-lg text-glass-frost/60 hover:text-glass-cyan transition-all border border-transparent hover:border-glass-cyan/30"
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
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-glass-cyan/15 border border-glass-cyan/40 text-glass-cyan shadow-glow-cyan'
                    : 'text-glass-frost/60 hover:text-glass-frost hover:bg-white/5 border border-transparent hover:border-glass-cyan/20'
                } group`}
              >
                <Icon className="w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110" />
                {sidebarOpen && <span className="truncate">{item.label}</span>}
                {isActive && sidebarOpen && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-glass-cyan shadow-glow-cyan"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-white/10 space-y-3">
          {sidebarOpen && (
            <div className="p-3 liquid-glass rounded-xl border border-white/10">
              <p className="text-xs text-glass-frost/40 font-semibold uppercase tracking-wider mb-1">Conectado como</p>
              <p className="text-sm font-medium text-glass-frost truncate">{user?.NOMBRE}</p>
              <p className="text-xs text-glass-frost/50 mt-1 capitalize">{user?.ROL}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-xl hover:bg-rose-500/20 hover:border-rose-500/50 hover:text-rose-300 transition-all duration-200 justify-center group backdrop-blur-sm"
          >
            <LogOut className="w-4 h-4 transition-transform group-hover:scale-110" />
            {sidebarOpen && 'Cerrar Sesión'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto relative z-10">
        <div className="min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
}
