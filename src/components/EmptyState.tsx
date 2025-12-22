import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  children?: ReactNode;
}

export default function EmptyState({ icon: Icon, title, description, action, children }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-green-500/10 border border-cyan-500/20">
        <Icon className="w-12 h-12 text-cyan-400" />
      </div>
      <h3 className="text-xl font-semibold text-slate-100 mb-2">{title}</h3>
      <p className="text-slate-400 max-w-sm mb-6">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-green-500 text-slate-950 font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
        >
          {action.label}
        </button>
      )}
      {children}
    </div>
  );
}
