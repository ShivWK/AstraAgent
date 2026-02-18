import Image from 'next/image';
import PreviousChat from './PreviousChat';

const TextAISideBar = () => {
  return (
    <div className="section__agent rounded-primary flex h-full w-full flex-col pb-2">
      <div
        onClick={(e) => e.stopPropagation()}
        className="section__agent-card rounded-primary dark:bg-primary-dark-bg flex flex-col items-center gap-3 p-2 max-md:pt-3 md:flex-row"
      >
        <Image
          src="/assistants/general_ai.png"
          alt="General Ai agent"
          height={300}
          width={300}
          quality={100}
          placeholder="blur"
          blurDataURL="/blurImage.png"
          className="h-28 w-28 rounded-full border-2 border-blue-400 object-cover shadow-[0_0_15px_2px_#155dfc] md:h-28 md:w-28"
        />

        <div>
          <p className="line-clamp-1 text-lg font-semibold max-md:text-center max-md:text-xl">
            Atlas
          </p>
          <p className="mt-1 font-medium max-md:text-center max-md:text-lg">
            Your Current Agent
          </p>
          <p className="-mt-1 line-clamp-1 italic max-md:text-center max-md:text-lg">
            Geography Teacher
          </p>
        </div>
      </div>

      <h2 className="mt-5 mb-3 text-lg font-medium tracking-wide">
        Your Chats with this agent
      </h2>

      <ul className="section__previous-chats pretty-scrollbar flex min-h-0 grow-0 basis-full list-none flex-col gap-1 overflow-auto">
        <li className="rounded-primary dark:bg-primary-dark-bg/70 shrink-0 cursor-pointer px-2 py-1">
          New chat...
        </li>

        <PreviousChat
          chat="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora,
          consequuntur!"
        />

        <PreviousChat
          chat="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora,
          consequuntur!"
        />

        <PreviousChat
          chat="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora,
          consequuntur!"
        />

        <PreviousChat
          chat="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora,
          consequuntur!"
        />

        <PreviousChat
          chat="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora,
          consequuntur!"
        />

        <PreviousChat
          chat="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora,
          consequuntur!"
        />

        <PreviousChat
          chat="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora,
          consequuntur!"
        />

        <PreviousChat
          chat="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora,
          consequuntur!"
        />

        <PreviousChat
          chat="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora,
          consequuntur!"
        />

        <PreviousChat
          chat="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora,
          consequuntur!"
        />

        <PreviousChat
          chat="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora,
          consequuntur!"
        />

        <PreviousChat
          chat="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora,
          consequuntur!"
        />

        <PreviousChat
          chat="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora,
          consequuntur!"
        />

        <PreviousChat
          chat="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora,
          consequuntur!"
        />

        <PreviousChat
          chat="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora,
          consequuntur!"
        />
      </ul>
    </div>
  );
};

export default TextAISideBar;
