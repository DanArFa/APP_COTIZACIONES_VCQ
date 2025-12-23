type BadgeColor = 'cyan' | 'emerald' | 'amber' | 'rose' | 'sky' | 'neutral';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
  size?: BadgeSize;
  icon?: React.ReactNode;
  dot?: boolean;
}

const colorClasses = {
  cyan: 'bg-glass-cyan/15 border border-glass-cyan/30 text-glass-cyan',
  emerald: 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400',
  amber: 'bg-amber-500/15 border border-amber-500/30 text-amber-400',
  rose: 'bg-rose-500/15 border border-rose-500/30 text-rose-400',
  sky: 'bg-sky-500/15 border border-sky-500/30 text-sky-400',
  neutral: 'bg-white/10 border border-white/20 text-glass-frost/70',
};

const sizeClasses = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-xs',
  lg: 'px-4 py-2 text-sm',
};

const dotColorClasses = {
  cyan: 'bg-glass-cyan',
  emerald: 'bg-emerald-400',
  amber: 'bg-amber-400',
  rose: 'bg-rose-400',
  sky: 'bg-sky-400',
  neutral: 'bg-glass-frost/60',
};

export default function Badge({
  children,
  color = 'cyan',
  size = 'md',
  icon,
  dot,
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-2 rounded-lg font-medium
        transition-all duration-200 hover:shadow-lg
        ${colorClasses[color]}
        ${sizeClasses[size]}
      `}
    >
      {dot && <span className={`w-2 h-2 rounded-full ${dotColorClasses[color]}`} />}
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
