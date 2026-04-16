import { tool } from 'ai';
import { z } from 'zod';

export const calculator = tool({
  description:
    'Evaluate a simple arithmetic expression and return the numeric result. Supports +, -, *, /, and parentheses.',
  parameters: z.object({
    expression: z
      .string()
      .min(1)
      .max(200)
      .describe('Arithmetic expression like "47 * 23" or "(12 + 8) / 4"'),
  }),
  execute: async ({ expression }) => {
    if (!/^[\d\s+\-*/().]+$/.test(expression)) {
      return { error: 'Only +, -, *, /, parentheses, and digits are allowed', expression };
    }
    try {
      // Safe-ish because the regex above restricts the charset.
      const value = Function(`"use strict"; return (${expression});`)();
      return { expression, value };
    } catch (err) {
      return { error: (err as Error).message, expression };
    }
  },
});
