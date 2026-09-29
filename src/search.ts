import { createTool } from '@mastra/core/tools';
import { detectEngine } from './detector';
import { searchSerpApi } from './client';
import { extractResults } from './extractors';
import { inputSchema, outputSchema, type SupportedEngine } from './schemas';
import { EmptyResultError } from './errors';
import { getEngineConfig } from './engines/registry';

export function createSerpApiSearchTool(options?: {
  apiKey?: string;
  includeRawPayload?: boolean;
}) {
  return createTool({
    id: 'serpapi-search',
    description: 'Search using SerpApi with automatic engine detection',
    inputSchema,
    outputSchema,
    execute: async (inputData, context) => {
      const {
        query,
        engine: explicitEngine,
        location,
        hl,
        gl,
        num,
      } = inputData;
      const engine = detectEngine(query, explicitEngine);
      const config = getEngineConfig(engine);
      const apiKey = options?.apiKey || process.env.SERPAPI_API_KEY;

      if (!apiKey) {
        throw new Error('SERPAPI_API_KEY environment variable is not set');
      }

      const rawResponse = await searchSerpApi(
        config.serpApiEngine,
        {
          q: query,
          api_key: apiKey,
          location,
          hl,
          gl,
          num,
        },
        context.abortSignal,
      );

      const results = extractResults(engine, rawResponse);

      if (results.length === 0) {
        throw new EmptyResultError(engine, query);
      }

      const output: any = {
        engine,
        results,
      };

      if (options?.includeRawPayload) {
        output.raw = rawResponse;
      }

      return output;
    },
  });
}

export function createGoogleSearchTool() {
  return createSerpApiSearchTool();
}

export function createGoogleNewsTool() {
  return createTool({
    id: 'serpapi-google-news',
    description: 'Search Google News via SerpApi',
    inputSchema,
    outputSchema,
    execute: async (inputData, context) => {
      const data = { ...inputData, engine: 'google_news' as const };
      const tool = createSerpApiSearchTool();
      // @ts-ignore - Mastra tool execute returns void | result in some versions
      return tool.execute(data, context);
    },
  });
}

export function createGoogleScholarTool() {
  return createTool({
    id: 'serpapi-google-scholar',
    description: 'Search Google Scholar via SerpApi',
    inputSchema,
    outputSchema,
    execute: async (inputData, context) => {
      const data = { ...inputData, engine: 'google_scholar' as const };
      const tool = createSerpApiSearchTool();
      // @ts-ignore
      return tool.execute(data, context);
    },
  });
}

export function createGoogleShoppingTool() {
  return createTool({
    id: 'serpapi-google-shopping',
    description: 'Search Google Shopping via SerpApi',
    inputSchema,
    outputSchema,
    execute: async (inputData, context) => {
      const data = { ...inputData, engine: 'google_shopping' as const };
      const tool = createSerpApiSearchTool();
      // @ts-ignore
      return tool.execute(data, context);
    },
  });
}
