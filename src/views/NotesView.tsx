import { AnimatePresence, motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';

import { useEffect, useState } from 'react';
import type { Note } from '../types';

const STORAGE_KEY = 'taskbloom_notes_v2';

export default function NotesView() {
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as Note[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const add = () => {
    const colors: Note['color'][] = ['pink', 'lavender', 'sky'];
    setNotes((n) => [
      ...n,
      {
        id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Date.now()),
        text: '',
        color: colors[Math.floor(Math.random() * colors.length)],
      },
    ]);
  };

  return (
    <div className="notes-view">
      <header className="notes-header">
        <div className="title-group">
          <h1 className="h1-lux">Notes</h1>
          <p className="text-body">Capture quick thoughts and ideas.</p>
        </div>
        <button className="btn-primary" onClick={add}>
          <Plus size={18} />
          <span>New Note</span>
        </button>
      </header>

      <div className="notes-grid">
        <AnimatePresence>
          {notes.map((note) => (
            <motion.div
              key={note.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`note-card color-${note.color}`}
            >
              <textarea
                value={note.text}
                onChange={(e) => {
                  const v = e.target.value;
                  setNotes((prev) => prev.map((x) => (x.id === note.id ? { ...x, text: v } : x)));
                }}
                placeholder="Write something..."
              />
              <button 
                className="delete-btn"
                onClick={() => setNotes((prev) => prev.filter((x) => x.id !== note.id))}
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {notes.length === 0 && (
          <div className="empty-state">
            <p>No notes yet. Click the button above to create one.</p>
          </div>
        )}
      </div>

      <style>{`
        .notes-view {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .notes-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .notes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 20px;
        }

        .note-card {
          min-height: 200px;
          padding: 24px;
          border-radius: var(--radius-md);
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          position: relative;
          display: flex;
          flex-direction: column;
          transition: var(--transition);
        }

        .note-card:hover {
          border-color: var(--accent);
          box-shadow: var(--shadow-sm);
        }

        .note-card textarea {
          flex: 1;
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          font-family: inherit;
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-main);
          resize: none;
        }

        .delete-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: transparent;
          border: none;
          color: var(--text-muted);
          opacity: 0;
          transition: var(--transition);
          cursor: pointer;
        }

        .note-card:hover .delete-btn {
          opacity: 1;
        }

        .color-pink { border-top: 4px solid #f472b6; }
        .color-lavender { border-top: 4px solid var(--accent); }
        .color-sky { border-top: 4px solid #3b82f6; }

        .empty-state {
          grid-column: 1 / -1;
          padding: 60px;
          text-align: center;
          color: var(--text-muted);
          background: var(--bg-sidebar);
          border: 1px dashed var(--border-color);
          border-radius: var(--radius-md);
        }
      `}</style>
    </div>
  );
}
