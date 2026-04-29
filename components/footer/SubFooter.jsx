import Attribution from './Attribution';
import Image from 'next/image';

const SubFooter = () => {
  return (
    <div className="max-w-302.8 mx-auto my-1.5 flex w-full flex-col justify-between gap-3 p-2 font-bold text-white md:my-3 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col justify-center gap-2 md:basis-[40%]">
        <div className="flex items-center gap-4">
          <Image
            src="/logo-solid.jpeg"
            alt="Astra agent logo"
            width={300}
            height={300}
            quality={100}
            className={`h-13 w-13 rounded md:h-14 md:w-14`}
          />
          <p className="text-3xl font-semibold tracking-wide">Astra Agent</p>
        </div>
        <p className="text-white">
          <span className="font-medium tracking-wide whitespace-normal">
            © 2026 Astra Agent. All rights reserved.
          </span>
        </p>

        <Attribution />
      </div>

      <div className="mt-2 font-normal md:basis-[60%]">
        <p className="hidden text-lg md:block">
          <strong>Astra Agent</strong> is an AI SaaS platform designed for
          custom AI agents, real-time chat streaming, voice input/output,
          token-based usage, and smart productivity workflows. Built with modern
          full-stack technologies including Next.js, React, WebSocket, MongoDB,
          Tailwind CSS, and AI APIs.
        </p>

        <p className="md:hidden">
          Astra Agent is an AI-powered platform for chatting with smart agents,
          creating custom assistants, and using voice features. Built with
          Next.js, React, WebSocket, MongoDB, Tailwind CSS, and AI APIs.
        </p>
      </div>
    </div>
  );
};

export default SubFooter;
