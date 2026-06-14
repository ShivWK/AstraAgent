import { conversationApi } from '@/lib/api/conversation';
import { queryKeys } from '@/lib/react_query/query-keys';
import { useQuery } from '@tanstack/react-query';
import groupByAgent from '@/utils/groupByAgent';

export const useConversations = () => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.conversations,
    queryFn: conversationApi.getConversations,
    select: (data) => {
      console.log('data got', data);
      return groupByAgent(data.conversations);
    },
  });

  return { conversations: data, isLoading };
};
