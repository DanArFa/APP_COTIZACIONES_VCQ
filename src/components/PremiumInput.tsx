import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PremiumInputProps {
  label: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  success?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export default function PremiumInput({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  success,
  icon,
  disabled,
}: PremiumInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isFocused = false;
  const isEmpty = !value;

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="relative group w-full">
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-glass-frost/40 group-focus-within:text-glass-cyan transition-colors">
            {icon}
          </div>
        )}
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder || label}
          disabled={disabled}
          className={`
            w-full px-4 py-3.5 rounded-xl font-medium transition-all duration-300
            bg-white/5 backdrop-blur-sm border-2 text-glass-frost
            placeholder:text-glass-frost/30
            ${icon ? 'pl-12' : ''}
            ${error
              ? 'border-rose-500/50 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/20'
              : success
                ? 'border-emerald-500/50 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20'
                : 'border-white/10 focus:border-glass-cyan focus:ring-4 focus:ring-glass-cyan/20'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-glass-frost/40 hover:text-glass-cyan transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
        {success && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      {(error || success) && (
        <p className={`text-xs mt-2 transition-all duration-200 ${
          error ? 'text-rose-400' : 'text-emerald-400'
        }`}>
          {error || '✓ Campo válido'}
        </p>
      )}
    </div>
  );
}
