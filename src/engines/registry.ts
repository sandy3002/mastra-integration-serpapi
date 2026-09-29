import type { SupportedEngine } from '../schemas';
import { extractResults } from '../extractors';

export interface EngineConfig {
  serpApiEngine: string;
  resultKey: string;
}

export const engineRegistry: Record<SupportedEngine, EngineConfig> = {
  google: {
    serpApiEngine: 'google',
    resultKey: 'organic_results',
  },
  google_news: {
    serpApiEngine: 'google_news',
    resultKey: 'news_results',
  },
  google_scholar: {
    serpApiEngine: 'google_scholar',
    resultKey: 'organic_results',
  },
  google_shopping: {
    serpApiEngine: 'google_shopping',
    resultKey: 'shopping_results',
  },
};

export function getEngineConfig(engine: SupportedEngine): EngineConfig {
  return engineRegistry[engine];
}
