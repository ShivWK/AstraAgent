'use client';

import { Button } from '@/components/ui/button';
import useAppSelector from '@/hooks/useAppSelector';
import useAppDispatch from '@/hooks/useAppDispatch';
import {
  selectAgentInstruction,
  selectSelectedAgent,
  setSelectedInteractionMode,
} from '@/features/agents/agentsSlice';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AiAssistantSkeleton from '@/components/skeletons/AiAssistantSkeleton';
import { Spinner } from '@/components/ui/spinner';
import AgentCards from './AgentCards';
import { useAgents } from '@/hooks/queries/agent/useAgents';
import { useConversations } from '@/hooks/queries/conversation/useConversations';
import PreviousConversations from '../previousConversations/PreviousConversations';
import { useCreateConversation } from '@/hooks/queries/conversation/useCreateConversation';

const AiAssistant = () => {
  const { agents, isLoading } = useAgents();
  const { conversations, isLoading: oldConversationLoading } =
    useConversations();
  const { mutate, isPending } = useCreateConversation();

  const selectedAgent = useAppSelector(selectSelectedAgent);
  const agentInstruction = useAppSelector(selectAgentInstruction);
  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    dispatch(setSelectedInteractionMode('text'));
  }, [dispatch]);

  const startSessionClickHandler = async () => {
    if (!selectedAgent || isPending) return;
    mutate(
      {
        agentId: selectedAgent._id,
        agentTitle: selectedAgent.title,
        agentName: selectedAgent.name,
        defaultAgentModel: selectedAgent.model,
        key: selectedAgent.key,
        mode: 'text',
        newCreation: false,
        customInstruction: agentInstruction,
      },
      {
        onSuccess: (data) => {
          if (data.success) {
            router.push(
              `/ai-workspace?conversation_id=${data.conversation._id}&mode=text&agentId=${data.conversation.agentId}`,
            );
          }
        },
      },
    );
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
              disabled={selectedAgent === null || isPending}
              className={`${selectedAgent !== null && 'btn-continue'} bg-button-background rounded-full py-5 text-lg font-normal text-white hover:-translate-y-0.5 hover:text-black active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-75 max-md:hidden`}
            >
              Start Session
              {isPending && (
                <Spinner className="size-5" data-icon="inline-end" />
              )}
            </Button>
          </div>
          <AgentCards assistants={agents} />
          <Button
            variant={'secondary'}
            onClick={startSessionClickHandler}
            disabled={selectedAgent === null || isPending}
            className={`${selectedAgent !== null && 'btn-continue'} bg-button-background mx-auto mt-8 flex rounded-full py-6 text-lg font-normal text-white hover:-translate-y-0.5 hover:text-black active:scale-95 disabled:cursor-not-allowed disabled:opacity-75 md:hidden`}
          >
            Start Session
            {isPending && <Spinner className="size-5" data-icon="inline-end" />}
          </Button>
        </section>
        <section className="section__history mt-10 md:mx-auto md:mt-15 md:max-w-4xl">
          {conversations && (
            <div className="bg-primary-dark-bg rounded-xl px-1 py-1.5 max-md:text-center md:px-3 md:py-2">
              <PreviousConversations big={true} />
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default AiAssistant;
