import { generateObject } from 'ai';
import { z } from 'zod';
import { getModel } from '@/lib/get-model';

const summarySchema = z.object({
  title: z.string().max(80),
  bullets: z.array(z.string().max(120)).min(3).max(5),
  confidence: z.number().min(0).max(1),
});

export async function summarizeSearchResults(text: string) {
  const { object } = await generateObject({
    model: getModel(),
    schema: summarySchema,
    prompt: `Summarize this web page for a busy engineer:\n\n${text}`,
  });
  return object;
}
