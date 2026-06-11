import { useQuery } from '@tanstack/react-query';
import { agentsApi } from '@/lib/api/agents';
import { queryKeys } from '@/lib/react_query/query-keys';

export const useAgents = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.agents,
    queryFn: agentsApi.getAgents,
  });

  return { data, isLoading, error };
};
