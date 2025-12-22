import { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { loginUsuario } from '../services/usuarios';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<User | null>;
  logout: () => void;
  getRolType: () => 'cliente' | 'admin' | 'unknown';
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('currentUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<User | null> => {
    const loginUser = await loginUsuario(username, password);
    if (loginUser) {
      setUser(loginUser);
      localStorage.setItem('currentUser', JSON.stringify(loginUser));
      return loginUser;
    }
    return null;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const getRolType = (): 'cliente' | 'admin' | 'unknown' => {
    if (!user) return 'unknown';
    if (user.ROL === 'ADMIN') return 'admin';
    if (user.ROL === 'VENT' || user.ROL === 'CLIENTE') return 'cliente';
    return 'unknown';
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    getRolType,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
