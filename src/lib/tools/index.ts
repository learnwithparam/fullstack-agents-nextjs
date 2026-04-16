import { getWeather } from './get-weather';
import { calculator } from './calculator';
import { webSearch } from './web-search';
import { fetchUrl } from './fetch-url';

export const agentTools = {
  get_weather: getWeather,
  calculator,
  web_search: webSearch,
  fetch_url: fetchUrl,
};

export type AgentToolName = keyof typeof agentTools;
