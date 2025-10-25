import React, { useEffect, useRef, useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';
import './Hero.css';

// Componente para los símbolos decorativos
const CodeSymbols = () => {
  const symbols = ['</>', '{}', '[]', '()', ';', '=>', '=', '!=='];
  // Paleta de colores pastel más amplia y variada
  const colors = [
    'rgba(200, 200, 255, 0.5)',  // Azul pastel suave
    'rgba(200, 230, 255, 0.5)',  // Azul cielo pastel
    'rgba(200, 255, 240, 0.5)',  // Aguamarina pastel
    'rgba(220, 255, 200, 0.5)',  // Verde menta pastel
    'rgba(255, 255, 180, 0.5)',  // Amarillo pastel
    'rgba(255, 220, 200, 0.5)',  // Melocotón pastel
    'rgba(255, 200, 220, 0.5)',  // Rosa pastel
    'rgba(230, 200, 255, 0.5)',  // Lila pastel
    'rgba(200, 220, 255, 0.5)',  // Azul lavanda
    'rgba(200, 255, 220, 0.5)',  // Verde manzana pastel
    'rgba(255, 240, 200, 0.5)',  // Melón pastel
    'rgba(220, 200, 255, 0.5)'   // Lila suave
  ];
  const [visibleSymbols, setVisibleSymbols] = useState([]);
  const animationRef = useRef();
  const lastTimestamp = useRef(0);
  const animationSpeed = 0.2; // Controla la suavidad de la animación

  useEffect(() => {
    // Crear símbolos iniciales con más propiedades para la animación
    const initialSymbols = Array(15).fill().map((_, i) => {
      const size = 1.2 + Math.random() * 1.8;
      const speed = 0.1 + Math.random() * 0.3;
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      
      return {
        id: i,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        startX,
        startY,
        targetX: startX + (Math.random() * 40 - 20), // Objetivo más cercano
        targetY: startY + (Math.random() * 40 - 20),
        velocityX: (Math.random() - 0.5) * 0.02, // Velocidad inicial muy reducida
        velocityY: (Math.random() - 0.5) * 0.02,
        opacity: 0.2 + Math.random() * 0.25, // Ajuste de opacidad para mejor visibilidad
        rotation: Math.random() * 360,
        rotationSpeed: -1 + Math.random() * 2, // Rotación más dinámica
        scale: size,
        size: size,
        speed: speed * 0.4, // Reducir la velocidad base
        lastUpdate: Date.now(),
        // Añadir comportamiento de flotación
        floatOffset: Math.random() * 100,
        floatSpeed: 0.3 + Math.random() * 0.5, // Flotación más lenta
        floatDistance: 0.3 + Math.random() * 0.7 // Menor rango de flotación
      };
    });
    
    setVisibleSymbols(initialSymbols);

    // Función de animación mejorada con física simple
    const animate = (timestamp) => {
      const deltaTime = Math.min(32, timestamp - lastTimestamp.current);
      lastTimestamp.current = timestamp;
      
      setVisibleSymbols(prevSymbols => 
        prevSymbols.map(sym => {
          // Actualizar posición con velocidad
          let newX = sym.startX + sym.velocityX * deltaTime * 0.1;
          let newY = sym.startY + sym.velocityY * deltaTime * 0.1;
          
          // Calcular distancia al objetivo
          const dx = sym.targetX - newX;
          const dy = sym.targetY - newY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Física de movimiento
          const accel = 0.00005 * deltaTime; // Aceleración mucho más reducida
          let newVelX = sym.velocityX + (dx / (distance + 1)) * accel;
          let newVelY = sym.velocityY + (dy / (distance + 1)) * accel;
          
          // Limitar velocidad máxima
          const speed = Math.sqrt(newVelX * newVelX + newVelY * newVelY);
          const maxSpeed = sym.speed * 0.6; // Velocidad máxima reducida a la mitad
          if (speed > maxSpeed) {
            newVelX = (newVelX / speed) * maxSpeed;
            newVelY = (newVelY / speed) * maxSpeed;
          }
          
          // Rebotar suavemente de los bordes
          const margin = 5;
          if (newX < margin || newX > 100 - margin) {
            newVelX *= -0.5;
            newX = newX < margin ? margin : 100 - margin;
          }
          if (newY < margin || newY > 100 - margin) {
            newVelY *= -0.5;
            newY = newY < margin ? margin : 100 - margin;
          }
          
          // Cambiar objetivo si está lo suficientemente cerca
          if (distance < 8) { // Aumentar distancia para cambiar de dirección
            // Establecer nuevo objetivo en dirección aleatoria
            const angle = Math.random() * Math.PI * 2;
            const distance = 15 + Math.random() * 20; // Reducir distancia de movimiento
            return {
              ...sym,
              targetX: newX + Math.cos(angle) * distance,
              targetY: newY + Math.sin(angle) * distance,
              startX: newX,
              startY: newY,
              velocityX: newVelX,
              velocityY: newVelY,
              rotation: sym.rotation + sym.rotationSpeed,
              // Efecto de flotación suave
              floatOffset: sym.floatOffset + 0.01 * deltaTime,
              rotationSpeed: sym.rotationSpeed + (Math.random() * 0.02 - 0.01)
            };
          }
          
          // Aplicar efecto de flotación suave
          const floatY = Math.sin(timestamp * 0.001 * sym.floatSpeed + sym.floatOffset) * sym.floatDistance;
          
          return {
            ...sym,
            startX: newX,
            startY: newY,
            velocityX: newVelX,
            velocityY: newVelY,
            rotation: sym.rotation + sym.rotationSpeed,
            // Variar la opacidad para un efecto de parpadeo sutil
            opacity: 0.15 + (0.15 * (0.5 + 0.5 * Math.sin(timestamp * 0.001 * sym.speed))), // Variación de opacidad sutil
            // Aplicar flotación al renderizado
            renderY: newY + floatY
          };
        })
      );
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="code-symbols">
      {visibleSymbols.map(sym => (
        <span 
          key={sym.id}
          className="code-symbol"
          style={{
            top: `${sym.renderY || sym.startY}%`,
            left: `${sym.startX}%`,
            opacity: sym.opacity,
            transform: `rotate(${sym.rotation}deg) scale(${sym.scale})`,
            position: 'absolute',
            fontSize: `${1 * sym.size}rem`,
            fontFamily: '"Fira Code", "Courier New", monospace',
            pointerEvents: 'none',
            zIndex: 1,
            color: sym.color,
            // Sombra muy sutil que se integra con el fondo
            filter: 'drop-shadow(0 0 1px rgba(0,0,0,0.03))', // Sombra más sutil
            transition: 'transform 0.1s ease-out, opacity 0.3s ease-out',
            willChange: 'transform, opacity, top, left',
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d'
          }}
        >
          {sym.symbol}
        </span>
      ))}
    </div>
  );
};

const Hero = () => {
  const heroRef = useRef(null);
  const animationFrame = useRef(null);
  const lastTime = useRef(0);

  // Crear nubes (para modo claro)
  const createClouds = (container) => {
    // Limpiar contenedor existente
    const existingContainer = document.getElementById('cloud-container');
    if (existingContainer) {
      existingContainer.remove();
    }
    
    const cloudContainer = document.createElement('div');
    cloudContainer.id = 'cloud-container';
    cloudContainer.className = 'cloud-container';
    container.appendChild(cloudContainer);
    
    // Crear nubes iniciales
    const initialClouds = [
      { top: '20%', left: '10%', duration: 40 },
      { top: '40%', left: '30%', duration: 50 },
      { top: '60%', left: '60%', duration: 45 },
      { top: '30%', left: '80%', duration: 55 }
    ];
    
    // Crear nubes iniciales visibles
    initialClouds.forEach(cloudData => {
      createStaticCloud(cloudContainer, cloudData);
    });
    
    // Función para crear nubes estáticas iniciales
    function createStaticCloud(container, cloudData) {
      const cloud = document.createElement('div');
      cloud.className = 'cloud';
      
      // Tamaño y posición aleatorios para variedad
      const scale = 0.7 + Math.random() * 0.6;
      const rotation = -5 + Math.random() * 10;
      
      cloud.style.cssText = `
        left: ${cloudData.left};
        top: ${cloudData.top};
        transform: scale(${scale}) rotate(${rotation}deg);
        opacity: ${0.8 + Math.random() * 0.2};
      `;
      
      // Añadir partes adicionales a la nube
      const partCount = 3 + Math.floor(Math.random() * 3);
      let cloudParts = '';
      
      // Generar partes de nube adicionales
      for (let i = 0; i < partCount; i++) {
        const size = 30 + Math.random() * 50;
        const left = 10 + Math.random() * 100;
        const top = -10 + Math.random() * 40;
        
        cloudParts += `
          <div class="cloud-part" style="
            width: ${size}px;
            height: ${size}px;
            left: ${left}px;
            top: ${top}px;
            opacity: ${0.8 + Math.random() * 0.2};
          "></div>
        `;
      }
      
      // Añadir efecto de iluminación
      cloud.innerHTML = `
        ${cloudParts}
        <div class="highlight"></div>
      `;
      
      container.appendChild(cloud);
    }
    
    // Función para crear nubes con animación
    function createAnimatedCloud() {
      const cloud = document.createElement('div');
      cloud.className = 'cloud';
      
      const duration = 40 + Math.random() * 50;
      const startX = -200 - (Math.random() * 100);
      const y = 5 + Math.random() * 70;
      const scale = 0.5 + Math.random() * 0.8;
      const rotation = -5 + Math.random() * 10;
      
      cloud.style.cssText = `
        left: ${startX}px;
        top: ${y}%;
        transform: scale(${scale}) rotate(${rotation}deg);
        opacity: ${0.7 + Math.random() * 0.3};
        animation: moveCloud ${duration}s linear forwards;
      `;
      
      // Añadir partes adicionales a la nube
      const partCount = 2 + Math.floor(Math.random() * 4);
      let cloudParts = '';
      
      // Generar partes de nube adicionales
      for (let i = 0; i < partCount; i++) {
        const size = 20 + Math.random() * 60;
        const left = 10 + Math.random() * 100;
        const top = -20 + Math.random() * 50;
        
        cloudParts += `
          <div class="cloud-part" style="
            width: ${size}px;
            height: ${size}px;
            left: ${left}px;
            top: ${top}px;
            opacity: ${0.7 + Math.random() * 0.3};
          "></div>
        `;
      }
      
      // Añadir efecto de iluminación
      cloud.innerHTML = `
        ${cloudParts}
        <div class="highlight"></div>
      `;
      
      cloudContainer.appendChild(cloud);
      
      // Cuando termine la animación, eliminar la nube
      cloud.addEventListener('animationend', () => {
        if (cloudContainer.contains(cloud)) {
          cloudContainer.removeChild(cloud);
        }
      });
    }
    
    // Iniciar la creación de nubes animadas
    const startAnimations = () => {
      // Primera tanda de nubes
      setTimeout(createAnimatedCloud, 2000);
      
      // Crear nuevas nubes periódicamente
      setInterval(() => {
        if (Math.random() > 0.3) { // 70% de probabilidad de crear una nube
          createAnimatedCloud();
        }
      }, 5000); // Intentar crear una nube cada 5 segundos
    };
    
    // Iniciar animaciones después de un pequeño retraso
    setTimeout(startAnimations, 1000);
    
    // Agregar nubes pequeñas adicionales
    for (let i = 0; i < 10; i++) {
      const cloud = document.createElement('div');
      cloud.className = 'cloud cirrus-small';
      
      const x = -20 + Math.random() * 120;
      const y = 5 + Math.random() * 80;
      const duration = 60 + Math.random() * 100;
      const delay = Math.random() * -100;
      
      Object.assign(cloud.style, {
        left: `${x}%`,
        top: `${y}%`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        opacity: 0.4 + Math.random() * 0.3,
        zIndex: '10',
        position: 'absolute'
      });
      
      cloudContainer.appendChild(cloud);
    }
  };

  // Crear estrellas (para modo oscuro)
  const createStars = (container) => {
    const starCount = 50;
    
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      const size = 1 + Math.random() * 2;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const opacity = 0.2 + Math.random() * 0.5;
      
      Object.assign(star.style, {
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}%`,
        top: `${y}%`,
        opacity: opacity,
        animationDelay: `${Math.random() * 5}s`,
        position: 'absolute',
        zIndex: '10',
        borderRadius: '50%',
        backgroundColor: 'white',
        boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.8)'
      });
      
      container.appendChild(star);
    }
  };

  // Limpiar elementos existentes
  const clearElements = (container) => {
    const existingClouds = document.getElementById('cloud-container');
    if (existingClouds) existingClouds.remove();
    
    const existingStars = container.querySelectorAll('.star');
    existingStars.forEach(star => star.remove());
  };

  // Efecto principal
  useEffect(() => {
    const container = heroRef.current;
    if (!container) return;

    // Limpiar elementos existentes
    clearElements(container);
    
    // Crear elementos según el tema actual
    const isLightMode = document.documentElement.getAttribute('data-theme') === 'light';
    
    if (isLightMode) {
      createClouds(container);
    } else {
      createStars(container);
    }
    
    // Observar cambios en el tema
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          clearElements(container);
          
          const isNowLight = document.documentElement.getAttribute('data-theme') === 'light';
          if (isNowLight) {
            createClouds(container);
          } else {
            createStars(container);
          }
        }
      });
    });
    
    // Iniciar observación
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    
    // Limpieza
    return () => {
      observer.disconnect();
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      clearElements(container);
    };
  }, []);

  return (
    <section ref={heroRef} className="hero">
      <CodeSymbols />
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
