import { agentsApi } from '@/lib/api/agents';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/react_query/query-keys';
import { type Agent } from '@/types/agents';

export const useDeleteAgent = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, error, reset } = useMutation({
    mutationFn: (id: string) => agentsApi.deleteAgent(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.agents,
        exact: true,
      });

      const previousAgents = queryClient.getQueryData(queryKeys.agents);

      queryClient.setQueryData(
        queryKeys.agents,
        (oldData: { success: boolean; agents: Agent[] }) => {
          console.log('Old data', oldData);
          if (!oldData.agents) return oldData;

          return {
            ...oldData,
            [queryKeys.agents[0]]: oldData.agents.filter(
              (agents: Agent) => agents._id !== id,
            ),
          };
        },
      );

      return { previousAgents };
    },

    onError: (err: unknown, variables, context) => {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log('Random error in delete', err);
      }

      queryClient.setQueryData(queryKeys.agents, context?.previousAgents);
    },

    onSuccess: (data) => {
      if (data.agentId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.agents,
          exact: true,
        });
      }
    },
  });

  return { mutate, isPending, isSuccess, isError, error, reset };
};
