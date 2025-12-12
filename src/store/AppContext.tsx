import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, AppAction } from './types';
import { appReducer } from './reducers';

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

const getInitialTheme = (): 'light' | 'dark' => {
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getInitialRTL = (): boolean => {
  const saved = localStorage.getItem('rtl');
  return saved === 'true';
};

const getInitialSidebarCollapsed = (): boolean => {
  const saved = localStorage.getItem('sidebarCollapsed');
  return saved === 'true';
};

const initialState: AppState = {
  auth: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
  },
  theme: {
    theme: getInitialTheme(),
    isRTL: getInitialRTL(),
  },
  layout: {
    layoutMode: 'sidebar',
    sidebarCollapsed: getInitialSidebarCollapsed(),
  },
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    localStorage.setItem('theme', state.theme.theme);
    if (state.theme.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme.theme]);

  useEffect(() => {
    localStorage.setItem('rtl', String(state.theme.isRTL));
    if (state.theme.isRTL) {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }, [state.theme.isRTL]);

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', String(state.layout.sidebarCollapsed));
  }, [state.layout.sidebarCollapsed]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
