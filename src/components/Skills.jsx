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
        { name: "Tailwind", level: 85 }
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "PHP", level: 90 },
        { name: "NodeJs", level: 75},
        { name: "Python", level: 60 },
        { name: "C#", level: 55 },
        { name: "Laravel", level: 85 },
        { name: "NextJs", level: 75 },
        { name: "GitHub", level: 80 },
        { name: "REST API", level: 75 },
        { name: "Postman", level: 70 },
        { name: "Lógica de Programación", level: 90 }
      ]
    },
    {
      title: "Bases de Datos & Análisis",
      skills: [
        { name: "MySQL", level: 80 },
        { name: "MariaDB", level: 80 },
        { name: "MongoDB", level: 70 },
        { name: "Power BI", level: 75 },
        { name: "Excel", level: 85 },
        { name: "Análisis de Datos", level: 85 }
      ]
    },
    {
      title: "Devops",
      skills: [
        { name: "Apache", level: 70 },
        { name: "Nginx", level: 60 },
        { name: "AWS", level: 70 },
        { name: "Docker", level: 70 },
        { name: "Kubernetes", level: 70 }
      ]
    }
  ]

  const tools = [
    "Git", "Visual Studio", "Power BI", "Excel",
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
