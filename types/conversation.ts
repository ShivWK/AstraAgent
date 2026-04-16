export type Conversation = {
  _id: string;
  userId: string;
  agentId: string;
  defaultAgentModel: string;
  currentAgentModel: string;
  agentTitle: string;
  agentName: string;
  mode: string;
  key: string;
  customInstruction: string;
  isTitleGenerated: boolean;
  title: string;
  updatedAt: Date;
  createdAt: Date;
};
