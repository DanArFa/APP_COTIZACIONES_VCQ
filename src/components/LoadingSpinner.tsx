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
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full blur opacity-75 animate-pulse"></div>
        <div className={`${sizes[size]} bg-slate-900 rounded-full animate-spin`} style={{
          borderTop: '2px solid rgba(6, 182, 212, 0.5)',
          borderRight: '2px solid rgba(34, 197, 94, 0.5)',
          borderBottom: '2px solid rgba(6, 182, 212, 0.2)',
          borderLeft: '2px solid rgba(34, 197, 94, 0.2)',
        }}></div>
      </div>
      {text && <p className="text-slate-400 text-sm">{text}</p>}
    </div>
  );
}
