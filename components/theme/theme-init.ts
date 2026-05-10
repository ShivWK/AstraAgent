'use client';

import { useEffect } from 'react';
import useAppDispatch from '@/hooks/useAppDispatch';
import { setTheme, setThemeIcon, Theme } from '@/features/theme/themeSlice';

const ThemeInit = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    console.log('Theme form local', savedTheme);

    if (
      savedTheme === 'light' ||
      savedTheme === 'dark' ||
      savedTheme === 'system'
    ) {
      dispatch(setTheme(savedTheme as Theme));
    }

    if (savedTheme === 'light') dispatch(setThemeIcon('light'));
    else if (savedTheme === 'dark') dispatch(setThemeIcon('dark'));
    else if (savedTheme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      if (mediaQuery.matches) {
        dispatch(setThemeIcon('dark'));
      } else {
        dispatch(setThemeIcon('light'));
      }
    }
  }, [dispatch]);

  return null;
};

export default ThemeInit;
