import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginView from '../components/LoginView';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (username: string, password: string): Promise<boolean> => {
    const user = await login(username, password);
    if (user) {
      const path = user.ROL === 'ADMIN' ? '/app/admin' : '/app/cliente';
      navigate(path, { replace: true });
      return true;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <LoginView onLogin={handleLogin} />
    </div>
  );
}
