import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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

  const { t } = useTranslation();
  
  // Obtener la información de contacto desde las traducciones
  const contactInfoData = t('contact.contactInfo', { returnObjects: true });
  const socialLinksData = t('contact.socialLinks', { returnObjects: true });

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: contactInfoData[0].title,
      info: contactInfoData[0].info,
      link: "mailto:melischimpf@gmail.com"
    },
    {
      icon: <Phone size={24} />,
      title: contactInfoData[1].title,
      info: contactInfoData[1].info,
      link: "tel:+543444412369"
    },
    {
      icon: <MapPin size={24} />,
      title: contactInfoData[2].title,
      info: contactInfoData[2].info,
      link: "#"
    }
  ]

  const socialLinks = [
    {
      icon: <Github size={24} />,
      name: socialLinksData[0].name,
      url: socialLinksData[0].url,
      color: "#333"
    },
    {
      icon: <Linkedin size={24} />,
      name: socialLinksData[1].name,
      url: socialLinksData[1].url,
      color: "#0077b5"
    },
    {
      icon: <Mail size={24} />,
      name: socialLinksData[2].name,
      url: socialLinksData[2].url,
      color: "#ea4335"
    }
  ]

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h2>{t('contact.title')}</h2>
          <p>{t('contact.subtitle')}</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-intro">
              <h3>{t('contact.workTogether')}</h3>
              <p>{t('contact.workDescription')}</p>
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
              <h4>{t('contact.followMe')}</h4>
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
              <h3>{t('contact.formTitle')}</h3>
              
              <div className="form-group">
                <label htmlFor="name">{t('contact.formFields.name')}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">{t('contact.formFields.email')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">{t('contact.formFields.subject')}</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">{t('contact.formFields.message')}</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? t('contact.sending') : t('contact.submitButton')}
              </button>
              
              {submitStatus === 'success' && (
                <div className="alert alert-success">
                  {t('contact.successMessage')}
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="alert alert-error">
                  {t('contact.errorMessage')}
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
