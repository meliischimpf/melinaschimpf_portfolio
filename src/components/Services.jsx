import React from 'react';
import { Server, Database, Cloud, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Services.css';

const icons = [Server, Database, Cloud, ShieldCheck];

const Services = () => {
  const { t } = useTranslation();
  const items = t('services.items', { returnObjects: true });

  return (
    <section id="services" className="services">
      <div className="container">
        <div className="section-header">
          <h2>{t('services.title')}</h2>
          <p>{t('services.subtitle')}</p>
        </div>

        <div className="services-grid">
          {items.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div key={index} className="service-card">
                <div className="service-icon">
                  <Icon size={28} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>

        <div className="services-cta">
          <a href="#contact" className="btn">{t('services.cta')}</a>
        </div>
      </div>
    </section>
  );
};

export default Services;
