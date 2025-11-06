"use client";

import LandingPage from "@/components/LandingPage";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const handleTryDemo = () => {
    router.push('/login');
  };

  return <LandingPage onTryDemo={handleTryDemo} />;
}
