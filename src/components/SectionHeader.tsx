import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  accent?: 'cyan' | 'emerald' | 'sky' | 'amber';
}

const accentConfig = {
  cyan: 'text-glass-cyan bg-glass-cyan/10 border-glass-cyan/20',
  emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  sky: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
  amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
};

export default function SectionHeader({
  icon: Icon,
  title,
  description,
  action,
  accent = 'cyan',
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
      <div className="flex items-start gap-4 flex-1">
        {Icon && (
          <div className={`p-3 rounded-xl border ${accentConfig[accent]}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
        <div>
          <h2 className="text-2xl font-light text-glass-frost tracking-wide">{title}</h2>
          {description && (
            <p className="text-sm text-glass-frost/50 mt-1">{description}</p>
          )}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
