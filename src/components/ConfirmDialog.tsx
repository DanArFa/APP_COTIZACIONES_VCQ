import Modal from './Modal';
import { AlertTriangle } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onConfirm: () => void | Promise<void>;
  confirmLabel?: string;
  isDanger?: boolean;
  isLoading?: boolean;
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  title,
  description,
  onConfirm,
  confirmLabel = 'Confirmar',
  isDanger = false,
  isLoading = false,
}: ConfirmDialogProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      size="sm"
      isDanger={isDanger}
      primaryAction={{
        label: confirmLabel,
        onClick: onConfirm,
        loading: isLoading,
      }}
      secondaryAction={{
        label: 'Cancelar',
        onClick: onClose,
      }}
    >
      <div className="flex gap-4 py-4">
        {isDanger && (
          <div className="flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
          </div>
        )}
        <p className="text-sm text-glass-frost/70">{description}</p>
      </div>
    </Modal>
  );
}
