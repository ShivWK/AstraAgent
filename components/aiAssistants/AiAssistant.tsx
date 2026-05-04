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
import groupByAgent from '@/utils/groupByAgent';
import { Conversation } from '@/types/conversation';
import PreviousChats from './PreviousChats';
import AgentCards from './AgentCards';
import { Agent } from '@/types/agents';

const AiAssistant = () => {
  const selectedAgent = useAppSelector(selectSelectedAgent);
  const agentInstruction = useAppSelector(selectAgentInstruction);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [conversationLoading, setConversationLoading] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [history, setHistory] = useState<Record<
    string,
    Record<string, string | Conversation[]>
  > | null>(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);

        const [agents, history] = await Promise.all([
          fetch('/api/agents'),
          fetch(`/api/conversation?mode=text`),
        ]);

        const [agentData, historyData] = await Promise.all([
          agents.json(),
          history.json(),
        ]);

        setAgents(agentData.agents);
        setHistory(groupByAgent(historyData.conversations));
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        } else {
          console.log('Random error', err);
        }
      }
    };

    fetchAgents();
  }, []);

  useEffect(() => {
    setHistory((prev) => {
      if (!prev) return prev;

      let hasChange = false;

      const cleaned = Object.entries(prev).reduce(
        (acc, [agentId, agentData]) => {
          if (agentData?.conversations?.length > 0) {
            acc[agentId] = agentData;
          } else {
            hasChange = true;
          }
          return acc;
        },
        {} as typeof prev,
      );

      return hasChange ? cleaned : prev;
    });
  }, [history]);

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
    } finally {
      // setConversationLoading(false);
    }
  };

  if (loading) return <AiAssistantSkeleton />;

  console.log('Look at this', agents, history);

  return (
    <main className="pb-18">
      <div className="mx-auto max-w-300">
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
              disabled={selectedAgent === null || conversationLoading}
              className={`${selectedAgent !== null && 'btn-continue'} rounded-full py-5 text-lg font-normal hover:-translate-y-0.5 active:translate-y-0 max-md:hidden`}
            >
              Start Session
              {conversationLoading && (
                <Spinner className="size-5" data-icon="inline-end" />
              )}
            </Button>
          </div>
          <AgentCards
            assistants={agents}
            setAgents={setAgents}
            setHistory={setHistory}
          />
          <Button
            variant={'secondary'}
            onClick={startSessionClickHandler}
            disabled={selectedAgent === null || conversationLoading}
            className={`${selectedAgent !== null && 'btn-continue'} mx-auto mt-8 flex rounded-full py-6 text-lg font-normal active:scale-95 md:hidden`}
          >
            Start Session
            {conversationLoading && (
              <Spinner className="size-5" data-icon="inline-end" />
            )}
          </Button>
        </section>
        <section className="section__history mt-10 flex flex-col gap-8 md:mx-auto md:mt-15 md:max-w-4xl md:flex-row md:justify-between md:gap-50">
          {history && (
            <div className="bg-primary-dark-bg rounded-xl px-3 py-2 max-md:text-center md:basis-1/2">
              <PreviousChats history={history!} setHistory={setHistory} />
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default AiAssistant;
