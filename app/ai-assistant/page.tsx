'use client';

import { Button } from '@/components/ui/button';
import { assistant } from '@/utils/assistants';
import Image from 'next/image';

const AiAssistant = () => {
  return (
    <main className="max-md:px-2">
      <section className="mx-auto max-w-[1200px] pt-22 pb-18 md:pt-25">
        <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
          <div>
            <h1 className="text-3xl font-bold md:text-2xl dark:text-white">
              Welcome to the world of AI Assistant
            </h1>
            <p className="text-xl">
              Choose your AI companion to simplify your task
            </p>
          </div>
          <Button className="text-lg max-md:hidden">Continue</Button>
        </div>

        <div className="my-5 flex flex-wrap gap-5 md:my-6">
          {assistant.map((ai) => {
            return (
              <div
                key={ai.id}
                className="flex transform cursor-pointer flex-col items-center gap-1 rounded-2xl border-2 border-blue-400 p-3 shadow-[0_0_10px_1px_#155dfc] backdrop-blur-md transition-all duration-100 ease-linear hover:scale-105"
              >
                <Image
                  src={ai.icon}
                  alt={`A ${ai.title} AI assistant`}
                  height={300}
                  width={300}
                  quality={100}
                  className="h-36 w-36 rounded-full border-2 border-blue-400 object-contain shadow-[0_0_15px_2px_#155dfc]"
                />

                <p className="mt-2 text-lg">{ai.name}</p>
                <p className="text-lg font-semibold">{ai.title}</p>
              </div>
            );
          })}
        </div>
        <Button className="relative left-1/2 mx-auto mt-2 -translate-x-1/2 transform py-5 text-xl md:hidden">
          Continue
        </Button>
      </section>
    </main>
  );
};

export default AiAssistant;
