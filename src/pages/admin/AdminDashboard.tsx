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
            <h1 className="text-4xl font-light text-glass-frost mb-2 tracking-wide">Dashboard</h1>
            <p className="text-glass-frost/50 text-sm">Resumen general de operaciones</p>
          </div>
          <div className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-xl liquid-glass border border-white/10">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
            <span className="text-sm text-glass-frost/80">Sistema activo</span>
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
          <div className="glass-card overflow-hidden liquid-glass-hover">
            <div className="pb-6 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20">
                  <Clock className="w-5 h-5 text-sky-400" />
                </div>
                <h3 className="text-lg font-light text-glass-frost tracking-wide">Pedidos Recientes</h3>
              </div>
            </div>
            <div>
              <EmptyState
                icon={Clock}
                title="No hay pedidos"
                description="Los pedidos aparecerán aquí cuando los clientes realicen nuevas solicitudes"
              />
            </div>
          </div>

          {/* Cotizaciones Recientes */}
          <div className="glass-card overflow-hidden liquid-glass-hover">
            <div className="pb-6 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-lg font-light text-glass-frost tracking-wide">Cotizaciones Recientes</h3>
              </div>
            </div>
            <div>
              <EmptyState
                icon={Calculator}
                title="Sin cotizaciones"
                description="Las cotizaciones generadas aparecerán listadas aquí para seguimiento"
              />
            </div>
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div className="glass-card">
          <h3 className="text-lg font-light text-glass-frost mb-6 flex items-center gap-3 tracking-wide">
            <div className="p-2 rounded-xl bg-glass-cyan/10 border border-glass-cyan/20">
              <TrendingUp className="w-5 h-5 text-glass-cyan" />
            </div>
            Acciones Rápidas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button className="p-4 rounded-xl liquid-glass liquid-glass-hover border border-glass-cyan/20 group">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-glass-cyan group-hover:scale-110 transition-transform" />
                <span className="text-glass-frost/80 group-hover:text-glass-frost font-medium">Ver Pedidos</span>
              </div>
            </button>
            <button className="p-4 rounded-xl liquid-glass liquid-glass-hover border border-emerald-500/20 group">
              <div className="flex items-center gap-3">
                <Calculator className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-glass-frost/80 group-hover:text-glass-frost font-medium">Nueva Cotización</span>
              </div>
            </button>
            <button className="p-4 rounded-xl liquid-glass liquid-glass-hover border border-amber-500/20 group">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="text-glass-frost/80 group-hover:text-glass-frost font-medium">Ver Alertas</span>
              </div>
            </button>
          </div>
        </div>

        {/* Catálogos */}
        <div className="border-t border-white/10 pt-8">
          <div className="mb-6">
            <h2 className="text-2xl font-light text-glass-frost flex items-center gap-3 mb-2 tracking-wide">
              <div className="p-2 rounded-xl bg-glass-cyan/10 border border-glass-cyan/20">
                <Users className="w-6 h-6 text-glass-cyan" />
              </div>
              Catálogos
            </h2>
            <p className="text-glass-frost/50 text-sm">Gestión de datos maestros: clientes y usuarios</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Clientes */}
            <div className="glass-card overflow-hidden liquid-glass-hover">
              <div className="pb-6 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <Users className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-light text-glass-frost tracking-wide">Clientes</h3>
                </div>
              </div>
              <div>
                <ClientesTab />
              </div>
            </div>

            {/* Usuarios */}
            <div className="glass-card overflow-hidden liquid-glass-hover">
              <div className="pb-6 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20">
                    <Users className="w-5 h-5 text-sky-400" />
                  </div>
                  <h3 className="text-lg font-light text-glass-frost tracking-wide">Usuarios del Sistema</h3>
                </div>
              </div>
              <div>
                <UsuariosTab />
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}
