export const queryKeys = {
  user: ['user'] as const,

  agents: ['agents'] as const,
  agent: (id: string) => ['agent', id] as const,

  conversations: ['conversations'] as const,
  conversation: (id: string) => ['conversation', id],

  chats: (agentId: string) => ['chats', agentId] as const,
};
