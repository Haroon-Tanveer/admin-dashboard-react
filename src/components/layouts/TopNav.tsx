import { ReactNode, useState } from 'react';
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

interface TopNavLayoutProps {
  children: ReactNode;
}

interface NavItem {
  path: string;
  label: string;
  icon: ReactNode;
}

const navItems: NavItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { path: '/users', label: 'Users', icon: <Users size={18} /> },
  { path: '/projects', label: 'Projects', icon: <FolderKanban size={18} /> },
  { path: '/transactions', label: 'Transactions', icon: <Receipt size={18} /> },
  { path: '/notifications', label: 'Notifications', icon: <Bell size={18} /> },
  { path: '/files', label: 'Files', icon: <FolderOpen size={18} /> },
  { path: '/calendar', label: 'Calendar', icon: <Calendar size={18} /> },
  { path: '/settings', label: 'Settings', icon: <Settings size={18} /> },
];

export const TopNavLayout = ({ children }: TopNavLayoutProps) => {
  const { state, dispatch } = useAppContext();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const toggleRTL = () => {
    dispatch({ type: 'TOGGLE_RTL' });
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>

            <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.icon}
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {state.theme.theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={toggleRTL}
                className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle RTL"
              >
                <Languages size={20} />
              </button>

              {state.auth.user && (
                <div className="hidden lg:flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-700">
                  {state.auth.user.avatar && (
                    <img
                      src={state.auth.user.avatar}
                      alt={state.auth.user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <div className="text-sm">
                    <p className="font-medium text-gray-900 dark:text-white">{state.auth.user.name}</p>
                    <button
                      onClick={handleLogout}
                      className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <nav className="lg:hidden mt-4 pb-2 border-t border-gray-200 dark:border-gray-700 pt-4">
              <ul className="space-y-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
        </div>
      </header>

      <main className="p-4 lg:p-8">{children}</main>
    </div>
  );
};
