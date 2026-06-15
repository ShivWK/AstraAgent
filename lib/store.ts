import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import agentsReducer from '../features/agents/agentsSlice';
import themeReducer from '../features/theme/themeSlice';
import workspaceReducer from '../features/workspace/workspaceSlice';
import toastReducer from '../features/toast/toastSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    agents: agentsReducer,
    theme: themeReducer,
    workspace: workspaceReducer,
    toast: toastReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
