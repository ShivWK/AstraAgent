import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 10 minutes
      gcTime: 1000 * 60 * 60, // 1 hour
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },

  queryCache: new QueryCache({
    onError: (error, query) => {},
  }),

  mutationCache: new MutationCache({
    onError: (error, mutation) => {},
  }),
});
