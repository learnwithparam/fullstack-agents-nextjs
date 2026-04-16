import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SYSTEM_PROMPT = `You are a helpful multi-step AI agent. You have access to these tools:
- get_weather(city): look up current weather for a city
- calculator(expression): evaluate a math expression
- web_search(query): search the web for recent information

When the user asks a question that needs a tool, call the tool, observe the result, and then produce a final natural-language answer. You may call multiple tools across steps if needed.`;

export const EXAMPLE_PROMPTS = [
  "What's the weather in Tokyo and what's 47 * 23?",
  "Search the web for the latest AI news and summarize it",
  "Calculate (125 + 75) * 4 and tell me the weather in Paris",
];
