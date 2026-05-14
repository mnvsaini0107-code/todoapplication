import { motion } from 'framer-motion';

export default function BackgroundAmbience() {
  return (
    <div className="ambient-background">
      {/* Floating Haze Clouds */}
      <motion.div 
        className="haze-blob b1"
        animate={{ 
          x: [0, 100, 0], 
          y: [0, 50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div 
        className="haze-blob b2"
        animate={{ 
          x: [0, -80, 0], 
          y: [0, 100, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div 
        className="haze-blob b3"
        animate={{ 
          x: [0, 40, 0], 
          y: [0, -60, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      />

      {/* Floating Sparkles Array */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="bg-sparkle"
          initial={{ 
            x: Math.random() * 100 + 'vw', 
            y: Math.random() * 100 + 'vh',
            opacity: Math.random() 
          }}
          animate={{ 
            y: [null, '-=100'],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{ 
            duration: 5 + Math.random() * 10, 
            repeat: Infinity, 
            ease: 'linear',
            delay: Math.random() * 10
          }}
        />
      ))}

      <style>{`
        .ambient-background {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background: #0f0a1e;
          overflow: hidden;
        }
        
        .haze-blob {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.15;
          mix-blend-mode: screen;
        }
        
        .b1 { background: radial-gradient(circle, #a855f7, transparent); top: -10%; left: -10%; }
        .b2 { background: radial-gradient(circle, #f472b6, transparent); bottom: -10%; right: -10%; }
        .b3 { background: radial-gradient(circle, #3b82f6, transparent); top: 40%; right: 10%; }
        
        .bg-sparkle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 0 10px #fff;
        }
      `}</style>
    </div>
  );
}
