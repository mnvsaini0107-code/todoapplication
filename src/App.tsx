import { AnimatePresence, motion } from 'framer-motion';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { useTasks } from './hooks/useTasks';
import { useAuth } from './hooks/useAuth';
import Sidebar from './components/Sidebar';
import TopNavbar from './components/TopNavbar';
import AnalyticsPanel from './components/AnalyticsPanel';
import type { NavView, AppTheme, Language } from './types';
import { translations } from './utils/translations';

// Views
import LoginView from './views/LoginView';
import HomeView from './views/HomeView';
import TasksView from './views/TasksView';
import CalendarView from './views/CalendarView';
import NotesView from './views/NotesView';
import FocusView from './views/FocusView';
import StatisticsView from './views/StatisticsView';
import SettingsView from './views/SettingsView';

export default function App() {
  const { isAuthenticated, login, logout, user } = useAuth();
  const [nav, setNav] = useState<NavView>('home');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Theme & Language State
  const [theme, setTheme] = useState<AppTheme>(() => 
    (localStorage.getItem('taskbloom_theme') as AppTheme) || 'normal'
  );
  const [language, setLanguage] = useState<Language>(() => 
    (localStorage.getItem('taskbloom_language') as Language) || 'english'
  );

  const t = translations[language];
  
  const { tasks, stats, addTask, toggleTask, deleteTask, editTask, getWeeklyData } = useTasks();

  useEffect(() => {
    localStorage.setItem('taskbloom_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('taskbloom_language', language);
  }, [language]);

  const handleLogout = useCallback(() => {
    logout();
    setNav('home');
  }, [logout]);

  const currentView = useMemo(() => {
    const props = { tasks, stats, onNavigate: setNav, user, t, language, theme };
    switch (nav) {
      case 'home':
        return <HomeView {...props} />;
      case 'tasks':
      case 'completed':
      case 'pending':
        return (
          <TasksView 
            {...props}
            filter={nav === 'tasks' ? 'all' : nav as any} 
            searchQuery={searchQuery}
            addTask={addTask}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        );
      case 'calendar': return <CalendarView tasks={tasks} />;
      case 'notes': return <NotesView />;
      case 'focus': return <FocusView />;
      case 'statistics': return <StatisticsView stats={stats} weeklyData={getWeeklyData} theme={theme} />;

      case 'settings': 
        return (
          <SettingsView 
            user={user}
            onLogout={handleLogout} 
            theme={theme} 
            setTheme={setTheme} 
            language={language} 
            setLanguage={setLanguage}
            t={t}
          />
        );
      default: return <HomeView {...props} />;
    }
  }, [nav, tasks, stats, searchQuery, addTask, toggleTask, deleteTask, editTask, handleLogout, user, theme, language, t]);

  if (!isAuthenticated) {
    return <LoginView onLogin={login} />;
  }

  return (
    <div className={`app-container theme-${theme}`}>
      <div className="dashboard-grid">
        <Sidebar 
          activeNav={nav} 
          onNavigate={setNav} 
          t={t}
          theme={theme}
        />

        <main className="main-view-container">
          <TopNavbar 
            searchQuery={searchQuery} 
            onSearchChange={setSearchQuery} 
            user={user}
            theme={theme}
          />
          
          <div className="content-scroll-area">
            <AnimatePresence mode="wait">
              <motion.div
                key={nav}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                style={{ width: '100%', height: '100%' }}
              >
                {currentView}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        <aside className="analytics-panel-area">
          <AnalyticsPanel 
            stats={stats}
            onNavigate={setNav}
            t={t}
            theme={theme}
          />
        </aside>
      </div>
    </div>
  );
}
