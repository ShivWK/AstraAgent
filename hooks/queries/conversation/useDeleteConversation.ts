import { conversationApi } from '@/lib/api/conversation';
import { queryKeys } from '@/lib/react_query/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type Conversation } from '@/types/conversation';

export const useDeleteConversation = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, reset } = useMutation({
    mutationFn: (id: string) => conversationApi.deleteConversation(id),

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.conversations,
        exact: true,
      });

      const previousConversations = queryClient.getQueryData(
        queryKeys.conversations,
      );

      queryClient.setQueryData(
        queryKeys.conversations,
        (oldData: { conversations: Conversation[] }) => {
          const optimisticConversations = oldData.conversations.filter(
            (cn) => cn._id !== id,
          );

          return { conversations: optimisticConversations };
        },
      );

      return { previousConversations };
    },

    onError: (error: unknown, variable, context) => {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log('Unknown error', error);
      }

      queryClient.setQueryData(
        queryKeys.conversations,
        context?.previousConversations,
      );
    },

    onSuccess: (data) => {
      if (data.conversationId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.conversations,
          exact: true,
        });
      }
    },
  });

  return { mutate, isPending, reset };
};
