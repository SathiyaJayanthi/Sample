import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../../../api/axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('farmconnectToken'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/auth/me');
        if (response.data?.success) {
          setUser(response.data.data.user);
        } else {
          localStorage.removeItem('farmconnectToken');
          setToken(null);
        }
      } catch (error) {
        localStorage.removeItem('farmconnectToken');
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const payload = response.data;

    if (!payload.success) {
      throw new Error(payload.error || 'Login failed');
    }

    localStorage.setItem('farmconnectToken', payload.data.token);
    setToken(payload.data.token);
    setUser(payload.data.user);
    return payload.data;
  };

  const signup = async ({ name, email, password, role, phone, location }) => {
    const response = await api.post('/auth/register', { name, email, password, role, phone, location });
    const payload = response.data;

    if (!payload.success) {
      throw new Error(payload.error || 'Registration failed');
    }

    localStorage.setItem('farmconnectToken', payload.data.token);
    setToken(payload.data.token);
    setUser(payload.data.user);
    return payload.data;
  };

  const logout = () => {
    localStorage.removeItem('farmconnectToken');
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, token, loading, login, signup, logout }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthProvider;
