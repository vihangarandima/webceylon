import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const ThemeCtx = createContext({ theme: 'dark', toggle: () => {} });

const read = () => {
  try {
    return localStorage.getItem('wc-theme') === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
};

// Dark by default; the visitor's choice is remembered on this device.
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(read);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f5f5f3' : '#000000');
    try {
      localStorage.setItem('wc-theme', theme);
    } catch {
      /* storage blocked — the switch still works for this visit */
    }
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);
  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);
