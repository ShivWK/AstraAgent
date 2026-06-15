'use client';

import { Button } from '@/components/ui/button';
import useAppSelector from '@/hooks/useAppSelector';
import useAppDispatch from '@/hooks/useAppDispatch';
import {
  selectAgentInstruction,
  selectSelectedAgent,
  setSelectedInteractionMode,
} from '@/features/agents/agentsSlice';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AiAssistantSkeleton from '@/components/skeletons/AiAssistantSkeleton';
import { Spinner } from '@/components/ui/spinner';
import AgentCards from './AgentCards';
import { useAgents } from '@/hooks/queries/agent/useAgents';
import { useConversations } from '@/hooks/queries/conversation/useConversations';
import PreviousConversations from '../previousConversations/PreviousConversations';

const AiAssistant = () => {
  const [conversationLoading, setConversationLoading] = useState(false);

  const { agents, isLoading } = useAgents();
  const { conversations, isLoading: oldConversationLoading } =
    useConversations();

  const selectedAgent = useAppSelector(selectSelectedAgent);
  const agentInstruction = useAppSelector(selectAgentInstruction);
  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    dispatch(setSelectedInteractionMode('text'));
  }, [dispatch]);

  const startSessionClickHandler = async () => {
    if (!selectedAgent || conversationLoading) return;

    try {
      setConversationLoading(true);
      const response = await fetch('api/conversation/create', {
        method: 'POST',
        body: JSON.stringify({
          agentId: selectedAgent._id,
          agentTitle: selectedAgent.title,
          agentName: selectedAgent.name,
          defaultAgentModel: selectedAgent.model,
          key: selectedAgent.key,
          mode: 'text',
          newCreation: false,
          customInstruction: agentInstruction,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      const conversationID = result.conversation._id;

      router.push(
        `/ai-workspace?conversation_id=${conversationID}&mode=text&agentId=${result.conversation.agentId}`,
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log('Unknown error', err);
      }
    }
  };

  if (isLoading || oldConversationLoading) return <AiAssistantSkeleton />;

  return (
    <main className="min-h-dvh pt-24 pb-18 max-md:px-2 md:pt-28">
      <div className="mx-auto max-w-300">
        <section className="w-full">
          <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
            <div>
              <h1 className="text-quick-cards-heading text-3xl font-bold md:text-2xl">
                Welcome to the world of AI Assistant
              </h1>
              <p className="text-quick-cards-subheading text-xl">
                Choose your AI companion to simplify your task
              </p>
            </div>
            <Button
              variant={'secondary'}
              onClick={startSessionClickHandler}
              disabled={selectedAgent === null || conversationLoading}
              className={`${selectedAgent !== null && 'btn-continue'} bg-button-background rounded-full py-5 text-lg font-normal text-white hover:-translate-y-0.5 hover:text-black active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-75 max-md:hidden`}
            >
              Start Session
              {conversationLoading && (
                <Spinner className="size-5" data-icon="inline-end" />
              )}
            </Button>
          </div>
          <AgentCards assistants={agents} />
          <Button
            variant={'secondary'}
            onClick={startSessionClickHandler}
            disabled={selectedAgent === null || conversationLoading}
            className={`${selectedAgent !== null && 'btn-continue'} bg-button-background mx-auto mt-8 flex rounded-full py-6 text-lg font-normal text-white hover:-translate-y-0.5 hover:text-black active:scale-95 disabled:cursor-not-allowed disabled:opacity-75 md:hidden`}
          >
            Start Session
            {conversationLoading && (
              <Spinner className="size-5" data-icon="inline-end" />
            )}
          </Button>
        </section>
        <section className="section__history mt-10 md:mx-auto md:mt-15 md:max-w-4xl md:flex-row md:justify-between md:gap-50">
          {conversations && (
            <div className="bg-primary-dark-bg rounded-xl px-3 py-2 max-md:text-center">
              <PreviousConversations big={true} />
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default AiAssistant;
