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
    <div className={`flex flex-wrap gap-2 ${variant === 'underline' ? 'border-b border-white/10 pb-4' : ''}`}>
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
              flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300
              group relative backdrop-blur-sm
              ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
              ${isActive
                ? 'bg-glass-cyan/15 border border-glass-cyan/40 text-glass-cyan shadow-glow-cyan'
                : 'bg-white/5 border border-white/10 text-glass-frost/60 hover:bg-white/10 hover:border-glass-cyan/20 hover:text-glass-frost'
              }
            `}
            title={tab.description}
          >
            <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span className="text-sm tracking-wide">{tab.label}</span>
            {tab.badge && (
              <span className={`
                ml-1 px-2 py-0.5 rounded-full text-xs font-semibold
                ${isActive
                  ? 'bg-glass-cyan/30 text-glass-cyan'
                  : 'bg-white/10 text-glass-frost/70'
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
