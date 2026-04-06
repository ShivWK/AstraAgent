import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';
import { Agent } from '@/types/agents';

export type Mode = 'text' | 'speech' | '';
type Assistant = Agent | null;

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

const agentsSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    setSelectedAgent: (state, action: PayloadAction<Agent>) => {
      if (state.selectedAgent?._id === action.payload._id) {
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
