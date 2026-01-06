import { Button } from '@/components/ui/button';

const AiAssistant = () => {
  return (
    <main className="">
      <section className="mx-auto max-w-[1200px] pt-20 md:pt-25">
        <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
          <div className="">
            <h1 className="text-2xl font-bold dark:text-white">
              Welcome to the world of AI Assistant
            </h1>
            <p>Choose your AI companion to simplify your task</p>
          </div>
          <Button>Continue</Button>
        </div>
      </section>
    </main>
  );
};

export default AiAssistant;
