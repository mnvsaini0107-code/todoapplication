import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, Trash2 } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import type { Task } from '../types';

type Props = {
  title?: string;
  subtitle?: string;
  tasks: Task[];
  filter: 'all' | 'completed' | 'pending';
  search: string;
  onAdd: (text: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TaskSection({
  title = 'My Tasks ✨',
  subtitle = "Let's make today a productive day! 💖",
  tasks,
  filter,
  search,
  onAdd,
  onToggle,
  onDelete,
}: Props) {
  const [draft, setDraft] = useState('');
  const [focused, setFocused] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = tasks;
    if (filter === 'completed') list = list.filter((t) => t.completed);
    if (filter === 'pending') list = list.filter((t) => !t.completed);
    if (q) list = list.filter((t) => t.text.toLowerCase().includes(q));
    return list;
  }, [tasks, filter, search]);

  const placeholders = useMemo(
    () => ['Dream up a task ✨', 'Plant a tiny goal 🌸', 'Moonlit reminder 🌙'],
    []
  );
  const [pi, setPi] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setPi((x) => (x + 1) % placeholders.length), 4200);
    return () => window.clearInterval(id);
  }, [placeholders.length]);

  return (
    <section className="tb-task-section">
      <motion.div
        className="tb-task-hero"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 140, damping: 20 }}
      >
        <h1 className="tb-task-h1 tb-heading-glow">{title}</h1>
        <p className="tb-task-sub">{subtitle}</p>
      </motion.div>

      <motion.div
        className={`tb-task-input tb-glass ${focused ? 'tb-task-input-focus' : ''}`}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, type: 'spring', stiffness: 160, damping: 22 }}
        whileHover={{ y: -2 }}
      >
        <div className="tb-task-input-inner">
          <motion.span animate={{ rotate: focused ? [0, 12, -8, 0] : 0 }} transition={{ duration: 0.6 }}>
            <Sparkles size={20} className="tb-task-sparkle-ico" />
          </motion.span>
          <div className="tb-task-field-wrap">
            <input
              className="tb-task-field"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder=""
              aria-label="Add a new task"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onAdd(draft);
                  setDraft('');
                }
              }}
            />
            {!draft && (
              <motion.span
                key={pi}
                className="tb-task-placeholder tb-placeholder-shimmer"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {placeholders[pi]}
              </motion.span>
            )}
          </div>
        </div>
        <motion.button
          type="button"
          className="tb-add-btn"
          onClick={() => {
            onAdd(draft);
            setDraft('');
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(255,120,220,0.35)',
              '0 0 28px 6px rgba(255,120,220,0.35)',
              '0 0 0 0 rgba(255,120,220,0.35)',
            ],
          }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          Add Task 💖
        </motion.button>
      </motion.div>

      <motion.ul className="tb-task-list" layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((task, index) => (
            <TaskRow
              key={task.id}
              task={task}
              index={index}
              onToggle={() => onToggle(task.id)}
              onDelete={() => onDelete(task.id)}
            />
          ))}
        </AnimatePresence>
      </motion.ul>

      {filtered.length === 0 && (
        <motion.div
          className="tb-empty tb-glass"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <span className="tb-empty-emoji">🌙</span>
          <p className="tb-empty-txt">Quiet skies… add something sparkly!</p>
        </motion.div>
      )}

      <style>{`
        .tb-task-section {
          display: flex;
          flex-direction: column;
          gap: 18px;
          min-height: 0;
        }
        .tb-task-hero {
          padding: 4px 6px 2px;
        }
        .tb-task-h1 {
          margin: 0;
          font-size: clamp(26px, 3vw, 34px);
          font-weight: 800;
          letter-spacing: 0.02em;
        }
        .tb-task-sub {
          margin: 10px 0 0;
          font-size: 15px;
          font-weight: 600;
          color: rgba(255, 235, 255, 0.72);
        }
        .tb-task-input {
          display: flex;
          align-items: stretch;
          gap: 14px;
          padding: 14px 14px 14px 16px;
          border-radius: 24px;
          transition: box-shadow 0.35s ease, transform 0.35s ease, border-color 0.35s ease;
        }
        .tb-task-input-focus {
          border-color: rgba(255, 190, 230, 0.65);
          box-shadow:
            0 0 0 1px rgba(255, 190, 230, 0.35),
            0 0 42px rgba(255, 140, 220, 0.28),
            inset 0 1px 0 rgba(255, 255, 255, 0.16);
        }
        .tb-task-input-inner {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }
        .tb-task-sparkle-ico {
          color: rgba(255, 230, 255, 0.95);
          filter: drop-shadow(0 0 10px rgba(255, 190, 255, 0.55));
          flex-shrink: 0;
        }
        .tb-task-field-wrap {
          position: relative;
          flex: 1;
          min-height: 26px;
          display: flex;
          align-items: center;
        }
        .tb-task-field {
          position: relative;
          z-index: 1;
          width: 100%;
          border: none;
          outline: none;
          background: transparent;
          color: #fff;
          font: inherit;
          font-size: 15px;
          font-weight: 600;
        }
        .tb-task-placeholder {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          font-size: 14px;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }
        .tb-add-btn {
          border: none;
          cursor: pointer;
          border-radius: 22px;
          padding: 0 22px;
          font-family: inherit;
          font-weight: 800;
          font-size: 14px;
          color: #fff;
          background: linear-gradient(125deg, #ff6bcb, #cfa8ff);
          border: 1px solid rgba(255, 220, 255, 0.45);
          white-space: nowrap;
          box-shadow: 0 12px 34px rgba(120, 60, 180, 0.35);
        }
        .tb-task-list {
          list-style: none;
          margin: 0;
          padding: 0 4px 8px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          overflow-y: auto;
          flex: 1;
          min-height: 0;
        }
        .tb-empty {
          padding: 26px;
          text-align: center;
          border-radius: 24px;
        }
        .tb-empty-emoji {
          font-size: 34px;
          filter: drop-shadow(0 0 18px rgba(255, 190, 255, 0.55));
        }
        .tb-empty-txt {
          margin: 10px 0 0;
          font-weight: 700;
          color: rgba(255, 235, 255, 0.78);
        }
        .tb-task-row-wrap {
          position: relative;
        }
        .tb-task-card {
          position: relative;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 16px;
          padding: 16px 18px;
          overflow: hidden;
        }
        .tb-task-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 12% 20%, rgba(255, 200, 255, 0.16), transparent 58%);
          pointer-events: none;
        }
        .tb-task-done::after {
          content: '';
          position: absolute;
          inset: -40%;
          background: radial-gradient(circle at 70% 30%, rgba(255, 170, 230, 0.12), transparent 55%);
          pointer-events: none;
        }
        .tb-check {
          position: relative;
          width: 28px;
          height: 28px;
          border-radius: 10px;
          border: none;
          padding: 0;
          cursor: pointer;
          background: transparent;
          z-index: 1;
        }
        .tb-check-ring {
          position: absolute;
          inset: 0;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.06);
        }
        .tb-check-fill {
          position: absolute;
          inset: 0;
          border-radius: 10px;
          background: linear-gradient(145deg, #ff6bcb, #cfa8ff);
          box-shadow: inset 0 0 18px rgba(255, 255, 255, 0.35);
        }
        .tb-check-icon {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          font-size: 14px;
          font-weight: 900;
          color: #fff;
          text-shadow: 0 0 12px rgba(255, 255, 255, 0.65);
        }
        .tb-task-main {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 0;
          position: relative;
          z-index: 1;
        }
        .tb-task-title {
          font-size: 15px;
          font-weight: 800;
          letter-spacing: 0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .tb-task-done .tb-task-title {
          text-decoration: line-through;
          text-decoration-thickness: 2px;
          text-decoration-color: rgba(255, 190, 230, 0.85);
        }
        .tb-task-date {
          font-size: 12px;
          font-weight: 700;
          color: rgba(255, 235, 255, 0.62);
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .tb-del {
          position: relative;
          z-index: 1;
          width: 42px;
          height: 42px;
          border-radius: 18px;
          border: 1px solid rgba(255, 190, 230, 0.35);
          background: linear-gradient(145deg, rgba(255, 170, 230, 0.22), rgba(170, 140, 255, 0.16));
          color: #fff7ff;
          cursor: pointer;
          display: grid;
          place-items: center;
          box-shadow: 0 0 22px rgba(255, 140, 220, 0.22);
        }
      `}</style>
    </section>
  );
}

const TaskRow = React.forwardRef<HTMLLIElement, {
  task: Task;
  index: number;
  onToggle: () => void;
  onDelete: () => void;
}>(({
  task,
  index,
  onToggle,
  onDelete,
}, ref) => {
  return (
    <motion.li
      ref={ref}
      layout
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
      transition={{ delay: index * 0.03, type: 'spring', stiffness: 260, damping: 22 }}
      className="tb-task-row-wrap"
    >
      <motion.div
        className={`tb-task-card tb-glass ${task.completed ? 'tb-task-done' : ''}`}
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        layout
      >
        <motion.button
          type="button"
          className="tb-check"
          onClick={onToggle}
          whileTap={{ scale: 0.92 }}
          aria-pressed={task.completed}
        >
          <motion.span
            className="tb-check-fill"
            initial={false}
            animate={{
              scale: task.completed ? 1 : 0,
              opacity: task.completed ? 1 : 0,
            }}
            transition={{ type: 'spring', stiffness: 420, damping: 22 }}
          />
          <motion.span
            className="tb-check-ring"
            animate={{
              boxShadow: task.completed
                ? '0 0 0 2px rgba(255,190,255,0.65), 0 0 26px rgba(255,120,220,0.55)'
                : '0 0 0 2px rgba(255,220,255,0.28)',
            }}
          />
          <motion.span
            className="tb-check-icon"
            initial={false}
            animate={{ scale: task.completed ? 1 : 0, opacity: task.completed ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 22 }}
          >
            ✓
          </motion.span>
        </motion.button>

        <div className="tb-task-main">
          <motion.span
            className="tb-task-title"
            animate={{
              opacity: task.completed ? 0.72 : 1,
            }}
          >
            {task.text}
          </motion.span>
          <motion.span className="tb-task-date" animate={{ opacity: task.completed ? 0.55 : 1 }}>
            📅 {task.dateDisplay}
          </motion.span>
        </div>

        <motion.button
          type="button"
          className="tb-del"
          onClick={onDelete}
          whileHover={{ scale: 1.12, rotate: [0, -6, 6, 0] }}
          whileTap={{ scale: 0.92 }}
          aria-label="Delete task"
        >
          <Trash2 size={18} strokeWidth={2.5} />
        </motion.button>
      </motion.div>
    </motion.li>
  );
});
