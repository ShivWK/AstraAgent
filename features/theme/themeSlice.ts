import { RootState } from '@/lib/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark';

type StateType = {
  mode: Theme;
};

const initialState: StateType = {
  mode: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.mode = action.payload;
    },

    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
  },
});

export default themeSlice.reducer;
export const selectTheme = (state: RootState) => state.theme.mode;

export const { setTheme, toggleTheme } = themeSlice.actions;
