import { ReactNode } from 'react';

interface LayoutAuthProps {
  children: ReactNode;
}

export function LayoutAuth({ children }: LayoutAuthProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {children}
    </div>
  );
}
