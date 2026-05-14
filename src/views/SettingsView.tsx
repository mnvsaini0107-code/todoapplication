import { 
  User, Palette, Globe, Zap, LogOut, Heart, Gamepad2, Monitor
} from 'lucide-react';

import type { AppTheme, Language, User as UserType } from '../types';

type Props = {
  user: UserType | null;
  onLogout: () => void;
  theme: AppTheme;
  setTheme: (t: AppTheme) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  t: any;
};

export default function SettingsView({ user, onLogout, theme, setTheme, language, setLanguage, t }: Props) {
  return (
    <div className="settings-view">
      <header className="settings-header">
        <h1 className="h1-lux">{t.settings}</h1>
        <p className="text-body">Customize your modern student productivity operating system.</p>
      </header>

      <div className="settings-grid">
        <section className="settings-section">
          <div className="section-title">
            <User size={16} />
            <span>{t.identity}</span>
          </div>
          <div className="settings-card">
            <div className="profile-box">
              <div className="avatar">{user?.name?.charAt(0) ?? 'U'}</div>
              <div className="details">
                <strong>{user?.name ?? 'User'}</strong>
                <span>{user?.title ?? t.student}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="settings-section">
          <div className="section-title">
            <Palette size={16} />
            <span>{t.theme}</span>
          </div>
          <div className="theme-options">
            <ThemeButton 
              id="normal" 
              label={t.normal} 
              active={theme === 'normal'} 
              onClick={() => setTheme('normal')}
              icon={<Monitor size={20} />}
            />
            <ThemeButton 
              id="girlish" 
              label={t.girlish} 
              active={theme === 'girlish'} 
              onClick={() => setTheme('girlish')}
              icon={<Heart size={20} />}
            />
            <ThemeButton 
              id="gaming" 
              label={t.gaming} 
              active={theme === 'gaming'} 
              onClick={() => setTheme('gaming')}
              icon={<Gamepad2 size={20} />}
            />
          </div>
        </section>

        <section className="settings-section">
          <div className="section-title">
            <Globe size={16} />
            <span>{t.language}</span>
          </div>
          <div className="language-select">
            {(['english', 'hindi', 'hinglish'] as Language[]).map((lang) => (
              <button 
                key={lang}
                className={`lang-btn ${language === lang ? 'active' : ''}`}
                onClick={() => setLanguage(lang)}
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>
        </section>

        <section className="settings-section">
          <div className="section-title">
            <Zap size={16} />
            <span>{t.productivity}</span>
          </div>
          <div className="settings-card">
            <div className="setting-row">
              <span>Pomodoro Length</span>
              <select defaultValue="25">
                <option value="25">25 Min</option>
                <option value="45">45 Min</option>
              </select>
            </div>
          </div>
        </section>

        <button className="logout-btn" onClick={onLogout}>
          <LogOut size={16} />
          <span>{t.leaveSanctuary}</span>
        </button>
      </div>

      <style>{`
        .settings-view {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .settings-grid {
          display: flex;
          flex-direction: column;
          gap: 32px;
          max-width: 600px;
        }

        .settings-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .settings-card {
          background-color: var(--bg-sidebar);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 16px;
        }

        .profile-box {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--accent);
          color: #fff;
          display: grid;
          place-items: center;
          font-weight: 700;
          font-size: 1.2rem;
        }

        .details {
          display: flex;
          flex-direction: column;
        }

        .details strong {
          font-size: 1rem;
          color: var(--text-main);
        }

        .details span {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .theme-options {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .theme-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 20px 12px;
          background: var(--bg-sidebar);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
          transition: var(--transition);
        }

        .theme-btn.active {
          border-color: var(--accent);
          color: var(--text-main);
          background: var(--bg-card);
          box-shadow: var(--shadow-subtle);
        }

        .theme-btn .icon {
          color: var(--text-muted);
        }

        .theme-btn.active .icon {
          color: var(--accent);
        }

        .preview {
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: #efeff1;
          position: relative;
          overflow: hidden;
        }

        .preview.normal { background: #efeff1; }
        .preview.girlish { background: #fdf2f8; }
        .preview.gaming { background: #27272a; }

        .language-select {
          display: flex;
          gap: 8px;
        }

        .lang-btn {
          flex: 1;
          padding: 10px;
          background: var(--bg-sidebar);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
          transition: var(--transition);
        }

        .lang-btn.active {
          border-color: var(--accent);
          color: var(--text-main);
          background: var(--bg-card);
        }

        .setting-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
          color: var(--text-main);
          font-weight: 500;
        }

        .setting-row select {
          padding: 4px 8px;
          border-radius: 4px;
          border: 1px solid var(--border-color);
          background: var(--bg-card);
          color: var(--text-main);
          font-family: inherit;
          outline: none;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px;
          background: rgba(255, 59, 48, 0.05);
          border: 1px solid rgba(255, 59, 48, 0.1);
          border-radius: var(--radius-md);
          color: #ff3b30;
          font-weight: 600;
          margin-top: 20px;
          cursor: pointer;
        }

        .logout-btn:hover {
          background: #ff3b30;
          color: #fff;
        }
      `}</style>
    </div>
  );
}

function ThemeButton({ label, active, onClick, icon, id }: { label: string, active: boolean, onClick: () => void, icon: any, id: string }) {
  return (
    <button className={`theme-btn ${active ? 'active' : ''}`} onClick={onClick}>
      <div className="icon">{icon}</div>
      <span>{label}</span>
      <div className={`preview ${id}`} />
    </button>
  );
}
