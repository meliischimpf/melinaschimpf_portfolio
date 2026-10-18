import { createContext, useContext, useEffect, useState } from 'react';
import i18n from '../i18n/i18n';

const LanguageContext = createContext();

const normalize = (lng) => (lng && lng.startsWith('en') ? 'en' : 'es');

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => normalize(i18n.resolvedLanguage || i18n.language));

  useEffect(() => {
    if (normalize(i18n.language) !== language) i18n.changeLanguage(language);
    document.documentElement.lang = language;
  }, [language]);

  const changeLanguage = (lng) => setLanguage(normalize(lng));

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
