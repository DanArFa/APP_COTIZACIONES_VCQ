import { LucideIcon } from 'lucide-react';

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'cyan' | 'green' | 'blue' | 'amber' | 'rose' | 'purple';
  onClick?: () => void;
  className?: string;
}

const colorConfig = {
  cyan: {
    bg: 'from-cyan-500/10 to-cyan-600/5',
    border: 'border-cyan-500/30 hover:border-cyan-500/50',
    icon: 'text-cyan-400',
    text: 'text-cyan-300',
  },
  green: {
    bg: 'from-green-500/10 to-green-600/5',
    border: 'border-green-500/30 hover:border-green-500/50',
    icon: 'text-green-400',
    text: 'text-green-300',
  },
  blue: {
    bg: 'from-blue-500/10 to-blue-600/5',
    border: 'border-blue-500/30 hover:border-blue-500/50',
    icon: 'text-blue-400',
    text: 'text-blue-300',
  },
  amber: {
    bg: 'from-amber-500/10 to-amber-600/5',
    border: 'border-amber-500/30 hover:border-amber-500/50',
    icon: 'text-amber-400',
    text: 'text-amber-300',
  },
  rose: {
    bg: 'from-rose-500/10 to-rose-600/5',
    border: 'border-rose-500/30 hover:border-rose-500/50',
    icon: 'text-rose-400',
    text: 'text-rose-300',
  },
  purple: {
    bg: 'from-blue-500/10 to-blue-600/5',
    border: 'border-blue-500/30 hover:border-blue-500/50',
    icon: 'text-blue-400',
    text: 'text-blue-300',
  },
};

export default function InfoCard({
  icon: Icon,
  title,
  value,
  description,
  trend,
  color = 'cyan',
  onClick,
  className = '',
}: InfoCardProps) {
  const config = colorConfig[color];

  return (
    <div
      onClick={onClick}
      className={`
        bg-gradient-to-br ${config.bg} rounded-xl p-6 border border-slate-700/50 ${config.border}
        transition-all duration-300 hover:shadow-xl hover:shadow-slate-950/50
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-lg bg-gradient-to-br from-slate-700/50 to-slate-800/50">
          <Icon className={`w-6 h-6 ${config.icon}`} />
        </div>
        {trend && (
          <div className={`text-sm font-semibold ${trend.isPositive ? 'text-green-400' : 'text-rose-400'}`}>
            {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
          </div>
        )}
      </div>

      <div>
        <p className="text-sm text-slate-400 mb-1">{title}</p>
        <p className="text-3xl font-bold text-slate-100 mb-2">{value}</p>
        {description && (
          <p className="text-xs text-slate-500">{description}</p>
        )}
      </div>
    </div>
  );
}
