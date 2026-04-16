import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';
import { Agent } from '@/types/agents';
import { Conversation } from '@/types/conversation';

export type Mode = 'text' | 'speech' | '';
type Assistant = Agent | null;

type InitialState = {
  selectedInteractionMode: Mode;
  voiceAgentInstruction: string;
  selectedAgent: Assistant;
  openSidebar: boolean;
  conversationHistory: Conversation[] | null;
};

const initialState: InitialState = {
  selectedInteractionMode: '',
  voiceAgentInstruction: '',
  selectedAgent: null,
  openSidebar: false,
  conversationHistory: null,
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

    setConversationHistory: (state, action: PayloadAction<Conversation[]>) => {
      state.conversationHistory = action.payload;
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
export const selectConversationHistory = (state: RootState) =>
  state.agents.conversationHistory;

export const {
  setSelectedAgent,
  setSelectedInteractionMode,
  setOpenSidebar,
  setVoiceAgentInstruction,
  setConversationHistory,
} = agentsSlice.actions;
