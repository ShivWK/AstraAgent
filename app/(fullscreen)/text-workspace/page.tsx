import Image from 'next/image';
import { ArrowUpFromDot } from 'lucide-react';

const pages = () => {
  return (
    <main className="md:px-2">
      <div className="flex items-center gap-2">
        <section className="section__agent rounded-primary hidden h-screen w-104 flex-col border p-2 pt-20 md:flex">
          <div className="section__agent-card rounded-primary dark:bg-primary-dark-bg flex items-center gap-3 p-2">
            <Image
              src="/assistants/general_ai.png"
              alt="General Ai agent"
              height={300}
              width={300}
              quality={100}
              placeholder="blur"
              blurDataURL="/blurImage.png"
              className="h-28 w-28 rounded-full border-2 border-blue-400 object-cover shadow-[0_0_15px_2px_#155dfc]"
            />

            <div>
              <p className="font-medium">Your Current Agent</p>
              <p className="line-clamp-1 italic">Geography Teacher</p>
              <p className="line-clamp-1">Atlas</p>
            </div>
          </div>

          <h2 className="my-3 text-lg font-medium tracking-wide">
            Your Chats with this agent
          </h2>

          <div className="section__previous-chats pretty-scrollbar flex min-h-0 basis-full flex-col gap-1 overflow-auto">
            <p className="rounded-primary dark:bg-primary-dark-bg/70 shrink-0 cursor-pointer px-2 py-1">
              Your current chat...
            </p>

            <p className="rounded-primary line-clamp-1 shrink-0 cursor-pointer px-2 py-1">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora,
              consequuntur!
            </p>

            <p className="rounded-primary line-clamp-1 shrink-0 cursor-pointer px-2 py-1">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora,
              consequuntur!
            </p>

            <p className="rounded-primary line-clamp-1 shrink-0 cursor-pointer px-2 py-1">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora,
              consequuntur!
            </p>

            <p className="rounded-primary line-clamp-1 shrink-0 cursor-pointer px-2 py-1">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora,
              consequuntur!
            </p>

            <p className="rounded-primary line-clamp-1 shrink-0 cursor-pointer px-2 py-1">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora,
              consequuntur!
            </p>

            <p className="rounded-primary line-clamp-1 shrink-0 cursor-pointer px-2 py-1">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora,
              consequuntur!
            </p>

            <p className="rounded-primary line-clamp-1 shrink-0 cursor-pointer px-2 py-1">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora,
              consequuntur!
            </p>

            <p className="rounded-primary line-clamp-1 shrink-0 cursor-pointer px-2 py-1">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora,
              consequuntur!
            </p>

            <p className="rounded-primary line-clamp-1 shrink-0 cursor-pointer px-2 py-1">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora,
              consequuntur!
            </p>

            <p className="rounded-primary line-clamp-1 shrink-0 cursor-pointer px-2 py-1">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora,
              consequuntur!
            </p>
          </div>
        </section>
        <section className="section__chat rounded-primary flex h-screen w-full flex-col items-center p-2 pb-5">
          <div className="section__chat-box basis-full"></div>
          <form className="flex w-[95%] items-end rounded-2xl border-2 border-blue-900 py-2 pr-2 pl-3 md:w-[90%]">
            <textarea
              rows={1}
              className="wrap-break-words field-sizing-content flex-1 resize-none self-center overflow-hidden border-none text-lg outline-none"
              aria-label="Enter Query"
              placeholder="Enter query"
            />

            <button className="rounded-lg bg-blue-900 p-2.5">
              <ArrowUpFromDot aria-hidden="true" />
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default pages;
