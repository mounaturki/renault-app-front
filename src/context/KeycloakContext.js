import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginKeycloak, refreshToken, logoutKeycloak } from '../services/api';

const KeycloakContext = createContext();

export const useKeycloak = () => useContext(KeycloakContext);

export function KeycloakProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('accessToken');
      const storedRefresh = await AsyncStorage.getItem('refreshToken');
      
      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);
        const userData = await AsyncStorage.getItem('userData');
        if (userData) setUser(JSON.parse(userData));
      } else if (storedRefresh) {
        const result = await refreshToken(storedRefresh);
        if (result.access_token) {
          await AsyncStorage.setItem('accessToken', result.access_token);
          setToken(result.access_token);
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const result = await loginKeycloak(email, password);
      
      if (result.access_token) {
        await AsyncStorage.setItem('accessToken', result.access_token);
        await AsyncStorage.setItem('refreshToken', result.refresh_token);
        
        const userInfo = {
          email: result.email || email,
          firstName: result.firstName,
          lastName: result.lastName,
          roles: result.roles || [],
        };
        await AsyncStorage.setItem('userData', JSON.stringify(userInfo));
        
        setToken(result.access_token);
        setUser(userInfo);
        setIsAuthenticated(true);
        return result;
      } else {
        throw new Error('Token non reçu');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutKeycloak(token);
    } catch (e) {
      // Ignorer les erreurs de logout
    }
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'userData']);
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    user,
    isLoading,
    token,
    login,
    logout,
  };

  return (
    <KeycloakContext.Provider value={value}>
      {children}
    </KeycloakContext.Provider>
  );
}