import { ArrowUpFromDot } from 'lucide-react';
import TextAISideBar from '@/components/common/TextAISideBar';

const pages = () => {
  return (
    <main className="md:px-2">
      <div className="flex items-center gap-2">
        <aside className="hidden h-screen w-104 pt-20 pb-0.5 md:block">
          <TextAISideBar />
        </aside>
        <section className="section__chat rounded-primary flex h-screen w-full flex-col items-center p-2 pb-5">
          <div className="section__chat-box basis-full"></div>
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
        </section>
      </div>
    </main>
  );
};

export default pages;
