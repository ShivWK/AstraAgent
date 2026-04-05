import PreviousChat from '../PreviousChat';

const PreviousChats = () => {
  return (
    <div>
      <h2 className="mt-2 mb-1.5 text-lg font-medium tracking-wide">
        Your Chats with this agent
      </h2>

      <ul className="section__previous-chats pretty-scrollbar flex min-h-0 grow-0 basis-full list-none flex-col gap-1 overflow-auto">
        <li className="rounded-primary dark:bg-primary-dark-bg/70 shrink-0 cursor-pointer px-2 py-0.5">
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
      </ul>
    </div>
  );
};

export default PreviousChats;
