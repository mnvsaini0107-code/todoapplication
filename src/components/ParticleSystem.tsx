import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

type Particle = {
  id: number;
  x: number;
  y: number;
  type: 'heart' | 'moon' | 'star' | 'sparkle';
  color: string;
};

export default function ParticleSystem() {
  const [particles, setParticles] = useState<Particle[]>([]);

  const addParticles = useCallback((e: MouseEvent) => {
    const types: Particle['type'][] = ['heart', 'moon', 'star', 'sparkle'];
    const colors = ['#f472b6', '#a78bfa', '#fde047', '#d8b4fe'];
    
    const newParticles: Particle[] = Array.from({ length: 4 }).map((_, i) => ({
      id: Date.now() + i,
      x: e.clientX,
      y: e.clientY,
      type: types[Math.floor(Math.random() * types.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setParticles((prev) => [...prev, ...newParticles].slice(-20));
  }, []);

  useEffect(() => {
    window.addEventListener('click', addParticles);
    return () => window.removeEventListener('click', addParticles);
  }, [addParticles]);

  useEffect(() => {
    const timer = setInterval(() => {
      setParticles((prev) => prev.filter((p) => Date.now() - p.id < 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="particle-layer">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0, x: p.x, y: p.y }}
            animate={{ 
              opacity: 0, 
              scale: 1.5, 
              y: p.y - 100,
              x: p.x + (Math.random() - 0.5) * 60,
              rotate: Math.random() * 360
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="sparkle-particle"
            style={{ color: p.color, fontSize: '20px' }}
          >
            {p.type === 'heart' && '💖'}
            {p.type === 'moon' && '🌙'}
            {p.type === 'star' && '⭐'}
            {p.type === 'sparkle' && '✨'}
          </motion.div>
        ))}
      </AnimatePresence>
      <style>{`
        .particle-layer {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9999;
        }
        .sparkle-particle {
          position: absolute;
          user-select: none;
        }
      `}</style>
    </div>
  );
}
