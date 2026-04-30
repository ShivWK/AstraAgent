import { Bot, MessagesSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Agent } from '@/types/agents';

const QuickAccess = () => {
  const router = useRouter();

  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(false);
  const [conversationLoading, setConversationLoading] = useState(false);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/agents/${'69f379dc374e6de2592d01f3'}`,
        );
        const result = await response.json();

        if (!response.ok) {
          throw new Error('Something went wrong. While fetching Astra details');
        }

        setSelectedAgent(result.agent);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.log(err.message);
        }

        console.log('Error in fetch', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgent();
  }, []);

  const handleAgentCreation = () => {
    router.push('/ai-assistant?createAgent=true');
  };

  const handleTalkToAgentBtnClick = async () => {
    if (conversationLoading) return;

    try {
      setConversationLoading(true);
      const response = await fetch('api/conversation/create', {
        method: 'POST',
        body: JSON.stringify({
          agentId: selectedAgent?._id,
          agentTitle: selectedAgent?.title,
          agentName: selectedAgent?.name,
          defaultAgentModel: selectedAgent?.model,
          key: selectedAgent?.key,
          mode: 'text',
          newCreation: false,
          customInstruction: '',
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
        console.log('Error:', err.message);
      } else {
        console.log('Unknown error', err);
      }
    } finally {
      // setConversationLoading(false);
    }
  };

  return (
    <div className="mt-2 flex w-full flex-col gap-4 md:max-w-2xl md:flex-row md:gap-6">
      <button
        onClick={handleTalkToAgentBtnClick}
        disabled={loading || conversationLoading}
        className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-linear-to-br from-blue-950 via-slate-950 to-black p-5 shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-all duration-150 ease-linear hover:shadow-blue-500/30 active:scale-95 disabled:opacity-30 max-md:w-full md:shadow-xl"
      >
        <div className="absolute -top-8 -right-8 h-28 w-28 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 md:mb-3">
            <div className="flex items-center justify-center rounded-2xl bg-blue-500/15 p-2 text-5xl md:text-2xl">
              <MessagesSquare className="size-10" />
            </div>

            <div className="text-start">
              <p className="text-xl font-semibold text-white">Talk to Astra</p>
              <p className="text-sm text-gray-400">Your smart AI assistant</p>
            </div>

            <p className="ml-auto animate-pulse text-2xl md:hidden">→</p>
          </div>

          <p className="hidden md:block">Start Chat →</p>
        </div>
      </button>

      <button
        onClick={handleAgentCreation}
        className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-linear-to-br from-violet-950 via-slate-950 to-black p-5 shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-all duration-150 ease-linear hover:shadow-violet-500/30 active:scale-95 max-md:w-full md:shadow-xl"
      >
        <div className="absolute -right-8 -bottom-8 h-28 w-28 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 md:mb-3">
            <div className="flex items-center justify-center rounded-2xl bg-violet-500/15 p-2 text-4xl md:text-2xl">
              <Bot className="size-10" />
            </div>

            <div className="text-start">
              <p className="text-xl font-semibold text-white">Create Agent</p>
              <p className="text-sm text-gray-400">
                Build your custom AI expert
              </p>
            </div>

            <p className="ml-auto animate-pulse text-2xl md:hidden">→</p>
          </div>

          <p className="hidden md:block">Create Now →</p>
        </div>
      </button>
    </div>
  );
};

export default QuickAccess;
