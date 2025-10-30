import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function FloatingCursor() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);
  const trailRefs = useRef([]);
  const particlesRef = useRef([]);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;

    if (!cursor || !cursorDot || !cursorOutline) return;

    // Initialize cursor position to center of screen
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    gsap.set(cursorDot, { x: centerX, y: centerY, opacity: 1 });
    gsap.set(cursorOutline, { x: centerX, y: centerY, opacity: 1 });

    // Add visibility attributes
    cursorDot.setAttribute('data-cursor-visible', 'true');
    cursorOutline.setAttribute('data-cursor-visible', 'true');

    // Create trail elements
    for (let i = 0; i < 12; i++) {
      const trail = document.createElement('div');
      trail.className = 'fixed w-2 h-2 rounded-full pointer-events-none z-[9997]';
      trail.style.background = `linear-gradient(45deg, 
        hsl(${210 + i * 15}, 100%, ${70 - i * 4}%), 
        hsl(${270 + i * 10}, 100%, ${60 - i * 3}%))`;
      trail.style.transform = 'translate(-50%, -50%)';
      trail.style.opacity = (12 - i) / 12;
      document.body.appendChild(trail);
      trailRefs.current.push(trail);
    }

    // Create particle elements
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'fixed w-1 h-1 rounded-full pointer-events-none z-[9996]';
      particle.style.background = `hsl(${200 + Math.random() * 80}, 100%, 70%)`;
      particle.style.transform = 'translate(-50%, -50%)';
      particle.style.opacity = '0';
      document.body.appendChild(particle);
      particlesRef.current.push(particle);
    }

    let mouseX = 0, mouseY = 0;
    let positions = Array(12).fill({ x: 0, y: 0 });

    // Mouse move handler with advanced animations
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Update positions array for trail
      positions.unshift({ x: mouseX, y: mouseY });
      positions.pop();

      // Animate main cursor dot with morphing effect
      gsap.to(cursorDot, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: "power3.out"
      });

      // Animate cursor outline with elastic effect
      gsap.to(cursorOutline, {
        x: mouseX,
        y: mouseY,
        duration: 0.15,
        ease: "elastic.out(1, 0.3)"
      });

      // Animate trail elements
      trailRefs.current.forEach((trail, index) => {
        gsap.to(trail, {
          x: positions[index].x,
          y: positions[index].y,
          duration: 0.3 + index * 0.02,
          ease: "power2.out"
        });
      });

      // Random particle burst effect
      if (Math.random() > 0.95) {
        const randomParticle = particlesRef.current[Math.floor(Math.random() * particlesRef.current.length)];
        gsap.set(randomParticle, { x: mouseX, y: mouseY, opacity: 1, scale: 0 });
        gsap.to(randomParticle, {
          x: mouseX + (Math.random() - 0.5) * 100,
          y: mouseY + (Math.random() - 0.5) * 100,
          opacity: 0,
          scale: Math.random() * 2 + 1,
          duration: Math.random() * 0.8 + 0.5,
          ease: "power2.out"
        });
      }
    };

    // Enhanced hover effects for interactive elements
    const handleMouseEnter = (e) => {
      const element = e.target;
      const isButton = element.tagName === 'BUTTON' || element.getAttribute('role') === 'button';
      
      if (isButton) {
        // Button hover effect with enhanced visibility
        gsap.to(cursorDot, {
          scale: 0.5,
          duration: 0.3,
          ease: "back.out(1.7)"
        });

        gsap.to(cursorOutline, {
          scale: 2.5,
          borderWidth: '3px',
          borderColor: 'rgba(59, 130, 246, 1)',
          duration: 0.3,
          ease: "back.out(1.7)"
        });

        // Particle explosion on hover
        particlesRef.current.forEach((particle, i) => {
          gsap.set(particle, { 
            x: mouseX, 
            y: mouseY, 
            opacity: 1, 
            scale: 0.5,
            background: `hsl(${Math.random() * 360}, 100%, 70%)`
          });
          gsap.to(particle, {
            x: mouseX + Math.cos(i * Math.PI / 4) * 30,
            y: mouseY + Math.sin(i * Math.PI / 4) * 30,
            opacity: 0,
            scale: 1.5,
            duration: 0.8,
            delay: i * 0.05,
            ease: "power2.out"
          });
        });
      } else {
        // Text/link hover effect with better visibility
        gsap.to(cursorDot, {
          scale: 2,
          duration: 0.3,
          ease: "power2.out"
        });

        gsap.to(cursorOutline, {
          scale: 0.5,
          borderWidth: '3px',
          borderColor: 'rgba(139, 92, 246, 1)',
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(cursorDot, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(cursorOutline, {
        scale: 1,
        borderWidth: '2px',
        duration: 0.3,
        ease: "power2.out"
      });
    };

    // Click effect
    const handleMouseDown = () => {
      setIsClicking(true);
      
      gsap.to(cursorDot, {
        scale: 2,
        duration: 0.1,
        ease: "power2.out"
      });

      gsap.to(cursorOutline, {
        scale: 0.5,
        duration: 0.1,
        ease: "power2.out"
      });

      // Ripple effect on click
      const ripple = document.createElement('div');
      ripple.className = 'fixed rounded-full pointer-events-none z-[9995]';
      ripple.style.cssText = `
        width: 4px;
        height: 4px;
        background: radial-gradient(circle, rgba(59,130,246,0.6) 0%, transparent 70%);
        left: ${mouseX}px;
        top: ${mouseY}px;
        transform: translate(-50%, -50%);
      `;
      document.body.appendChild(ripple);

      gsap.fromTo(ripple, 
        { scale: 0, opacity: 1 },
        { 
          scale: 20, 
          opacity: 0, 
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => document.body.removeChild(ripple)
        }
      );
    };

    const handleMouseUp = () => {
      setIsClicking(false);
      
      gsap.to(cursorDot, {
        scale: 1,
        duration: 0.2,
        ease: "back.out(1.7)"
      });

      gsap.to(cursorOutline, {
        scale: 1,
        duration: 0.2,
        ease: "back.out(1.7)"
      });
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"], input, textarea, [data-cursor-hover]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });

      // Clean up DOM elements
      trailRefs.current.forEach(trail => {
        if (document.body.contains(trail)) {
          document.body.removeChild(trail);
        }
      });
      
      particlesRef.current.forEach(particle => {
        if (document.body.contains(particle)) {
          document.body.removeChild(particle);
        }
      });
    };
  }, []);

  return (
    <div ref={cursorRef} className="cursor-container">
      {/* Main cursor dot with gradient */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-[9999] rounded-full"
        style={{
          background: `conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ef4444, #10b981, #3b82f6)`,
          transform: 'translate(-50%, -50%)',
          filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.8))',
          boxShadow: `
            0 0 15px rgba(59, 130, 246, 0.8),
            0 0 25px rgba(139, 92, 246, 0.6),
            0 0 35px rgba(239, 68, 68, 0.4),
            inset 0 0 10px rgba(255, 255, 255, 0.3)
          `
        }}
      />
      
      {/* Animated outline ring */}
      <div
        ref={cursorOutlineRef}
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9998] rounded-full border-2"
        style={{
          borderColor: 'rgba(59, 130, 246, 0.8)',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, transparent 40%, rgba(59, 130, 246, 0.1) 100%)',
          backdropFilter: 'blur(2px)',
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)',
          animation: isClicking ? 'pulse 0.3s ease-out' : 'none'
        }}
      />

      {/* CSS for pulse animation */}
      <style jsx>{`
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(1); }
        }
        
        .cursor-container {
          /* Removed mix-blend-mode for better visibility */
        }
      `}</style>
    </div>
  );
}
