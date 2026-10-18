import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, Filter, PlayCircle, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import anime from 'animejs/lib/anime.es.js';
import AnimatedElement from './animations/AnimatedElement';
import './Projects.css';
import './animations/animations.css';

const Projects = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  const [videoModal, setVideoModal] = useState(null);

  const projectsData = t('projects.projects', { returnObjects: true });
  const categories = [
    { id: 'all', label: t('projects.filters.all') },
    { id: 'fullstack', label: t('projects.filters.fullstack') },
    { id: 'backend', label: t('projects.filters.backend') },
    { id: 'frontend', label: t('projects.filters.frontend') },
    { id: 'data', label: t('projects.filters.data') }
  ];

  // Mapear los proyectos con los datos estáticos necesarios
  const closeButtonRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: projectsData[0].title,
      description: projectsData[0].description,
      image: "/assets/images/r8-audio-screenshot.jpg",
      technologies: projectsData[0].technologies,
      category: "fullstack",
      liveUrl: "https://www.r8.audio/",
      githubUrl: "private",
      featured: true
    },
    {
      id: 2,
      title: projectsData[1].title,
      description: projectsData[1].description,
      image: "/assets/images/ding-screenshot.png",
      technologies: projectsData[1].technologies,
      category: "fullstack",
      videoUrl: "/assets/demos/ding/Demo - Ding.mp4",
      githubUrl: "private",
      featured: true
    },
    {
      id: 3,
      title: projectsData[2].title,
      description: projectsData[2].description,
      image: "/assets/images/maquinaria-vial-screenshot.png",
      technologies: projectsData[2].technologies,
      category: "fullstack",
      liveUrl: "https://gestion-maquinaria-vial.onrender.com/",
      githubUrl: "https://github.com/meliischimpf/gestion_maquinaria_vial",
      featured: true
    },
    { 
      id: 4,
      title: projectsData[3].title,
      description: projectsData[3].description,
      image: "/assets/images/battleship-screenshot.png",
      technologies: projectsData[3].technologies,
      category: "frontend",
      liveUrl: "https://batalla-naval-kappa.vercel.app",
      githubUrl: "https://github.com/meliischimpf/batalla-naval",
      featured: true
    },
    {
      id: 5,
      title: projectsData[4].title,
      description: projectsData[4].description,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
      technologies: projectsData[4].technologies,
      category: "data",
      githubUrl: "https://github.com/meliischimpf/meliischimpf-representacion_femenina_en_videojuegos",
      featured: true
    },
    {
      id: 6,
      title: projectsData[5].title,
      description: projectsData[5].description,
      image: "/assets/images/under-construction.png",
      technologies: projectsData[5].technologies,
      category: "fullstack",
      githubUrl: "https://github.com/meliischimpf/timbre-dpto",
      featured: false
    },
    {
      id: 7,
      title: projectsData[6].title,
      description: projectsData[6].description,
      image: "/assets/images/under-construction.png",
      technologies: projectsData[6].technologies,
      category: "fullstack",
      githubUrl: "https://github.com/meliischimpf/timbre_mobile",
      featured: false
    },
    {
      id: 8,
      title: projectsData[7].title,
      description: projectsData[7].description,
      image: "/assets/images/portfolio-screenshot.png",
      technologies: projectsData[7].technologies,
      category: "frontend",
      liveUrl: "https://melinaschimpf-portfolio.vercel.app/",
      githubUrl: "https://github.com/meliischimpf/melinaschimpf_portfolio/",
      featured: true
    },
    {
     id: 9,
      title: projectsData[8].title,
      description: projectsData[8].description,
      image: "/assets/images/firme-como-rulo-screenshot.png",
      technologies: projectsData[8].technologies,
      category: "fullstack",
      githubUrl: "https://github.com/meliischimpf/Firme_Como_Rulo",
      featured: true 
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const featuredProjects = projects.filter(project => project.featured);

  const openVideoModal = (videoUrl, title) => {
    setVideoModal({ url: videoUrl, title });
  };

  const closeVideoModal = () => {
    setVideoModal(null);
  };

  // Efecto para animación de scroll
  const projectsRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Animación de título y subtítulo
    anime({
      targets: '.section-header h2, .section-header p',
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 1000,
      delay: (el, i) => 100 * i,
      easing: 'easeOutExpo'
    });

    // Configurar el observador de intersección para animaciones al hacer scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animación de las tarjetas de proyectos
          anime({
            targets: '.project-card, .featured-project',
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 800,
            delay: anime.stagger(100, {start: 200}),
            easing: 'easeOutExpo'
          });
        }
      });
    }, { threshold: 0.1 });

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    return () => {
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current);
      }
    };
  }, [filter]);

  useEffect(() => {
    if (!videoModal) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeVideoModal();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [videoModal]);

  const isVideoFile = videoModal?.url ? /\.(mp4|webm|ogg)(\?.*)?$/i.test(videoModal.url) : false;

  // Efecto de hover mejorado para las tarjetas
  const handleMouseEnter = (e) => {
    anime({
      targets: e.currentTarget,
      scale: 1.03,
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      duration: 300,
      easing: 'easeOutExpo'
    });
  };

  const handleMouseLeave = (e) => {
    anime({
      targets: e.currentTarget,
      scale: 1,
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
      duration: 300,
      easing: 'easeOutExpo'
    });
  };

  // Animación de los botones de filtro
  const filterButtonsAnimation = (index) => ({
    opacity: [0, 1],
    translateX: [index % 2 === 0 ? -20 : 20, 0],
    delay: 300 + (index * 100),
    duration: 800,
    easing: 'easeOutExpo'
  });

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <AnimatedElement animation="fadeIn" delay={200}>
            <h2>{t('projects.title')}</h2>
          </AnimatedElement>
          <AnimatedElement animation="fadeIn" delay={300}>
            <p>{t('projects.subtitle')}</p>
          </AnimatedElement>
        </div>

        {/* Featured Projects */}
        <div className="featured-section">
          <AnimatedElement animation="slideInLeft" delay={400}>
            <h3>{t('projects.featuredTitle')}</h3>
          </AnimatedElement>
          <div className="featured-grid" ref={projectsRef}>
            {featuredProjects.map((project, index) => (
              <AnimatedElement 
                key={project.id} 
                className={`featured-project project-card`}
                animation="fadeIn"
                delay={400 + (index * 100)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay">
                    <div className="project-links">
                      {project.videoUrl ? (
                        <button
                          type="button"
                          className="project-link"
                          onClick={() => openVideoModal(project.videoUrl, project.title)}
                          aria-label={`${t('projects.viewDemo')} ${project.title}`}
                        >
                          <PlayCircle size={20} />
                        </button>
                      ) : project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          className="project-link"
                          aria-label={`${t('projects.viewProject')} ${project.title}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={20} />
                        </a>
                      ) : null}
                      {project.githubUrl && project.githubUrl !== 'private' && (
                        <a
                          href={project.githubUrl}
                          className="project-link"
                          aria-label={t('projects.viewCode')}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="project-content">
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                  <div className="project-technologies">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>

        {/* All Projects with Filter */}
        <div className="all-projects-section">
          <div className="filter-section">
            <AnimatedElement animation="fadeIn" delay={500}>
              <div className="filter-header">
                <h3>{t('projects.filters.title')}</h3>
                <Filter size={20} className="animated-filter-icon" />
              </div>
            </AnimatedElement>
            <div className="filter-buttons">
              {categories.map((category, index) => (
                <AnimatedElement 
                  key={category.id}
                  animation="fadeIn"
                  delay={600 + (index * 100)}
                >
                  <button
                    className={`filter-btn animated-button ${filter === category.id ? 'active' : ''}`}
                    onClick={() => {
                      setFilter(category.id);
                      // Animación al hacer clic
                      anime({
                        targets: '.filter-btn',
                        scale: [1, 0.95, 1],
                        duration: 300,
                        easing: 'easeInOutQuad'
                      });
                    }}
                  >
                    {category.label}
                  </button>
                </AnimatedElement>
              ))}
            </div>
          </div>

          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <AnimatedElement 
                key={project.id} 
                className="project-card"
                animation="fadeIn"
                delay={700 + (index * 50)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay">
                    <div className="project-links">
                      {project.videoUrl ? (
                        <button
                          type="button"
                          className="project-link"
                          onClick={() => openVideoModal(project.videoUrl, project.title)}
                          aria-label={`${t('projects.viewDemo')} ${project.title}`}
                        >
                          <PlayCircle size={18} />
                        </button>
                      ) : project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          className="project-link"
                          aria-label={t('projects.viewProject')}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={18} />
                        </a>
                      ) : null}
                      {project.githubUrl && project.githubUrl !== 'private' && (
                        <a
                          href={project.githubUrl}
                          className="project-link"
                          aria-label={t('projects.viewCode')}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="project-content">
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                  <div className="project-technologies">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <AnimatedElement 
                        key={techIndex} 
                        animation="scaleIn" 
                        delay={800 + (index * 50) + (techIndex * 100)}
                      >
                        <span className="tech-tag">{tech}</span>
                      </AnimatedElement>
                    ))}
                    {project.technologies.length > 3 && (
                      <AnimatedElement animation="scaleIn" delay={1100 + (index * 50)}>
                        <span className="tech-tag more">+{project.technologies.length - 3}</span>
                      </AnimatedElement>
                    )}
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </div>
      {videoModal && (
        <div
          className="video-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`${t('projects.viewDemo')} ${videoModal.title}`}
          onClick={closeVideoModal}
        >
          <div
            className="video-modal-content"
            onClick={(event) => event.stopPropagation()}
            role="document"
          >
            <div className="video-modal-header">
              <h4>{videoModal.title}</h4>
              <button
                type="button"
                className="video-modal-close"
                onClick={closeVideoModal}
                aria-label={t('projects.closeDemo')}
                ref={closeButtonRef}
              >
                <X size={20} />
              </button>
            </div>
            <div className="video-modal-body">
              {isVideoFile ? (
                <video src={videoModal.url} controls autoPlay playsInline />
              ) : (
                <iframe
                  src={videoModal.url}
                  title={videoModal.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default React.memo(Projects);
