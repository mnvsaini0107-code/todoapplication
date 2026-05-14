import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Sparkles } from 'lucide-react';

type Props = { percent: number };

export default function ProgressRingCard({ percent }: Props) {
  const data = [
    { name: 'Completed', value: percent },
    { name: 'Remaining', value: 100 - percent },
  ];

  return (
    <motion.div 
      className="progress-lux-card glass-panel"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      <div className="lux-card-glow" />
      <div className="lux-card-sparkles">
        <Sparkles size={16} className="s1" />
        <Sparkles size={12} className="s2" />
      </div>

      <div className="card-header-lux">
        <h3>Daily Mastery</h3>
        <p>Syncing with your dreams...</p>
      </div>
      
      <div className="chart-container-lux">
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data}
              innerRadius={75}
              outerRadius={95}
              paddingAngle={8}
              dataKey="value"
              startAngle={90}
              endAngle={450}
              stroke="none"
              animationBegin={500}
              animationDuration={2000}
            >
              <Cell fill="url(#luxProgressGrad)" />
              <Cell fill="rgba(255, 255, 255, 0.05)" />
            </Pie>
            <defs>
              <linearGradient id="luxProgressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </PieChart>
        </ResponsiveContainer>
        
        <div className="center-stats-lux">
          <motion.strong 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {percent}<span>%</span>
          </motion.strong>
          <span className="center-label">Fulfilled</span>
        </div>
      </div>

      <div className="progress-status-lux">
        <motion.p
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {percent >= 100 ? 'Ascended to Perfection ✨' : 'Channeling Energy... 🌸'}
        </motion.p>
      </div>

      <style>{`
        .progress-lux-card {
          padding: 32px;
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          background: rgba(255, 255, 255, 0.04);
        }
        .lux-card-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1), transparent 70%);
          pointer-events: none;
        }
        .lux-card-sparkles { position: absolute; inset: 0; pointer-events: none; }
        .s1 { position: absolute; top: 20px; left: 20px; color: var(--pink-glow); opacity: 0.4; }
        .s2 { position: absolute; bottom: 20px; right: 20px; color: var(--orchid); opacity: 0.4; }
        
        .card-header-lux { text-align: center; margin-bottom: 20px; }
        .card-header-lux h3 { font-size: 1.4rem; font-weight: 900; background: linear-gradient(to right, #fff, var(--lavender-haze)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .card-header-lux p { font-size: 0.85rem; font-weight: 700; color: var(--lavender-haze); opacity: 0.6; }
        
        .chart-container-lux {
          position: relative;
          width: 100%;
          display: grid;
          place-items: center;
          filter: drop-shadow(0 0 15px rgba(168, 85, 247, 0.3));
        }
        .center-stats-lux {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          display: flex;
          flex-direction: column;
        }
        .center-stats-lux strong {
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 1;
          background: linear-gradient(135deg, #fff, var(--pink-glow));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 10px rgba(255,255,255,0.4));
        }
        .center-stats-lux strong span { font-size: 1.5rem; margin-left: 2px; }
        .center-label { font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--lavender-haze); opacity: 0.5; margin-top: 4px; }
        
        .progress-status-lux { margin-top: 24px; }
        .progress-status-lux p { font-size: 0.95rem; font-weight: 800; color: var(--lavender-haze); }
      `}</style>
    </motion.div>
  );
}
