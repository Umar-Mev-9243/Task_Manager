import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser
} from '../api/auth.js';

const AuthContext = createContext(null);
const USER_KEY = 'taskflow_user';

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY));
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  const persistUser = (data) => {
    const nextUser = data?.user;

    if (nextUser) {
      localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
      setUser(nextUser);
    }
  };

  useEffect(() => {

    getCurrentUser()
      .then((response) => {
        const currentUser = response.data?.user ?? response.data;

        if (currentUser) {
          localStorage.setItem(
            USER_KEY,
            JSON.stringify(currentUser)
          );

          setUser(currentUser);
        }
      })
      .catch(() => {
        localStorage.removeItem(USER_KEY);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });

  }, []);

  const login = async (payload) => {
    const response = await loginUser(payload);

    persistUser(response.data);

    return response.data;
  };

  const register = async (payload) => {
    const response = await registerUser(payload);

    persistUser(response.data);

    return response.data;
  };

  const logout = async () => {
    // Later we'll add POST /api/auth/logout
    try {
      await logoutUser();
      
    } finally {
      setUser(null);
    }
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}