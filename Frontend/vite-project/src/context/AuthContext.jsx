import React, { createContext, useContext, useState, useEffect } from 'react';
import api, { setAccessToken, getAccessToken } from '../api/axiosInstance';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Attempt silent refresh on initial app load to check if user has active session cookie
  const checkAuth = async () => {
    try {
      const response = await api.post('/refresh');
      const { accessToken, user: userData } = response.data;
      setAccessToken(accessToken);
      setUser(userData);
    } catch (error) {
      // User is not logged in or cookie expired
      setAccessToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/login', { email, password });
    const { accessToken, user: userData } = response.data;
    setAccessToken(accessToken);
    setUser(userData);
    return response.data;
  };

  const register = async (username, email, password) => {
    const response = await api.post('/register', { username, email, password });
    return response.data;
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken: getAccessToken(),
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
