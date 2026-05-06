import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';
import { User } from '@/types/user';

type InitialStateType = {
  openLoginModel: boolean;
  loginError: string | null;
  getStartedLoading: boolean;
  globalAuthLoader: boolean;
  globalDbLoading: boolean;
  user: User;
};

const initialState: InitialStateType = {
  openLoginModel: false,
  loginError: '',
  getStartedLoading: false,
  globalAuthLoader: false,
  globalDbLoading: false,
  user: {
    name: '',
    role: 'user',
    email: '',
    tokens: 0,
    totalTokens: 0,
    image: '',
    emailVerified: null,
  },
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
    setDbLoader: (state, action: PayloadAction<boolean>) => {
      state.globalDbLoading = action.payload;
    },

    setTokens: (state, action: PayloadAction<number>) => {
      state.user.tokens -= action.payload;
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
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
export const selectUser = (state: RootState) => state.auth.user;
export const selectDbLoader = (state: RootState) => state.auth.globalDbLoading;

export const {
  setOpenLoginModel,
  setLoginError,
  setGetStartedLoading,
  setGlobalAuthLoader,
  setTokens,
  setUser,
  setDbLoader,
} = authSlice.actions;
