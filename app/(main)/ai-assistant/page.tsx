'use client';

import { Button } from '@/components/ui/button';
import useAppSelector from '@/hooks/useAppSelector';
import useAppDispatch from '@/hooks/useAppDispatch';
import {
  selectSelectedAgent,
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
  const selectedAgent = useAppSelector(selectSelectedAgent);
  const mode1 = useAppSelector(selectSelectedInteractionMode);
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode2 = searchParams.get('mode') as Mode;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!mode1 && mode2) {
      dispatch(setSelectedInteractionMode(mode2 as Mode));
    } else if (!mode1 && !mode2) {
      router.push('/mode-selection');
    }
  }, [dispatch, mode1, mode2, router]);

  const startSessionClickHandler = () => {
    router.push('/text-workspace');
  };

  return (
    <main className="pb-18">
      <div className="mx-auto max-w-[1200px]">
        <section className="w-full">
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
              onClick={startSessionClickHandler}
              disabled={selectedAgent === null}
              className={`${selectedAgent !== null && 'btn-continue'} rounded-full py-5 text-lg font-normal hover:-translate-y-0.5 active:translate-y-0 max-md:hidden`}
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
            onClick={startSessionClickHandler}
            disabled={selectedAgent === null}
            className={`${selectedAgent !== null && 'btn-continue'} mx-auto mt-8 flex rounded-full py-6 text-lg font-normal active:scale-95 md:hidden`}
          >
            Start Session
          </Button>
        </section>
        <section className="section__history mt-10 flex flex-col gap-8 md:mx-auto md:mt-15 md:max-w-4xl md:flex-row md:justify-between md:gap-50">
          <div className="bg-primary-dark-bg rounded-xl px-3 py-2 max-md:text-center md:basis-1/2">
            <h2 className="mb-2 text-xl font-semibold md:text-2xl dark:text-white">
              Previous Conversations
            </h2>
            <p>No previous conversations</p>
          </div>

          <div className="bg-primary-dark-bg rounded-xl px-3 py-2 max-md:text-center md:basis-1/2">
            <h2 className="mb-2 text-xl font-semibold md:text-2xl dark:text-white">
              Feedback of Conversations
            </h2>
            <p>No feedback</p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AiAssistant;
