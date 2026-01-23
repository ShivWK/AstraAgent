import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';

type InitialStateType = {
  isLoggedIn: boolean;
  userDetails: {
    name: string;
    email: string;
    pic?: string;
  };
  openLoginModel: boolean;
  loginError: string;
  getStartedLoading: boolean;
};

const initialState: InitialStateType = {
  isLoggedIn: false,
  userDetails: {
    name: '',
    email: '',
    pic: '',
  },
  openLoginModel: false,
  loginError: '',
  getStartedLoading: false,
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

    setLoggedInUserDetails: (
      state,
      action: PayloadAction<InitialStateType['userDetails']>,
    ) => {
      state.userDetails = action.payload;
    },

    setLoginError: (state, action: PayloadAction<string>) => {
      state.loginError = action.payload;
    },

    setGetStartedLoading: (state, action: PayloadAction<boolean>) => {
      state.getStartedLoading = action.payload;
    },
  },
});

export default authSlice.reducer;

export const selectLogInState = (state: RootState) => state.auth.isLoggedIn;
export const selectUserDetails = (state: RootState) => state.auth.userDetails;
export const selectLoginModelOpenState = (state: RootState) =>
  state.auth.openLoginModel;
export const selectLoginError = (state: RootState) => state.auth.loginError;
export const selectGetStartedLoading = (state: RootState) =>
  state.auth.getStartedLoading;

export const {
  setLogInState,
  setOpenLoginModel,
  setLoggedInUserDetails,
  setLoginError,
  setGetStartedLoading,
} = authSlice.actions;
