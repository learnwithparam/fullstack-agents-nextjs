import { streamText, convertToModelMessages } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

import { agentTools } from "@/lib/agent-tools";
import { SYSTEM_PROMPT } from "@/lib/utils";

export const maxDuration = 60;

const provider = process.env.LLM_PROVIDER ?? "openrouter";

function getModel() {
  // OpenRouter is the default (one key, many models)
  if (provider === "openrouter") {
    const openrouter = createOpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY ?? "",
    });
    return openrouter.chat(
      process.env.OPENROUTER_MODEL ?? "google/gemma-3-12b-it",
    );
  }

  // Fallback: still use OpenRouter so the route doesn't crash on missing
  // optional provider packages. Swap in the dedicated SDK when you add
  // the dependency (e.g. @ai-sdk/mistral, @ai-sdk/google).
  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY ?? "",
  });
  return openrouter.chat(
    process.env.OPENROUTER_MODEL ?? "google/gemma-3-12b-it",
  );
}

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: getModel(),
    system: SYSTEM_PROMPT,
    messages: convertToModelMessages(messages),
    tools: agentTools,
    // Agent loop: model may call tools, observe results, and respond
    // across up to 5 steps in a single turn.
    maxSteps: 5,
  });

  return result.toUIMessageStreamResponse();
}
