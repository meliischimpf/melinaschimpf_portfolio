import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simular envío del formulario
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      setTimeout(() => {
        setSubmitStatus('')
      }, 5000)
    }, 2000)
  }

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email",
      info: "melischimpf@gmail.com",
      link: "mailto:melischimpf@gmail.com"
    },
    {
      icon: <Phone size={24} />,
      title: "Teléfono",
      info: "+54 (3444) 41-2369",
      link: "tel:+543444412369"
    },
    {
      icon: <MapPin size={24} />,
      title: "Ubicación",
      info: "Gualeguaychú, Entre Ríos, Argentina",
      link: "#"
    }
  ]

  const socialLinks = [
    {
      icon: <Github size={24} />,
      name: "GitHub",
      url: "https://github.com/melischimpf",
      color: "#333"
    },
    {
      icon: <Linkedin size={24} />,
      name: "LinkedIn",
      url: "https://linkedin.com/in/melina-schimpf",
      color: "#0077b5"
    },
    {
      icon: <Mail size={24} />,
      name: "Email",
      url: "mailto:melischimpf@gmail.com",
      color: "#ea4335"
    }
  ]

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h2>Contacto</h2>
          <p>¿Tienes un proyecto en mente? ¡Hablemos y hagámoslo realidad!</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-intro">
              <h3>¡Trabajemos Juntos!</h3>
              <p>
                Estoy siempre interesada en nuevos proyectos y oportunidades de aprendizaje.
              Ya sea que necesites desarrollo web, análisis de datos o
              simplemente quieras charlar sobre tecnología, no dudes en contactarme.
              </p>
            </div>

            <div className="contact-details">
              {contactInfo.map((contact, index) => (
                <a 
                  key={index} 
                  href={contact.link} 
                  className="contact-item"
                  target={contact.link.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                >
                  <div className="contact-icon">
                    {contact.icon}
                  </div>
                  <div className="contact-text">
                    <h4>{contact.title}</h4>
                    <p>{contact.info}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="social-section">
              <h4>Sígueme en Redes Sociales</h4>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ '--social-color': social.color }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Envíame un Mensaje</h3>
              
              <div className="form-group">
                <label htmlFor="name">Nombre *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Tu nombre completo"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="tu.email@ejemplo.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Asunto *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="¿En qué puedo ayudarte?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensaje *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Cuéntame sobre tu proyecto o idea..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Enviar Mensaje
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="success-message">
                  ¡Mensaje enviado exitosamente! Te responderé pronto.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
