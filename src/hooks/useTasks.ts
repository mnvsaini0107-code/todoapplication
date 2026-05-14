import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Task, Priority } from '../types';

const STORAGE_KEY = 'taskbloom_tasks_v3';

const defaultTasks = (): Task[] => {
  const now = new Date();
  const fmt = (d: Date) =>
    d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  
  const yesterday = new Date(now); yesterday.setDate(now.getDate() - 1);
  const twoDaysAgo = new Date(now); twoDaysAgo.setDate(now.getDate() - 2);
  const threeDaysAgo = new Date(now); threeDaysAgo.setDate(now.getDate() - 3);

  return [
    { id: '1', text: 'Wake up early 🌅', completed: true, date: now.toISOString().split('T')[0], dateDisplay: fmt(now), priority: 'medium', completedAt: now.toISOString() },
    { id: '2', text: 'Complete coding practice 💻', completed: true, date: yesterday.toISOString().split('T')[0], dateDisplay: fmt(yesterday), priority: 'high', completedAt: yesterday.toISOString() },
    { id: '3', text: 'Read 10 pages 📖', completed: false, date: now.toISOString().split('T')[0], dateDisplay: fmt(now), priority: 'low' },
    { id: '4', text: 'Exercise 30 min 💪', completed: true, date: twoDaysAgo.toISOString().split('T')[0], dateDisplay: fmt(twoDaysAgo), priority: 'medium', completedAt: twoDaysAgo.toISOString() },
    { id: '5', text: 'Finish assignment 📝', completed: false, date: now.toISOString().split('T')[0], dateDisplay: fmt(now), priority: 'high' },
    { id: '6', text: 'Drink water 💧', completed: true, date: threeDaysAgo.toISOString().split('T')[0], dateDisplay: fmt(threeDaysAgo), priority: 'low', completedAt: threeDaysAgo.toISOString() },
    { id: '7', text: 'Evening stretch 🌸', completed: false, date: now.toISOString().split('T')[0], dateDisplay: fmt(now), priority: 'low' },
    { id: '8', text: 'Clean workspace ✨', completed: false, date: now.toISOString().split('T')[0], dateDisplay: fmt(now), priority: 'medium' },
  ];
};

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultTasks();
      const parsed = JSON.parse(raw) as Task[];
      return Array.isArray(parsed) ? parsed : defaultTasks();
    } catch {
      return defaultTasks();
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    
    // Calculate streak
    let streak = 0;
    const completedDates = new Set(
      tasks
        .filter(t => t.completed && t.completedAt)
        .map(t => t.completedAt!.split('T')[0])
    );
    
    let checkDate = new Date();
    // If not completed anything today, check starting from yesterday for streak
    if (!completedDates.has(checkDate.toISOString().split('T')[0])) {
      checkDate.setDate(checkDate.getDate() - 1);
    }

    while (completedDates.has(checkDate.toISOString().split('T')[0])) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    }

    return { total, completed, pending, percent, streak };
  }, [tasks]);

  const addTask = useCallback((text: string, priority: Priority = 'medium', dueDate?: string) => {
    const t = text.trim();
    if (!t) return;
    const now = new Date();
    const dateDisplay = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const id = typeof crypto !== 'undefined' && 'randomUUID' in crypto 
      ? crypto.randomUUID() 
      : Math.random().toString(36).substring(2, 11);

    setTasks((prev) => [
      {
        id,
        text: t,
        completed: false,
        date: now.toISOString().split('T')[0],
        dateDisplay,
        priority,
        dueDate,
      },
      ...prev,
    ]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          const completed = !task.completed;
          return {
            ...task,
            completed,
            completedAt: completed ? new Date().toISOString() : undefined,
          };
        }
        return task;
      })
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const editTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  }, []);

  const getWeeklyData = useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const result = [];
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const count = tasks.filter(
        t => t.completed && t.completedAt && t.completedAt.split('T')[0] === dateStr
      ).length;
      
      result.push({
        day: days[date.getDay()],
        completed: count,
        fullDate: dateStr
      });
    }
    return result;
  }, [tasks]);

  return { tasks, stats, addTask, toggleTask, deleteTask, editTask, getWeeklyData };
}
