import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Package, FileText, Plus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface LayoutClienteProps {
  children: ReactNode;
  activeTab?: string;
}

export function LayoutCliente({ children, activeTab }: LayoutClienteProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const menuItems = [
    { id: 'home', label: 'Mis Pedidos', icon: Package, path: '/app/cliente' },
    { id: 'nuevo', label: 'Nuevo Pedido', icon: Plus, path: '/app/cliente/nuevo-pedido' },
    { id: 'documentos', label: 'Documentos', icon: FileText, path: '/app/cliente/documentos' },
  ];

  return (
    <div className="min-h-screen bg-glass-obsidian flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-glass-cyan/5 via-transparent to-glass-cyan/5" />
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-glass-cyan/10 rounded-full blur-3xl" />

      {/* Header */}
      <div className="glass-panel backdrop-blur-2xl border-b border-white/10 shadow-glass-lg relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-glass-cyan/20 backdrop-blur-sm flex items-center justify-center shadow-glow-cyan border border-glass-cyan/30">
              <Package className="w-6 h-6 text-glass-cyan" />
            </div>
            <div>
              <h1 className="text-2xl font-light text-glass-frost tracking-wide">Portal Cliente</h1>
              <p className="text-sm text-glass-frost/50">Bienvenido, {user?.NOMBRE}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-xl hover:bg-rose-500/20 hover:border-rose-500/50 hover:text-rose-300 transition-all duration-200 group backdrop-blur-sm"
          >
            <LogOut className="w-4 h-4 transition-transform group-hover:scale-110" />
            Cerrar sesión
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex gap-2 border-t border-white/10 overflow-x-auto">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 whitespace-nowrap group ${
                  isActive
                    ? 'bg-glass-cyan/15 border border-glass-cyan/40 text-glass-cyan shadow-glow-cyan'
                    : 'text-glass-frost/60 hover:text-glass-frost hover:bg-white/5 border border-transparent hover:border-glass-cyan/20'
                }`}
              >
                <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                {item.label}
                {isActive && (
                  <div className="ml-2 w-2 h-2 rounded-full bg-glass-cyan shadow-glow-cyan"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </div>
    </div>
  );
}
