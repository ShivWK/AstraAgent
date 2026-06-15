import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';
import store from '../store';
import { addToast } from '@/features/toast/toastSlice';

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
    onError: (error) => {
      store.dispatch(
        addToast({
          message:
            error instanceof Error ? error.message : 'Something went wrong',
          type: 'error',
        }),
      );
    },
  }),

  mutationCache: new MutationCache({
    onError: (error) => {
      store.dispatch(
        addToast({
          message:
            error instanceof Error ? error.message : 'Something went wrong',
          type: 'error',
        }),
      );
    },
  }),
});
