import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type Text_assistant } from '@/utils/text_assistants';
import { RootState } from '@/lib/store';
import { type Voice_assistant } from '@/utils/voice_assistants';

export type Mode = 'text' | 'speech' | '';
type Assistant = Text_assistant | Voice_assistant | null;

type InitialState = {
  selectedInteractionMode: Mode;
  voiceAgentInstruction: string;
  selectedAgent: Assistant;
  openSidebar: boolean;
};

const initialState: InitialState = {
  selectedInteractionMode: '',
  voiceAgentInstruction: '',
  selectedAgent: null,
  openSidebar: false,
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

    setVoiceAgentInstruction: (state, action: PayloadAction<string>) => {
      state.voiceAgentInstruction = action.payload;
    },

    setSelectedInteractionMode: (state, action: PayloadAction<Mode>) => {
      state.selectedInteractionMode = action.payload;
      state.selectedAgent = null;
    },

    setOpenSidebar: (state, action: PayloadAction<boolean>) => {
      state.openSidebar = action.payload;
    },
  },
});

export default agentsSlice.reducer;

export const selectSelectedAgent = (state: RootState) =>
  state.agents.selectedAgent;
export const selectSelectedInteractionMode = (state: RootState) =>
  state.agents.selectedInteractionMode;
export const selectOpenSidebar = (state: RootState) => state.agents.openSidebar;
export const selectVoiceAgentInstruction = (state: RootState) =>
  state.agents.voiceAgentInstruction;

export const {
  setSelectedAgent,
  setSelectedInteractionMode,
  setOpenSidebar,
  setVoiceAgentInstruction,
} = agentsSlice.actions;
