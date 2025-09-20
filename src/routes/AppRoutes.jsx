
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Splash from '../components/Splash';
import LandingPage from '../components/LandingPage';
import LandingPageAlt from '../components/LandingPageAlt';

const App = lazy(() => import('../App'));

const SplashRoute = () => {
  const navigate = useNavigate();
  return <Splash onEnter={() => navigate('/app')} />;
};

const AppRoutes = () => (
  <Router>
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '16px' }}>Cargando…</div>}>
      <Routes>
        <Route path="/" element={<SplashRoute />} />
        <Route path="/app" element={<App />} />
  <Route path="/landing" element={<LandingPage />} />
  <Route path="/landing-alt" element={<LandingPageAlt />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  </Router>
);

export default AppRoutes;
