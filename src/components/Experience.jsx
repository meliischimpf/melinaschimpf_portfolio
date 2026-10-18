import { useTranslation } from 'react-i18next';
import './Experience.css';

const Experience = () => {
  const { t } = useTranslation();
  const items = t('experience.items', { returnObjects: true });

  return (
    <section id="experience" className="section section--alt">
      <div className="container">
        <header className="section-header reveal">
          <span className="eyebrow">{t('experience.eyebrow')}</span>
          <h2 className="section-title">{t('experience.title')}</h2>
        </header>

        <ol className="timeline">
          {items.map((item, index) => {
            const isCurrent = index === 0;
            return (
              <li key={`${item.company}-${item.role}`} className={`timeline__item reveal ${isCurrent ? 'timeline__item--current' : ''}`}>
                <div className="timeline__period">
                  {item.period}
                  {isCurrent && <span className="tag tag--accent">{t('experience.current')}</span>}
                </div>

                <article className={isCurrent ? 'timeline__card card' : 'timeline__card'}>
                  <h3 className="timeline__role">
                    {item.role} <span className="timeline__company">· {item.company}</span>
                  </h3>
                  <p className="timeline__context">{item.context}</p>
                  <p className="timeline__summary">{item.summary}</p>

                  {item.highlights.length > 0 && (
                    <ul className="timeline__highlights">
                      {item.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  )}

                  <ul className="tags timeline__tags">
                    {item.tags.map((tag) => (
                      <li key={tag} className="tag">{tag}</li>
                    ))}
                  </ul>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Experience;
