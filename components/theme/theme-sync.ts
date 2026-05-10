'use client';

import { useEffect } from 'react';
import useAppSelector from '@/hooks/useAppSelector';
import { selectTheme, setThemeIcon } from '@/features/theme/themeSlice';
import useAppDispatch from '@/hooks/useAppDispatch';

const ThemeSync = () => {
  const currentTheme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  console.log('theme', currentTheme);

  useEffect(() => {
    const root = document.documentElement;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      let isDark = false;

      if (currentTheme === 'dark') {
        isDark = true;
        dispatch(setThemeIcon('dark'));
      } else if (currentTheme === 'light') {
        isDark = false;
        dispatch(setThemeIcon('light'));
      } else {
        isDark = mediaQuery.matches;

        if (isDark) {
          dispatch(setThemeIcon('dark'));
        } else {
          dispatch(setThemeIcon('light'));
        }
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
