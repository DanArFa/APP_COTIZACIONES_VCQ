import { useState } from 'react';
import { Users, ShieldCheck, DollarSign } from 'lucide-react';
import { LayoutAdmin } from '../../layouts/LayoutAdmin';
import TabNavigation from '../../components/TabNavigation';
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
    { id: 'clientes' as CatalogoTab, label: 'Clientes', icon: Users, description: 'Gestionar clientes registrados' },
    { id: 'usuarios' as CatalogoTab, label: 'Usuarios', icon: ShieldCheck, description: 'Gestionar usuarios del sistema' },
    { id: 'precios' as CatalogoTab, label: 'Precios', icon: DollarSign, description: 'Configurar precios de productos' },
  ];

  return (
    <LayoutAdmin activeTab="catalogo">
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="border-b border-slate-700/50 pb-6">
          <h1 className="text-4xl font-bold text-slate-100 mb-2">Catálogos Maestros</h1>
          <p className="text-slate-400 max-w-2xl">Gestión centralizada de datos maestros: clientes, usuarios y precios del sistema</p>
        </div>

        {/* Tabs Navigation */}
        <div>
          <TabNavigation
            tabs={tabs}
            activeTab={activeTab}
            onChange={(tabId) => setActiveTab(tabId as CatalogoTab)}
          />
        </div>

        {/* Tab Content */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-6 lg:p-8 border border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
          {activeTab === 'clientes' && <ClientesTab />}
          {activeTab === 'usuarios' && <UsuariosTab />}
          {activeTab === 'precios' && <PreciosTab currentUser={user} />}
        </div>
      </div>
    </LayoutAdmin>
  );
}
