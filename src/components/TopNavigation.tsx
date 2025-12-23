import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, BarChart3, Calculator, Layers, ClipboardList, Package, Truck, DollarSign, Database, MoreHorizontal, ChevronDown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const mainItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/app/admin' },
  { id: 'cotizaciones', label: 'Cotizaciones', icon: Calculator, path: '/app/admin/cotizaciones' },
  { id: 'figuras', label: 'Figuras', icon: Layers, path: '/app/admin/figuras' },
  { id: 'pedidos', label: 'Pedidos', icon: ClipboardList, path: '/app/admin/pedidos' },
];

const moreItems = [
  { id: 'produccion', label: 'Producción', icon: Package, path: '/app/admin/produccion' },
  { id: 'entregas', label: 'Entregas', icon: Truck, path: '/app/admin/entregas' },
  { id: 'stock', label: 'Stock', icon: Package, path: '/app/admin/stock' },
  { id: 'facturacion', label: 'Facturación', icon: DollarSign, path: '/app/admin/facturacion' },
  { id: 'catalogo', label: 'Catálogos', icon: Database, path: '/app/admin/catalogo' },
];

export function TopNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [moreOpen, setMoreOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const getCurrentPath = () => location.pathname;
  const currentPath = getCurrentPath();

  const isActive = (path: string) => currentPath === path;

  return (
    <div className="glass-panel backdrop-blur-2xl border-b border-white/10 sticky top-0 z-40">
      <div className="px-3 sm:px-4 py-4 flex items-center justify-between gap-2 sm:gap-4 relative">
        {/* Logo */}
        <button
          onClick={() => navigate('/app/admin')}
          className="flex items-center gap-2 sm:gap-3 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity duration-200"
          title="Ir al Dashboard"
        >
          <div className="w-10 h-10 rounded-xl bg-glass-cyan/20 backdrop-blur-sm flex items-center justify-center shadow-glow-cyan border border-glass-cyan/30">
            <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-glass-cyan" />
          </div>
          <div className="hidden sm:block">
            <p className="text-xs text-glass-frost/50 font-medium uppercase tracking-wider">VCQ</p>
            <h2 className="text-sm font-light text-glass-frost tracking-wide">Admin</h2>
          </div>
        </button>

        {/* Main Navigation */}
        <nav className="flex items-center gap-1 flex-1 justify-start overflow-x-auto scrollbar-hide">
          {mainItems.map(item => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`
                  flex items-center gap-1.5 px-2 sm:px-4 py-2.5 rounded-xl font-medium
                  transition-all duration-300 group whitespace-nowrap flex-shrink-0
                  ${active
                    ? 'bg-glass-cyan/15 border border-glass-cyan/40 text-glass-cyan shadow-glow-cyan'
                    : 'text-glass-frost/60 hover:text-glass-frost hover:bg-white/5 border border-transparent hover:border-glass-cyan/20'
                  }
                `}
                title={item.label}
              >
                <Icon className="w-4 h-4 transition-transform group-hover:scale-110 flex-shrink-0" />
                <span className="text-xs sm:text-sm hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* More Button */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setMoreOpen(!moreOpen)}
            className={`
              flex items-center gap-1.5 px-2 sm:px-4 py-2.5 rounded-xl font-medium
              transition-all duration-300 group whitespace-nowrap
              ${moreOpen
                ? 'bg-glass-cyan/15 border border-glass-cyan/40 text-glass-cyan shadow-glow-cyan'
                : 'text-glass-frost/60 hover:text-glass-frost hover:bg-white/5 border border-transparent hover:border-glass-cyan/20'
              }
            `}
            title="Más opciones"
          >
            <MoreHorizontal className="w-4 h-4 transition-transform group-hover:scale-110 flex-shrink-0" />
            <span className="text-xs sm:text-sm hidden sm:inline">Más</span>
            <ChevronDown className={`w-4 h-4 transition-transform hidden sm:block flex-shrink-0 ${moreOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {moreOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 sm:w-56 liquid-glass rounded-2xl border border-white/10 shadow-glass-lg overflow-hidden animate-scale-in z-50">
              <div className="p-2 space-y-1">
                {moreItems.map(item => {
                  const Icon = item.icon;
                  const active = isActive(item.path);

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        navigate(item.path);
                        setMoreOpen(false);
                      }}
                      className={`
                        w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 rounded-lg font-medium text-xs sm:text-sm
                        transition-all duration-200
                        ${active
                          ? 'bg-glass-cyan/15 border border-glass-cyan/40 text-glass-cyan'
                          : 'text-glass-frost/60 hover:text-glass-frost hover:bg-white/5 border border-transparent'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="flex-1 text-left">{item.label}</span>
                      {active && <div className="w-2 h-2 rounded-full bg-glass-cyan shadow-glow-cyan flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* User & Logout */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="hidden md:block text-right">
            <p className="text-xs sm:text-sm font-medium text-glass-frost">Usuario</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 sm:p-2.5 text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-lg hover:bg-rose-500/20 hover:border-rose-500/50 hover:text-rose-300 transition-all duration-200 group"
            title="Cerrar sesión"
          >
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
          </button>
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {moreOpen && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => setMoreOpen(false)}
        />
      )}
    </div>
  );
}
