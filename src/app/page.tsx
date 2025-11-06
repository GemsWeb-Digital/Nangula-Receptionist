"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // For this phase, we redirect immediately to the new dashboard page.
    // In a real app, this would be the landing page or a login-gated redirect.
    router.replace('/dashboard/knowledge-base');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E0E0E0]">
      <div className="text-center">
        <p className="text-lg font-semibold text-gray-700">Redirecting to Dashboard...</p>
      </div>
    </div>
  );
}
