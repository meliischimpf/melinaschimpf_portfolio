import { useState } from 'react';
import { ArrowUpRight, BookOpen, Github, Lock, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PROFILE } from '../data/profile';
import Modal from './Modal';
import CaseStudy from './CaseStudy';
import './Projects.css';

// Los textos están en las traducciones (projects.items.<id>); acá solo lo que no se traduce
const FEATURED = [
  {
    id: 'r8',
    image: '/assets/images/r8-audio-screenshot.webp',
    tech: ['NestJS', 'React', 'TypeScript', 'AWS', 'Cloudflare', 'Terraform', 'Docker'],
    liveUrl: 'https://www.r8.audio/',
    privateCode: true,
  },
  {
    id: 'ding',
    image: '/assets/images/ding-screenshot.webp',
    imageSmall: '/assets/images/ding-screenshot-640.webp',
    tech: ['Laravel', 'PHP', 'MySQL', 'React', 'TypeScript'],
    videoUrl: '/assets/demos/ding/Demo - Ding.mp4',
    privateCode: true,
  },
  {
    id: 'maquinaria',
    image: '/assets/images/maquinaria-vial-screenshot.webp',
    imageSmall: '/assets/images/maquinaria-vial-screenshot-640.webp',
    tech: ['Laravel 12', 'PHP', 'MySQL', 'Tailwind CSS', 'Alpine.js', 'DomPDF'],
    liveUrl: 'https://gestion-maquinaria-vial.onrender.com/',
    githubUrl: 'https://github.com/meliischimpf/gestion_maquinaria_vial',
  },
];

const OTHERS = [
  {
    id: 'rulo',
    tech: ['PHP', 'MySQL', 'JavaScript'],
    githubUrl: 'https://github.com/meliischimpf/Firme_Como_Rulo',
  },
  {
    id: 'analytics',
    tech: ['Power BI', 'SQL Server', 'Excel'],
    githubUrl: 'https://github.com/meliischimpf/meliischimpf-representacion_femenina_en_videojuegos',
  },
  {
    id: 'battleship',
    tech: ['JavaScript', 'HTML', 'CSS'],
    liveUrl: 'https://batalla-naval-kappa.vercel.app',
    githubUrl: 'https://github.com/meliischimpf/batalla-naval',
  },
];

const ProjectLinks = ({ project, title, onPlay }) => {
  const { t } = useTranslation();
  return (
    <div className="project__links">
      {project.videoUrl && (
        <button type="button" className="text-link" onClick={() => onPlay(project.videoUrl, title)}>
          <Play size={15} /> {t('projects.demo')}
        </button>
      )}
      {project.liveUrl && (
        <a href={project.liveUrl} className="text-link" target="_blank" rel="noopener noreferrer">
          {t('projects.live')} <ArrowUpRight size={15} />
        </a>
      )}
      {project.githubUrl && (
        <a href={project.githubUrl} className="text-link" target="_blank" rel="noopener noreferrer">
          <Github size={15} /> {t('projects.code')}
        </a>
      )}
      {project.privateCode && (
        <span className="project__private">
          <Lock size={13} /> {t('projects.private')}
        </span>
      )}
    </div>
  );
};

const Projects = () => {
  const { t } = useTranslation();
  const [video, setVideo] = useState(null);
  const [caseId, setCaseId] = useState(null);

  const openVideo = (url, title) => {
    setCaseId(null);
    setVideo({ url, title });
  };

  const caseProject = FEATURED.find((project) => project.id === caseId);

  return (
    <section id="projects" className="section">
      <div className="container">
        <header className="section-header reveal">
          <span className="eyebrow">{t('projects.eyebrow')}</span>
          <h2 className="section-title">{t('projects.title')}</h2>
          <p className="section-subtitle">{t('projects.subtitle')}</p>
        </header>

        <div className="featured">
          {FEATURED.map((project, index) => {
            const text = t(`projects.items.${project.id}`, { returnObjects: true });
            return (
              <article key={project.id} className={`project card reveal ${index % 2 === 1 ? 'project--reverse' : ''}`}>
                <div className="project__media">
                  <img
                    src={project.image}
                    srcSet={project.imageSmall ? `${project.imageSmall} 640w, ${project.image} 1200w` : undefined}
                    sizes="(max-width: 860px) 100vw, 600px"
                    alt={text.title}
                    loading="lazy"
                    width="1200"
                    height="675"
                  />
                  {project.videoUrl && (
                    <button
                      type="button"
                      className="project__play"
                      onClick={() => openVideo(project.videoUrl, text.title)}
                      aria-label={`${t('projects.demo')}: ${text.title}`}
                    >
                      <Play size={22} />
                    </button>
                  )}
                </div>
                <div className="project__body">
                  <p className="project__kind">{text.kind}</p>
                  <h3 className="project__title">{text.title}</h3>
                  <p className="project__description">{text.description}</p>
                  <ul className="tags">
                    {project.tech.map((tech) => (
                      <li key={tech} className="tag">{tech}</li>
                    ))}
                  </ul>
                  <div className="project__footer">
                    <button type="button" className="btn btn--ghost project__case-btn" onClick={() => setCaseId(project.id)}>
                      <BookOpen size={16} /> {t('projects.viewCase')}
                    </button>
                    <ProjectLinks project={project} title={text.title} onPlay={openVideo} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="others">
          <div className="others__header reveal">
            <h3>{t('projects.othersTitle')}</h3>
            <a href={PROFILE.github} className="text-link" target="_blank" rel="noopener noreferrer">
              {t('projects.moreOnGithub')} <ArrowUpRight size={15} />
            </a>
          </div>
          <ul className="others__grid">
            {OTHERS.map((project) => {
              const text = t(`projects.items.${project.id}`, { returnObjects: true });
              return (
                <li key={project.id} className="other card reveal">
                  <p className="project__kind">{text.kind}</p>
                  <h4>{text.title}</h4>
                  <p className="other__description">{text.description}</p>
                  <ul className="tags">
                    {project.tech.map((tech) => (
                      <li key={tech} className="tag">{tech}</li>
                    ))}
                  </ul>
                  <ProjectLinks project={project} title={text.title} onPlay={openVideo} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {video && (
        <Modal title={video.title} closeLabel={t('projects.closeDemo')} onClose={() => setVideo(null)} size="lg">
          <video className="project__video" src={video.url} controls autoPlay playsInline preload="metadata" />
        </Modal>
      )}

      {caseProject && (
        <Modal
          title={t(`projects.items.${caseProject.id}.title`)}
          closeLabel={t('projects.close')}
          onClose={() => setCaseId(null)}
        >
          <CaseStudy project={caseProject}>
            <ProjectLinks project={caseProject} title={t(`projects.items.${caseProject.id}.title`)} onPlay={openVideo} />
          </CaseStudy>
        </Modal>
      )}
    </section>
  );
};

export default Projects;
