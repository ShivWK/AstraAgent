import { queryKeys } from '@/lib/react_query/query-keys';
import { userApi } from '@/lib/api/user';
import { useQuery } from '@tanstack/react-query';

export const useUserQuery = (status: boolean) => {
  const { data, isPending, isError, error } = useQuery({
    enabled: status,
    queryKey: queryKeys.user,
    queryFn: userApi.getUser,
  });

  const user = data?.user;

  return { user, isPending, isError, error };
};
