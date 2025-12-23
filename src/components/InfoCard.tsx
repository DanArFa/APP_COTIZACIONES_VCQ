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
    bg: 'from-glass-cyan/10 to-glass-cyan/5',
    border: 'border-glass-cyan/20 hover:border-glass-cyan/40',
    icon: 'text-glass-cyan',
    text: 'text-glass-cyan',
    shadow: 'hover:shadow-glow-cyan',
  },
  green: {
    bg: 'from-emerald-500/10 to-emerald-600/5',
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
    icon: 'text-emerald-400',
    text: 'text-emerald-300',
    shadow: 'hover:shadow-[0_0_20px_rgba(52,211,153,0.3)]',
  },
  blue: {
    bg: 'from-sky-500/10 to-sky-600/5',
    border: 'border-sky-500/20 hover:border-sky-500/40',
    icon: 'text-sky-400',
    text: 'text-sky-300',
    shadow: 'hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]',
  },
  amber: {
    bg: 'from-amber-500/10 to-amber-600/5',
    border: 'border-amber-500/20 hover:border-amber-500/40',
    icon: 'text-amber-400',
    text: 'text-amber-300',
    shadow: 'hover:shadow-[0_0_20px_rgba(251,191,36,0.3)]',
  },
  rose: {
    bg: 'from-rose-500/10 to-rose-600/5',
    border: 'border-rose-500/20 hover:border-rose-500/40',
    icon: 'text-rose-400',
    text: 'text-rose-300',
    shadow: 'hover:shadow-[0_0_20px_rgba(251,113,133,0.3)]',
  },
  purple: {
    bg: 'from-sky-500/10 to-sky-600/5',
    border: 'border-sky-500/20 hover:border-sky-500/40',
    icon: 'text-sky-400',
    text: 'text-sky-300',
    shadow: 'hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]',
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
        liquid-glass liquid-glass-hover rounded-2xl p-6 border ${config.border}
        transition-all duration-300 ${config.shadow}
        ${onClick ? 'cursor-pointer active:scale-98' : ''}
        ${className}
      `}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
          <Icon className={`w-6 h-6 ${config.icon}`} />
        </div>
        {trend && (
          <div className={`text-sm font-semibold ${trend.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
            {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
          </div>
        )}
      </div>

      <div>
        <p className="text-xs text-glass-frost/50 mb-1 uppercase tracking-wider">{title}</p>
        <p className="text-3xl font-light text-glass-frost mb-2">{value}</p>
        {description && (
          <p className="text-xs text-glass-frost/40">{description}</p>
        )}
      </div>
    </div>
  );
}
