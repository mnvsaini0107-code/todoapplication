import { 
  Zap, Star, 
  TrendingUp, CheckCircle2, Shield, Trophy
} from 'lucide-react';
import type { NavView, AppTheme } from '../types';

type Props = {
  stats: { total: number; completed: number; pending: number; percent: number; streak: number };
  onNavigate: (view: NavView) => void;
  t: any;
  theme: AppTheme;
};

export default function AnalyticsPanel({ 
  stats, onNavigate, t, theme 
}: Props) {
  const isGaming = theme === 'gaming';
  const isGirlish = theme === 'girlish';

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h3 className="h2-lux">{isGaming ? 'DASHBOARD' : t.activity}</h3>
      </div>

      <div className="stats-list">
        <StatItem 
          icon={<Star size={16} />} 
          label={t.tasks} 
          value={stats.total} 
          onClick={() => onNavigate('tasks')}
        />
        <StatItem 
          icon={<CheckCircle2 size={16} />} 
          label={t.completed} 
          value={stats.completed} 
          onClick={() => onNavigate('completed')}
        />
        <StatItem 
          icon={<Zap size={16} />} 
          label={t.pending} 
          value={stats.pending} 
          onClick={() => onNavigate('pending')}
        />
        <StatItem 
          icon={<TrendingUp size={16} />} 
          label={t.streak} 
          value={`${stats.streak}d`} 
          onClick={() => onNavigate('statistics')}
          className={isGaming && stats.streak > 0 ? 'streak-fire' : ''}
        />
      </div>

      <div className="completion-card">
        <div className="label">{t.completion}</div>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${stats.percent}%` }} />
        </div>
        <div className="value">{stats.percent}%</div>
      </div>

      {isGaming && (
        <div className="gaming-stats">
          <div className="xp-card premium-neon">
            <div className="xp-header">
              <Shield size={14} className="text-accent" />
              <span>{t.xp}</span>
            </div>
            <div className="xp-val">{stats.completed * 100} XP</div>
            <div className="level-badge">{t.level} 4</div>
            <div className="achievement-pulse" />
          </div>
          <div className="rank-card">
            <Trophy size={14} className="text-accent" />
            <span>{t.rank}: Gold III</span>
          </div>
        </div>
      )}

      {isGirlish && (
        <div className="girlish-decor">
          <div className="floating-hearts">
            <span className="heart h1">❤️</span>
            <span className="heart h2">✨</span>
            <span className="heart h3">🌸</span>
          </div>
          <div className="cozy-quote">
            "You're doing great! ✨"
          </div>
        </div>
      )}

      <style>{`
        .analytics-container {
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          position: relative;
        }

        .analytics-header {
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border-color);
        }

        .stats-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: var(--transition);
        }

        .stat-item:hover {
          background-color: var(--bg-sidebar);
        }

        .stat-left {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--text-muted);
        }

        .stat-label {
          font-size: 0.9rem;
          font-weight: 500;
        }

        .stat-value {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .completion-card {
          margin-top: 12px;
          padding: 16px;
          background-color: var(--bg-sidebar);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }

        .completion-card .label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
          margin-bottom: 12px;
        }

        .progress-container {
          height: 6px;
          background-color: var(--border-color);
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .progress-bar {
          height: 100%;
          background-color: var(--accent);
          transition: width 1s ease;
        }

        .completion-card .value {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-main);
        }

        /* Gaming specific */
        .gaming-stats {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .xp-card {
          padding: 16px;
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-subtle);
          position: relative;
          overflow: hidden;
        }

        .premium-neon {
          border-color: var(--accent);
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.2);
        }

        .achievement-pulse {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
          transform: translateX(-100%);
          animation: pulse-sweep 3s infinite;
        }

        @keyframes pulse-sweep {
          100% { transform: translateX(100%); }
        }

        .xp-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .xp-val {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--accent);
          margin: 4px 0;
        }

        .level-badge {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-muted);
        }

        .rank-card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .streak-fire {
          color: #f59e0b !important;
          text-shadow: 0 0 10px rgba(245, 158, 11, 0.3);
          animation: fire-flicker 1.5s infinite alternate;
        }

        @keyframes fire-flicker {
          0% { opacity: 0.8; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.1); }
        }

        /* Girlish specific */
        .girlish-decor {
          padding: 16px;
          text-align: center;
          position: relative;
        }

        .floating-hearts {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .heart {
          position: absolute;
          font-size: 14px;
          opacity: 0.6;
          animation: heart-float 4s infinite linear;
        }

        .h1 { left: 10%; animation-delay: 0s; }
        .h2 { left: 80%; animation-delay: 1.5s; }
        .h3 { left: 45%; animation-delay: 3s; }

        @keyframes heart-float {
          0% { transform: translateY(20px) scale(0.5); opacity: 0; }
          50% { opacity: 0.6; }
          100% { transform: translateY(-40px) scale(1.2); opacity: 0; }
        }

        .cozy-quote {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--accent);
          font-style: italic;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}

function StatItem({ icon, label, value, onClick, className = '' }: { icon: any, label: string, value: string | number, onClick: () => void, className?: string }) {
  return (
    <div className={`stat-item ${className}`} onClick={onClick}>
      <div className="stat-left">
        {icon}
        <span className="stat-label">{label}</span>
      </div>
      <span className="stat-value">{value}</span>
    </div>
  );
}
