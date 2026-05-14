import { useState, useCallback } from 'react';

import type { User, AuthState } from '../types';

const AUTH_KEY = 'taskbloom_auth_v1';

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>(() => {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      if (!raw) return { user: null, isAuthenticated: false };
      return JSON.parse(raw);
    } catch {
      return { user: null, isAuthenticated: false };
    }
  });

  const login = useCallback((name: string, email: string) => {
    const user: User = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      title: 'Magical Producer ✨',
    };
    const newState = { user, isAuthenticated: true };
    setAuth(newState);
    localStorage.setItem(AUTH_KEY, JSON.stringify(newState));
  }, []);

  const signup = useCallback((name: string, email: string) => {
    // For this demo, signup is same as login
    login(name, email);
  }, [login]);

  const logout = useCallback(() => {
    const newState = { user: null, isAuthenticated: false };
    setAuth(newState);
    localStorage.removeItem(AUTH_KEY);
  }, []);

  return { ...auth, login, signup, logout };
}
