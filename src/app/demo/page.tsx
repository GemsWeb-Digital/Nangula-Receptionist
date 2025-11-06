"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DemoChat from '@/components/DemoChat';

export default function DemoPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('nangula-ai-token');
    if (storedToken) {
      const parsedToken = JSON.parse(storedToken);
      if (parsedToken.expiry > Date.now()) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('nangula-ai-token');
        router.replace('/login');
      }
    } else {
      router.replace('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('nangula-ai-token');
    router.push('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#E0E0E0]">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-700">Authenticating...</p>
        </div>
      </div>
    );
  }

  return <DemoChat onLogout={handleLogout} onGoHome={() => router.push('/')} />;
}
