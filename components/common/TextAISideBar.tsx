import Image from 'next/image';

const TextAISideBar = () => {
  return (
    <section className="section__agent rounded-primary bassi-full flex w-full flex-col border p-2">
      <div className="section__agent-card rounded-primary dark:bg-primary-dark-bg flex items-center gap-3 p-2">
        <Image
          src="/assistants/general_ai.png"
          alt="General Ai agent"
          height={300}
          width={300}
          quality={100}
          placeholder="blur"
          blurDataURL="/blurImage.png"
          className="h-19 w-19 rounded-full border-2 border-blue-400 object-cover shadow-[0_0_15px_2px_#155dfc] md:h-28 md:w-28"
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

      <div className="section__previous-chats pretty-scrollbar flex min-h-0 grow-0 basis-full flex-col gap-1 overflow-auto">
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

        {/* <p className="rounded-primary line-clamp-1 shrink-0 cursor-pointer px-2 py-1">
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
        </p> */}
      </div>
    </section>
  );
};

export default TextAISideBar;
