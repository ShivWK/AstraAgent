'use client';

import { Button } from '@/components/ui/button';
import styles from './page.module.css';
import useAppSelector from '@/hooks/useAppSelector';
import { selectSelectedModel } from '@/features/agents/agentsSlice';
import ModelCards from '@/components/common/ModelCards';

const AiAssistant = () => {
  const selectedModel = useAppSelector(selectSelectedModel);

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
          <Button
            className={`${selectedModel.length !== 0 && styles['btn-continue']} rounded-full text-lg max-md:hidden`}
          >
            Continue
          </Button>
        </div>
        <ModelCards />
        <Button
          className={`${selectedModel.length !== 0 && styles['btn-continue']} relative left-1/2 mt-2 -translate-x-1/2 transform rounded-full py-5 text-xl md:hidden`}
        >
          Continue
        </Button>
      </section>
    </main>
  );
};

export default AiAssistant;
