import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';

type InitialStateType = {
  openLoginModel: boolean;
  loginError: string | null;
  getStartedLoading: boolean;
  globalAuthLoader: boolean;
};

const initialState: InitialStateType = {
  openLoginModel: false,
  loginError: '',
  getStartedLoading: false,
  globalAuthLoader: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setOpenLoginModel: (state, action: PayloadAction<boolean>) => {
      state.openLoginModel = action.payload;
    },

    setLoginError: (state, action: PayloadAction<string | null>) => {
      state.loginError = action.payload;
    },

    setGetStartedLoading: (state, action: PayloadAction<boolean>) => {
      state.getStartedLoading = action.payload;
    },

    setGlobalAuthLoader: (state, action: PayloadAction<boolean>) => {
      state.globalAuthLoader = action.payload;
    },

    setAuthStatus: () => {},
  },
});

export default authSlice.reducer;

export const selectLoginModelOpenState = (state: RootState) =>
  state.auth.openLoginModel;
export const selectLoginError = (state: RootState) => state.auth.loginError;
export const selectGetStartedLoading = (state: RootState) =>
  state.auth.getStartedLoading;
export const selectGlobalAuthLoader = (state: RootState) =>
  state.auth.globalAuthLoader;

export const {
  setOpenLoginModel,
  setLoginError,
  setGetStartedLoading,
  setGlobalAuthLoader,
} = authSlice.actions;
