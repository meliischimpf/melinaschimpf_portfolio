import { Cloud, Database, Server, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Skills.css';

const ICONS = [Server, Database, Cloud, ShieldCheck];

const Skills = () => {
  const { t } = useTranslation();
  const categories = t('skills.categories', { returnObjects: true });
  const also = t('skills.also', { returnObjects: true });

  return (
    <section id="skills" className="section section--alt">
      <div className="container">
        <header className="section-header reveal">
          <span className="eyebrow">{t('skills.eyebrow')}</span>
          <h2 className="section-title">{t('skills.title')}</h2>
        </header>

        <div className="skills__grid">
          {categories.map((category, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <div key={category.title} className="skills__group card reveal">
                <h3>
                  <Icon size={18} aria-hidden="true" />
                  {category.title}
                </h3>
                <ul className="tags">
                  {category.skills.map((skill) => (
                    <li key={skill} className="tag">{skill}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="skills__also reveal">
          <span>{t('skills.alsoTitle')}:</span>
          <ul className="tags">
            {also.map((tool) => (
              <li key={tool} className="tag">{tool}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Skills;
