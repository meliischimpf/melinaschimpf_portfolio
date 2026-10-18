import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PROFILE } from '../data/profile';
import './Hero.css';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section id="top" className="hero">
      <div className="hero__grid-bg" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__text">
          <p className="hero__status">
            <span className="hero__dot" aria-hidden="true" />
            {t('hero.available')}
          </p>

          <h1 className="hero__title">
            <span className="hero__greeting">{t('hero.greeting')}</span>
            {PROFILE.name}
          </h1>
          <p className="hero__role">{t('hero.role')}</p>
          <p className="hero__description">{t('hero.description')}</p>

          <div className="hero__actions">
            <a href="#projects" className="btn btn--primary">
              {t('hero.ctaProjects')}
              <ArrowRight size={16} />
            </a>
            <a href="#contact" className="btn btn--ghost">
              {t('hero.ctaContact')}
            </a>
            {PROFILE.cvUrl && (
              <a href={PROFILE.cvUrl} className="btn btn--ghost" download>
                <Download size={16} />
                {t('hero.cv')}
              </a>
            )}
          </div>

          <div className="hero__social">
            <a href={PROFILE.github} className="icon-btn" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href={PROFILE.linkedin} className="icon-btn" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href={`mailto:${PROFILE.email}`} className="icon-btn" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="hero__photo-wrap">
          <img
            src={PROFILE.photo}
            alt={t('hero.photoAlt')}
            className="hero__photo"
            width="400"
            height="400"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
