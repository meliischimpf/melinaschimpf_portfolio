import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Globe } from 'lucide-react';
import './LanguageSelector.css';

const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' }
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  return (
    <div className="language-selector">
      <button 
        className="language-selector__button"
        onClick={toggleDropdown}
        aria-label={t('header.language')}
        aria-expanded={isOpen}
      >
        <Globe size={16} />
        <span className="language-selector__current">
          {currentLanguage.name}
        </span>
        <ChevronDown size={16} className={`language-selector__chevron ${isOpen ? 'open' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="language-selector__dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-selector__item ${language === lang.code ? 'active' : ''}`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
