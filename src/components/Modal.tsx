import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  primaryAction?: {
    label: string;
    onClick: () => void;
    loading?: boolean;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  size?: 'sm' | 'md' | 'lg';
  isDanger?: boolean;
}

const sizeMap = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
};

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  primaryAction,
  secondaryAction,
  size = 'md',
  isDanger = false,
}: ModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300
        ${isAnimating ? 'opacity-100' : 'opacity-0'}
      `}
      onClick={handleClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className={`
          relative w-full ${sizeMap[size]} liquid-glass rounded-2xl border border-white/10
          transform transition-all duration-300 max-h-[90vh] overflow-y-auto
          ${isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-xl font-light text-glass-frost tracking-wide">{title}</h2>
            {description && (
              <p className="text-sm text-glass-frost/50 mt-1">{description}</p>
            )}
          </div>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-white/5 rounded-lg text-glass-frost/60 hover:text-glass-frost transition-all -mr-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {children && (
          <div className="p-6">
            {children}
          </div>
        )}

        {/* Footer */}
        {(primaryAction || secondaryAction) && (
          <div className="p-6 border-t border-white/10 flex gap-3 justify-end">
            {secondaryAction && (
              <button
                onClick={() => {
                  secondaryAction.onClick();
                  handleClose();
                }}
                className="glass-button-secondary px-6 py-2.5 rounded-lg"
              >
                {secondaryAction.label}
              </button>
            )}
            {primaryAction && (
              <button
                onClick={primaryAction.onClick}
                disabled={primaryAction.loading}
                className={`
                  ${isDanger ? 'glass-button-danger' : 'glass-button-primary'}
                  px-6 py-2.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center gap-2
                `}
              >
                {primaryAction.loading && (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                )}
                {primaryAction.label}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
