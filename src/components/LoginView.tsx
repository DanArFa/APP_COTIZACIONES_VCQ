import { useState } from 'react';
import { LogIn, Mail, Lock } from 'lucide-react';
import PremiumInput from './PremiumInput';
import Button from './Button';

interface LoginViewProps {
  onLogin: (username: string, password: string) => Promise<boolean>;
}

export default function LoginView({ onLogin }: LoginViewProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await onLogin(username.trim(), password.trim());

    if (!success) {
      setError('Usuario o contraseña incorrectos');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-glass-obsidian flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-glass-cyan/5 via-transparent to-glass-cyan/5" />
      <div className="absolute top-20 left-20 w-96 h-96 bg-glass-cyan/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-glass-cyan/10 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative z-10">
        <div className="liquid-glass rounded-3xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light text-glass-frost mb-2 tracking-wide">
              Cotizador VCQ
            </h1>
            <div className="h-px w-16 mx-auto bg-gradient-to-r from-transparent via-glass-cyan to-transparent" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <PremiumInput
              label="Usuario"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              icon={<Mail className="w-5 h-5" />}
              disabled={isLoading}
            />

            <PremiumInput
              label="Contraseña"
              placeholder="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="w-5 h-5" />}
              disabled={isLoading}
            />

            {error && (
              <div className="glass-panel px-4 py-3 rounded-lg border-rose-500/30 bg-rose-500/10 animate-fade-in-up">
                <p className="text-sm text-rose-400 flex items-center gap-2">
                  <span className="text-lg">⚠</span>
                  {error}
                </p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
              icon={<LogIn className="w-5 h-5" />}
            >
              Entrar a VCQ
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
