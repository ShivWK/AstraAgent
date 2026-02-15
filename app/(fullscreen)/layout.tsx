import { ReactNode } from 'react';

type PropType = {
  children: ReactNode;
};

const layout = ({ children }: PropType) => {
  return <div>{children}</div>;
};

export default layout;
