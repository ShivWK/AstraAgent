import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';

type InitialStateType = {
  isLoggedIn: boolean;
  userDetails: {
    name: string;
    email: string;
    pic?: string;
  };
  openLoginModel: boolean;
};

const initialState: InitialStateType = {
  isLoggedIn: false,
  userDetails: {
    name: '',
    email: '',
    pic: '',
  },
  openLoginModel: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogInState: (state, action) => {
      state.isLoggedIn = action.payload;
    },

    setOpenLoginModel: (state, action) => {
      state.openLoginModel = action.payload;
    },

    setLoggedInUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export default authSlice.reducer;

export const selectLogInState = (state: RootState) => state.auth.isLoggedIn;
export const selectUserDetails = (state: RootState) => state.auth.userDetails;
export const selectLoginModelOpenState = (state: RootState) =>
  state.auth.openLoginModel;

export const { setLogInState, setOpenLoginModel, setLoggedInUserDetails } =
  authSlice.actions;
