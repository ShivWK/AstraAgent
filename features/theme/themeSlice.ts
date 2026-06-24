import { RootState } from '@/lib/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark' | 'system';

type StateType = {
  mode: Theme;
};

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'system';

  const saved = localStorage.getItem('theme');

  if (saved === 'light' || saved === 'dark' || saved === 'system') {
    return saved;
  }

  return 'system';
};

const initialState: StateType = {
  mode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.mode = action.payload;
    },
  },
});

export default themeSlice.reducer;
export const selectTheme = (state: RootState) => state.theme.mode;

export const { setTheme } = themeSlice.actions;
