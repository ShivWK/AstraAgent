'use client';

import { useEffect } from 'react';
import useAppSelector from '@/hooks/useAppSelector';
import { selectTheme } from '@/features/theme/themeSlice';

const ThemeSync = () => {
  const currentTheme = useAppSelector(selectTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');

    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  return null;
};

export default ThemeSync;
