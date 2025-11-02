import React from 'react';
import { useTranslation } from 'react-i18next';
import './Skills.css';

const Skills = () => {
  const { t } = useTranslation();
  
  // Obtener las categorías de habilidades desde las traducciones
  const skillCategories = t('skills.categories', { returnObjects: true });
  const tools = t('skills.tools', { returnObjects: true });

  return (
    <section id="skills" className="skills">
      <div className="container">
        <div className="section-header">
          <h2>{t('skills.title')}</h2>
          <p>{t('skills.subtitle')}</p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3>{category.title}</h3>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="tools-section">
          <h3>{t('skills.additionalTools')}</h3>
          <div className="tools-grid">
            {tools.map((tool, index) => (
              <div key={index} className="tool-tag">
                {tool}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
