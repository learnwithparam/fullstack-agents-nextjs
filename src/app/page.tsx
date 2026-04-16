import { ChatPanel } from "@/components/chat/chat-panel";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-br from-zinc-50 via-white to-emerald-50 p-4 sm:p-6 md:p-8">
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-4">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
            Fullstack AI Agents with Next.js
          </h1>
          <p className="text-sm text-zinc-600">
            A multi-step agent that plans, calls tools, observes results, and
            responds. Streaming chat UI powered by the Vercel AI SDK.
          </p>
        </header>
        <div className="flex-1">
          <ChatPanel />
        </div>
      </div>
    </main>
  );
}
