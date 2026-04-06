// page.jsx
import { Suspense } from 'react';
import AiAssistant from '@/components/common/AiAssistant';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AiAssistant />
    </Suspense>
  );
}
