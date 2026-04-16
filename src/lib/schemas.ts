import { z } from 'zod';

// The request body the route handler accepts from useChat
export const chatRequestSchema = z.object({
  messages: z.array(
    z.object({
      id: z.string(),
      role: z.enum(['user', 'assistant', 'system']),
      parts: z.array(z.object({ type: z.string() }).passthrough()),
    }),
  ),
  threadId: z.string().optional(),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
