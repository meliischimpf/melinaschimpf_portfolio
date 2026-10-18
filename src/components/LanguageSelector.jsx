import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/contexts';
import './LanguageSelector.css';

const LANGUAGES = ['es', 'en'];

// Con dos idiomas alcanza un switch: un clic y listo, sin dropdown
const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <div className="lang-switch" role="group" aria-label={t('nav.language')}>
      {LANGUAGES.map((code) => (
        <button
          key={code}
          type="button"
          className={`lang-switch__option ${language === code ? 'is-active' : ''}`}
          aria-pressed={language === code}
          onClick={() => changeLanguage(code)}
          lang={code}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
