import React from 'react';
import { Heart, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();
  
  // Obtener datos de las traducciones
  const footerData = t('footer', { returnObjects: true });
  const quickLinks = footerData.quickLinks || [];
  const socialLinksData = footerData.socialLinks || [];
  
  // Mapear los enlaces sociales con los íconos correspondientes
  const socialLinks = socialLinksData.map(social => ({
    icon: social.name === 'GitHub' ? <Github size={20} /> :
          social.name === 'LinkedIn' ? <Linkedin size={20} /> :
          <Mail size={20} />,
    url: social.url,
    name: social.name
  }));

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-brand">
              <h3>Melina Schimpf Baldo</h3>
              <p>{footerData.brandDescription}</p>
            </div>
          </div>

          <div className="footer-section">
            <h4>{footerData.quickLinksTitle}</h4>
            <nav className="footer-links">
              {quickLinks.map((link, index) => (
                <a key={index} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="footer-section">
            <h4>{footerData.connectTitle}</h4>
            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="footer-contact">
              <Mail size={16} />
              {footerData.email}
            </p>
          </div>

          <div className="footer-section">
            <h4>{footerData.projectTitle}</h4>
            <p>{footerData.projectText}</p>
            <a href="#contact" className="footer-cta">
              {footerData.projectCta}
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            <p dangerouslySetInnerHTML={{
              __html: footerData.copyright
                .replace('{year}', currentYear)
                .replace('{heart}', '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="heart"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>')
            }} />
          </div>
          
          <button 
            className="scroll-to-top"
            onClick={scrollToTop}
            aria-label="Ir arriba"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
