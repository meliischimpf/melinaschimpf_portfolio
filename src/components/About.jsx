import React from 'react'
import { Shield, Music, Wrench, Headphones } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import './About.css'

const About = () => {
  const { t } = useTranslation();
  
  const experiences = t('about.experiences', { returnObjects: true }).map((exp, index) => ({
    ...exp,
    icon: [<Shield size={32} />, <Music size={32} />, <Wrench size={32} />, <Headphones size={32} />][index]
  }));

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header">
          <h2>{t('about.title')}</h2>
          <p>{t('about.subtitle')}</p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <h3>{t('about.greeting')}</h3>
            <p>{t('about.description1')}</p>
            <p>{t('about.description2')}</p>
            <p>{t('about.description3')}</p>
            
            <div className="stats">
              {t('about.stats', { returnObjects: true }).map((stat, index) => (
                <div key={index} className="stat">
                  <h4>{stat.value}</h4>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="experiences">
            {experiences.map((exp, index) => (
              <div key={index} className="experience-card">
                <div className="experience-icon">
                  {exp.icon}
                </div>
                <div className="experience-content">
                  <h4>{exp.title}</h4>
                  {exp.period && <span className="experience-period">{exp.period}</span>}
                  <p>{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
