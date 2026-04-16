import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { createOpenAI } from '@ai-sdk/openai';

export function getModel() {
  const provider = process.env.LLM_PROVIDER ?? 'openrouter';

  if (provider === 'openai') {
    const openai = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY ?? '',
    });
    return openai.chat(process.env.OPENAI_MODEL ?? 'gpt-4o-mini');
  }

  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY ?? '',
  });
  return openrouter.chat(
    process.env.OPENROUTER_MODEL ?? 'google/gemma-3-12b-it',
  );
}
