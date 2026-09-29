import { z } from 'zod';

export const supportedEngines = [
  'google',
  'google_news',
  'google_scholar',
  'google_shopping',
] as const;
export type SupportedEngine = (typeof supportedEngines)[number];

export const inputSchema = z.object({
  query: z.string().min(1, 'Query must not be empty'),
  engine: z.enum(supportedEngines).optional(),
  location: z.string().optional(),
  hl: z.string().optional(),
  gl: z.string().optional(),
  num: z.number().int().positive().optional(),
});

export const normalizedResultSchema = z.object({
  title: z.string(),
  link: z.string(),
  snippet: z.string().optional(),
  position: z.number().int(),
  source: z.string().optional(),
});

export const outputSchema = z.object({
  engine: z.enum(supportedEngines),
  results: z.array(normalizedResultSchema),
  raw: z.any().optional(),
});

export type InputType = z.infer<typeof inputSchema>;
export type OutputType = z.infer<typeof outputSchema>;
export type NormalizedResult = z.infer<typeof normalizedResultSchema>;
