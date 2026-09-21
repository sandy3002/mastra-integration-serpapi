import {createTool} from '@mastra/core/tools';
import { z } from 'zod';

import { getSerpApiClient } from './client.js';

const inputSchema = z.object({
    query: z.string().describe('The search query.'),
    engine: z.enum(["google", "google_news", "google_scholar", "google_shopping"]).optional()    .describe("The SerpApi engine to use. Defaults to 'google'."),
    num: z.number().optional().default(10).describe('The number of results to return.'),
});

const outputSchema = z.object({
    results: z.array(z.object({
        title: z.string(),
        link: z.string(),
        snippet: z.string().optional(),
    })),
});

export const createSerpApiSearchTool = ()=>{
    return {
        results: [
            {
                title: 'SerpApi Search',
                link: 'https://serpapi.com/'
            }
        ]
    }
}