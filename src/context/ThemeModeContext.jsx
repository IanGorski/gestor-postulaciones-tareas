import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';

const ThemeModeContext = createContext();

export function ThemeModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('mui_dark_mode');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('mui_dark_mode', darkMode);
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.getElementById('root')?.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.getElementById('root')?.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const value = useMemo(() => ({ darkMode, setDarkMode }), [darkMode]);
  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
}

export function useThemeMode() {
  return useContext(ThemeModeContext);
}
