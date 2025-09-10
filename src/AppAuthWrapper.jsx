import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useLocation } from 'react-router-dom';

function AuthGate({ children }) {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (loading) return <Box sx={{ mt: 8, textAlign: 'center' }}><CircularProgress /></Box>;
  if (!user) {
    if (location.pathname === '/register') {
      return <RegisterForm />;
    }
    // Puedes agregar más rutas si lo necesitas
    return <LoginForm />;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <Box sx={{ position: 'fixed', top: 12, right: 18, zIndex: 2000 }}>
        <Button variant="outlined" color="secondary" size="small" onClick={handleLogout}>Cerrar sesión</Button>
      </Box>
      {children}
    </>
  );
}

export default function AppAuthWrapper({ children }) {
  return (
    <AuthProvider>
      <AuthGate>{children}</AuthGate>
    </AuthProvider>
  );
}
