import React, { useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const particles = useRef([]);
  const animationFrame = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = heroRef.current;
    if (!container) return;

    // Símbolos para las partículas
    const symbols = ['</>', '{}', '()', '[]', ';', '=>', '{}', '//', '/*', '*/'];
    
    // Crear estrellas de fondo
    const createStars = () => {
      const starCount = 50; // Número de estrellas
      
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Tamaño aleatorio entre 1 y 3 píxeles
        const size = 1 + Math.random() * 2;
        
        // Posición aleatoria
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Opacidad aleatoria para efecto de parpadeo
        const opacity = 0.2 + Math.random() * 0.5;
        
        // Aplicar estilos
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.opacity = opacity;
        star.style.animationDelay = `${Math.random() * 5}s`; // Efecto de parpadeo aleatorio
        
        container.appendChild(star);
      }
    };
    
    // Crear partículas con símbolos de código
    const createParticles = () => {
      const particleCount = 60; // Aumenté de 25 a 60 partículas para un efecto más rico
      const colors = ['#a78bfa', '#818cf8', '#60a5fa', '#4f46e5', '#7c3aed', '#8b5cf6', '#a855f7', '#d946ef'];
      
      for (let i = 0; i < particleCount; i++) {
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = symbol;
        particle.style.color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.fontSize = `${Math.random() * 12 + 10}px`;
        particle.style.opacity = 0.6 + Math.random() * 0.4;
        particle.style.fontFamily = '"Fira Code", "Courier New", monospace';
        particle.style.fontWeight = 'bold';
        
        // Posición inicial aleatoria
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Velocidad y dirección inicial más pronunciadas
        const speed = 0.5 + Math.random() * 1.0; // Mayor velocidad para mejor desplazamiento
        const angle = Math.random() * Math.PI * 2; // Dirección aleatoria
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        
        // Objeto de partícula con movimiento direccional
        const particleObj = {
          element: particle,
          x,
          y,
          vx,
          vy,
          // Reducir significativamente el movimiento de flotación
          time: Math.random() * 100,
          // Agregar un pequeño cambio de dirección gradual
          directionChange: 0.05 + Math.random() * 0.1,
          nextDirectionChange: 100 + Math.floor(Math.random() * 200) // Cambios de dirección más espaciados
        };
        
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        
        container.appendChild(particle);
        particles.current.push(particleObj);
      }
    };

    // Animar partículas
    const animate = (timestamp) => {
      particles.current.forEach(particle => {
        if (!particle || !particle.element) return;
        
        // Cambio de dirección gradual y ocasional
        particle.time++;
        if (particle.time > particle.nextDirectionChange) {
          // Cambio suave de dirección
          const angle = Math.atan2(particle.vy, particle.vx);
          const newAngle = angle + (Math.random() - 0.5) * particle.directionChange * 2;
          const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
          
          particle.vx = Math.cos(newAngle) * speed;
          particle.vy = Math.sin(newAngle) * speed;
          particle.nextDirectionChange = particle.time + 50 + Math.floor(Math.random() * 150);
        }
        
        // Actualizar posición con movimiento suave
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Rebotar suavemente en los bordes
        if (particle.x < -5) {
          particle.x = 105;
        } else if (particle.x > 105) {
          particle.x = -5;
        }
        
        if (particle.y < -5) {
          particle.y = 105;
        } else if (particle.y > 105) {
          particle.y = -5;
        }
        
        // Aplicar transformación
        particle.element.style.transform = `translate(${particle.x}%, ${particle.y}%)`;
      });
      
      animationFrame.current = requestAnimationFrame(animate);
    };
    
    // Manejar movimiento del mouse
    const handleMouseMove = (e) => {
      if (!e) return;
      
      const rect = container.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
      const mouseY = ((e.clientY - rect.top) / rect.height) * 100;
      
      // Actualizar la posición del mouse
      mousePos.current = { x: mouseX, y: mouseY };
      
      // Hacer que las partículas se alejen del cursor
      particles.current.forEach(particle => {
        if (!particle) return;
        
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 25) { 
          const angle = Math.atan2(dy, dx);
          const force = (25 - distance) * 0.03; 
          particle.vx -= Math.cos(angle) * force;
          particle.vy -= Math.sin(angle) * force;
        }
      });
    };
    
    // Inicializar
    createStars();
    createParticles();
    
    // Último tiempo de animación para cálculos de delta
    let lastTime = 0;
    
    // Función de animación principal con tiempo delta
    const animateWithTimestamp = (timestamp) => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      
      // Ajustar velocidad según el tiempo delta para consistencia
      const timeFactor = Math.min(deltaTime / 16, 2.5); // Normalizar a ~60fps
      
      particles.current.forEach(particle => {
        if (!particle || !particle.element) return;
        
        // Aplicar movimiento con factor de tiempo
        particle.x += particle.vx * timeFactor;
        particle.y += particle.vy * timeFactor;
        
        // Aplicar transformación
        particle.element.style.transform = `translate(${particle.x}%, ${particle.y}%)`;
      });
      
      animationFrame.current = requestAnimationFrame(animateWithTimestamp);
    };
    
    animationFrame.current = requestAnimationFrame(animateWithTimestamp);
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    // Limpieza
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      particles.current.forEach(particle => {
        if (particle?.element?.parentNode) {
          particle.element.parentNode.removeChild(particle.element);
        }
      });
      particles.current = [];
    };
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hola, soy <span className="highlight">Melina Schimpf Baldo</span>
            </h1>
            <h2 className="hero-role">
              Desarrolladora de Software
            </h2>
            <p className="hero-subtitle">
              Estudiante de Tecnicatura Superior en Análisis y Desarrollo de Software.
              Apasionada por crear soluciones digitales innovadoras con HTML, CSS,
              JavaScript, PHP y tecnologías modernas.
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="btn">
                Ver Proyectos
              </a>
              <a href="#contact" className="btn btn-outline">
                <FaEnvelope size={20} />
                Contactar
              </a>
            </div>
            <div className="social-links">
              <a href="https://github.com/melischimpf" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaGithub size={20} />
              </a>
              <a href="https://linkedin.com/in/melina-schimpf" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaLinkedin size={20} />
              </a>
              <a href="mailto:melischimpf@gmail.com" className="social-link">
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>
          <div className="hero-image">
            <div className="image-container">
              <div className="image-placeholder">
                <img 
                  src="https://cdn.builder.io/api/v1/image/assets%2F1d3555ed35f44b0496853911deccc8d1%2F801419f00d304e86b2a35fd318df844c?format=webp&width=800" 
                  alt="Melina Schimpf Baldo" 
                  className="profile-photo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <button 
        className="scroll-indicator" 
        onClick={() => {
          const aboutSection = document.getElementById('about');
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <FiChevronDown size={24} />
      </button>
    </section>
  );
};

export default Hero;
