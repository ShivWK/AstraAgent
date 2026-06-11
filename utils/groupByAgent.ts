import { type Conversation } from '@/types/conversation';

const groupByAgent = (conversations: Conversation[]) => {
  if (conversations.length === 0) return null;

  return conversations.reduce(
    (acc, current) => {
      if (!acc[current.agentId]) {
        acc[current.agentId] = {
          agentTitle: current.agentTitle,
          agentName: current.agentName,
          agentKey: current.key,
          conversations: [],
        };
      }

      (acc[current.agentId].conversations as Conversation[]).push(current);
      return acc;
    },
    {} as Record<string, Record<string, string | Conversation[]>>,
  );
};

export default groupByAgent;
