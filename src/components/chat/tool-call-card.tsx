"use client";

import { Wrench } from "lucide-react";

type ToolCallCardProps = {
  toolName: string;
  args?: unknown;
  result?: unknown;
  state?: string;
};

export function ToolCallCard({ toolName, args, result, state }: ToolCallCardProps) {
  return (
    <div className="my-2 rounded-md border border-amber-200 bg-amber-50 p-3 text-xs">
      <div className="flex items-center gap-2 font-medium text-amber-900">
        <Wrench className="h-3.5 w-3.5" />
        <span>Tool call: {toolName}</span>
        {state && <span className="ml-auto text-amber-700">{state}</span>}
      </div>
      {args !== undefined && (
        <pre className="mt-2 overflow-x-auto rounded bg-white p-2 text-zinc-800">
          {JSON.stringify(args, null, 2)}
        </pre>
      )}
      {result !== undefined && (
        <pre className="mt-2 overflow-x-auto rounded bg-white p-2 text-zinc-800">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
