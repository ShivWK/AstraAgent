import SubFooter from './SubFooter';
import { useRef } from 'react';

const Footer = () => {
  const footerRef = useRef(null);

  return (
    <footer
      ref={footerRef}
      className="relative bottom-0 left-0 z-20 mt-7 w-full md:mt-6"
    >
      <div
        className="absolute top-0 left-0 -z-100 flex h-52 w-full flex-col items-center bg-linear-to-tr from-[#5BE4FE] via-blue-500 to-violet-900 p-6 max-md:pb-11 lg:h-72"
        style={{
          clipPath: 'ellipse(71% 59% at 50% 40%)',
        }}
      ></div>

      <div className="f-full w-full bg-black/40 px-2 py-1 pb-10 backdrop-blur-2xl md:pt-4">
        <SubFooter />
      </div>
    </footer>
  );
};

export default Footer;
