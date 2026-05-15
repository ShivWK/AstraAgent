import { ReactNode } from 'react';

type PropsType = {
  children: ReactNode;
};

const layout = ({ children }: PropsType) => {
  return <div>{children}</div>;
};

export default layout;
