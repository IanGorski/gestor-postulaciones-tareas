
import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Splash from '../components/Splash';
import ForgotPassword from '../components/auth/ForgotPassword';

const App = lazy(() => import('../App'));
const LoginForm = lazy(() => import('../components/auth/LoginForm'));
const RegisterForm = lazy(() => import('../components/auth/RegisterForm'));

const SplashRoute = () => {
  const navigate = useNavigate();
  return <Splash onEnter={() => navigate('/app')} />;
};

const AppRoutes = () => (
  <Suspense fallback={<div style={{ textAlign: 'center', padding: '16px' }}>Cargando…</div>}>
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/app" element={<App />} />
      <Route path="/splash" element={<SplashRoute />} />
  <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
