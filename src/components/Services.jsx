import { useTranslation } from 'react-i18next';
import './Services.css';

const Services = () => {
  const { t } = useTranslation();
  const items = t('services.items', { returnObjects: true });

  return (
    <section id="services" className="section">
      <div className="container">
        <header className="section-header reveal">
          <span className="eyebrow">{t('services.eyebrow')}</span>
          <h2 className="section-title">{t('services.title')}</h2>
        </header>

        <ol className="services__list">
          {items.map((item, index) => (
            <li key={item.title} className="services__item reveal">
              <span className="services__number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Services;
