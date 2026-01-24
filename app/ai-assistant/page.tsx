'use client';

import { Button } from '@/components/ui/button';
import { assistant } from '@/utils/assistants';
import { CircleCheck } from 'lucide-react';
import { type Assistant } from '@/utils/assistants';
import Image from 'next/image';
import { useState } from 'react';

const AiAssistant = () => {
  const [selectedModel, setSelectedModel] = useState<Assistant[]>([]);
  // use Set instead of an array as find/findIndex will take O(n) in worst case but set will O(1)

  const cardClickHandler = (data: Assistant) => {
    const index = selectedModel.findIndex((object) => object.id === data.id);

    if (index === -1) {
      setSelectedModel((prv) => {
        return [...prv, data];
      });
    } else {
      const currentData = [...selectedModel];
      currentData.splice(index, 1);
      setSelectedModel(currentData);
    }
  };

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
                onClick={() => cardClickHandler(ai)}
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

                <p className="mt-2 flex items-center gap-2 text-lg">
                  <span>{ai.name}</span>
                  {selectedModel.find((object) => object.id === ai.id) && (
                    <CircleCheck
                      size={20}
                      strokeWidth={2}
                      className="overflow-hidden rounded-full bg-linear-to-br from-[#8B75FE] via-[#5BDDFD] to-[#1F58FD]"
                    />
                  )}
                </p>
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
