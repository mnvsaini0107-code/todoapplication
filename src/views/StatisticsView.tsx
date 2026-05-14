import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Target, Zap, Clock, Star, Trophy, Shield } from 'lucide-react';


import type { AppTheme } from '../types';

type Props = {
  stats: { total: number; completed: number; pending: number; percent: number; streak: number };
  weeklyData: any[];
  theme: AppTheme;
};

export default function StatisticsView({ stats, weeklyData, theme }: Props) {
  const isGaming = theme === 'gaming';

  return (
    <div className="stats-view">
      <header className="stats-header">
        <h1 className="h1-lux">{isGaming ? 'LEVEL PROGRESS' : 'Statistics'}</h1>
        <p className="text-body">Data-driven insights into your student journey.</p>
      </header>

      <div className="metrics-grid">
        <MetricCard label="Focus" value="4.2h" icon={<Clock size={16} />} />
        <MetricCard label="Rate" value={`${stats.percent}%`} icon={<Target size={16} />} />
        <MetricCard label="Streak" value={`${stats.streak}d`} icon={<Zap size={16} />} />
        <MetricCard label="Done" value={stats.completed} icon={<Star size={16} />} />
      </div>

      <div className="stats-content-grid">
        <section className="chart-section">
          <div className="section-title">Velocity Tracking</div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--text-muted)', fontSize: 12, fontWeight: 600 }}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    background: 'var(--bg-card)', 
                    borderRadius: '8px', 
                    border: '1px solid var(--border-color)',
                    boxShadow: 'var(--shadow-subtle)',
                    color: 'var(--text-main)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="var(--accent)" 
                  strokeWidth={2} 
                  fill="rgba(167, 139, 250, 0.1)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="info-section">
          <div className="section-title">{isGaming ? 'ACHIEVEMENTS' : 'Growth Hall'}</div>
          <div className="trophy-list">
            <TrophyItem 
              icon={isGaming ? <Trophy size={18} /> : "🏆"} 
              label="Sanctuary Master" 
              date="2 days ago" 
            />
            <TrophyItem 
              icon={isGaming ? <Shield size={18} /> : "🎯"} 
              label="Task Crusher" 
              date="Yesterday" 
            />
            <TrophyItem 
              icon={isGaming ? <Zap size={18} /> : "⚡"} 
              label="Focus King" 
              date="Today" 
            />
          </div>
        </section>
      </div>

      <style>{`
        .stats-view {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .metric-card {
          padding: 24px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 12px;
          box-shadow: var(--shadow-subtle);
        }

        .m-icon {
          color: var(--accent);
          display: flex;
        }

        .m-val {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--text-main);
          letter-spacing: -0.02em;
        }

        .m-lab {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .stats-content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
        }

        .section-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 16px;
        }

        .chart-wrapper {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 24px;
          box-shadow: var(--shadow-subtle);
        }

        .trophy-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .trophy-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-subtle);
          transition: var(--transition);
        }

        .trophy-item:hover {
          border-color: var(--accent);
          transform: translateX(4px);
        }

        .t-icon {
          font-size: 1.25rem;
          color: var(--accent);
        }

        .t-details {
          display: flex;
          flex-direction: column;
        }

        .t-label {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .t-date {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        @media (max-width: 1000px) {
          .stats-content-grid {
            grid-template-columns: 1fr;
          }
          .metrics-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
}

function MetricCard({ label, value, icon }: { label: string, value: string | number, icon: any }) {
  return (
    <div className="metric-card">
      <div className="m-icon">{icon}</div>
      <div className="m-val">{value}</div>
      <div className="m-lab">{label}</div>
    </div>
  );
}

function TrophyItem({ icon, label, date }: { icon: any, label: string, date: string }) {
  return (
    <div className="trophy-item">
      <div className="t-icon">{icon}</div>
      <div className="t-details">
        <span className="t-label">{label}</span>
        <span className="t-date">{date}</span>
      </div>
    </div>
  );
}
