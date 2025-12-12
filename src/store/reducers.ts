import { AppState, AppAction, AuthState, ThemeState, LayoutState } from './types';

const authReducer = (state: AuthState, action: AppAction): AuthState => {
  if (action.type === 'LOGIN') {
    return {
      ...state,
      user: action.payload,
      isAuthenticated: true,
      isLoading: false,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      user: null,
      isAuthenticated: false,
      isLoading: false,
    };
  }
  if (action.type === 'SET_LOADING') {
    return {
      ...state,
      isLoading: action.payload,
    };
  }
  return state;
};

const themeReducer = (state: ThemeState, action: AppAction): ThemeState => {
  if (action.type === 'TOGGLE_THEME') {
    return {
      ...state,
      theme: state.theme === 'light' ? 'dark' : 'light',
    };
  }
  if (action.type === 'SET_THEME') {
    return {
      ...state,
      theme: action.payload,
    };
  }
  if (action.type === 'TOGGLE_RTL') {
    return {
      ...state,
      isRTL: !state.isRTL,
    };
  }
  if (action.type === 'SET_RTL') {
    return {
      ...state,
      isRTL: action.payload,
    };
  }
  return state;
};

const layoutReducer = (state: LayoutState, action: AppAction): LayoutState => {
  if (action.type === 'SET_LAYOUT_MODE') {
    return {
      ...state,
      layoutMode: action.payload,
    };
  }
  if (action.type === 'TOGGLE_SIDEBAR') {
    return {
      ...state,
      sidebarCollapsed: !state.sidebarCollapsed,
    };
  }
  if (action.type === 'SET_SIDEBAR_COLLAPSED') {
    return {
      ...state,
      sidebarCollapsed: action.payload,
    };
  }
  return state;
};

export const appReducer = (state: AppState, action: AppAction): AppState => {
  return {
    auth: authReducer(state.auth, action),
    theme: themeReducer(state.theme, action),
    layout: layoutReducer(state.layout, action),
  };
};
