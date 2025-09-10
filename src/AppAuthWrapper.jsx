import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function AuthGate({ children }) {
  const { user, loading, logout } = useAuth();
  const [showRegister, setShowRegister] = React.useState(false);

  if (loading) return <Box sx={{ mt: 8, textAlign: 'center' }}><CircularProgress /></Box>;
  if (!user) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}>
        <Box sx={{ maxWidth: 340, width: '100%' }}>
          {showRegister ? (
            <RegisterForm onSwitch={() => setShowRegister(false)} />
          ) : (
            <LoginForm onSwitch={() => setShowRegister(true)} />
          )}
        </Box>
      </Box>
    );
  }
  return (
    <>
      <Box sx={{ position: 'fixed', top: 12, right: 18, zIndex: 2000 }}>
        <Button variant="outlined" color="secondary" size="small" onClick={logout}>Cerrar sesión</Button>
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
