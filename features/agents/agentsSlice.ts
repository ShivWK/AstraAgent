import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type Assistant } from '@/utils/assistants';
import { RootState } from '@/lib/store';

type InitialState = {
  selectedModels: Assistant[];
};

const initialState: InitialState = {
  selectedModels: [],
};

// use Set instead of an array as find/findIndex will take O(n) in worst case but set will O(1)

const agentsSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    setSelectedModel: (state, action: PayloadAction<Assistant>) => {
      const index = state.selectedModels.findIndex(
        (model) => model.id === action.payload.id,
      );

      if (index === -1) {
        state.selectedModels.push(action.payload);
      } else {
        state.selectedModels.splice(index, 1);
      }
    },
  },
});

export default agentsSlice.reducer;

export const selectSelectedModel = (state: RootState) =>
  state.agents.selectedModels;

export const { setSelectedModel } = agentsSlice.actions;
