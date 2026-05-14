import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { Task } from '../types';

type Props = { tasks: Task[] };

export default function CalendarView({ tasks }: Props) {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const title = useMemo(
    () => new Date(year, month, 1).toLocaleString('default', { month: 'long', year: 'numeric' }),
    [month, year]
  );

  const { blanks, daysInMonth } = useMemo(() => {
    const first = new Date(year, month, 1);
    const firstDay = first.getDay();
    const dim = new Date(year, month + 1, 0).getDate();
    return { blanks: firstDay, daysInMonth: dim };
  }, [month, year]);

  const tasksByDay = useMemo(() => {
    const map = new Map<string, Task[]>();
    tasks.forEach((t) => {
      const key = t.date;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(t);
    });
    return map;
  }, [tasks]);

  const prev = () => {
    setMonth((m) => {
      if (m === 0) {
        setYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  };

  const next = () => {
    setMonth((m) => {
      if (m === 11) {
        setYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  };

  const cells = useMemo(() => {
    const out: { day: number | null; iso?: string }[] = [];
    for (let i = 0; i < blanks; i++) out.push({ day: null });
    for (let d = 1; d <= daysInMonth; d++) {
      const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      out.push({ day: d, iso });
    }
    return out;
  }, [blanks, daysInMonth, month, year]);

  return (
    <div className="calendar-view">
      <header className="calendar-header">
        <h1 className="h1-lux">Calendar</h1>
        <div className="calendar-nav">
          <button onClick={prev}><ChevronLeft size={18} /></button>
          <span className="current-month">{title}</span>
          <button onClick={next}><ChevronRight size={18} /></button>
        </div>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="calendar-grid-container"
      >

        <div className="dow-row">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="dow-cell">{d}</div>
          ))}
        </div>
        <div className="days-grid">
          {cells.map((c, idx) => {
            if (c.day === null) return <div key={`e-${idx}`} className="day-cell empty" />;
            const isToday = c.day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            const dayTasks = c.iso ? tasksByDay.get(c.iso) ?? [] : [];

            return (
              <div
                key={c.iso}
                className={`day-cell ${isToday ? 'today' : ''}`}
              >
                <div className="day-number">{c.day}</div>
                <div className="day-tasks">
                  {dayTasks.slice(0, 3).map(t => (
                    <div key={t.id} className={`task-dot ${t.completed ? 'completed' : ''}`} />
                  ))}
                  {dayTasks.length > 3 && <span className="more">+{dayTasks.length - 3}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>



      <style>{`
        .calendar-view {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .calendar-nav {
          display: flex;
          align-items: center;
          gap: 16px;
          background: var(--bg-sidebar);
          padding: 6px 12px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }

        .calendar-nav button {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          display: grid;
          place-items: center;
        }

        .current-month {
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--text-main);
          min-width: 140px;
          text-align: center;
        }

        .calendar-grid-container {
          background: #fff;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .dow-row {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          background: var(--bg-sidebar);
          border-bottom: 1px solid var(--border-color);
        }

        .dow-cell {
          padding: 12px;
          text-align: center;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .days-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          grid-auto-rows: minmax(100px, 1fr);
        }

        .day-cell {
          border-right: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .day-cell:nth-child(7n) {
          border-right: none;
        }

        .day-cell.empty {
          background: #fcfcfd;
        }

        .day-cell.today {
          background-color: rgba(167, 139, 250, 0.05);
        }

        .day-cell.today .day-number {
          background: var(--accent);
          color: #fff;
          width: 24px;
          height: 24px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          font-size: 0.8rem;
        }

        .day-number {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .day-tasks {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-top: auto;
        }

        .task-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
        }

        .task-dot.completed {
          background: var(--border-color);
        }

        .more {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
