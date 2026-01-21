import { Button } from '@/components/ui/button';

const AiAssistant = () => {
  return (
    <main className="max-md:px-2">
      <section className="mx-auto max-w-[1200px] pt-20 md:pt-25">
        <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
          <div>
            <h1 className="text-3xl font-bold md:text-2xl dark:text-white">
              Welcome to the world of AI Assistant
            </h1>
            <p className="text-xl">
              Choose your AI companion to simplify your task
            </p>
          </div>
          <Button className="text-lg max-md:hidden">Continue</Button>
        </div>

        <div></div>
        <Button className="relative left-1/2 mx-auto -translate-x-1/2 transform py-5 text-xl md:hidden">
          Continue
        </Button>
      </section>
    </main>
  );
};

export default AiAssistant;
