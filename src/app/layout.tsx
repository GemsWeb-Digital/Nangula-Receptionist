import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'] 
});

export const metadata: Metadata = {
  title: "Nangula AI Demo",
  description: "Nangula AI is an always-on AI chat receptionist designed for Namibian businesses, ensuring no customer inquiry is ever missed. This demo showcases its intelligent, context-aware conversational capabilities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
