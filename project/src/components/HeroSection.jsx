import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Target } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ darkMode, onNavigateToAI, onNavigate }) {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const cardsRef = useRef(null);
  const floatingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main title animation with text reveal effect
      gsap.fromTo(titleRef.current, 
        { 
          y: 100, 
          opacity: 0,
          rotationX: 90
        },
        { 
          y: 0, 
          opacity: 1,
          rotationX: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
          delay: 0.3
        }
      );

      // Subtitle with typewriter effect
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.8,
          delay: 0.8,
          ease: "power2.out"
        }
      );

      // Buttons with bounce effect
      gsap.fromTo(buttonsRef.current.children,
        { 
          scale: 0,
          rotation: 360
        },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          delay: 1.2,
          stagger: 0.2,
          ease: "elastic.out(1, 0.5)"
        }
      );

      // Cards with 3D flip animation
      gsap.fromTo(cardsRef.current.children,
        {
          rotationY: 180,
          opacity: 0,
          z: -100
        },
        {
          rotationY: 0,
          opacity: 1,
          z: 0,
          duration: 1,
          delay: 1.5,
          stagger: 0.15,
          ease: "power2.out",
          transformStyle: "preserve-3d"
        }
      );

      // Floating animation for background elements
      gsap.to(floatingRef.current.children, {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: "random(-5, 5)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5
      });

      // Scroll-triggered animations
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top center",
        end: "bottom top",
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(cardsRef.current.children, {
            y: progress * 50,
            stagger: 0.1,
            duration: 0.3,
            ease: "none"
          });
        }
      });

      // Add floating particles animation
      const particles = [];
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = `absolute w-1 h-1 bg-blue-400 rounded-full opacity-20`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        heroRef.current.appendChild(particle);
        particles.push(particle);
      }

      // Animate particles
      particles.forEach((particle, i) => {
        gsap.to(particle, {
          x: `random(-100, 100)`,
          y: `random(-100, 100)`,
          duration: `random(10, 20)`,
          repeat: -1,
          yoyo: true,
          ease: "none",
          delay: i * 0.1
        });
      });

      // Mouse follower effect for cards
      const cards = cardsRef.current?.children;
      if (cards) {
        Array.from(cards).forEach(card => {
          const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;

            gsap.to(card, {
              rotationY: deltaX * 15,
              rotationX: -deltaY * 15,
              transformPerspective: 1000,
              duration: 0.5,
              ease: "power2.out"
            });

            // Add glow effect
            gsap.to(card, {
              boxShadow: `${deltaX * 20}px ${deltaY * 20}px 40px rgba(59, 130, 246, 0.15)`,
              duration: 0.3
            });
          };

          const handleMouseLeave = () => {
            gsap.to(card, {
              rotationY: 0,
              rotationX: 0,
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
              duration: 0.8,
              ease: "elastic.out(1, 0.3)"
            });
          };

          card.addEventListener('mousemove', handleMouseMove);
          card.addEventListener('mouseleave', handleMouseLeave);
        });
      }

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className={`relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-blue-50 via-white to-slate-50'} py-20 transition-colors duration-300 cursor-none`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Startup Solutions</span>
            </motion.div>

            <h1 ref={titleRef} className={`text-5xl md:text-6xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Build Your Dream{' '}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Startup
              </span>
            </h1>

            <p ref={subtitleRef} className={`text-lg md:text-xl mb-8 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Get AI-powered insights, expert guidance, and actionable strategies to turn your startup idea into reality.
            </p>

            <div ref={buttonsRef} className="flex flex-wrap gap-4">
              <MagneticButton 
                onClick={() => onNavigate('signup')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300"
              >
                Get Started
              </MagneticButton>
              <MagneticButton
                onClick={onNavigateToAI}
                className={`${darkMode ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-white hover:bg-slate-50 text-slate-900'} px-8 py-3 rounded-lg font-semibold shadow-lg border ${darkMode ? 'border-slate-700' : 'border-slate-200'} transition-all duration-300`}
              >
                Ask AI Adviser
              </MagneticButton>
            </div>
          </div>

          <div className="relative">
            <div ref={cardsRef} className="grid grid-cols-2 gap-4">
              <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} p-6 rounded-xl shadow-xl cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105`}>
                <TrendingUp className="w-8 h-8 text-green-500 mb-3" />
                <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Growth Focus</h3>
                <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Scale your startup with data-driven strategies</p>
              </div>

              <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} p-6 rounded-xl shadow-xl mt-8 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105`}>
                <Target className="w-8 h-8 text-blue-500 mb-3" />
                <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Precision</h3>
                <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Target the right market with AI insights</p>
              </div>

              <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} p-6 rounded-xl shadow-xl cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105`}>
                <Sparkles className="w-8 h-8 text-purple-500 mb-3" />
                <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Innovation</h3>
                <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Stay ahead with cutting-edge solutions</p>
              </div>

              <div className={`${darkMode ? 'bg-gradient-to-br from-blue-600 to-cyan-600' : 'bg-gradient-to-br from-blue-500 to-cyan-500'} p-6 rounded-xl shadow-xl mt-8 text-white cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105`}>
                <div className="text-3xl font-bold mb-2">500+</div>
                <p className="text-sm">Successful Startups Launched</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating background elements */}
      <div ref={floatingRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl" />
        <div className="absolute top-1/4 right-1/3 w-24 h-24 bg-pink-500/5 rounded-full blur-xl" />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-green-500/5 rounded-full blur-2xl" />
      </div>
    </section>
  );
}
