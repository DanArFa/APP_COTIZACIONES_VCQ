interface ProgressProps {
  value: number;
  max?: number;
  color?: 'cyan' | 'emerald' | 'amber' | 'rose';
  showLabel?: boolean;
  animated?: boolean;
}

const colorClasses = {
  cyan: 'from-glass-cyan to-glass-cyan/80',
  emerald: 'from-emerald-400 to-emerald-500',
  amber: 'from-amber-400 to-amber-500',
  rose: 'from-rose-400 to-rose-500',
};

export default function Progress({
  value,
  max = 100,
  color = 'cyan',
  showLabel = false,
  animated = true,
}: ProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full">
      <div className="glass-panel h-2 rounded-full overflow-hidden p-0">
        <div
          className={`
            h-full rounded-full bg-gradient-to-r ${colorClasses[color]}
            transition-all duration-500 ease-out
            ${animated ? 'shadow-glow-cyan' : ''}
          `}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-glass-frost/60 mt-2 text-right">
          {Math.round(percentage)}%
        </p>
      )}
    </div>
  );
}
