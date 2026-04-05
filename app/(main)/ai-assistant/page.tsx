// page.jsx
import { Suspense } from 'react';
import AiAssistant from '@/components/common/AiAssistant';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AiAssistant />
    </Suspense>
  );
}
