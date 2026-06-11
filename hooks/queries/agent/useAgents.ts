import { useQuery } from '@tanstack/react-query';
import { agentsApi } from '@/lib/api/agents';
import { queryKeys } from '@/lib/react_query/query-keys';

export const useAgents = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.agents,
    queryFn: agentsApi.getAgents,
  });

  const agents = data?.agents || [];

  return { agents, isLoading, isError, error };
};
