import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/contexts';
import { findNote } from '../content/notes';
import { formatDate } from '../utils/formatDate';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { PROFILE } from '../data/profile';
import Notes from './Notes';
import './NotePage.css';

const Block = ({ block }) => {
  switch (block.type) {
    case 'h2':
      return <h2>{block.text}</h2>;
    case 'ul':
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case 'code':
      return (
        <pre>
          <code>{block.text}</code>
        </pre>
      );
    default:
      return <p>{block.text}</p>;
  }
};

const NotePage = ({ slug }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const note = findNote(slug);
  const text = note?.[language];

  useDocumentMeta({
    title: text ? `${text.title} · ${PROFILE.name}` : t('meta.title'),
    description: text ? text.summary : t('meta.description'),
    path: note ? `/notas/${note.slug}` : '/',
  });

  if (!note) {
    return (
      <section id="top" className="section note-page">
        <div className="container note-page__inner">
          <p>{t('notes.notFound')}</p>
          <a href="/" className="text-link">
            <ArrowLeft size={15} /> {t('notes.back')}
          </a>
        </div>
      </section>
    );
  }

  return (
    <>
      <article id="top" className="section note-page">
        <div className="container note-page__inner">
          <a href="/#notes" className="text-link note-page__back">
            <ArrowLeft size={15} /> {t('notes.back')}
          </a>

          <header className="note-page__header">
            <span className="note-card__meta">
              {formatDate(note.date, language)} · {t('notes.minutes', { count: note.minutes })}
            </span>
            <h1>{text.title}</h1>
            <p className="note-page__summary">{text.summary}</p>
            <ul className="tags">
              {text.tags.map((tag) => (
                <li key={tag} className="tag">{tag}</li>
              ))}
            </ul>
          </header>

          <div className="note-page__body">
            {text.body.map((block, index) => (
              <Block key={index} block={block} />
            ))}
          </div>
        </div>
      </article>
      <div className="section--alt">
        <Notes exclude={note.slug} title={t('notes.more')} />
      </div>
    </>
  );
};

export default NotePage;
