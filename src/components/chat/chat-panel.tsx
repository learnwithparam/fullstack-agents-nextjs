"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { Loader2, Send, Bot, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ToolCallCard } from "@/components/chat/tool-call-card";
import { EXAMPLE_PROMPTS } from "@/lib/utils";

type UIPart = {
  type: string;
  text?: string;
  toolInvocation?: {
    toolName: string;
    args?: unknown;
    result?: unknown;
    state?: string;
  };
};

export function ChatPanel() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    api: "/api/chat",
  });

  const isLoading = status === "submitted" || status === "streaming";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <Card className="flex h-full w-full flex-col">
      <CardContent className="flex flex-1 flex-col gap-4 overflow-hidden p-4 sm:p-6">
        <div className="flex-1 space-y-4 overflow-y-auto pr-1">
          {messages.length === 0 && (
            <div className="space-y-3">
              <p className="text-sm text-zinc-600">
                Ask the agent a question. It can look up weather, run
                calculations, and search the web across multiple steps.
              </p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_PROMPTS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => sendMessage({ text: p })}
                    className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs text-zinc-700 hover:bg-zinc-100"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => {
            const parts = (m.parts ?? []) as UIPart[];
            return (
              <div key={m.id} className="flex gap-3">
                <div className="mt-0.5 text-zinc-500">
                  {m.role === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="text-xs font-medium text-zinc-500">
                    {m.role === "user" ? "You" : "Agent"}
                  </div>
                  {parts.map((part, idx) => {
                    if (part.type === "text") {
                      return (
                        <div
                          key={idx}
                          className="whitespace-pre-wrap text-sm text-zinc-900"
                        >
                          {part.text}
                        </div>
                      );
                    }
                    if (
                      part.type === "tool-invocation" &&
                      part.toolInvocation
                    ) {
                      const ti = part.toolInvocation;
                      return (
                        <ToolCallCard
                          key={idx}
                          toolName={ti.toolName}
                          args={ti.args}
                          result={ti.result}
                          state={ti.state}
                        />
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2 border-t pt-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the agent..."
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
