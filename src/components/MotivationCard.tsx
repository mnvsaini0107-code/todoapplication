import { motion } from 'framer-motion';
import lofiGirlImg from '../assets/lofi_girl.png';

export default function MotivationCard() {
  return (
    <motion.div 
      className="motivation-lux-card glass-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <div className="motivation-img-wrapper">
        <img src={lofiGirlImg} alt="Motivation" className="motivation-img-lux" />
        <div className="motivation-overlay-lux" />
        <div className="motivation-bloom" />
      </div>
      
      <div className="motivation-content-lux">
        <div className="mood-tag">Deep Focus</div>
        <h4>Eternal Sanctuary</h4>
        <p>The soft glow of consistency turns every dream into a finished masterpiece.</p>
      </div>

      <style>{`
        .motivation-lux-card {
          border-radius: var(--radius-xl);
          overflow: hidden;
          position: relative;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .motivation-img-wrapper {
          position: relative;
          height: 240px;
          overflow: hidden;
        }
        .motivation-img-lux {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1s ease-out;
        }
        .motivation-lux-card:hover .motivation-img-lux { transform: scale(1.05); }
        
        .motivation-overlay-lux {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, var(--bg-deep) 0%, transparent 60%);
        }
        .motivation-bloom {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 70% 30%, rgba(168, 85, 247, 0.15), transparent 60%);
          pointer-events: none;
        }
        
        .motivation-content-lux {
          padding: 24px 28px;
          position: relative;
          margin-top: -60px;
          z-index: 2;
        }
        .mood-tag {
          font-size: 0.7rem;
          font-weight: 800;
          padding: 4px 12px;
          border-radius: 6px;
          background: var(--pink-glow);
          color: #fff;
          display: inline-block;
          margin-bottom: 12px;
          text-transform: uppercase;
          box-shadow: 0 0 10px var(--pink-glow);
        }
        .motivation-content-lux h4 { font-size: 1.4rem; font-weight: 900; color: #fff; margin-bottom: 8px; filter: drop-shadow(0 0 8px rgba(255,255,255,0.3)); }
        .motivation-content-lux p { font-size: 0.9rem; font-weight: 600; color: var(--lavender-haze); opacity: 0.8; line-height: 1.5; }
      `}</style>
    </motion.div>
  );
}
