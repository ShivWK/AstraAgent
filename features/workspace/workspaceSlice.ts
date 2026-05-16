import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';

type RenameData = {
  open: boolean;
  chat: string;
  conversationId: string;
};

type InitialState = {
  renameLoading: boolean;
  renameModalData: RenameData;
};

const initialState: InitialState = {
  renameLoading: false,
  renameModalData: {
    open: false,
    chat: '',
    conversationId: '',
  },
};

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    setRenameLoading: (state, action: PayloadAction<boolean>) => {
      state.renameLoading = action.payload;
    },
    openRenameModal: (state, action: PayloadAction<RenameData>) => {
      state.renameModalData.open = true;
      state.renameModalData.chat = action.payload.chat;
      state.renameModalData.conversationId = action.payload.conversationId;
    },

    closeRenameModal: (state) => {
      state.renameModalData.open = false;
      state.renameModalData.chat = '';
      state.renameModalData.conversationId = '';
    },
  },
});

export default workspaceSlice.reducer;

export const selectRenameLoading = (state: RootState) =>
  state.workspace.renameLoading;
export const selectRenameModalData = (state: RootState) =>
  state.workspace.renameModalData;

export const { setRenameLoading, closeRenameModal, openRenameModal } =
  workspaceSlice.actions;
