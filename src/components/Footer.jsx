import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PROFILE } from '../data/profile';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          © {new Date().getFullYear()} {PROFILE.name}. {t('footer.rights')}
        </p>
        <div className="footer__links">
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={18} /></a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
          <a href={`mailto:${PROFILE.email}`} aria-label="Email"><Mail size={18} /></a>
          <a href="#top" className="footer__top">
            {t('footer.backToTop')} <ArrowUp size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
