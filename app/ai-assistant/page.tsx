import { Button } from '@/components/ui/button';

const AiAssistant = () => {
  return (
    <main className="">
      <section className="mx-auto max-w-[1200px] pt-25">
        <div className="flex items-center justify-between border-2 border-white">
          <div className="">
            <h1 className="text-2xl font-bold dark:text-blue-600">
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
