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
    <div className="glass-panel backdrop-blur-2xl border-b border-white/10 shadow-glass-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={handleBack}
                className="p-2 rounded-lg hover:bg-white/5 transition-all duration-200 text-glass-frost/60 hover:text-glass-cyan group border border-transparent hover:border-glass-cyan/30"
                title={backLabel}
              >
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              </button>
              <h1 className="text-3xl font-light text-glass-frost tracking-wide">{title}</h1>
            </div>
            {description && (
              <p className="text-glass-frost/50 ml-11 text-sm">{description}</p>
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
