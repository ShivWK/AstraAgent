import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type Text_assistant } from '@/utils/text_assistants';
import { RootState } from '@/lib/store';
import { type Voice_assistant } from '@/utils/voice_assistants';

export type Mode = 'text' | 'speech' | '';
type Assistant = Text_assistant | Voice_assistant;

type InitialState = {
  selectedInteractionMode: Mode;
  selectedModels: Assistant[];
};

const initialState: InitialState = {
  selectedInteractionMode: '',
  selectedModels: [],
};

// use Set instead of an array as find/findIndex will take O(n) in worst case but set will O(1)

const agentsSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    setSelectedModel: (
      state,
      action: PayloadAction<Text_assistant | Voice_assistant>,
    ) => {
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
      state.selectedInteractionMode = action.payload;
      state.selectedModels = [];
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
