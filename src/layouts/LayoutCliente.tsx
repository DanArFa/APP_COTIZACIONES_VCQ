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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-green-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Package className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-100">Portal Cliente</h1>
              <p className="text-sm text-slate-400">Bienvenido, {user?.NOMBRE}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 bg-gradient-to-r from-red-500/10 to-red-500/5 border border-red-500/30 rounded-lg hover:from-red-500/20 hover:to-red-500/10 hover:border-red-500/50 hover:text-red-300 transition-all duration-200 group"
          >
            <LogOut className="w-4 h-4 transition-transform group-hover:scale-110" />
            Cerrar sesión
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex gap-2 border-t border-slate-700/30 overflow-x-auto">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap group ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-green-500/10 border border-cyan-500/50 text-cyan-300 shadow-lg shadow-cyan-500/10'
                    : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/30'
                }`}
              >
                <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                {item.label}
                {isActive && (
                  <div className="ml-2 w-2 h-2 rounded-full bg-cyan-400"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </div>
    </div>
  );
}
