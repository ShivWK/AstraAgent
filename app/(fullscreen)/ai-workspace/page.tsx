import { Suspense } from 'react';
import AiWorkspace from '@/components/aiWorkspace/AIWorkspace';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AiWorkspace />
    </Suspense>
  );
}
