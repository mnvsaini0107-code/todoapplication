import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, Trash2, 
  Filter, Edit3
} from 'lucide-react';


import React, { useState, useMemo } from 'react';
import type { Task, Priority, AppTheme } from '../types';


type Props = {
  tasks: Task[];
  filter: 'all' | 'completed' | 'pending';
  searchQuery: string;
  addTask: (text: string, priority: Priority) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, updates: Partial<Task>) => void;
  t: any;
  theme: AppTheme;
};

export default function TasksView({ tasks, filter, searchQuery, addTask, toggleTask, deleteTask, editTask, t, theme }: Props) {

  const [inputText, setInputText] = useState('');
  const [inputPriority, setInputPriority] = useState<Priority>('medium');

  const filteredTasks = useMemo(() => {
    let result = [...tasks];
    if (filter === 'completed') result = result.filter(t => t.completed);
    if (filter === 'pending') result = result.filter(t => !t.completed);
    
    if (searchQuery) {
      result = result.filter(t => t.text.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    
    return result;
  }, [tasks, filter, searchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      addTask(inputText, inputPriority);
      setInputText('');
    }
  };

  return (
    <div className={`tasks-view theme-${theme}`}>

      <header className="tasks-header">
        <div className="header-top">
          <h1 className="h1-lux">{t.tasks}</h1>
          <button className="filter-btn" aria-label="Filter tasks" title="Filter tasks"><Filter size={16} /></button>
        </div>

        <form onSubmit={handleSubmit} className="task-input-bar">
          <input 
            type="text" 
            placeholder={t.addIntention} 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="priority-select">
            {(['low', 'medium', 'high'] as Priority[]).map((p) => (
              <button
                key={p}
                type="button"
                className={`p-btn ${p} ${inputPriority === p ? 'active' : ''}`}
                onClick={() => setInputPriority(p)}
              >
                {t[p]}
              </button>
            ))}
          </div>
          <button type="submit" className="add-btn">{t.bloom}</button>
        </form>
      </header>

      <div className="tasks-list">
        <AnimatePresence mode="popLayout">
          {filteredTasks.map((task) => (
            <TaskRow 
              key={task.id} 
              task={task} 
              onToggle={() => toggleTask(task.id)}
              onDelete={() => deleteTask(task.id)}
              onEdit={editTask}
              t={t}
            />
          ))}
        </AnimatePresence>
        {filteredTasks.length === 0 && (
          <div className="empty-state">No tasks found.</div>
        )}
      </div>

      <style>{`
        .tasks-view {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .tasks-header {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .filter-btn {
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-muted);
          padding: 8px;
          border-radius: var(--radius-md);
        }

        .task-input-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          background-color: var(--bg-sidebar);
          padding: 6px 6px 6px 16px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }

        .task-input-bar input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-family: inherit;
          font-size: 0.95rem;
          color: var(--text-main);
        }

        .priority-select {
          display: flex;
          gap: 4px;
        }

        .p-btn {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          border: 1px solid transparent;
          background: transparent;
          color: var(--text-muted);
        }

        .p-btn.active {
          background: #fff;
          border-color: var(--border-color);
          color: var(--text-main);
          box-shadow: var(--shadow-sm);
        }

        .add-btn {
          background-color: var(--accent);
          color: #fff;
          border: none;
          padding: 6px 16px;
          border-radius: var(--radius-sm);
          font-weight: 600;
          font-size: 0.9rem;
        }

        .tasks-list {
          display: flex;
          flex-direction: column;
        }

        .empty-state {
          padding: 40px;
          text-align: center;
          color: var(--text-muted);
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}

const TaskRow = React.forwardRef<HTMLDivElement, { task: Task, onToggle: any, onDelete: any, onEdit: any, t: any }>(({ task, onToggle, onDelete, onEdit, t }, ref) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editText.trim()) {
      onEdit(task.id, { text: editText });
      setIsEditing(false);
    }
  };

  return (
    <motion.div 
      ref={ref}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="compact-task-row"
    >
      <button 
        className={`task-checkbox ${task.completed ? 'checked' : ''}`}
        onClick={onToggle}
        aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        title={task.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {task.completed && <Check size={12} />}
      </button>
      
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="edit-form">
          <input 
            autoFocus
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={() => setIsEditing(false)}
          />
        </form>
      ) : (
        <span className={`task-title ${task.completed ? 'completed' : ''}`} onClick={onToggle}>
          {task.text}
        </span>
      )}

      <div className="task-actions">
        {!task.completed && !isEditing && (
          <button className="action-btn" onClick={() => setIsEditing(true)} aria-label="Edit task" title="Edit task">
            <Edit3 size={14} />
          </button>
        )}
        <button className="action-btn delete" onClick={onDelete} aria-label="Delete task" title="Delete task">
          <Trash2 size={14} />
        </button>
      </div>

      <div className="task-meta">
        <div className="priority-badge">
          <div className={`p-dot ${task.priority}`} />
          <span>{t[task.priority]}</span>
        </div>
        <span>•</span>
        <span>{task.date === new Date().toISOString().split('T')[0] ? t.today : t.tomorrow}</span>
      </div>

      <style>{`
        .task-actions {
          display: flex;
          gap: 8px;
          opacity: 0;
          transition: var(--transition);
        }

        .compact-task-row:hover .task-actions {
          opacity: 1;
        }

        .action-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          display: grid;
          place-items: center;
        }

        .action-btn:hover {
          color: var(--text-main);
        }

        .action-btn.delete:hover {
          color: #ff3b30;
        }

        .edit-form {
          flex: 1;
        }

        .edit-input {
          width: 100%;
          background: #fff;
          border: 1px solid var(--accent);
          border-radius: 4px;
          padding: 2px 6px;
          font-family: inherit;
          font-size: 0.95rem;
          outline: none;
        }
      `}</style>
    </motion.div>
  );
});
