"use client";

import MathChallenge from "@/components/MathChallenge";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLoginSuccess = (jwt: string) => {
    const expiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours token
    const tokenData = { value: jwt, expiry };
    localStorage.setItem('nangula-ai-token', JSON.stringify(tokenData));
    router.push('/demo');
  };

  return <MathChallenge onLoginSuccess={handleLoginSuccess} />;
}
