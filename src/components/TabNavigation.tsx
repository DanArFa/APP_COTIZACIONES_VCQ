import { LucideIcon } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
  description?: string;
  badge?: number | string;
  disabled?: boolean;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'pills' | 'underline';
}

export default function TabNavigation({
  tabs,
  activeTab,
  onChange,
  variant = 'pills',
}: TabNavigationProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${variant === 'underline' ? 'border-b border-slate-700/50 pb-4' : ''}`}>
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        const isDisabled = tab.disabled;

        return (
          <button
            key={tab.id}
            onClick={() => !isDisabled && onChange(tab.id)}
            disabled={isDisabled}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
              group relative
              ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              ${isActive
                ? 'bg-gradient-to-r from-cyan-500/20 to-green-500/10 border border-cyan-500/50 text-cyan-300 shadow-lg shadow-cyan-500/10'
                : 'bg-slate-800/30 border border-slate-700/30 text-slate-400 hover:bg-slate-700/40 hover:border-slate-600/40 hover:text-slate-300'
              }
            `}
            title={tab.description}
          >
            <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span className="text-sm">{tab.label}</span>
            {tab.badge && (
              <span className={`
                ml-1 px-2 py-0.5 rounded-full text-xs font-bold
                ${isActive
                  ? 'bg-cyan-500/40 text-cyan-200'
                  : 'bg-slate-700/50 text-slate-300'
                }
              `}>
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
