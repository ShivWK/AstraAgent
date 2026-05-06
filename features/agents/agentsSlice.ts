import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';
import { Agent } from '@/types/agents';
import { Conversation } from '@/types/conversation';

export type Mode = 'text' | 'voice' | '';
type Assistant = Agent | null;

type InitialState = {
  selectedInteractionMode: Mode;
  agentInstruction: string;
  selectedAgent: Assistant;
  openSidebar: boolean;
  conversationHistory: Conversation[] | null;
  openAgentCreationModal: boolean;
};

const initialState: InitialState = {
  selectedInteractionMode: '',
  agentInstruction: '',
  selectedAgent: null,
  openSidebar: false,
  conversationHistory: null,
  openAgentCreationModal: false,
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

    setAgentInstruction: (state, action: PayloadAction<string>) => {
      state.agentInstruction = action.payload;
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

    setOpenAgentCreationModel: (state, action: PayloadAction<boolean>) => {
      state.openAgentCreationModal = action.payload;
    },
  },
});

export default agentsSlice.reducer;

export const selectSelectedAgent = (state: RootState) =>
  state.agents.selectedAgent;
export const selectSelectedInteractionMode = (state: RootState) =>
  state.agents.selectedInteractionMode;
export const selectOpenSidebar = (state: RootState) => state.agents.openSidebar;
export const selectAgentInstruction = (state: RootState) =>
  state.agents.agentInstruction;
export const selectConversationHistory = (state: RootState) =>
  state.agents.conversationHistory;
export const selectOpenAgentCreationModal = (state: RootState) =>
  state.agents.openAgentCreationModal;

export const {
  setSelectedAgent,
  setSelectedInteractionMode,
  setOpenSidebar,
  setAgentInstruction,
  setConversationHistory,
  setOpenAgentCreationModel,
} = agentsSlice.actions;
