import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function MagneticButton({ children, className, onClick, variant = 'primary', ...props }) {
  const buttonRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    // Create glow element
    const glow = document.createElement('div');
    glow.className = 'absolute inset-0 rounded-lg opacity-0 pointer-events-none';
    glow.style.background = variant === 'primary' 
      ? 'linear-gradient(45deg, rgba(59,130,246,0.3), rgba(147,51,234,0.3))'
      : 'linear-gradient(45deg, rgba(148,163,184,0.2), rgba(203,213,225,0.2))';
    glow.style.filter = 'blur(8px)';
    glow.style.transform = 'scale(1.1)';
    button.appendChild(glow);
    glowRef.current = glow;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const distance = Math.sqrt(x * x + y * y);
      const maxDistance = Math.sqrt(rect.width * rect.width + rect.height * rect.height) / 2;
      const intensity = Math.max(0, 1 - distance / maxDistance);

      gsap.to(button, {
        x: x * 0.4 * intensity,
        y: y * 0.4 * intensity,
        rotation: x * 0.08 * intensity,
        scale: 1 + intensity * 0.05,
        duration: 0.3,
        ease: "power2.out"
      });

      // Animate glow
      gsap.to(glow, {
        opacity: intensity * 0.8,
        scale: 1.1 + intensity * 0.3,
        duration: 0.3,
        ease: "power2.out"
      });

      // Add shimmer effect
      button.style.background = `linear-gradient(${Math.atan2(y, x) * 180 / Math.PI + 90}deg, 
        rgba(255,255,255,${intensity * 0.1}) 0%, 
        transparent 50%, 
        rgba(255,255,255,${intensity * 0.05}) 100%)`;
    };

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      });

      gsap.to(glow, {
        opacity: 0,
        scale: 1.1,
        duration: 0.5,
        ease: "power2.out"
      });

      button.style.background = '';
    };

    const handleClick = () => {
      // Click ripple effect
      const ripple = document.createElement('div');
      ripple.className = 'absolute rounded-full pointer-events-none';
      ripple.style.cssText = `
        width: 4px;
        height: 4px;
        background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
      `;
      button.appendChild(ripple);

      gsap.fromTo(ripple,
        { scale: 0, opacity: 1 },
        { 
          scale: 15,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            if (button.contains(ripple)) {
              button.removeChild(ripple);
            }
          }
        }
      );
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('click', handleClick);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('click', handleClick);
      if (glow && button.contains(glow)) {
        button.removeChild(glow);
      }
    };
  }, [variant]);

  return (
    <button
      ref={buttonRef}
      className={`${className} relative overflow-hidden transform-gpu cursor-none`}
      onClick={onClick}
      data-cursor-hover
      {...props}
    >
      {children}
    </button>
  );
}
