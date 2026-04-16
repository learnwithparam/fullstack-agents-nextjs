import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fullstack AI Agents with Next.js",
  description:
    "Multi-step AI agent with tool calling, streaming, and a Next.js chat UI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-zinc-50">{children}</body>
    </html>
  );
}
