import { useState } from 'react';
import { LayoutAdmin } from '../../layouts/LayoutAdmin';
import ClientesTab from '../../components/ClientesTab';
import UsuariosTab from '../../components/UsuariosTab';
import PreciosTab from '../../components/PreciosTab';
import { useAuth } from '../../hooks/useAuth';

type CatalogoTab = 'clientes' | 'usuarios' | 'precios';

export function AdminCatalogo() {
  const [activeTab, setActiveTab] = useState<CatalogoTab>('clientes');
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const tabs = [
    { id: 'clientes' as CatalogoTab, label: 'Clientes' },
    { id: 'usuarios' as CatalogoTab, label: 'Usuarios' },
    { id: 'precios' as CatalogoTab, label: 'Precios' },
  ];

  return (
    <LayoutAdmin activeTab="catalogo">
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-100">Catálogos</h2>
          <p className="text-slate-400 mt-1">Gestión de datos maestros</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-cyan-500/15 border border-cyan-500/50 text-cyan-300'
                  : 'bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-6 border border-slate-700/50">
          {activeTab === 'clientes' && <ClientesTab />}
          {activeTab === 'usuarios' && <UsuariosTab />}
          {activeTab === 'precios' && <PreciosTab currentUser={user} />}
        </div>
      </div>
    </LayoutAdmin>
  );
}
