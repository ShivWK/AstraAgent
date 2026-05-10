import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import agentsReducer from '../features/agents/agentsSlice';
import themeReducer from '../features/theme/themeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    agents: agentsReducer,
    theme: themeReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
