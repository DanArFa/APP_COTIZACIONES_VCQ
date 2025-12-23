import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

const typeConfig = {
  success: {
    icon: CheckCircle2,
    colors: 'from-emerald-500/10 to-emerald-500/5 border-emerald-500/30 text-emerald-400',
    barColor: 'bg-emerald-500',
  },
  error: {
    icon: AlertCircle,
    colors: 'from-rose-500/10 to-rose-500/5 border-rose-500/30 text-rose-400',
    barColor: 'bg-rose-500',
  },
  warning: {
    icon: AlertTriangle,
    colors: 'from-amber-500/10 to-amber-500/5 border-amber-500/30 text-amber-400',
    barColor: 'bg-amber-500',
  },
  info: {
    icon: Info,
    colors: 'from-sky-500/10 to-sky-500/5 border-sky-500/30 text-sky-400',
    barColor: 'bg-sky-500',
  },
};

export default function Toast({ id, type, title, message, duration = 4000, onClose }: ToastProps) {
  const config = typeConfig[type];
  const Icon = config.icon;
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onClose(id), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <div
      className={`
        liquid-glass border rounded-xl p-4 mb-3 max-w-md overflow-hidden
        transition-all duration-300 transform
        ${isExiting ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'}
        ${config.colors}
      `}
    >
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm text-glass-frost">{title}</p>
          {message && <p className="text-xs text-glass-frost/60 mt-1">{message}</p>}
        </div>
        <button
          onClick={() => {
            setIsExiting(true);
            setTimeout(() => onClose(id), 300);
          }}
          className="flex-shrink-0 text-glass-frost/40 hover:text-glass-frost transition-colors mt-0.5"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className={`absolute bottom-0 left-0 right-0 h-1 ${config.barColor}`} />
    </div>
  );
}
