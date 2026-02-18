import { ArrowUpFromDot } from 'lucide-react';

const TextInputMethod = () => {
  return (
    <form className="flex w-[95%] items-end rounded-2xl border-2 border-blue-900 py-2 pr-2 pl-4 md:w-[90%]">
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
  );
};

export default TextInputMethod;
