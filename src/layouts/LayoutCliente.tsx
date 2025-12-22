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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Portal Cliente VCQ</h1>
            <p className="text-sm text-slate-400">{user?.NOMBRE}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800/50 border border-slate-600/50 rounded-full hover:bg-slate-700/50 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>

        {/* Navigation */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2 border-t border-slate-700/30">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  isActive
                    ? 'bg-cyan-500/15 border border-cyan-500/50 text-cyan-300'
                    : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/30'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </div>
    </div>
  );
}
