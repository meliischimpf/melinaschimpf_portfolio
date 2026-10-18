import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/contexts';
import { NOTES } from '../content/notes';
import { formatDate } from '../utils/formatDate';
import './Notes.css';

const Notes = ({ exclude, title }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const notes = NOTES.filter((note) => note.slug !== exclude);

  return (
    <section id="notes" className="section">
      <div className="container">
        <header className="section-header reveal">
          <span className="eyebrow">{t('notes.eyebrow')}</span>
          <h2 className="section-title">{title || t('notes.title')}</h2>
          {!title && <p className="section-subtitle">{t('notes.subtitle')}</p>}
        </header>

        <ul className="notes__grid">
          {notes.map((note) => {
            const text = note[language];
            return (
              <li key={note.slug} className="reveal">
                <a href={`/notas/${note.slug}`} className="note-card card">
                  <span className="note-card__meta">
                    {formatDate(note.date, language)} · {t('notes.minutes', { count: note.minutes })}
                  </span>
                  <h3>{text.title}</h3>
                  <p>{text.summary}</p>
                  <span className="text-link note-card__link">
                    {t('notes.read')} <ArrowRight size={15} />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Notes;
