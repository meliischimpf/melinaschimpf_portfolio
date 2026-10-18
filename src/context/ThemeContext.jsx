import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

const getInitialTheme = () => {
  // index.html ya aplica el tema antes de pintar; lo leemos de ahí
  const current = document.documentElement.getAttribute('data-theme');
  if (current === 'dark' || current === 'light') return current;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('theme', next);
      } catch {
        // almacenamiento no disponible: el tema igual cambia
      }
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, darkMode: theme === 'dark', toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
