import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'cliente' | 'any';
}

export function ProtectedRoute({ children, requiredRole = 'any' }: ProtectedRouteProps) {
  const { isAuthenticated, loading, getRolType } = useAuth();
  const userRole = getRolType();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-slate-700 border-t-cyan-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-300 mt-4">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole !== 'any') {
    if (requiredRole === 'admin' && userRole !== 'admin') {
      return <Navigate to="/app/cliente" replace />;
    }
    if (requiredRole === 'cliente' && userRole === 'admin') {
      return <Navigate to="/app/admin" replace />;
    }
  }

  return <>{children}</>;
}
