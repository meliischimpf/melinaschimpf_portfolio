import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import anime from 'animejs/lib/anime.es.js';
import AnimatedElement from './animations/AnimatedElement';
import './Projects.css';
import './animations/animations.css';

const Projects = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');

  const projectsData = t('projects.projects', { returnObjects: true });
  const categories = [
    { id: 'all', label: t('projects.filters.all') },
    { id: 'fullstack', label: t('projects.filters.fullstack') },
    { id: 'backend', label: t('projects.filters.backend') },
    { id: 'frontend', label: t('projects.filters.frontend') },
    { id: 'data', label: t('projects.filters.data') }
  ];

  // Mapear los proyectos con los datos estáticos necesarios
  const projects = [
    {
      id: 1,
      title: projectsData[0].title,
      description: projectsData[0].description,
      image: "/assets/images/maquinaria-vial-screenshot.png",
      technologies: projectsData[0].technologies,
      category: "fullstack",
      liveUrl: "https://gestion-maquinaria-vial.onrender.com/",
      githubUrl: "https://github.com/meliischimpf/gestion_maquinaria_vial",
      featured: true
    },
    { 
      id: 2,
      title: projectsData[1].title,
      description: projectsData[1].description,
      image: "/assets/images/battleship-screenshot.png",
      technologies: projectsData[1].technologies,
      category: "frontend",
      liveUrl: "https://batalla-naval-kappa.vercel.app",
      githubUrl: "https://github.com/meliischimpf/batalla-naval",
      featured: true
    },
    {
      id: 3,
      title: projectsData[2].title,
      description: projectsData[2].description,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
      technologies: projectsData[2].technologies,
      category: "data",
      githubUrl: "https://github.com/meliischimpf/meliischimpf-representacion_femenina_en_videojuegos",
      featured: true
    },
    {
      id: 4,
      title: projectsData[3].title,
      description: projectsData[3].description,
      image: "/public/assets/images/under-construction.png",
      technologies: projectsData[3].technologies,
      category: "fullstack",
      githubUrl: "https://github.com/meliischimpf/timbre-dpto",
      featured: false
    },
    {
      id: 5,
      title: projectsData[4].title,
      description: projectsData[4].description,
      image: "/assets/images/portfolio-screenshot.png",
      technologies: projectsData[4].technologies,
      category: "fullstack",
      githubUrl: "https://github.com/meliischimpf/timbre-dpto",
      featured: true
    },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const featuredProjects = projects.filter(project => project.featured);

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
                      <a href={project.liveUrl} className="project-link" aria-label={`${t('projects.viewProject')} ${project.title}`}>
                        <ExternalLink size={20} />
                      </a>
                      <a href={project.githubUrl} className="project-link" aria-label={t('projects.viewCode')}>
                        <Github size={20} />
                      </a>
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
                      <a href={project.liveUrl} className="project-link" aria-label="Ver proyecto">
                        <ExternalLink size={18} />
                      </a>
                      <a href={project.githubUrl} className="project-link" aria-label="Ver código">
                        <Github size={18} />
                      </a>
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
    </section>
  );
};

export default React.memo(Projects);
