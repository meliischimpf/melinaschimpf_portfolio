import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../config/email';
import './Contact.css';

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
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('Enviando datos a EmailJS:', {
        service_id: EMAIL_CONFIG.SERVICE_ID,
        template_id: EMAIL_CONFIG.TEMPLATE_ID,
        user_id: EMAIL_CONFIG.PUBLIC_KEY,
        template_params: {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'melischimpf@gmail.com'
        }
      });

      const response = await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'melischimpf@gmail.com',
          reply_to: formData.email
        },
        EMAIL_CONFIG.PUBLIC_KEY
      );
      
      console.log('Respuesta de EmailJS:', response);
      
      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Mostrar mensaje de éxito por 5 segundos
        setTimeout(() => {
          setSubmitStatus('');
        }, 5000);
      } else {
        throw new Error('Error en la respuesta del servidor');
      }
      
    } catch (error) {
      console.error('Error detallado al enviar el correo:', {
        error: error,
        status: error.status,
        text: error.text,
        response: error.response
      });
      
      setSubmitStatus('error');
      
      // Mostrar mensaje de error por 5 segundos
      setTimeout(() => {
        setSubmitStatus('');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  'Enviando...'
                ) : (
                  <>
                    <Send size={18} className="mr-2" />
                    Enviar Mensaje
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <p className="submit-success">¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.</p>
              )}
              {submitStatus === 'error' && (
                <p className="submit-error">Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
