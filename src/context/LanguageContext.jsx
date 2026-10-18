import { useEffect, useState } from 'react';
import { LanguageContext } from './contexts';
import i18n from '../i18n/i18n';

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

