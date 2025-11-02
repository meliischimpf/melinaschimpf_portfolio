import React from 'react'
import { Code, Server, Database, Smartphone } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import './About.css'

const About = () => {
  const { t } = useTranslation();
  
  const experiences = t('about.experiences', { returnObjects: true }).map((exp, index) => ({
    ...exp,
    icon: [<Code size={32} />, <Database size={32} />, <Server size={32} />, <Smartphone size={32} />][index]
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
              <div className="stat">
                <h4>8+</h4>
                <p>{t('about.stats.certifications')}</p>
              </div>
              <div className="stat">
                <h4>2025</h4>
                <p>{t('about.stats.graduation')}</p>
              </div>
              <div className="stat">
                <h4>8+</h4>
                <p>{t('about.stats.technologies')}</p>
              </div>
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
