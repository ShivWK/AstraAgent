import DotBounceLoader from '../common/DotBounceLoader';

const ChatSkeleton = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 text-center">
      <DotBounceLoader
        allColor={'text-white dark:text-gray-300'}
        nmSize="text-2xl"
      />

      <p className="text-lg text-white dark:text-gray-300">
        Preparing your workspace...
      </p>
    </div>
  );
};

export default ChatSkeleton;
