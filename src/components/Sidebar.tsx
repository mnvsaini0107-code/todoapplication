import { motion } from 'framer-motion';
import { 
  Home, ClipboardList, CheckCircle2, Moon, CalendarDays, 
  FileText, SunMedium, PieChart, Settings2,
  LogOut, Hash, Gamepad2, Heart
} from 'lucide-react';
import type { NavView, AppTheme } from '../types';

type Props = {
  activeNav: NavView;
  onNavigate: (view: NavView) => void;
  t: any;
  theme: AppTheme;
};

export default function Sidebar({ activeNav, onNavigate, t, theme }: Props) {
  const isGaming = theme === 'gaming';
  const isGirlish = theme === 'girlish';

  const navItems = [
    { id: 'home', label: t.home, icon: Home },
    { id: 'tasks', label: t.tasks, icon: ClipboardList },
    { id: 'completed', label: t.completed, icon: CheckCircle2 },
    { id: 'pending', label: t.pending, icon: Moon },
    { id: 'calendar', label: t.calendar, icon: CalendarDays },
    { id: 'notes', label: t.notes, icon: FileText },
    { id: 'focus', label: t.focus, icon: SunMedium },
    { id: 'statistics', label: t.statistics, icon: PieChart },
    { id: 'settings', label: t.settings, icon: Settings2 },
  ] as const;

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <div className="logo-box">
          {isGaming ? (
            <Gamepad2 size={22} className="text-accent" />
          ) : isGirlish ? (
            <Heart size={20} className="text-accent" fill="currentColor" />
          ) : (
            <Hash size={20} className="text-accent" />
          )}
          <span className="logo-text">TaskBloom</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = activeNav === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${active ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
              {active && <motion.div layoutId="nav-pill" className="nav-pill" />}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button 
          className="logout-button"
          onClick={() => onNavigate('logout')}
        >
          <LogOut size={18} />
          <span>{t.logout}</span>
        </button>
      </div>

      <style>{`
        .sidebar-container {
          width: var(--sidebar-w);
          background-color: var(--bg-sidebar);
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 24px 12px;
          border-right: 1px solid var(--border-color);
          transition: background-color 0.4s ease;
        }

        .sidebar-header {
          padding: 0 12px 32px 12px;
        }

        .logo-box {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-text {
          font-weight: 800;
          font-size: 1.1rem;
          letter-spacing: -0.02em;
          color: var(--text-main);
        }

        .text-accent {
          color: var(--accent);
        }

        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: var(--radius-md);
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 0.9rem;
          font-weight: 600;
          position: relative;
          transition: var(--transition);
          text-align: left;
          cursor: pointer;
        }

        .nav-item:hover {
          background-color: rgba(0,0,0,0.03);
          color: var(--text-main);
        }

        .theme-gaming .nav-item:hover {
          background-color: rgba(255,255,255,0.05);
        }

        .nav-item.active {
          background-color: var(--bg-card);
          color: var(--text-main);
          box-shadow: var(--shadow-subtle);
        }

        .nav-pill {
          position: absolute;
          left: -12px;
          width: 3px;
          height: 18px;
          background-color: var(--accent);
          border-radius: 0 4px 4px 0;
        }

        .sidebar-footer {
          padding-top: 12px;
          border-top: 1px solid var(--border-color);
        }

        .logout-button {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          width: 100%;
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
        }

        .logout-button:hover {
          color: #ff3b30;
        }
      `}</style>
    </div>
  );
}
