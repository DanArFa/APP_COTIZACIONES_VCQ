import { ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavigationBarProps {
  title: string;
  description?: string;
  onBack?: () => void;
  backLabel?: string;
  showHome?: boolean;
  actions?: React.ReactNode;
}

export default function NavigationBar({
  title,
  description,
  onBack,
  backLabel = 'Volver',
  showHome = true,
  actions,
}: NavigationBarProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 shadow-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={handleBack}
                className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors text-slate-400 hover:text-slate-300 group"
                title={backLabel}
              >
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              </button>
              <h1 className="text-3xl font-bold text-slate-100">{title}</h1>
            </div>
            {description && (
              <p className="text-slate-400 ml-11">{description}</p>
            )}
          </div>
          {actions && (
            <div className="flex gap-2">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
