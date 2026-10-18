import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, AlertCircle, Github, Linkedin, Mail, MapPin, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../config/email';
import { PROFILE } from '../data/profile';
import './Contact.css';

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' };
// Un humano tarda más que esto en completar el formulario; un bot suele enviarlo al instante
const MIN_FILL_MS = 3000;
const THROTTLE_MS = 30000;

const Contact = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error | throttled
  const [honeypot, setHoneypot] = useState('');
  const renderedAt = useRef(Date.now());

  useEffect(() => {
    if (status === 'idle' || status === 'sending') return undefined;
    const timer = setTimeout(() => setStatus('idle'), 6000);
    return () => clearTimeout(timer);
  }, [status]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Bot detectado: le mostramos éxito pero no se envía nada
    if (honeypot || Date.now() - renderedAt.current < MIN_FILL_MS) {
      setForm(EMPTY_FORM);
      setStatus('success');
      return;
    }

    setStatus('sending');
    try {
      await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          reply_to: form.email,
          subject: form.subject,
          message: form.message,
        },
        {
          publicKey: EMAIL_CONFIG.PUBLIC_KEY,
          limitRate: { id: 'contact-form', throttle: THROTTLE_MS },
        },
      );
      setForm(EMPTY_FORM);
      setStatus('success');
    } catch (error) {
      setStatus(error?.status === 429 ? 'throttled' : 'error');
    }
  };

  const channels = [
    { icon: Mail, label: t('contact.emailLabel'), value: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { icon: Linkedin, label: 'LinkedIn', value: 'in/melina-schimpf', href: PROFILE.linkedin, external: true },
    { icon: Github, label: 'GitHub', value: 'meliischimpf', href: PROFILE.github, external: true },
    { icon: MapPin, label: t('contact.locationLabel'), value: t('contact.location') },
  ];

  return (
    <section id="contact" className="section section--alt">
      <div className="container contact">
        <div className="contact__info reveal">
          <span className="eyebrow">{t('contact.eyebrow')}</span>
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="section-subtitle">{t('contact.subtitle')}</p>

          <ul className="contact__channels">
            {channels.map(({ icon: Icon, label, value, href, external }) => {
              const content = (
                <>
                  <span className="contact__icon"><Icon size={18} /></span>
                  <span>
                    <span className="contact__label">{label}</span>
                    <span className="contact__value">{value}</span>
                  </span>
                </>
              );
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      className="contact__channel"
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="contact__channel">{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <form className="contact__form card reveal" onSubmit={handleSubmit}>
          <div className="contact__row">
            <label className="field">
              <span>{t('contact.form.name')}</span>
              <input name="name" value={form.name} onChange={handleChange} autoComplete="name" maxLength={100} required />
            </label>
            <label className="field">
              <span>{t('contact.form.email')}</span>
              <input type="email" name="email" value={form.email} onChange={handleChange} autoComplete="email" maxLength={150} required />
            </label>
          </div>
          <label className="field">
            <span>{t('contact.form.subject')}</span>
            <input name="subject" value={form.subject} onChange={handleChange} maxLength={150} required />
          </label>
          <label className="field">
            <span>{t('contact.form.message')}</span>
            <textarea name="message" rows="6" value={form.message} onChange={handleChange} minLength={10} maxLength={5000} required />
          </label>

          {/* Campo trampa: invisible para personas, los bots lo completan */}
          <div className="contact__trap" aria-hidden="true">
            <label>
              Website
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </label>
          </div>

          <button type="submit" className="btn btn--primary contact__submit" disabled={status === 'sending'}>
            <Send size={16} />
            {status === 'sending' ? t('contact.form.sending') : t('contact.form.submit')}
          </button>

          <div aria-live="polite">
            {status === 'success' && (
              <p className="contact__alert contact__alert--success">
                <CheckCircle2 size={18} /> {t('contact.form.success')}
              </p>
            )}
            {status === 'throttled' && (
              <p className="contact__alert contact__alert--error">
                <AlertCircle size={18} /> {t('contact.form.throttled')}
              </p>
            )}
            {status === 'error' && (
              <p className="contact__alert contact__alert--error">
                <AlertCircle size={18} /> {t('contact.form.error')}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
