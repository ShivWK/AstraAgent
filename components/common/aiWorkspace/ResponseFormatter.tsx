import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

const ResponseFormatter = ({ chat }: { chat: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        hr: () => <hr className="my-5 border-t border-gray-400/90" />,

        h1: ({ children }) => (
          <h1 className="mb-6 text-2xl font-semibold">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="my-4 text-xl font-semibold">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="my-4 text-lg font-medium">{children}</h3>
        ),

        p: ({ children }) => <p className="my-4">{children}</p>,

        ul: ({ children }) => (
          <ul className="mt-2 mb-3 list-disc pl-5">{children}</ul>
        ),

        ol: ({ children }) => (
          <ol className="mt-2 mb-3 list-decimal pl-5">{children}</ol>
        ),

        li: ({ children }) => <li className="mb-1">{children}</li>,
      }}
    >
      {chat}
    </ReactMarkdown>
  );
};

export default ResponseFormatter;
