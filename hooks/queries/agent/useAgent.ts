import { queryKeys } from '@/lib/react_query/query-keys';
import { useQuery } from '@tanstack/react-query';
import { agentsApi } from '@/lib/api/agents';

export const useAgent = (id: string, enable: boolean) => {
  const { data, isLoading, isError, error } = useQuery({
    enabled: enable && !!id,
    queryKey: queryKeys.agent(id),
    queryFn: () => agentsApi.getAgent(id),
    staleTime: Infinity,
  });

  const agent = data?.agent;

  return { agent, isLoading, isError, error };
};
