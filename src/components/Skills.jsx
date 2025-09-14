import React from 'react'
import './Skills.css'

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "HTML", level: 90 },
        { name: "CSS", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "React", level: 75 },
        { name: "Bootstrap", level: 80 },
        { name: "Diseño Web", level: 85 }
      ]
    },
    {
      title: "Backend & Programación",
      skills: [
        { name: "PHP", level: 90 },
        { name: "Laravel", level: 85 },
        { name: "Python", level: 60 },
        { name: "C#", level: 55 },
        { name: "Lógica de Programación", level: 85 }
      ]
    },
    {
      title: "Bases de Datos & Análisis",
      skills: [
        { name: "SQL Server", level: 85 },
        { name: "MySQL", level: 80 },
        { name: "MariaDB", level: 75 },
        { name: "Power BI", level: 80 },
        { name: "Excel", level: 90 },
        { name: "Análisis de Datos", level: 85 }
      ]
    }
  ]

  const tools = [
    "Git", "GitHub", "Visual Studio", "Power BI", "Excel",
    "Hardware", "Redes", "Sistemas Operativos", "Routers", "Mantenimiento PC"
  ]

  return (
    <section id="skills" className="skills">
      <div className="container">
        <div className="section-header">
          <h2>Habilidades Técnicas</h2>
          <p>Tecnologías y herramientas que domino para crear soluciones excepcionales</p>
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
          <h3>Herramientas y Tecnologías Adicionales</h3>
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
