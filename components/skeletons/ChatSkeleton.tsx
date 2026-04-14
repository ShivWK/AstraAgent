const ChatSkeleton = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center">
      <div className="flex gap-2">
        <span className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.3s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.15s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-white" />
      </div>

      <p className="text-sm text-gray-300 md:text-base">
        Preparing your workspace...
      </p>
    </div>
  );
};

export default ChatSkeleton;
