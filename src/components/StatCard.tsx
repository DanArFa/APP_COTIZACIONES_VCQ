import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  unit?: string;
  change?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'cyan' | 'emerald' | 'amber' | 'sky' | 'rose';
  onClick?: () => void;
}

const colorConfig = {
  cyan: {
    bg: 'bg-glass-cyan/10',
    border: 'border-glass-cyan/20',
    icon: 'text-glass-cyan',
    dot: 'bg-glass-cyan',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    icon: 'text-emerald-400',
    dot: 'bg-emerald-400',
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    icon: 'text-amber-400',
    dot: 'bg-amber-400',
  },
  sky: {
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
    icon: 'text-sky-400',
    dot: 'bg-sky-400',
  },
  rose: {
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    icon: 'text-rose-400',
    dot: 'bg-rose-400',
  },
};

export default function StatCard({
  icon: Icon,
  label,
  value,
  unit,
  change,
  color = 'cyan',
  onClick,
}: StatCardProps) {
  const config = colorConfig[color];

  return (
    <div
      onClick={onClick}
      className={`
        liquid-glass liquid-glass-hover rounded-2xl p-6
        border ${config.border}
        transition-all duration-300
        ${onClick ? 'cursor-pointer' : ''}
        group
      `}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${config.bg} border ${config.border}`}>
          <Icon className={`w-6 h-6 ${config.icon} group-hover:scale-110 transition-transform`} />
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${
            change.isPositive ? 'text-emerald-400' : 'text-rose-400'
          }`}>
            <span>{change.isPositive ? '↑' : '↓'}</span>
            <span>{Math.abs(change.value)}%</span>
          </div>
        )}
      </div>

      <p className="text-xs text-glass-frost/50 uppercase tracking-wider mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-light text-glass-frost">{value}</p>
        {unit && <p className="text-sm text-glass-frost/50">{unit}</p>}
      </div>
    </div>
  );
}
