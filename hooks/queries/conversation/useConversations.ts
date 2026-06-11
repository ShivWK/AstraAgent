import { conversationApi } from '@/lib/api/conversation';
import { queryKeys } from '@/lib/react_query/query-keys';
import { useQuery } from '@tanstack/react-query';

export const useConversations = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.conversations,
    queryFn: conversationApi.getConversations,
  });

  const conversations = data?.conversations || [];

  return { conversations, isLoading, isError, error };
};
