type PropsType = {
  clickHandler: (val: string) => void;
  loading: boolean;
  sampleQuestions: string[] | undefined;
};

const SampleQuestions = ({
  clickHandler,
  loading,
  sampleQuestions,
}: PropsType) => {
  if (loading) return null;

  return (
    <div className="animate-fadeIn pointer-events-auto absolute inset-0 z-30 flex flex-col items-center justify-center px-4 text-center">
      <h2 className="mb-6 text-2xl font-semibold text-white md:text-3xl">
        How can I help you today?
      </h2>

      <div className="flex w-fit max-w-2xl flex-col items-center justify-center gap-3">
        {sampleQuestions?.map((q, i) => (
          <button
            key={i}
            onClick={() => clickHandler(q)}
            className="w-fit cursor-pointer rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-left text-sm text-white transition-all duration-150 hover:bg-white/10"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SampleQuestions;
