import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';

type InitialStateType = {
  isLoggedIn: boolean;
  openLoginModel: boolean;
  loginError: string | null;
  getStartedLoading: boolean;
  globalAuthLoader: boolean;
};

const initialState: InitialStateType = {
  isLoggedIn: false,
  openLoginModel: false,
  loginError: '',
  getStartedLoading: false,
  globalAuthLoader: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogInState: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },

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

export const selectLogInState = (state: RootState) => state.auth.isLoggedIn;
export const selectLoginModelOpenState = (state: RootState) =>
  state.auth.openLoginModel;
export const selectLoginError = (state: RootState) => state.auth.loginError;
export const selectGetStartedLoading = (state: RootState) =>
  state.auth.getStartedLoading;
export const selectGlobalAuthLoader = (state: RootState) =>
  state.auth.globalAuthLoader;

export const {
  setLogInState,
  setOpenLoginModel,
  setLoginError,
  setGetStartedLoading,
  setGlobalAuthLoader,
} = authSlice.actions;
