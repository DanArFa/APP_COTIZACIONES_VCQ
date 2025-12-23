import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  clickable?: boolean;
  onClick?: () => void;
  header?: ReactNode;
  footer?: ReactNode;
  padding?: 'sm' | 'md' | 'lg';
}

const paddingClasses = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export default function Card({
  children,
  className = '',
  clickable = false,
  onClick,
  header,
  footer,
  padding = 'md',
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        glass-card
        ${clickable ? 'cursor-pointer hover-lift' : ''}
        ${className}
        overflow-hidden
      `}
    >
      {header && (
        <div className={`${paddingClasses[padding]} border-b border-white/10`}>
          {header}
        </div>
      )}

      <div className={paddingClasses[padding]}>
        {children}
      </div>

      {footer && (
        <div className={`${paddingClasses[padding]} border-t border-white/10`}>
          {footer}
        </div>
      )}
    </div>
  );
}
