import React from 'react'
import { Github, Linkedin, Mail, Download, ChevronDown } from 'lucide-react'
import './Hero.css'

const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hola, soy <span className="highlight">Melina Schimpf</span>
            </h1>
            <h2 className="hero-role">Desarrolladora de Software</h2>
            <p className="hero-subtitle">
              Estudiante de Tecnicatura Superior en Análisis y Desarrollo de Software.
              Apasionada por crear soluciones digitales innovadoras con HTML, CSS,
              JavaScript, Python y tecnologías modernas.
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="btn">
                Ver Proyectos
              </a>
              <a href="#contact" className="btn btn-outline">
                <Mail size={20} />
                Contactar
              </a>
            </div>
            <div className="social-links">
              <a href="https://github.com/melischimpf" target="_blank" rel="noopener noreferrer" className="social-link">
                <Github size={24} />
              </a>
              <a href="https://linkedin.com/in/melina-schimpf" target="_blank" rel="noopener noreferrer" className="social-link">
                <Linkedin size={24} />
              </a>
              <a href="mailto:melischimpf@gmail.com" className="social-link">
                <Mail size={24} />
              </a>
            </div>
          </div>
          <div className="hero-image">
            <div className="image-placeholder">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F1d3555ed35f44b0496853911deccc8d1%2F801419f00d304e86b2a35fd318df844c?format=webp&width=800"
                alt="Melina Schimpf"
                className="profile-photo"
              />
            </div>
          </div>
        </div>
        <button className="scroll-indicator" onClick={scrollToAbout}>
          <ChevronDown size={24} />
        </button>
      </div>
    </section>
  )
}

export default Hero
