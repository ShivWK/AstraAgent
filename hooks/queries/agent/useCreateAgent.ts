import { agentsApi } from '@/lib/api/agents';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormType } from '@/components/aiAssistants/NewAgentCreationModel';
import { queryKeys } from '@/lib/react_query/query-keys';
import useAppDispatch from '@/hooks/useAppDispatch';
import { setOpenAgentCreationModel } from '@/features/agents/agentsSlice';

export const useCreateAgent = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { mutate, isPending, isSuccess, isError, error, reset } = useMutation({
    mutationFn: (data: FormType) => agentsApi.createAgent(data),

    onSuccess: (data) => {
      if (data.agent) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.agents,
          exact: true,
        });
      }

      dispatch(setOpenAgentCreationModel(false));
    },
  });

  return { mutate, isPending, isSuccess, isError, error, reset };
};
