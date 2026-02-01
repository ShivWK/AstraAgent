import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type Text_assistant } from '@/utils/text_assistants';
import { RootState } from '@/lib/store';
import { type Voice_assistant } from '@/utils/voice_assistants';

export type Mode = 'text' | 'speech' | '';
type Assistant = Text_assistant | Voice_assistant | null;

type InitialState = {
  selectedInteractionMode: Mode;
  selectedAgent: Assistant;
};

const initialState: InitialState = {
  selectedInteractionMode: '',
  selectedAgent: null,
};

// use Set instead of an array as find/findIndex will take O(n) in worst case but set will O(1)

const agentsSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    setSelectedAgent: (
      state,
      action: PayloadAction<Text_assistant | Voice_assistant>,
    ) => {
      if (state.selectedAgent?.id === action.payload.id) {
        state.selectedAgent = null;
      } else {
        state.selectedAgent = action.payload;
      }
    },

    setSelectedInteractionMode: (state, action: PayloadAction<Mode>) => {
      state.selectedInteractionMode = action.payload;
      state.selectedAgent = null;
    },
  },
});

export default agentsSlice.reducer;

export const selectSelectedAgent = (state: RootState) =>
  state.agents.selectedAgent;
export const selectSelectedInteractionMode = (state: RootState) =>
  state.agents.selectedInteractionMode;

export const { setSelectedAgent, setSelectedInteractionMode } =
  agentsSlice.actions;
