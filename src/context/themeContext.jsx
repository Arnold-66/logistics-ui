import { createContext, useState, useEffect, useCallback, useMemo } from "react";

// Default brand theme - using your existing brand colors
const DEFAULT_THEME = {
  primary: '#714b67',
  primaryHover: '#8a5f7e',
  secondary: '#7c3aed',
  accent: '#f59e0b',
  background: '#f8fafc',
  surface: '#ffffff',
  surfaceHover: '#f1f5f9',
  text: '#0f172a',
  textMuted: '#64748b',
  border: '#e2e8f0',
  success: '#16a34a',
  danger: '#dc2626',
  warning: '#d97706',
};

// Map theme keys to CSS variable names
const THEME_TO_CSS_MAP = {
  primary: '--color-primary',
  primaryHover: '--color-primary-hover',
  secondary: '--color-secondary',
  accent: '--color-accent',
  background: '--color-background',
  surface: '--color-surface',
  surfaceHover: '--color-surface-hover',
  text: '--color-text',
  textMuted: '--color-text-muted',
  border: '--color-border',
  success: '--color-success',
  danger: '--color-danger',
  warning: '--color-warning',
};

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Dark mode state (existing)
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
    return false;
  });

  // Brand theme state (new)
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('brandTheme');
      if (savedTheme) {
        const parsed = JSON.parse(savedTheme);
        // Merge with defaults to ensure all keys exist
        return { ...DEFAULT_THEME, ...parsed };
      }
    } catch (error) {
      console.error('Failed to load brand theme from localStorage:', error);
    }
    return DEFAULT_THEME;
  });

  // Apply brand theme CSS variables to document root
  const applyTheme = useCallback((themeData) => {
    const root = document.documentElement;
    Object.entries(THEME_TO_CSS_MAP).forEach(([key, cssVar]) => {
      if (themeData[key] !== undefined) {
        root.style.setProperty(cssVar, themeData[key]);
      }
    });
  }, []);

  // Apply theme on mount and when theme changes
  useEffect(() => {
    applyTheme(theme);
    // Save to localStorage
    try {
      localStorage.setItem('brandTheme', JSON.stringify(theme));
    } catch (error) {
      console.error('Failed to save brand theme to localStorage:', error);
    }
  }, [theme, applyTheme]);

  // Apply dark mode (existing)
  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Listen for system theme changes (existing)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setDarkMode(e.matches);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // API-ready theme setter - can accept partial theme objects
  const setThemeWithMerge = useCallback((newTheme) => {
    setTheme((prevTheme) => {
      // If newTheme is a function, call it with prevTheme
      const themeData = typeof newTheme === 'function' ? newTheme(prevTheme) : newTheme;
      // Merge with defaults to ensure all keys exist
      return { ...DEFAULT_THEME, ...prevTheme, ...themeData };
    });
  }, []);

  // Helper to get a specific color value
  const getColor = useCallback((key) => {
    return theme[key] || DEFAULT_THEME[key];
  }, [theme]);

  // Helper to reset to default theme
  const resetTheme = useCallback(() => {
    setTheme(DEFAULT_THEME);
  }, []);

  // Context value
  const contextValue = useMemo(() => ({
    darkMode,
    setDarkMode,
    theme,
    setTheme: setThemeWithMerge,
    getColor,
    resetTheme,
  }), [darkMode, theme, setThemeWithMerge, getColor, resetTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}