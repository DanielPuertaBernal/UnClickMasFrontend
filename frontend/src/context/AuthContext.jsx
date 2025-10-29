import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/api';
import Swal from 'sweetalert2';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un usuario en localStorage al cargar la app
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      await authService.register(userData);
      
      // Después del registro, hacer login automáticamente
      const loginResponse = await authService.login(userData.email, userData.password);
      
      localStorage.setItem('token', loginResponse.token);
      localStorage.setItem('user', JSON.stringify(loginResponse.user));
      setUser(loginResponse.user);

      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'Bienvenido a UnClickMas',
        timer: 2000,
        showConfirmButton: false,
      });

      return { success: true };
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Error al registrarse',
      });
      return { success: false, error: error.response?.data?.message };
    }
  };

  const login = async (identifier, password) => {
    try {
      const response = await authService.login(identifier, password);
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);

      Swal.fire({
        icon: 'success',
        title: '¡Bienvenido!',
        text: `Hola ${response.user.UserName}`,
        timer: 2000,
        showConfirmButton: false,
      });

      return { success: true };
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Credenciales inválidas',
      });
      return { success: false, error: error.response?.data?.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    
    Swal.fire({
      icon: 'info',
      title: 'Sesión cerrada',
      text: 'Hasta pronto',
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const updateUserPoints = (newPoints) => {
    const updatedUser = { ...user, totalpoints: newPoints };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, updateUserPoints }}>
      {children}
    </AuthContext.Provider>
  );
};