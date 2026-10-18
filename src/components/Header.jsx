import { useEffect, useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import LanguageSelector from './LanguageSelector';
import './Header.css';

const SECTIONS = ['about', 'experience', 'projects', 'skills', 'services', 'contact'];

const Header = () => {
  const { t } = useTranslation();
  const { darkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Marca en el menú la sección que se está viendo
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setIsMenuOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isMenuOpen]);

  return (
    <header className={`header ${isScrolled || isMenuOpen ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        <a href="#top" className="header__brand" onClick={() => setIsMenuOpen(false)}>
          <span className="header__mark" aria-hidden="true">MS</span>
          <span className="header__name">Melina Schimpf Baldo</span>
        </a>

        <nav id="main-nav" className={`header__nav ${isMenuOpen ? 'is-open' : ''}`}>
          {SECTIONS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`header__link ${active === id ? 'is-active' : ''}`}
              aria-current={active === id ? 'true' : undefined}
              onClick={() => setIsMenuOpen(false)}
            >
              {t(`nav.${id}`)}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <LanguageSelector />
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={darkMode ? t('nav.themeToLight') : t('nav.themeToDark')}
            title={darkMode ? t('nav.themeToLight') : t('nav.themeToDark')}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            type="button"
            className="icon-btn header__menu-toggle"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={isMenuOpen}
            aria-controls="main-nav"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
