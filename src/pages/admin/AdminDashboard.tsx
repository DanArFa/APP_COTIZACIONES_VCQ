import { LayoutAdmin } from '../../layouts/LayoutAdmin';
import { Clock, Package, Truck, Calculator, TrendingUp, AlertCircle, CheckCircle2, Users } from 'lucide-react';
import InfoCard from '../../components/InfoCard';
import EmptyState from '../../components/EmptyState';
import UsuariosTab from '../../components/UsuariosTab';
import ClientesTab from '../../components/ClientesTab';

export function AdminDashboard() {
  return (
    <LayoutAdmin activeTab="dashboard">
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-100 mb-2">Dashboard</h1>
            <p className="text-slate-400">Resumen general de operaciones</p>
          </div>
          <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm text-slate-300">Sistema activo</span>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InfoCard
            icon={Clock}
            title="Pedidos Activos"
            value="0"
            description="En proceso"
            color="cyan"
          />
          <InfoCard
            icon={Package}
            title="En Producción"
            value="0"
            description="Actualmente en taller"
            color="amber"
          />
          <InfoCard
            icon={Truck}
            title="Entregas Hoy"
            value="0"
            description="Programadas"
            color="green"
          />
          <InfoCard
            icon={Calculator}
            title="Cotizaciones Mes"
            value="0"
            description="Pendientes"
            color="blue"
          />
        </div>

        {/* Recent Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pedidos Recientes */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="p-6 border-b border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Clock className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-100">Pedidos Recientes</h3>
              </div>
            </div>
            <div className="p-6">
              <EmptyState
                icon={Clock}
                title="No hay pedidos"
                description="Los pedidos aparecerán aquí cuando los clientes realicen nuevas solicitudes"
              />
            </div>
          </div>

          {/* Cotizaciones Recientes */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="p-6 border-b border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-100">Cotizaciones Recientes</h3>
              </div>
            </div>
            <div className="p-6">
              <EmptyState
                icon={Calculator}
                title="Sin cotizaciones"
                description="Las cotizaciones generadas aparecerán listadas aquí para seguimiento"
              />
            </div>
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 p-6 shadow-xl">
          <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
            </div>
            Acciones Rápidas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button className="p-4 rounded-lg bg-slate-900/50 border border-slate-700/50 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all group">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-slate-300 group-hover:text-slate-100 font-medium">Ver Pedidos</span>
              </div>
            </button>
            <button className="p-4 rounded-lg bg-slate-900/50 border border-slate-700/50 hover:border-green-500/50 hover:bg-green-500/5 transition-all group">
              <div className="flex items-center gap-3">
                <Calculator className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
                <span className="text-slate-300 group-hover:text-slate-100 font-medium">Nueva Cotización</span>
              </div>
            </button>
            <button className="p-4 rounded-lg bg-slate-900/50 border border-slate-700/50 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all group">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="text-slate-300 group-hover:text-slate-100 font-medium">Ver Alertas</span>
              </div>
            </button>
          </div>
        </div>

        {/* Catálogos */}
        <div className="border-t border-slate-700/50 pt-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-cyan-500/10">
                <Users className="w-6 h-6 text-cyan-400" />
              </div>
              Catálogos
            </h2>
            <p className="text-slate-400">Gestión de datos maestros: clientes y usuarios</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Clientes */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="p-6 border-b border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <Users className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-100">Clientes</h3>
                </div>
              </div>
              <div className="p-6">
                <ClientesTab />
              </div>
            </div>

            {/* Usuarios */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="p-6 border-b border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Users className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-100">Usuarios del Sistema</h3>
                </div>
              </div>
              <div className="p-6">
                <UsuariosTab />
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}
