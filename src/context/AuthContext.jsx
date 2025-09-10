import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación: cargar usuario/token desde localStorage
    const savedUser = localStorage.getItem('auth_user');
    const savedToken = localStorage.getItem('auth_token');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
    setLoading(false);
  }, []);

  // Simulación de login
  const login = async (email, password) => {
    // Acá va a ir la llamada a la API en la actualización
    await new Promise(res => setTimeout(res, 500));
    // Validación local
    const users = JSON.parse(localStorage.getItem('auth_users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      setToken('demo-token');
      localStorage.setItem('auth_user', JSON.stringify(found));
      localStorage.setItem('auth_token', 'demo-token');
      return { success: true };
    }
    return { success: false, error: 'Usuario o contraseña incorrectos' };
  };

  // Simulación de registro
  const register = async (name, email, password) => {
    await new Promise(res => setTimeout(res, 500));
    let users = JSON.parse(localStorage.getItem('auth_users') || '[]');
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'El email ya está registrado' };
    }
    const newUser = { name, email, password, role: 'user' };
    users.push(newUser);
    localStorage.setItem('auth_users', JSON.stringify(users));
    setUser(newUser);
    setToken('demo-token');
    localStorage.setItem('auth_user', JSON.stringify(newUser));
    localStorage.setItem('auth_token', 'demo-token');
    return { success: true };
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
  };

  // Para portafolio: acá se va a reemplazar la lógica local por fetch/axios a una API

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
