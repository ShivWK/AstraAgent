export const queryKeys = {
  agents: ['agents'] as const,

  agent: (id: string) => ['agent', id] as const,

  chats: (agentId: string) => ['chats', agentId] as const,

  user: ['user'] as const,
};
