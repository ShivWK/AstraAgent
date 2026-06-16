'use client';

import { useState } from 'react';

export default function ReadMore({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <p
        className={`text-justify text-sm leading-4.5 text-white italic transition-all duration-300 ease-linear ${
          expanded ? '' : 'line-clamp-1'
        }`}
      >
        {text}
      </p>

      <button
        onClick={() => setExpanded(!expanded)}
        className="text-sm font-medium text-green-400 italic hover:underline"
      >
        {expanded ? 'Show less' : '...More'}
      </button>
    </div>
  );
}
