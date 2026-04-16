import { tool } from 'ai';
import { z } from 'zod';

const MAX_BYTES = 200_000;

export const fetchUrl = tool({
  description:
    'Fetch a URL and return the response body as text. Use to read articles or docs the search tool found.',
  parameters: z.object({
    url: z.string().url().describe('Absolute https URL to fetch'),
  }),
  execute: async ({ url }, { abortSignal }) => {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') {
      return { error: 'Only https URLs are allowed', url };
    }
    const res = await fetch(url, {
      signal: abortSignal ?? AbortSignal.timeout(8_000),
    });
    if (!res.ok) {
      return { error: `Fetch failed with status ${res.status}`, url };
    }
    const body = await res.text();
    return { url, body: body.slice(0, MAX_BYTES), truncated: body.length > MAX_BYTES };
  },
});
