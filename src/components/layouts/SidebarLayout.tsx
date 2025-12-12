import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Receipt,
  Settings,
  Bell,
  FolderOpen,
  Calendar,
  Menu,
  X,
  Sun,
  Moon,
  Languages,
} from 'lucide-react';
import { useAppContext } from '../../store';

interface SidebarLayoutProps {
  children: ReactNode;
}

interface NavItem {
  path: string;
  label: string;
  icon: ReactNode;
}

const navItems: NavItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { path: '/users', label: 'Users', icon: <Users size={20} /> },
  { path: '/projects', label: 'Projects', icon: <FolderKanban size={20} /> },
  { path: '/transactions', label: 'Transactions', icon: <Receipt size={20} /> },
  { path: '/notifications', label: 'Notifications', icon: <Bell size={20} /> },
  { path: '/files', label: 'Files', icon: <FolderOpen size={20} /> },
  { path: '/calendar', label: 'Calendar', icon: <Calendar size={20} /> },
  { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
];

export const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const { state, dispatch } = useAppContext();
  const location = useLocation();

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const toggleRTL = () => {
    dispatch({ type: 'TOGGLE_RTL' });
  };

  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <aside
        className={`${
          state.layout.sidebarCollapsed ? 'w-16' : 'w-64'
        } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {!state.layout.sidebarCollapsed && (
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label={state.layout.sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {state.layout.sidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto" role="navigation" aria-label="Main navigation">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.icon}
                    {!state.layout.sidebarCollapsed && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {state.theme.theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            {!state.layout.sidebarCollapsed && <span className="font-medium">Theme</span>}
          </button>
          <button
            onClick={toggleRTL}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle RTL"
          >
            <Languages size={20} />
            {!state.layout.sidebarCollapsed && <span className="font-medium">RTL</span>}
          </button>
        </div>

        {state.auth.user && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              {state.auth.user.avatar && (
                <img
                  src={state.auth.user.avatar}
                  alt={state.auth.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              {!state.layout.sidebarCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {state.auth.user.name}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
};
