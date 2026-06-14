import { queryKeys } from '@/lib/react_query/query-keys';
import { conversationApi } from '@/lib/api/conversation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ConversationCreator } from '@/types/conversationCreator';

export const useCreateConversation = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, reset } = useMutation({
    mutationFn: (data: ConversationCreator) =>
      conversationApi.createConversation(data),

    onSuccess: (data) => {
      if (data.conversation) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.conversations,
          exact: true,
        });
      }
    },
  });

  return { mutate, isPending, reset };
};
