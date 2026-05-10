'use client';

import { useEffect } from 'react';
import useAppDispatch from '@/hooks/useAppDispatch';
import { setTheme, Theme } from '@/features/theme/themeSlice';

const ThemeInit = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      dispatch(setTheme(savedTheme as Theme));
    }
  }, [dispatch]);

  return null;
};

export default ThemeInit;
