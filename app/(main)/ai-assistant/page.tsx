import { Suspense } from 'react';
import AiAssistant from '@/components/common/aiAssistants/AiAssistant';
import AiAssistantSkeleton from '@/components/skeletons/AiAssistantSkeleton';

export default async function Page() {
  return (
    <Suspense fallback={<AiAssistantSkeleton />}>
      <AiAssistant />
    </Suspense>
  );
}
