import { ReactNode } from 'react';
import { TopNavigation } from '../components/TopNavigation';

interface LayoutAdminProps {
  children: ReactNode;
  activeTab?: string;
}

export function LayoutAdmin({ children }: LayoutAdminProps) {
  return (
    <div className="min-h-screen bg-glass-obsidian relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-glass-cyan/5 via-transparent to-glass-cyan/5" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-glass-cyan/10 rounded-full blur-3xl" />

      <TopNavigation />

      <div className="relative z-10">
        <div className="min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
}
