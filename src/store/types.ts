export type Theme = 'light' | 'dark';
export type LayoutMode = 'sidebar' | 'topnav' | 'minimal';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface ThemeState {
  theme: Theme;
  isRTL: boolean;
}

export interface LayoutState {
  layoutMode: LayoutMode;
  sidebarCollapsed: boolean;
}

export interface AppState {
  auth: AuthState;
  theme: ThemeState;
  layout: LayoutState;
}

export type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean };

export type ThemeAction =
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'TOGGLE_RTL' }
  | { type: 'SET_RTL'; payload: boolean };

export type LayoutAction =
  | { type: 'SET_LAYOUT_MODE'; payload: LayoutMode }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_SIDEBAR_COLLAPSED'; payload: boolean };

export type AppAction = AuthAction | ThemeAction | LayoutAction;
