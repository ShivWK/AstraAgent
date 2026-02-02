'use client';

import {
  setSelectedInteractionMode,
  selectSelectedInteractionMode,
} from '@/features/agents/agentsSlice';
import { type Mode } from '@/features/agents/agentsSlice';
import { MessagesSquare, Mic } from 'lucide-react';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const ModeSelection = () => {
  const interactionMode = useAppSelector(selectSelectedInteractionMode);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const selectHandler = (mode: Mode) => {
    dispatch(setSelectedInteractionMode(mode));
  };

  const continueClickHandler = () => {
    router.push(`/ai-assistant?mode=${interactionMode}`);
  };

  return (
    <main>
      <section className="mx-auto max-w-[1200px] pb-6">
        <div className="text-center">
          <p className="text-3xl">
            Choose how you <strong>want</strong> to interact today
          </p>

          <p className="mt-2 hidden md:block">
            You can switch agents later, but interaction mode stays fixed.
          </p>
        </div>

        <div className="mx-auto mt-6 flex w-fit flex-col items-center gap-8 max-md:px-4 md:mt-5 md:flex-row md:gap-10">
          <div
            role="button"
            tabIndex={0}
            onClick={() => selectHandler('text')}
            onKeyDown={() => selectHandler('text')}
            className={`${interactionMode === 'text' && 'shadow-[0_0_10px_1px_#155dfc]'} flex flex-row items-center gap-4 rounded-2xl border px-8 py-4 md:flex-col`}
          >
            <MessagesSquare
              size={100}
              strokeWidth={1}
              className={`${interactionMode === 'text' && 'text-blue-400'}`}
            />
            <div className="flex flex-col gap-1 md:items-center md:gap-4">
              <p className="text-2xl font-semibold">Text Mode</p>

              <ul className="hidden list-inside list-disc md:block">
                <li>Chat with multiple agents</li>
                <li>Switch agents instantly</li>
                <li>Best coding, writing and planning</li>
              </ul>

              <p className="md:hidden">Type messages and read AI responses</p>

              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  selectHandler('text');
                }}
                variant={'secondary'}
                className="mt-2 hidden px-6 text-lg font-medium tracking-wider transition-all duration-100 ease-in hover:-translate-y-0.5 active:translate-y-0 md:flex"
              >
                {interactionMode === 'text' ? 'Selected' : 'Select'}
              </Button>
            </div>
          </div>

          <div
            role="button"
            tabIndex={0}
            onClick={() => selectHandler('speech')}
            onKeyDown={() => selectHandler('speech')}
            className={`${interactionMode === 'speech' && 'shadow-[0_0_10px_1px_#155dfc]'} flex items-center gap-4 rounded-2xl border px-8 py-4 md:flex-col`}
          >
            <Mic
              size={100}
              strokeWidth={1}
              className={`${interactionMode === 'speech' && 'text-blue-400'}`}
            />

            <div className="flex flex-col gap-1 md:items-center md:gap-4">
              <p className="text-2xl font-semibold">Speech Mode</p>

              <ul className="hidden list-inside list-disc md:block">
                <li>Speak naturally using mic </li>
                <li>One agent at a time</li>
                <li>Best for learning, interview, practice</li>
              </ul>

              <p className="md:hidden">Speak & listen in real time using mic</p>

              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  selectHandler('speech');
                }}
                variant={'secondary'}
                className="mt-2 hidden px-6 text-lg font-medium tracking-wider transition-all duration-100 ease-in hover:-translate-y-0.5 active:translate-y-0 md:flex"
              >
                {interactionMode === 'speech' ? 'Selected' : 'Select'}
              </Button>
            </div>
          </div>
        </div>

        <Button
          onClick={continueClickHandler}
          disabled={!interactionMode}
          className="mt-13 flex items-center justify-center rounded-full px-5 py-6 text-lg font-normal tracking-wider transition-all duration-100 ease-in active:scale-95 max-lg:mx-auto md:mt-4 md:ml-auto md:py-5"
          variant={'secondary'}
        >
          Continue
        </Button>
      </section>
    </main>
  );
};

export default ModeSelection;
