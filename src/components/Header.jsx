import React, { useState, useEffect } from 'react'
import { Menu, X, Moon, Sun } from 'lucide-react'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [darkMode, setDarkMode] = useState(false) // Modo claro activado por defecto

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Efecto para establecer el tema inicial
  useEffect(() => {
    // Verificar si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      // Si no hay tema guardado, usar el modo claro por defecto
      setDarkMode(false);
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, []);

  // Efecto para rastrear la posición del cursor y crear rastros
  useEffect(() => {
    // No hacer nada en dispositivos táctiles para mejorar el rendimiento
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
      return () => {};
    }
    
    let trailElements = [];
    let lastTime = 0;
    const trailInterval = 15; // Aumentado ligeramente para mejor rendimiento
    const maxTrailLength = 12; // Reducido para mejor rendimiento
    
    // Variables para suavizado de movimiento
    let lastX = 0, lastY = 0;
    let velocityX = 0, velocityY = 0;
    let lastTimestamp = 0;
    const velocitySmoothing = 0.8;
    
    // Historial de posiciones para suavizado
    const positionHistory = [];
    const maxHistory = 3;
    
    // Contenedor para los elementos del rastro
    const trailContainer = document.createElement('div');
    trailContainer.style.position = 'fixed';
    trailContainer.style.top = '0';
    trailContainer.style.left = '0';
    trailContainer.style.width = '100%';
    trailContainer.style.height = '100%';
    trailContainer.style.pointerEvents = 'none';
    trailContainer.style.zIndex = '9999';
    document.body.appendChild(trailContainer);

    const createTrail = (x, y, vx = 0, vy = 0) => {
      const trail = document.createElement('div');
      const isRocket = darkMode;
      trail.className = isRocket ? 'rocket-trail' : 'smoke-trail';
      
      // Calcular posición suavizada usando el historial
      positionHistory.push({x, y});
      if (positionHistory.length > maxHistory) positionHistory.shift();
      
      const smoothX = positionHistory.reduce((sum, pos) => sum + pos.x, 0) / positionHistory.length;
      const smoothY = positionHistory.reduce((sum, pos) => sum + pos.y, 0) / positionHistory.length;
      
      if (darkMode) {
        // Comportamiento para el cohete (modo oscuro)
        const speed = Math.min(Math.sqrt(vx * vx + vy * vy) / 2, 25);
        const angle = Math.atan2(vy, vx) * (180 / Math.PI) + 90;
        
        const size = 8 + speed * 0.8;
        trail.style.width = `${size}px`;
        trail.style.height = `${size * 2}px`;
        trail.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scale(0.5, 0.7)`;
        
        const offsetX = -vx * 0.008;
        const offsetY = -vy * 0.008;
        trail.style.left = `${smoothX + offsetX}px`;
        trail.style.top = `${smoothY + offsetY}px`;
      } else {
        // Comportamiento para el humo del avión (modo claro)
        const baseSize = 8 + Math.random() * 6;
        const sizeVariation = 0.5 + Math.random() * 0.5;
        const duration = 2000 + Math.random() * 2000;
        
        trail.style.width = `${baseSize}px`;
        trail.style.height = `${baseSize}px`;
        trail.style.borderRadius = '50%';
        trail.style.opacity = '0';
        trail.style.mixBlendMode = 'overlay';
        
        // Posición aleatoria alrededor del cursor con influencia de la velocidad
        const speedFactor = Math.min(Math.sqrt(vx * vx + vy * vy) * 0.05, 2);
        const offsetX = (Math.random() * 15 - 7.5) * (1 + speedFactor);
        const offsetY = (Math.random() * 10 - 12) * (1 + speedFactor * 0.5);
        
        // Posición inicial con desfase basado en la dirección del movimiento
        const initialX = smoothX + offsetX - (vx * 0.02);
        const initialY = smoothY + offsetY - (vy * 0.02);
        
        trail.style.left = `${initialX}px`;
        trail.style.top = `${initialY}px`;
        
        // Parámetros de deriva del humo
        const driftX = (Math.random() - 0.5) * 60;
        const driftY = -40 - Math.random() * 40;
        const scaleEnd = 2 + Math.random() * 2;
        
        // Crear gradiente dinámico para el humo
        const smokeHue = 0; // Tono del humo (0 para blanco/gris)
        const smokeAlpha = 0.6 + Math.random() * 0.3;
        
        // Animación con múltiples keyframes para un movimiento más orgánico
        const keyframes = [
          { 
            transform: 'translate(0, 0) scale(1)',
            opacity: 0,
            background: `hsla(${smokeHue}, 0%, 80%, ${smokeAlpha * 0.8})`,
            filter: 'blur(3px)'
          },
          { 
            transform: `translate(${driftX * 0.3}px, ${driftY * 0.3}px) scale(1.5)`,
            opacity: smokeAlpha,
            background: `hsla(${smokeHue}, 0%, 85%, ${smokeAlpha * 0.9})`,
            filter: 'blur(4px)'
          },
          { 
            transform: `translate(${driftX * 0.7}px, ${driftY * 0.7}px) scale(${scaleEnd * 0.7})`,
            opacity: smokeAlpha * 0.7,
            background: `hsla(${smokeHue}, 0%, 90%, ${smokeAlpha * 0.6})`,
            filter: 'blur(5px)'
          },
          { 
            transform: `translate(${driftX}px, ${driftY}px) scale(${scaleEnd})`,
            opacity: 0,
            background: `hsla(${smokeHue}, 0%, 95%, 0)`,
            filter: 'blur(8px)'
          }
        ];
        
        const options = {
          duration: duration,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          fill: 'forwards'
        };
        
        trail.animate(keyframes, options);
      }
      
      trailContainer.appendChild(trail);
      
      // Agregar a la lista de elementos
      trailElements.push(trail);
      
      // Limitar la cantidad de elementos
      if (trailElements.length > maxTrailLength) {
        const oldTrail = trailElements.shift();
        if (oldTrail && oldTrail.parentNode) {
          oldTrail.style.opacity = '0';
          setTimeout(() => {
            if (oldTrail.parentNode) {
              oldTrail.remove();
            }
          }, 300);
        }
      }
      
      // Eliminar después de la animación
      setTimeout(() => {
        if (trail.parentNode) {
          trail.remove();
        }
        trailElements = trailElements.filter(t => t !== trail);
      }, isRocket ? 800 : 2000);
    };

    const updateMousePosition = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseMove = (e) => {
      const now = Date.now();
      const deltaTime = now - lastTimestamp;
      
      // Calcular velocidad con suavizado
      if (lastTimestamp > 0 && deltaTime > 0) {
        const newVX = (e.clientX - lastX) / deltaTime * 1000;
        const newVY = (e.clientY - lastY) / deltaTime * 1000;
        
        // Aplicar suavizado exponencial a la velocidad
        velocityX = velocityX * velocitySmoothing + newVX * (1 - velocitySmoothing);
        velocityY = velocityY * velocitySmoothing + newVY * (1 - velocitySmoothing);
      } else {
        // Para el primer movimiento, establecer una velocidad inicial
        velocityX = 0;
        velocityY = 0;
      }
      
      lastX = e.clientX;
      lastY = e.clientY;
      lastTimestamp = now;
      
      // Crear un nuevo elemento de rastro en cada frame para mayor fluidez
      if (now - lastTime >= trailInterval) {
        createTrail(e.clientX, e.clientY, velocityX, velocityY);
        lastTime = now;
        
        // Para el humo, crear grupos de partículas
        if (!darkMode) {
          // Crear grupo de 2-4 partículas adicionales
          const particleCount = 1 + Math.floor(Math.random() * 3);
          for (let i = 0; i < particleCount; i++) {
            const delay = i * 30 + Math.random() * 20;
            setTimeout(() => {
              if (document.body) {
                // Variar ligeramente la posición y velocidad para las partículas adicionales
                const offsetX = (Math.random() - 0.5) * 20;
                const offsetY = (Math.random() - 0.5) * 20;
                createTrail(
                  e.clientX + offsetX,
                  e.clientY + offsetY,
                  velocityX * (0.8 + Math.random() * 0.4),
                  velocityY * (0.8 + Math.random() * 0.4)
                );
              }
            }, delay);
          }
        }
      }
    };

    // Limpiar rastros al cambiar de tema
    const cleanupTrails = () => {
      trailElements.forEach(trail => {
        if (trail.parentNode) {
          trail.remove();
        }
      });
      trailElements = [];
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cleanupTrails();
      // Limpiar el contenedor al desmontar
      if (trailContainer && trailContainer.parentNode) {
        trailContainer.remove();
      }
    };
  }, [darkMode])

  // Efecto para cambiar entre temas
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode])

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  const navItems = [
    { href: '#home', label: 'Inicio' },
    { href: '#about', label: 'Acerca de' },
    { href: '#skills', label: 'Habilidades' },
    { href: '#projects', label: 'Proyectos' },
    { href: '#contact', label: 'Contacto' }
  ]

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <h2>Melina Schimpf Baldo</h2>
          </div>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {darkMode ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
