import { ReactNode } from 'react';
import { Sun, Moon, Languages } from 'lucide-react';
import { useAppContext } from '../../store';

interface MinimalLayoutProps {
  children: ReactNode;
}

export const MinimalLayout = ({ children }: MinimalLayoutProps) => {
  const { state, dispatch } = useAppContext();

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const toggleRTL = () => {
    dispatch({ type: 'TOGGLE_RTL' });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      <header className="absolute top-0 right-0 p-4 flex gap-2 z-10">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-md"
          aria-label="Toggle theme"
        >
          {state.theme.theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button
          onClick={toggleRTL}
          className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-md"
          aria-label="Toggle RTL"
        >
          <Languages size={20} />
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">{children}</main>
    </div>
  );
};
