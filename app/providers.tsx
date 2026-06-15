'use client';

import { Provider } from 'react-redux';
import store from '@/lib/store';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react_query/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ToastContainer from '@/components/toast/ToastContainer';

type PropsType = {
  children: ReactNode;
};

const Providers = ({ children }: PropsType) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
          <ToastContainer />
        </QueryClientProvider>
      </Provider>
    </SessionProvider>
  );
};

export default Providers;
