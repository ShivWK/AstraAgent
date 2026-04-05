// page.jsx
import { Suspense } from 'react';
import EmailVerification from '@/components/auth/EmailVerification';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmailVerification />
    </Suspense>
  );
}
