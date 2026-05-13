import DotBounceLoader from '../common/DotBounceLoader';

const ChatSkeleton = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center">
      <DotBounceLoader
        allColor={'text-black dark:text-gray-300'}
        nmSize="text-3xl"
      />

      <p className="text-xl text-black dark:text-gray-300">
        Preparing your workspace...
      </p>
    </div>
  );
};

export default ChatSkeleton;
