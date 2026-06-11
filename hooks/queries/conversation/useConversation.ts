import { conversationApi } from '@/lib/api/conversation';
import { queryKeys } from '@/lib/react_query/query-keys';
import { useQuery } from '@tanstack/react-query';

export const useConversation = (id: string) => {
  const { data, isLoading, isError, error } = useQuery({
    enabled: !!id,
    queryKey: queryKeys.conversation(id),
    queryFn: () => conversationApi.getConversation(id),
  });

  const conversation = data?.conversation || null;

  return { conversation, isLoading, isError, error };
};
