import React, { useState } from 'react'
import { ExternalLink, Github, Filter } from 'lucide-react'
import './Projects.css'

const Projects = () => {
  const [filter, setFilter] = useState('all')

  const projects = [
    {
      id: 1,
      title: "Sistema de Gestión de Maquinaria Vial",
      description: "Aplicación web completa desarrollada con PHP y Laravel, incluyendo autenticación, CRUD de usuarios, manejo de archivos y panel administrativo con Bootstrap.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=300&fit=crop",
      technologies: ["PHP", "Laravel", "MySQL", "Bootstrap", "Blade"],
      category: "fullstack",
      //liveUrl: "#",
      githubUrl: "https://github.com/meliischimpf/gestion_maquinaria_vial",
      featured: true
    },
    { 
      id: 2,
      title: "Batalla Naval",
      description: "El reconocido juego batalla naval, creado con HTML, CSS y JavaScript",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=500&h=300&fit=crop",
      technologies: ["HTML5", "CSS3", "JavaScript"],
      category: "frontend",
      //liveUrl: "#",
      githubUrl: "https://github.com/meliischimpf/batalla-naval",
      featured: true
    },
    {
      id: 3,
      title: "Proyecto Data Analytics",
      description: "Proyecto Data Analytics sobre Representación Femenina en Videojuegos según certificación Jump! Data Analytics.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
      technologies: ["Power BI", "SQL Server", "Excel", "Data Analytics"],
      category: "data",
      //liveUrl: "#",
      githubUrl: "https://github.com/meliischimpf/meliischimpf-representacion_femenina_en_videojuegos",
      featured: true
    },
    /* {
      id: 3,
      title: "Aplicación React Interactiva",
      description: "Aplicación web moderna desarrollada con React, implementando componentes reutilizables, hooks y manejo de estado para una experiencia de usuario fluida.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=300&fit=crop",
      technologies: ["React", "JavaScript", "CSS", "Hooks"],
      category: "frontend",
      liveUrl: "#",
      githubUrl: "https://github.com/meliischimpf",
      featured: true
    }, */
    /* {
      id: 5,
      title: "API REST con Laravel",
      description: "API RESTful desarrollada con Laravel, implementando autenticación JWT, validaciones, relaciones de base de datos y documentación con Swagger.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&h=300&fit=crop",
      technologies: ["PHP", "Laravel", "MySQL", "API REST", "JWT"],
      category: "backend",
      liveUrl: "#",
      githubUrl: "https://github.com/meliischimpf",
      featured: false
    }, */
    {
      id: 4,
      title: "Proyecto de Timbre QR (Under Construction)",
      description: "Proyecto de Timbre con scanner de QR para mi departamento",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&h=300&fit=crop",
      technologies: ["HTML", "CSS3", "JavaScript", "NodeJS"],
      category: "fullstack",
      //liveUrl: "#",
      githubUrl: "https://github.com/meliischimpf/timbre-dpto",
      featured: false
    },
  ]

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'fullstack', label: 'FullStack'},
    { id: 'backend', label: 'Backend' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'data', label: 'Análisis de Datos' }
  ]

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter)

  const featuredProjects = projects.filter(project => project.featured)

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-header">
          <h2>Mis Proyectos</h2>
          <p>Una selección de mis trabajos más destacados y recientes</p>
        </div>

        {/* Featured Projects */}
        <div className="featured-section">
          <h3>Proyectos Destacados</h3>
          <div className="featured-grid">
            {featuredProjects.map(project => (
              <div key={project.id} className="featured-project">
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay">
                    <div className="project-links">
                      <a href={project.liveUrl} className="project-link" aria-label="Ver proyecto">
                        <ExternalLink size={20} />
                      </a>
                      <a href={project.githubUrl} className="project-link" aria-label="Ver código">
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
              </div>
            ))}
          </div>
        </div>

        {/* All Projects with Filter */}
        <div className="all-projects-section">
          <div className="filter-section">
            <div className="filter-header">
              <h3>Todos los Proyectos</h3>
              <Filter size={20} />
            </div>
            <div className="filter-buttons">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`filter-btn ${filter === category.id ? 'active' : ''}`}
                  onClick={() => setFilter(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="projects-grid">
            {filteredProjects.map(project => (
              <div key={project.id} className="project-card">
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
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="tech-tag more">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
