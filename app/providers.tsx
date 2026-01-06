'use client';

import { Provider } from 'react-redux';
import store from '@/lib/store';
import { ReactNode } from 'react';

type PropsType = {
  children: ReactNode;
};

const Providers = ({ children }: PropsType) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
