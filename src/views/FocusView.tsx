import { 
  Play, Pause, RotateCcw, Zap, Clock
} from 'lucide-react';

import { useState, useEffect, useCallback } from 'react';

const MODES = {
  FOCUS: { label: 'Focus', time: 25 * 60 },
  BREAK: { label: 'Break', time: 5 * 60 },
};

export default function FocusView() {
  const [mode, setMode] = useState<'FOCUS' | 'BREAK'>('FOCUS');
  const [timeLeft, setTimeLeft] = useState(MODES.FOCUS.time);
  const [isActive, setIsActive] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setSessionsCompleted(prev => prev + 1);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggle = () => setIsActive(!isActive);
  
  const reset = useCallback(() => {
    setIsActive(false);
    setTimeLeft(MODES[mode].time);
  }, [mode]);

  const switchMode = (newMode: 'FOCUS' | 'BREAK') => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(MODES[newMode].time);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="focus-view">
      <header className="focus-header">
        <h1 className="h1-lux">Focus Mode</h1>
        <p className="text-body">Eliminate distractions and enter deep work.</p>
      </header>

      <div className="focus-layout">
        <div className="timer-container">
          <div className="mode-switcher">
            <button className={mode === 'FOCUS' ? 'active' : ''} onClick={() => switchMode('FOCUS')}>Focus</button>
            <button className={mode === 'BREAK' ? 'active' : ''} onClick={() => switchMode('BREAK')}>Break</button>
          </div>

          <div className="timer-display">
            <div className="time">{formatTime(timeLeft)}</div>
            <div className="mode-label">{MODES[mode].label}</div>
          </div>

          <div className="timer-controls">
            <button className="control-btn" onClick={reset}>
              <RotateCcw size={20} />
            </button>
            <button className={`main-control ${isActive ? 'active' : ''}`} onClick={toggle}>
              {isActive ? <Pause size={32} /> : <Play size={32} />}
            </button>
            <div className="control-spacer" />
          </div>
        </div>

        <div className="focus-stats">
          <div className="stat-card">
            <div className="stat-icon"><Zap size={18} /></div>
            <div className="stat-info">
              <span className="label">Sessions Today</span>
              <span className="value">{sessionsCompleted}</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><Clock size={18} /></div>
            <div className="stat-info">
              <span className="label">Focus Time</span>
              <span className="value">{sessionsCompleted * 25}m</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .focus-view {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .focus-layout {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 48px;
          margin-top: 20px;
        }

        .timer-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
          width: 100%;
          max-width: 400px;
        }

        .mode-switcher {
          display: flex;
          gap: 8px;
          background: var(--bg-sidebar);
          padding: 4px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }

        .mode-switcher button {
          padding: 8px 24px;
          border-radius: var(--radius-sm);
          border: none;
          background: transparent;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-muted);
          transition: var(--transition);
        }

        .mode-switcher button.active {
          background: #fff;
          color: var(--text-main);
          box-shadow: var(--shadow-sm);
        }

        .timer-display {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .timer-display .time {
          font-size: 6rem;
          font-weight: 800;
          color: var(--text-main);
          letter-spacing: -0.05em;
          line-height: 1;
        }

        .timer-display .mode-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-top: 8px;
        }

        .timer-controls {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .control-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
        }

        .main-control {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: var(--text-main);
          color: #fff;
          border: none;
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: var(--transition);
        }

        .main-control.active {
          background: var(--accent);
        }

        .control-spacer {
          width: 20px;
        }

        .focus-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          width: 100%;
          max-width: 400px;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: var(--bg-sidebar);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
        }

        .stat-icon {
          color: var(--accent);
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-info .label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .stat-info .value {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-main);
        }
      `}</style>
    </div>
  );
}
