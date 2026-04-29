import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';

type InitialStateType = {
  openLoginModel: boolean;
  loginError: string | null;
  getStartedLoading: boolean;
  globalAuthLoader: boolean;
  tokens: {
    totalTokens: number;
    currentToken: number;
  };
};

const initialState: InitialStateType = {
  openLoginModel: false,
  loginError: '',
  getStartedLoading: false,
  globalAuthLoader: false,
  tokens: {
    totalTokens: 0,
    currentToken: 0,
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

    setTokens: (
      state,
      action: PayloadAction<{
        type: string;
        currentValue: number;
        totalValue?: number;
      }>,
    ) => {
      const payload = action.payload;
      if (payload.type === 'main') {
        state.tokens = payload.totalValue
          ? {
              totalTokens: payload.totalValue,
              currentToken: payload.currentValue,
            }
          : {
              totalTokens: 0,
              currentToken: 0,
            };
      } else if (payload.type === 'decrement') {
        state.tokens.currentToken -= payload.currentValue;
      }
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
export const selectTokens = (state: RootState) => state.auth.tokens;

export const {
  setOpenLoginModel,
  setLoginError,
  setGetStartedLoading,
  setGlobalAuthLoader,
  setTokens,
} = authSlice.actions;
