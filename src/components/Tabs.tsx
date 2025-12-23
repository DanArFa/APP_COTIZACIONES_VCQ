import { ReactNode, useState } from 'react';
import { LucideIcon } from 'lucide-react';

export interface Tab {
  id: string;
  label: string;
  icon?: LucideIcon;
  content: ReactNode;
  badge?: number | string;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'pills' | 'underline';
}

export default function Tabs({
  tabs,
  defaultTab,
  onChange,
  variant = 'pills',
}: TabsProps) {
  const [activeTab, setActiveTab] = useState<string>(
    defaultTab || tabs[0]?.id || ''
  );

  const handleChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const activeTabContent = tabs.find(tab => tab.id === activeTab);

  return (
    <div>
      <div className={`flex gap-2 mb-6 border-b ${variant === 'underline' ? 'border-white/10 pb-0' : ''}`}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleChange(tab.id)}
            disabled={tab.disabled}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium
              transition-all duration-300 relative group
              ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              ${activeTab === tab.id
                ? 'bg-glass-cyan/15 border border-glass-cyan/40 text-glass-cyan shadow-glow-cyan'
                : 'text-glass-frost/60 hover:text-glass-frost hover:bg-white/5 border border-transparent hover:border-glass-cyan/20'
              }
            `}
          >
            {tab.icon && <tab.icon className="w-4 h-4" />}
            <span>{tab.label}</span>
            {tab.badge && (
              <span className={`
                px-2 py-0.5 rounded-full text-xs font-semibold
                ${activeTab === tab.id
                  ? 'bg-glass-cyan/30 text-glass-cyan'
                  : 'bg-white/10 text-glass-frost/70'
                }
              `}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {activeTabContent && (
        <div className="animate-fade-in-up">
          {activeTabContent.content}
        </div>
      )}
    </div>
  );
}
