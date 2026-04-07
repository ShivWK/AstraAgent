'use client';

import { useState } from 'react';

export default function ReadMore({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <p
        className={`text-sm leading-4.5 text-gray-200 italic transition-all duration-300 ease-linear ${
          expanded ? '' : 'line-clamp-1'
        }`}
      >
        {text}
      </p>

      <button
        onClick={() => setExpanded(!expanded)}
        className="text-xs font-medium text-green-400 hover:underline"
      >
        {expanded ? 'Show less' : 'More'}
      </button>
    </div>
  );
}
