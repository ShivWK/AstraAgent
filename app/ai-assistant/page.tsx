'use client';

import { Button } from '@/components/ui/button';
import styles from './page.module.css';
import useAppSelector from '@/hooks/useAppSelector';
import useAppDispatch from '@/hooks/useAppDispatch';
import {
  selectSelectedModel,
  selectSelectedInteractionMode,
  setSelectedInteractionMode,
} from '@/features/agents/agentsSlice';
import ModelCards from '@/components/common/ModelCards';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { type Mode } from '@/features/agents/agentsSlice';
import { voice_assistant } from '@/utils/voice_assistants';
import { text_assistant } from '@/utils/text_assistants';

const AiAssistant = () => {
  const selectedModel = useAppSelector(selectSelectedModel);
  const mode1 = useAppSelector(selectSelectedInteractionMode);
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode2 = searchParams.get('mode');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!mode1 && mode2) {
      dispatch(setSelectedInteractionMode(mode2 as Mode));
    } else if (!mode1 && !mode2) {
      router.push('/mode-selection');
    }
  }, [dispatch, mode1, mode2, router]);

  return (
    <main>
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
            variant={'secondary'}
            disabled={selectedModel.length === 0}
            className={`${selectedModel.length !== 0 && styles['btn-continue']} rounded-full text-lg font-normal hover:-translate-y-0.5 active:translate-y-0 max-md:hidden`}
          >
            Start Session
          </Button>
        </div>
        <ModelCards
          mode={mode2}
          assistants={mode2 === 'speech' ? voice_assistant : text_assistant}
        />
        <Button
          variant={'secondary'}
          disabled={selectedModel.length === 0}
          className={`${selectedModel.length !== 0 && styles['btn-continue']} mx-auto mt-8 flex rounded-full py-5 text-xl active:scale-95 md:hidden`}
        >
          Start Session
        </Button>
      </section>
      <section className="section__history"></section>
    </main>
  );
};

export default AiAssistant;
