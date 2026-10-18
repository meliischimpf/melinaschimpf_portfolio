import { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, Github, Linkedin, Mail, MapPin, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../config/email';
import { PROFILE } from '../data/profile';
import './Contact.css';

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' };

const Contact = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  useEffect(() => {
    if (status !== 'success' && status !== 'error') return undefined;
    const timer = setTimeout(() => setStatus('idle'), 6000);
    return () => clearTimeout(timer);
  }, [status]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        { publicKey: EMAIL_CONFIG.PUBLIC_KEY },
      );
      setForm(EMPTY_FORM);
      setStatus('success');
    } catch {
      setStatus('error');
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
              <input name="name" value={form.name} onChange={handleChange} autoComplete="name" required />
            </label>
            <label className="field">
              <span>{t('contact.form.email')}</span>
              <input type="email" name="email" value={form.email} onChange={handleChange} autoComplete="email" required />
            </label>
          </div>
          <label className="field">
            <span>{t('contact.form.subject')}</span>
            <input name="subject" value={form.subject} onChange={handleChange} required />
          </label>
          <label className="field">
            <span>{t('contact.form.message')}</span>
            <textarea name="message" rows="6" value={form.message} onChange={handleChange} required />
          </label>

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
