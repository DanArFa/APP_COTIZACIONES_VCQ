interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const sizes = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-14 h-14',
};

export default function LoadingSpinner({ size = 'md', text }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`${sizes[size]} relative`}>
        <div className="absolute inset-0 bg-glass-cyan/30 rounded-full blur-lg animate-pulse"></div>
        <div className={`${sizes[size]} rounded-full animate-spin`} style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderTop: '3px solid rgba(0, 209, 255, 0.8)',
          borderRight: '3px solid rgba(0, 209, 255, 0.3)',
          borderBottom: '3px solid rgba(0, 209, 255, 0.1)',
          borderLeft: '3px solid rgba(0, 209, 255, 0.3)',
        }}></div>
      </div>
      {text && <p className="text-glass-frost/60 text-sm tracking-wide">{text}</p>}
    </div>
  );
}
