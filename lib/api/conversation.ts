import { fetcher } from './fetcher';
import { type Conversation } from '@/types/conversation';
import { type ConversationCreator } from '@/types/conversationCreator';

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

  createConversation: (data: ConversationCreator) => {
    return fetcher<{
      success: boolean;
      message?: string;
      conversation: Conversation;
    }>('api/conversation/create', {
      method: 'POST',
      body: JSON.stringify(data),
    });
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
