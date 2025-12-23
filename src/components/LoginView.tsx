import { useState } from 'react';
import { LogIn } from 'lucide-react';

interface LoginViewProps {
  onLogin: (username: string, password: string) => Promise<boolean>;
}

export default function LoginView({ onLogin }: LoginViewProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await onLogin(username.trim(), password.trim());

    if (!success) {
      setError('Usuario o contraseña incorrectos');
    }
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
            <div>
              <label className="block text-xs font-medium text-glass-frost/60 mb-2 uppercase tracking-wider">
                Usuario
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu usuario"
                className="glass-input w-full px-4 py-3 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-glass-frost/60 mb-2 uppercase tracking-wider">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="glass-input w-full px-4 py-3 rounded-xl"
              />
            </div>

            {error && (
              <div className="glass-panel px-4 py-3 rounded-lg border-red-500/30 bg-red-500/10">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="glass-button-primary w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl"
            >
              <LogIn className="w-5 h-5" />
              <span>Entrar</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
