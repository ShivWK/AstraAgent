import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type Assistant } from '@/utils/assistants';
import { RootState } from '@/lib/store';

export type Mode = 'text' | 'speech' | '';

type InitialState = {
  selectedModels: Assistant[];
  selectedInteractionMode: Mode;
};

const initialState: InitialState = {
  selectedModels: [],
  selectedInteractionMode: '',
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

    setSelectedInteractionMode: (state, action: PayloadAction<Mode>) => {
      const value = state.selectedInteractionMode;
      if (value == action.payload) {
        state.selectedInteractionMode = '';
      } else {
        state.selectedInteractionMode = action.payload;
      }
    },
  },
});

export default agentsSlice.reducer;

export const selectSelectedModel = (state: RootState) =>
  state.agents.selectedModels;
export const selectSelectedInteractionMode = (state: RootState) =>
  state.agents.selectedInteractionMode;

export const { setSelectedModel, setSelectedInteractionMode } =
  agentsSlice.actions;
