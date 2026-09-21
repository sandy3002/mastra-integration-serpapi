import * as dotenv from 'dotenv';
import { getJson } from 'serpapi';

dotenv.config();        

export function getSerpApiClient(config?: any) {
  // Implementation for getting SerpApi client
  const hasApiKey = (config && config.apiKey) || process.env.SERPAPI_API_KEY;
  if (!hasApiKey) {
    throw new Error('SerpApi API key is required. Please provide it in the config or set the SERPAPI_API_KEY environment variable.');
  }
    // Return a mock client for demonstration purposes
    return {
        search: (query: string) => {
        // Mock search implementation
        return `Searching for "${query}" with API key: ${hasApiKey}`;
        }
    };
}
