import Image from 'next/image';

type PropsType = {
  name: string;
  chat: string;
  date: string;
};

const Chats = ({ name, chat, date }: PropsType) => {
  return (
    <div className="flex cursor-pointer items-center gap-4 rounded-md bg-gray-800 p-3 px-4 transition-all duration-150 ease-linear hover:bg-gray-900">
      <Image
        src="/assistants/general_ai.png"
        alt="agent profile"
        height={300}
        width={300}
        className="h-17 w-17 rounded-full"
      />
      <div className="mt-1 basis-full">
        <p className="font-medium">{name}</p>
        <p className="line-clamp-1">{chat}</p>
      </div>
      <div className="self-start justify-self-end">
        <p className="text-sm">{date}</p>
      </div>
    </div>
  );
};

export default Chats;
