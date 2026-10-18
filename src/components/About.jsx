import { GraduationCap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './About.css';

const About = () => {
  const { t } = useTranslation();
  const paragraphs = t('about.paragraphs', { returnObjects: true });
  const stats = t('about.stats', { returnObjects: true });
  const education = t('about.education', { returnObjects: true });

  return (
    <section id="about" className="section">
      <div className="container about">
        <div className="about__main reveal">
          <span className="eyebrow">{t('about.eyebrow')}</span>
          <h2 className="section-title">{t('about.title')}</h2>
          <div className="about__text">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <dl className="about__stats">
            {stats.map((stat) => (
              <div key={stat.label} className="about__stat">
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="about__education card reveal">
          <h3>
            <GraduationCap size={18} aria-hidden="true" />
            {t('about.educationTitle')}
          </h3>
          <ul>
            {education.map((item) => (
              <li key={item.title}>
                <span className="about__edu-title">{item.title}</span>
                <span className="about__edu-meta">
                  {item.place} · {item.period}
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
};

export default About;
