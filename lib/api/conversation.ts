import { fetcher } from './fetcher';
import { Conversation } from '@/types/conversation';

export const conversationApi = {
  getConversations: () => {
    return fetcher<{ status: string; conversations: Conversation[] }>(
      '/api/conversation?mode=text',
    );
  },

  getConversation: (id: string) => {
    return fetcher<{ status: string; conversation: Conversation }>(
      `/api/conversation/${id}`,
    );
  },

  deleteConversation: (id: string) => {
    return fetcher<{ message: string; conversationId?: string }>(
      `/api/conversation/delete_conversation?id=${id}`,
      {
        method: 'DELETE',
      },
    );
  },
};
