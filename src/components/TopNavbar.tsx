import { Search, Bell, Command, User } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import type { User as UserType, AppTheme } from '../types';

type Props = {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  user: UserType | null;
  theme: AppTheme;
};

export default function TopNavbar({ searchQuery, onSearchChange, user, theme }: Props) {

  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`top-navbar theme-${theme}`}>

      <div className={`search-bar ${isFocused ? 'focused' : ''}`}>
        <Search size={16} className="search-icon" />
        <input 
          ref={inputRef}
          type="text" 
          placeholder="Search..." 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <div className="shortcut">
          <Command size={10} />
          <span>K</span>
        </div>
      </div>

      <div className="nav-right">
        <button className="nav-icon-btn" aria-label="Notifications" title="Notifications">
          <Bell size={18} />
        </button>
        <div className="user-profile">
          <div className="user-avatar">
            <User size={16} />
          </div>
          <div className="user-name">{user?.name ?? 'Student'}</div>
        </div>
      </div>

      <style>{`
        .top-navbar {
          height: var(--navbar-h);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          border-bottom: 1px solid var(--border-color);
          background: var(--bg-app);
          z-index: 10;
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          background-color: var(--bg-sidebar);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 6px 12px;
          width: 320px;
          transition: var(--transition);
        }

        .search-bar.focused {
          background-color: #fff;
          border-color: var(--accent);
          box-shadow: var(--shadow-sm);
        }

        .search-icon {
          color: var(--text-muted);
        }

        .search-bar input {
          background: transparent;
          border: none;
          outline: none;
          font-family: inherit;
          font-size: 0.9rem;
          color: var(--text-main);
          width: 100%;
        }

        .shortcut {
          display: flex;
          align-items: center;
          gap: 2px;
          font-size: 0.7rem;
          color: var(--text-muted);
          background: #fff;
          padding: 2px 4px;
          border-radius: 4px;
          border: 1px solid var(--border-color);
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .nav-icon-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          display: grid;
          place-items: center;
        }

        .nav-icon-btn:hover {
          color: var(--text-main);
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .user-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background-color: var(--bg-sidebar);
          display: grid;
          place-items: center;
          color: var(--text-muted);
          border: 1px solid var(--border-color);
        }

        .user-name {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-main);
        }
      `}</style>
    </div>
  );
}
