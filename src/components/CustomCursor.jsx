import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import '../styles/CustomCursor.css';

// SVG del avión como componente para asegurar que se renderice correctamente
const AirplaneIcon = ({ isDarkMode }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill={isDarkMode ? "#ffffff" : "#64b5f6"}
    style={{
      width: '100%',
      height: '100%',
      display: 'block',
      transition: 'transform 0.1s ease-out'
    }}
  >
    <path d="M22 16v-2l-8.5-5v3.57L6.32 5.44 4.9 6.86l8.6 8.6v3.28c0 .29.34.46.6.3l1.5-.9 4.9 4.9 1.41-1.41-4.9-4.9.9-1.5c.16-.26-.01-.6-.3-.6h-3.28l-2.2-2.2V8.5L22 6z" />
  </svg>
);

const CustomCursor = () => {
  const { darkMode } = useTheme();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const cursorRef = useRef(null);
  const lastMouseMoveTime = useRef(0);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const velocity = useRef({ x: 0, y: 0 });

  // URLs de los íconos
  const rocketImage = 'https://images.vexels.com/media/users/3/188959/isolated/preview/c7ba9671168b62c47e6211f050f0df33-trazo-de-cohete-espacial-colorido.png';
  const airplaneImage = 'https://images.vexels.com/media/users/3/134463/isolated/preview/13cb7ec23a1a0732186602e870b3ea16-avion-de-juguete-de-dibujos-animados.png';

  useEffect(() => {
    const handleMouseMove = (e) => {
      const now = Date.now();
      const timeDiff = now - lastMouseMoveTime.current;
      
      if (timeDiff > 0) {
        const deltaX = e.clientX - lastX.current;
        const deltaY = e.clientY - lastY.current;
        
        // Calcular velocidad para suavizado
        velocity.current = {
          x: deltaX / timeDiff * 16,
          y: deltaY / timeDiff * 16
        };
      }
      
      lastX.current = e.clientX;
      lastY.current = e.clientY;
      lastMouseMoveTime.current = now;
      
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Verificar si el elemento bajo el cursor es clickeable
      const target = document.elementFromPoint(e.clientX, e.clientY);
      const isPointerElement = 
        target && 
        (target.tagName === 'A' || 
         target.tagName === 'BUTTON' || 
         target.getAttribute('role') === 'button' ||
         window.getComputedStyle(target).cursor === 'pointer');
      
      setIsPointer(isPointerElement);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
      document.body.style.cursor = 'none';
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
      document.body.style.cursor = '';
    };

    // Agregar event listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Actualizar la clase del body según el modo
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    // Limpiar al desmontar
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.body.classList.remove('dark-mode');
      document.body.style.cursor = '';
    };
  }, [darkMode]);

  // No renderizar en dispositivos táctiles
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  // Efectos de partículas
  useEffect(() => {
    if (!isVisible) return;
    
    // Limpiar partículas existentes
    const existingParticles = document.querySelectorAll('.flame-particle, .smoke-trail');
    existingParticles.forEach(p => p.remove());
    
    if (darkMode) {
      // Efecto de fuego para modo oscuro

    // Crear partícula de fuego para modo oscuro
    const createFireParticle = () => {
      if (!cursorRef.current) return;
      
      const particle = document.createElement('div');
      particle.className = 'flame-particle';
      
      // Tamaño aleatorio para las partículas (más variación)
      const size = Math.random() * 10 + 6;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Posición inicial (detrás del cohete con variación)
      const angle = Math.atan2(velocity.current.y, velocity.current.x) + Math.PI/2;
      const offsetX = (Math.random() - 0.5) * 20;
      const offsetY = (Math.random() * 10) + 40;
      
      // Aplicar posición inicial
      particle.style.left = `${position.x + offsetX}px`;
      particle.style.top = `${position.y + offsetY}px`;
      
      // Variables CSS para la animación de partículas
      particle.style.setProperty('--random-x', Math.random());
      particle.style.setProperty('--random-y', Math.random() * 0.5 + 0.5);
      
      // Estilo aleatorio para variar el color de las partículas
      const hue = Math.floor(Math.random() * 30) + 20; // 20-50 (tonalidades naranja/amarillo)
      const saturation = 80 + Math.floor(Math.random() * 20); // 80-100%
      const lightness = 40 + Math.floor(Math.random() * 30); // 40-70%
      
      particle.style.background = `linear-gradient(
        45deg, 
        hsla(${hue}, ${saturation}%, ${lightness}%, 0.9),
        hsla(${hue + 20}, ${saturation}%, ${lightness + 15}%, 0.7)
      )`;
      
      // Sombra con color que coincide con el gradiente
      particle.style.boxShadow = `0 0 ${Math.random() * 8 + 4}px ${Math.random() * 3 + 1}px hsla(${hue}, ${saturation}%, ${lightness + 20}%, 0.7)`;
      
      document.body.appendChild(particle);
      
      // Eliminar la partícula después de la animación
      setTimeout(() => {
        if (particle && particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 800);
    };
    
    // Ajustar la frecuencia de partículas basada en la velocidad del movimiento
    const speed = Math.sqrt(velocity.current.x * velocity.current.x + velocity.current.y * velocity.current.y);
    const particleCount = Math.min(Math.floor(speed / 2), 3); // Máximo 3 partículas por frame
    
    for (let i = 0; i < particleCount; i++) {
      setTimeout(createFireParticle, i * 10);
    }
    
    const particleInterval = setInterval(() => {
      const speed = Math.sqrt(velocity.current.x * velocity.current.x + velocity.current.y * velocity.current.y);
      if (speed > 0.5) { // Solo crear partículas cuando el cursor se está moviendo
        createFireParticle();
      }
    }, 30);
    
    return () => clearInterval(particleInterval);
  } else {
    // No hacer nada en modo claro - sin partículas
    const particleInterval = setInterval(() => {
      // No generar partículas en modo claro
    }, 1000); // Intervalo largo ya que no hacemos nada
    
    return () => clearInterval(particleInterval);
  }
}, [darkMode, isVisible, velocity]);

  return (
    <div 
      ref={cursorRef}
      className={`custom-cursor ${darkMode ? 'dark' : ''} ${isPointer ? 'pointer' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease, transform 0.1s ease-out',
        transform: `translate(-50%, -50%) scale(${isPointer ? 1.2 : 1})`,
        filter: darkMode ? 'drop-shadow(0 0 12px rgba(255, 60, 0, 0.8))' : 'none'
      }}
    >
      <div className="cursor-inner">
        {isPointer ? (
          <div className="cursor-pointer">
            <div className="cursor-pointer-inner">
              <img 
                src={darkMode ? rocketImage : airplaneImage} 
                alt="Cursor" 
                className="pointer-image"
                style={{
                  transform: `translate(-50%, -50%) rotate(${Math.atan2(velocity.current.y, velocity.current.x) + Math.PI/2}rad)`,
                  width: darkMode ? '32px' : '42px',
                  height: darkMode ? '32px' : '42px',
                  objectFit: 'contain',
                  filter: darkMode ? 'invert(1)' : 'none',
                  transformOrigin: 'center',
                  transition: 'transform 0.2s ease-out'
                }}
              />
            </div>
          </div>
        ) : (
          <div className="cursor-default">
            <div className="cursor-default-inner">
              <img 
                src={darkMode ? rocketImage : airplaneImage} 
                alt="Cursor" 
                style={{
                  width: darkMode ? '32px' : '42px',
                  height: darkMode ? '32px' : '42px',
                  objectFit: 'contain',
                  filter: darkMode ? 'invert(1)' : 'none',
                  transform: `rotate(${Math.atan2(velocity.current.y, velocity.current.x) + Math.PI/2}rad)`,
                  transformOrigin: 'center',
                  transition: 'transform 0.2s ease-out'
                }}
              />
            </div>
          </div>
        )}
        {isPointer && <div className="cursor-ripple"></div>}
      </div>
    </div>
  );
};

export default CustomCursor;
