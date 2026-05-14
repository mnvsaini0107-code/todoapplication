import { motion } from 'framer-motion';

export function SleepingCat() {
  const sparkles = ['✨', '✦', '⭐', '✨', '✦'].map((ch, i) => ({ ch, i }));

  return (
    <div className="tb-cat-wrap">
      {sparkles.map((s) => (
        <motion.span
          key={s.i}
          className="tb-cat-sparkle"
          initial={{ opacity: 0.4, scale: 0.6 }}
          animate={{
            y: [0, -6 - s.i, 0],
            opacity: [0.35, 1, 0.45],
            scale: [0.7, 1.15, 0.75],
            rotate: [0, s.i % 2 === 0 ? 15 : -15, 0],
          }}
          transition={{ duration: 2.4 + s.i * 0.15, repeat: Infinity, ease: 'easeInOut', delay: s.i * 0.2 }}
        >
          {s.ch}
        </motion.span>
      ))}

      <motion.div
        className="tb-cloud tb-glass"
        animate={{ scale: [1, 1.03, 1], y: [0, -4, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 200 140" className="tb-cat-svg" aria-hidden>
          <defs>
            <linearGradient id="catGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffe8ff" />
              <stop offset="50%" stopColor="#e8d4ff" />
              <stop offset="100%" stopColor="#d4c4ff" />
            </linearGradient>
            <filter id="catGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <ellipse cx="100" cy="118" rx="78" ry="18" fill="rgba(255,200,255,0.18)" />
          <path
            fill="url(#catGrad)"
            filter="url(#catGlow)"
            d="M52 88c-12-18 4-42 28-44 8-22 38-26 52-8 14-12 36-8 44 8 18 4 26 28 14 44 10 14 4 34-14 38-6 14-26 18-40 10-10 10-28 12-40 4-14 8-32 4-44-10z"
          />
          <ellipse cx="72" cy="78" rx="5" ry="7" fill="#5b3d8c" opacity="0.85" />
          <ellipse cx="96" cy="78" rx="5" ry="7" fill="#5b3d8c" opacity="0.85" />
          <path
            d="M84 92q10 6 20 0"
            stroke="#c49bff"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
          <path d="M44 56l-10-22 22 8z" fill="#f5dcff" />
          <path d="M156 56l10-22-22 8z" fill="#f5dcff" />
          <ellipse cx="118" cy="102" rx="18" ry="12" fill="#fff5ff" opacity="0.35" />
        </svg>

        {['Z', 'z', 'z'].map((z, idx) => (
          <motion.span
            key={z + idx}
            className="tb-zzz"
            style={{ right: `${8 + idx * 10}px`, top: `${4 + idx * 8}px` }}
            animate={{ y: [0, -14 - idx * 6, -28 - idx * 10], opacity: [0.2, 1, 0], scale: [0.8, 1.1, 0.9] }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: 'easeOut',
              delay: idx * 0.45,
            }}
          >
            {z}
          </motion.span>
        ))}
      </motion.div>

      <style>{`
        .tb-cat-wrap {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: auto;
          padding-top: 12px;
          width: 100%;
        }
        .tb-cloud.tb-glass {
          position: relative;
          width: 128px;
          padding: 10px 8px 14px;
          border-radius: 24px;
          background: linear-gradient(160deg, rgba(255, 210, 255, 0.2), rgba(180, 150, 255, 0.12));
          border: 1px solid rgba(255, 190, 255, 0.45);
          box-shadow:
            0 0 40px rgba(255, 140, 220, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        .tb-cat-svg {
          width: 112px;
          height: auto;
          display: block;
          filter: drop-shadow(0 8px 20px rgba(200, 140, 255, 0.45));
        }
        .tb-cat-sparkle {
          position: absolute;
          font-size: 11px;
          pointer-events: none;
          filter: drop-shadow(0 0 8px rgba(255, 200, 255, 0.9));
        }
        .tb-cat-sparkle:nth-child(1) {
          top: 8%;
          left: 12%;
        }
        .tb-cat-sparkle:nth-child(2) {
          top: 18%;
          right: 8%;
        }
        .tb-cat-sparkle:nth-child(3) {
          bottom: 28%;
          left: 4%;
        }
        .tb-cat-sparkle:nth-child(4) {
          bottom: 22%;
          right: 6%;
        }
        .tb-cat-sparkle:nth-child(5) {
          top: 42%;
          left: 50%;
          transform: translateX(-50%);
        }
        .tb-zzz {
          position: absolute;
          font-weight: 800;
          font-size: 13px;
          color: rgba(230, 210, 255, 0.95);
          text-shadow: 0 0 12px rgba(255, 170, 255, 0.9);
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
