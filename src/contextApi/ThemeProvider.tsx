import { createContext, ReactNode, useContext, useEffect, useLayoutEffect, useState } from "react";

type Theme = 'light' | 'dark';
type ThemeContextValue = { theme: Theme | null; toggleTheme: () => void };
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // start as null so SSR and client don't mismatch
  const [theme, setTheme] = useState<Theme | null>(null);

  // On first client render, decide the theme (localStorage -> prefers -> default light)
  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark') {
        setTheme(stored as Theme);
        return;
      }
    } catch (e) {
      // ignore storage errors
    }

    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  // Apply class before paint when theme changes (avoids flash)
  useLayoutEffect(() => {
    if (theme === null) return;
    document.documentElement.classList.toggle('light', theme === 'light');
    try { localStorage.setItem('theme', theme); } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
