import React from 'react'
import { Code, Server, Database, Smartphone } from 'lucide-react'
import './About.css'

const About = () => {
  const experiences = [
    {
      icon: <Code size={32} />,
      title: "Desarrollo Web",
      description: "Experiencia en el diseño y desarrollo de páginas web utilizando HTML, CSS, JavaScript y Bootstrap para crear interfaces modernas y responsivas."
    },
    {
      icon: <Database size={32} />,
      title: "Análisis de Datos",
      description: "Especializada en el uso avanzado de SQL para organización y análisis de grandes volúmenes de datos, y creación de dashboards interactivos con Power BI."
    },
    {
      icon: <Server size={32} />,
      title: "Programación Backend",
      description: "Conocimientos en PHP, Python y C#. Experiencia con frameworks como Laravel y desarrollo de videojuegos en C#."
    },
    {
      icon: <Smartphone size={32} />,
      title: "Tecnologías Emergentes",
      description: "Experiencia en Python para la industria 4.0, incluyendo codificación para detección de objetos mediante video y automatizaciones."
    }
  ]

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header">
          <h2>Acerca de Mí</h2>
          <p>Conóceme mejor y mi experiencia en desarrollo</p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <h3>¡Hola! Soy Melina Schimpf Baldo</h3>
            <p>
              Estudiante de Tecnicatura Superior en Análisis y Desarrollo de Software
              en el Instituto Superior Sedes Sapientiae, con finalización prevista para 2025.
              Me apasiona crear soluciones digitales innovadoras y eficientes.
            </p>
            <p>
              Tengo experiencia en desarrollo web con HTML, CSS, JavaScript y Bootstrap,
              así como en análisis de datos con SQL y Power BI. También he trabajado
              con lenguajes como PHP, JavaScript, TypeScript, Python y C#.
            </p>
            <p>
              Me especializo en el desarrollo web y programación, pero también en en análisis de datos.
              Siempre estoy aprendiendo nuevas tecnologías para mantenerme actualizada
              en este campo en constante evolución.
            </p>
            
            <div className="stats">
              <div className="stat">
                <h4>8+</h4>
                <p>Certificaciones Obtenidas</p>
              </div>
              <div className="stat">
                <h4>2025</h4>
                <p>Graduación Prevista</p>
              </div>
              <div className="stat">
                <h4>8+</h4>
                <p>Tecnologías Aprendidas</p>
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
