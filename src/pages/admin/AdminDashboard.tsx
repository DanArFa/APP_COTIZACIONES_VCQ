import { LayoutAdmin } from '../../layouts/LayoutAdmin';
import { BarChart3, Clock, Zap, TrendingUp } from 'lucide-react';

export function AdminDashboard() {
  const kpis = [
    { icon: Clock, label: 'Pedidos Activos', value: '0', color: 'bg-blue-500/15 text-blue-300' },
    { icon: Zap, label: 'En Producción', value: '0', color: 'bg-yellow-500/15 text-yellow-300' },
    { icon: TrendingUp, label: 'Entregas Hoy', value: '0', color: 'bg-green-500/15 text-green-300' },
    { icon: BarChart3, label: 'Cotizaciones Mes', value: '0', color: 'bg-purple-500/15 text-purple-300' },
  ];

  return (
    <LayoutAdmin activeTab="dashboard">
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-100">Dashboard</h2>
          <p className="text-slate-400 mt-1">Resumen operacional</p>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <div
                key={idx}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-400 mb-2">{kpi.label}</p>
                    <p className="text-3xl font-bold text-slate-100">{kpi.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${kpi.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pedidos Recientes */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Pedidos Recientes</h3>
            <div className="text-center py-8">
              <p className="text-slate-400">Sin pedidos aún</p>
              <p className="text-xs text-slate-500 mt-2">TODO: Conectar con BD</p>
            </div>
          </div>

          {/* Cotizaciones Recientes */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Cotizaciones Recientes</h3>
            <div className="text-center py-8">
              <p className="text-slate-400">Sin cotizaciones aún</p>
              <p className="text-xs text-slate-500 mt-2">TODO: Conectar con BD</p>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}
