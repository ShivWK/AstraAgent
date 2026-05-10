import { RootState } from '@/lib/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark' | 'system';

type StateType = {
  mode: Theme;
  themeIcon: 'light' | 'dark' | null;
};

const initialState: StateType = {
  mode: 'system',
  themeIcon: null,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.mode = action.payload;
    },

    setThemeIcon: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.themeIcon = action.payload;
    },
  },
});

export default themeSlice.reducer;
export const selectTheme = (state: RootState) => state.theme.mode;
export const selectThemeIcon = (state: RootState) => state.theme.themeIcon;

export const { setTheme, setThemeIcon } = themeSlice.actions;
