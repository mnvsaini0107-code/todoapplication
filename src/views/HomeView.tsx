import { 
  ArrowRight, Check, Zap, CheckCircle2, Star
} from 'lucide-react';

import type { Task, NavView, User, AppTheme } from '../types';


type Props = {
  tasks: Task[];
  stats: { total: number; completed: number; pending: number; percent: number; streak: number };
  onNavigate: (view: NavView) => void;
  user: User | null;
  t: any;
  theme: AppTheme;
};

export default function HomeView({ tasks, stats, onNavigate, user, t, theme }: Props) {
  const isGaming = theme === 'gaming';
  const today = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(t => t.date === today && !t.completed).slice(0, 5);
  const upcomingTasks = tasks.filter(t => t.date > today && !t.completed).slice(0, 3);

  return (
    <div className="home-view">
      <header className="home-header">
        <div className="greeting-group">
          <h1 className="h1-lux">
            {isGaming ? `Welcome back, ${user?.name ?? 'Player'}` : `Hello, ${user?.name ?? 'Student'}`}
          </h1>
          <p className="text-body">
            {isGaming ? "Ready for today's quest?" : "Here's your productivity overview for today."}
          </p>
        </div>
      </header>

      {/* QUICK STATS ROW */}
      <div className="quick-stats-row">
        <div className="quick-stat-card">
          <div className="stat-icon"><Star size={18} /></div>
          <div className="stat-meta">
            <span className="label">{t.pending}</span>
            <span className="value">{stats.pending}</span>
          </div>
        </div>
        <div className="quick-stat-card">
          <div className="stat-icon"><CheckCircle2 size={18} /></div>
          <div className="stat-meta">
            <span className="label">{t.completed}</span>
            <span className="value">{stats.completed}</span>
          </div>
        </div>
        <div className="quick-stat-card">
          <div className="stat-icon"><Zap size={18} /></div>
          <div className="stat-meta">
            <span className="label">{t.streak}</span>
            <span className="value">{stats.streak}d</span>
          </div>
        </div>
        <div className="quick-stat-card">
          <div className="stat-icon"><Check size={18} /></div>
          <div className="stat-meta">
            <span className="label">Rate</span>
            <span className="value">{stats.percent}%</span>
          </div>
        </div>
      </div>

      <div className="home-grid">
        <section className="home-section">
          <div className="section-header">
            <h2 className="h2-lux">{t.todayTasks}</h2>
            <button className="view-all" onClick={() => onNavigate('tasks')}>
              <span>View All</span>
              <ArrowRight size={14} />
            </button>
          </div>
          <div className="task-list-minimal">
            {todayTasks.length > 0 ? todayTasks.map((task) => (
              <CompactTaskRow key={task.id} task={task} t={t} />
            )) : (
              <div className="empty-state">{t.noActiveIntentions}</div>
            )}
          </div>
        </section>

        <section className="home-section">
          <div className="section-header">
            <h2 className="h2-lux">{t.upcomingTasks}</h2>
          </div>
          <div className="task-list-minimal">
            {upcomingTasks.length > 0 ? upcomingTasks.map((task) => (
              <CompactTaskRow key={task.id} task={task} t={t} />
            )) : (
              <div className="empty-state">No upcoming tasks.</div>
            )}
          </div>
        </section>
      </div>

      <style>{`
        .home-view {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .home-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .quick-stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .quick-stat-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-subtle);
        }

        .quick-stat-card .stat-icon {
          color: var(--accent);
          background-color: var(--bg-sidebar);
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          border-radius: 50%;
        }

        .quick-stat-card .stat-meta {
          display: flex;
          flex-direction: column;
        }

        .quick-stat-card .label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .quick-stat-card .value {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-main);
        }

        .home-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
        }

        .home-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-color);
        }

        .view-all {
          display: flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: none;
          color: var(--accent);
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
        }

        .task-list-minimal {
          display: flex;
          flex-direction: column;
        }

        .empty-state {
          padding: 32px;
          text-align: center;
          font-size: 0.95rem;
          color: var(--text-muted);
          background: var(--bg-sidebar);
          border-radius: var(--radius-md);
          border: 1px dashed var(--border-color);
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}

function CompactTaskRow({ task, t }: { task: Task, t: any }) {
  return (
    <div className="compact-task-row">
      <div className={`task-checkbox ${task.completed ? 'checked' : ''}`}>
        {task.completed && <Check size={12} />}
      </div>
      <span className={`task-title ${task.completed ? 'completed' : ''}`}>{task.text}</span>
      <div className="task-meta">
        <div className="priority-badge">
          <div className={`p-dot ${task.priority}`} />
          <span>{t[task.priority]}</span>
        </div>
        <span>•</span>
        <span>{task.date === new Date().toISOString().split('T')[0] ? t.today : t.tomorrow}</span>
      </div>
    </div>
  );
}
