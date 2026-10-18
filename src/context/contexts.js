import { createContext, useContext } from 'react';

// Contextos y hooks separados de los providers para que Fast Refresh funcione bien
export const ThemeContext = createContext();
export const LanguageContext = createContext();

export const useTheme = () => useContext(ThemeContext);
export const useLanguage = () => useContext(LanguageContext);
