import { ReactNode } from 'react';

type PropsType = {
  children: ReactNode;
};

const layout = ({ children }: PropsType) => {
  return <div className="pt-22 max-md:px-2 md:pt-25">{children}</div>;
};

export default layout;
