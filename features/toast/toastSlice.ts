import { RootState } from '@/lib/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ToastType = 'info' | 'success' | 'error' | 'warning';
export type AnimationType = 'slide' | 'pop';

export type Toast = {
  id: string;
  message: string;
  type: ToastType;
  animation: AnimationType;
  duration: number;
};

type AddToastPayload = {
  type: 'success' | 'error' | 'info';
  message: string;
  duration?: number;
  animation?: AnimationType;
};

export type ToastState = {
  toasts: Toast[];
};

const initialState: ToastState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<AddToastPayload>) => {
      const exists = state.toasts.some(
        (t) => t.message === action.payload.message,
      );

      if (exists) return;

      const MAX_SIZE = 5;

      state.toasts.push({
        id: crypto.randomUUID(),
        duration: 3000,
        animation: 'slide',
        ...action.payload,
      });

      if (state.toasts.length > MAX_SIZE) {
        state.toasts.shift();
      }
    },

    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export default toastSlice.reducer;

export const selectToast = (state: RootState) => state.toast.toasts;

export const { addToast, removeToast } = toastSlice.actions;
