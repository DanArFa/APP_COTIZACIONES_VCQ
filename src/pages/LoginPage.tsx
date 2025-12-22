import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginView from '../components/LoginView';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, getRolType } = useAuth();

  const handleLogin = async (username: string, password: string): Promise<boolean> => {
    const success = await login(username, password);
    if (success) {
      const role = getRolType();
      const path = role === 'admin' ? '/app/admin' : '/app/cliente';
      navigate(path, { replace: true });
    }
    return success;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <LoginView onLogin={handleLogin} />
    </div>
  );
}
