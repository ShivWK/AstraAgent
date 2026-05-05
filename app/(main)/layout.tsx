import { ReactNode } from 'react';

type PropsType = {
  children: ReactNode;
};

const layout = ({ children }: PropsType) => {
  return <div className="pt-24 max-md:px-2 md:pt-28">{children}</div>;
};

export default layout;
