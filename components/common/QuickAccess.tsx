import { Bot, MessagesSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import DotBounceLoader from './DotBounceLoader';
import { useSession } from 'next-auth/react';
import useAppDispatch from '@/hooks/useAppDispatch';
import { setLoginError, setOpenLoginModel } from '@/features/auth/authSlice';
import { useAgent } from '@/hooks/queries/agent/useAgent';
import { useCreateConversation } from '@/hooks/queries/conversation/useCreateConversation';

const QuickAccess = () => {
  const { status } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { mutate, isPending, reset } = useCreateConversation();
  const { agent: selectedAgent, isLoading: loading } = useAgent(
    '69f379dc374e6de2592d01f3',
    status === 'authenticated',
  );

  const handleAgentCreation = () => {
    router.push('/ai-assistant?createAgent=true');
  };

  const handleTalkToAgentBtnClick = async () => {
    if (isPending || loading) return;

    if (status === 'unauthenticated') {
      dispatch(setLoginError('Please sign in or sign up to continue'));
      dispatch(setOpenLoginModel(true));
      return;
    }

    mutate(
      {
        agentId: selectedAgent?._id,
        agentTitle: selectedAgent?.title,
        agentName: selectedAgent?.name,
        defaultAgentModel: selectedAgent?.model,
        key: selectedAgent?.key,
        mode: 'text',
        newCreation: false,
        customInstruction: '',
      },
      {
        onSuccess: (data) => {
          router.push(
            `/ai-workspace?conversation_id=${data.conversation._id}&mode=text&agentId=${data.conversation.agentId}`,
          );
        },
      },
    );
  };

  return (
    <div className="mt-1.5 flex w-full flex-col gap-4 md:max-w-2xl md:flex-row md:gap-6">
      <div
        className={`${loading || isPending ? 'pointer-events-none' : 'hover:shadow-talk-card-shadow pointer-events-auto shadow-[0_10px_20px_rgba(0,0,0,0.5)] active:scale-95'} relative overflow-hidden rounded-3xl transition-all duration-150 ease-linear`}
      >
        {(loading || isPending) && (
          <div className="absolute top-0 left-0 z-40 flex h-full w-full items-center justify-center bg-gray-900/20">
            <DotBounceLoader allColor={'text-gray-100'} nmSize="text-3xl" />
          </div>
        )}
        <button
          onClick={handleTalkToAgentBtnClick}
          disabled={loading || isPending}
          className="border-talk-card-border bg-talk-card-background relative overflow-hidden rounded-3xl border p-5 disabled:opacity-50 max-md:w-full md:shadow-xl"
        >
          <div className="absolute -top-8 -right-8 h-28 w-28 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 md:mb-3">
              <div className="bg-talk-card-iconBox-background flex items-center justify-center rounded-2xl p-2 text-5xl md:text-2xl">
                <MessagesSquare className="size-10" />
              </div>

              <div className="text-start">
                <p className="text-quick-cards-heading text-xl font-semibold">
                  Talk to Astra
                </p>
                <p className="text-quick-cards-subheading text-sm">
                  Your smart AI assistant
                </p>
              </div>

              <p className="ml-auto animate-pulse text-2xl md:hidden">→</p>
            </div>

            <div className="text-quick-cards-heading hidden items-center gap-2 justify-self-center font-medium tracking-wide md:flex">
              <span>Start Chat</span>
              <span className="text-xl font-medium">→</span>
            </div>
          </div>
        </button>
      </div>

      <button
        onClick={handleAgentCreation}
        className="border-agent-card-border bg-agent-card-background hover:shadow-agent-card-shadow relative overflow-hidden rounded-3xl border p-5 shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-all duration-150 ease-linear active:scale-95 max-md:w-full"
      >
        <div className="absolute -right-8 -bottom-8 h-28 w-28 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 md:mb-3">
            <div className="flex items-center justify-center rounded-2xl bg-violet-500/15 p-2 text-4xl md:text-2xl">
              <Bot className="size-10" />
            </div>

            <div className="text-start">
              <p className="text-quick-cards-heading text-xl font-semibold">
                Create Agent
              </p>
              <p className="text-quick-cards-subheading text-sm">
                Build your custom AI expert
              </p>
            </div>

            <p className="ml-auto animate-pulse text-2xl md:hidden">→</p>
          </div>

          <div className="text-quick-cards-heading hidden items-center gap-2 justify-self-center font-medium tracking-wide md:flex">
            <span>Create Now</span>
            <span className="text-xl font-medium">→</span>
          </div>
        </div>
      </button>
    </div>
  );
};

export default QuickAccess;
