'use client';

import { useEffect } from 'react';
import useAppSelector from '@/hooks/useAppSelector';
import { selectTheme } from '@/features/theme/themeSlice';

const ThemeSync = () => {
  const currentTheme = useAppSelector(selectTheme);
  console.log('theme', currentTheme);

  useEffect(() => {
    const root = document.documentElement;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    console.log('DO match', mediaQuery.matches);

    const applyTheme = () => {
      let isDark = false;

      if (currentTheme === 'dark') {
        isDark = true;
      } else if (currentTheme === 'light') {
        isDark = false;
      } else {
        isDark = mediaQuery.matches;
      }

      root.classList.toggle('dark', isDark);
    };

    applyTheme();
    localStorage.setItem('theme', currentTheme);

    if (currentTheme === 'system') {
      mediaQuery.addEventListener('change', applyTheme);
    }

    return () => {
      mediaQuery.removeEventListener('change', applyTheme);
    };
  }, [currentTheme]);

  return null;
};

export default ThemeSync;
