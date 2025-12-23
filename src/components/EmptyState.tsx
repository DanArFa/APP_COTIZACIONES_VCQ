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
      <div className="mb-6 p-5 rounded-2xl liquid-glass border border-glass-cyan/20">
        <Icon className="w-12 h-12 text-glass-cyan" />
      </div>
      <h3 className="text-xl font-light text-glass-frost mb-2 tracking-wide">{title}</h3>
      <p className="text-glass-frost/50 max-w-sm mb-6 text-sm">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="glass-button-primary px-6 py-3 rounded-xl"
        >
          {action.label}
        </button>
      )}
      {children}
    </div>
  );
}
