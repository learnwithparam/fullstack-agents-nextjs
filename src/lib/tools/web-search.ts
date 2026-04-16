import { tool } from 'ai';
import { z } from 'zod';

export const webSearch = tool({
  description:
    'Search the web and return a ranked list of result snippets. Use for recent news or facts beyond the model training cutoff.',
  parameters: z.object({
    query: z.string().min(1).max(200).describe('The search query'),
  }),
  execute: async ({ query }) => {
    const res = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        api_key: process.env.TAVILY_API_KEY,
        query,
        max_results: 5,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      return { error: `Search failed with status ${res.status}`, query };
    }
    const data = await res.json();
    return { query, results: data.results };
  },
});
