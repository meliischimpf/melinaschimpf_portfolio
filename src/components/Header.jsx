import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { darkMode, toggleTheme } = useTheme();

  // Efecto para manejar el scroll del header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Limpiar cualquier rastro de cursor existente
  useEffect(() => {
    // Limpiar elementos de rastro existentes
    const existingTrails = document.querySelectorAll('.flame-particle, .smoke-trail, .rocket-trail');
    existingTrails.forEach(trail => trail.remove());
    
    // Limpiar contenedores de rastro
    const trailContainers = document.querySelectorAll('[style*="pointer-events: none"][style*="z-index: 9999"]');
    trailContainers.forEach(container => container.remove());
  }, [darkMode]);

  // Función para alternar el menú móvil
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const { t } = useTranslation();
  
  const navItems = [
    { href: '#home', label: t('header.home') },
    { href: '#about', label: t('header.about') },
    { href: '#skills', label: t('header.skills') },
    { href: '#projects', label: t('header.projects') },
    { href: '#contact', label: t('header.contact') }
  ]

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <h2>Melina Schimpf Baldo</h2>
          </div>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <LanguageSelector />
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={darkMode ? t('header.themeToggle', { mode: 'claro' }) : t('header.themeToggle', { mode: 'oscuro' })}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={t('header.menu')}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
