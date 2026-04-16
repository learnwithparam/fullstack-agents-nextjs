import { tool } from 'ai';
import { z } from 'zod';

export const getWeather = tool({
  description:
    'Get the current weather for a given city. Returns temperature, condition, and humidity.',
  parameters: z.object({
    city: z.string().describe("The city name, e.g. 'Tokyo' or 'Paris'"),
  }),
  execute: async ({ city }) => {
    const MOCK: Record<string, { tempC: number; condition: string }> = {
      tokyo: { tempC: 18, condition: 'Partly Cloudy' },
      paris: { tempC: 12, condition: 'Light Rain' },
      london: { tempC: 10, condition: 'Overcast' },
    };
    const key = city.trim().toLowerCase();
    const data = MOCK[key] ?? { tempC: 21, condition: 'Clear' };
    return { city, temperatureC: data.tempC, condition: data.condition };
  },
});
