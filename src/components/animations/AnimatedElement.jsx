import { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

const AnimatedElement = ({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 1000,
  className = '',
  ...props
}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Configuración de animaciones
    const animations = {
      fadeIn: {
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutExpo',
      },
      slideInLeft: {
        opacity: [0, 1],
        translateX: [-50, 0],
        easing: 'easeOutExpo',
      },
      slideInRight: {
        opacity: [0, 1],
        translateX: [50, 0],
        easing: 'easeOutExpo',
      },
      scaleIn: {
        opacity: [0, 1],
        scale: [0.9, 1],
        easing: 'spring(1, 80, 10, 0)',
      },
      float: {
        translateY: ['-5px', '5px'],
        direction: 'alternate',
        loop: true,
        duration: 3000,
        easing: 'easeInOutSine',
      },
    };

    // Animación de entrada
    const animationConfig = animations[animation] || animations.fadeIn;
    
    anime({
      targets: element,
      ...animationConfig,
      delay,
      duration: animation === 'float' ? 3000 : duration,
      autoplay: true,
    });

    // Efecto de hover para elementos interactivos
    if (props.onClick || props.href) {
      const handleMouseEnter = () => {
        anime({
          targets: element,
          scale: 1.03,
          duration: 300,
          easing: 'easeOutExpo',
        });
      };

      const handleMouseLeave = () => {
        anime({
          targets: element,
          scale: 1,
          duration: 300,
          easing: 'easeOutExpo',
        });
      };

      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [animation, delay, duration, props.onClick, props.href]);

  return (
    <div ref={elementRef} className={`animated-element ${className}`} {...props}>
      {children}
    </div>
  );
};

export default AnimatedElement;
