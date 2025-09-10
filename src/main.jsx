import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './styles/global.css';
import AppRoutes from './routes/AppRoutes.jsx';
import getTheme from './theme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ThemeModeProvider, useThemeMode } from './context/ThemeModeContext';
import AppAuthWrapper from './AppAuthWrapper';

function ThemeRoot() {
  const { darkMode } = useThemeMode();
  const theme = getTheme(darkMode ? 'dark' : 'light');
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppAuthWrapper>
        <AppRoutes />
      </AppAuthWrapper>
    </ThemeProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeModeProvider>
      <ThemeRoot />
    </ThemeModeProvider>
  </StrictMode>
);
