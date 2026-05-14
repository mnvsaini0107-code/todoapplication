import { motion } from 'framer-motion';
import { CalendarDays, CheckCircle2, Hourglass } from 'lucide-react';
import { useCountUp } from '../hooks/useCountUp';

type Props = {
  total: number;
  completed: number;
  pending: number;
};

export function StatMiniCards({ total, completed, pending }: Props) {
  const t = useCountUp(total);
  const c = useCountUp(completed);
  const p = useCountUp(pending);

  const cards = [
    { label: 'Total Tasks', value: t, icon: CalendarDays, accent: 'rgba(255,170,230,0.95)' },
    { label: 'Completed', value: c, icon: CheckCircle2, accent: 'rgba(170,230,255,0.95)' },
    { label: 'Pending', value: p, icon: Hourglass, accent: 'rgba(220,190,255,0.95)' },
  ] as const;

  return (
    <motion.div
      className="tb-mini-grid"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.label}
            className="tb-mini tb-glass"
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 220, damping: 20 } },
            }}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
          >
            <motion.span
              className="tb-mini-icon"
              style={{ color: card.accent }}
              whileHover={{ y: [0, -6, 0], rotate: [0, -4, 4, 0] }}
              transition={{ duration: 0.55 }}
            >
              <Icon size={22} strokeWidth={2.4} />
            </motion.span>
            <div className="tb-mini-body">
              <span className="tb-mini-val tb-heading-glow">{card.value}</span>
              <span className="tb-mini-label">{card.label}</span>
            </div>
          </motion.div>
        );
      })}

      <style>{`
        .tb-mini-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }
        .tb-mini {
          padding: 14px 14px 16px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          border-radius: 24px;
          position: relative;
          overflow: hidden;
        }
        .tb-mini::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 20% 10%, rgba(255, 200, 255, 0.18), transparent 55%);
          pointer-events: none;
        }
        .tb-mini-icon {
          width: 44px;
          height: 44px;
          border-radius: 18px;
          display: grid;
          place-items: center;
          background: linear-gradient(145deg, rgba(255, 210, 255, 0.16), rgba(160, 140, 255, 0.12));
          border: 1px solid rgba(255, 210, 255, 0.28);
          box-shadow: 0 0 22px rgba(255, 160, 220, 0.18);
          position: relative;
          z-index: 1;
          filter: drop-shadow(0 0 10px rgba(255, 190, 255, 0.35));
        }
        .tb-mini-body {
          display: flex;
          flex-direction: column;
          gap: 4px;
          position: relative;
          z-index: 1;
          min-width: 0;
        }
        .tb-mini-val {
          font-size: 22px;
          font-weight: 800;
          line-height: 1;
        }
        .tb-mini-label {
          font-size: 11px;
          font-weight: 700;
          color: rgba(255, 235, 255, 0.68);
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }
        @media (max-width: 1200px) {
          .tb-mini-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </motion.div>
  );
}
