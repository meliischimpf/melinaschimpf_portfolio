import React from 'react'
import { Heart, Github, Linkedin, Mail, ArrowUp } from 'lucide-react'
import './Footer.css'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { href: '#home', label: 'Inicio' },
    { href: '#about', label: 'Acerca de' },
    { href: '#skills', label: 'Habilidades' },
    { href: '#projects', label: 'Proyectos' },
    { href: '#contact', label: 'Contacto' }
  ]

  const socialLinks = [
    {
      icon: <Github size={20} />,
      url: 'https://github.com/melischimpf',
      name: 'GitHub'
    },
    {
      icon: <Linkedin size={20} />,
      url: 'https://linkedin.com/in/melina-schimpf',
      name: 'LinkedIn'
    },
    {
      icon: <Mail size={20} />,
      url: 'mailto:melischimpf@gmail.com',
      name: 'Email'
    }
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-brand">
              <h3>Melina Schimpf Baldo</h3>
              <p>
                Estudiante de Desarrollo de Software apasionada por crear
                soluciones digitales innovadoras y análisis de datos.
              </p>
            </div>
          </div>

          <div className="footer-section">
            <h4>Enlaces Rápidos</h4>
            <nav className="footer-links">
              {quickLinks.map((link, index) => (
                <a key={index} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="footer-section">
            <h4>Conecta Conmigo</h4>
            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="footer-contact">
              <Mail size={16} />
              melischimpf@gmail.com
            </p>
          </div>

          <div className="footer-section">
            <h4>¿Tienes un proyecto?</h4>
            <p>¡Hablemos y hagámoslo realidad!</p>
            <a href="#contact" className="footer-cta">
              Comenzar Proyecto
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>
              © {currentYear} Melina Schimpf Baldo. Hecho con <Heart size={16} className="heart" />
              por una desarrolladora apasionada.
            </p>
          </div>
          
          <button 
            className="scroll-to-top"
            onClick={scrollToTop}
            aria-label="Ir arriba"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
