import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { createSerpApiSearchTool, createGoogleNewsTool } from '../search';
import googleFixture from './fixtures/google.json';

const server = setupServer();
const testToolContext = {
  abortSignal: undefined,
  observe: {
    span: <T>(_name: string, fn: () => T | Promise<T>) => Promise.resolve(fn()),
    log: () => {},
  },
};

describe('createSerpApiSearchTool', () => {
  beforeEach(() => server.listen());
  afterEach(() => server.close());

  it('should return a tool with correct metadata', () => {
    const tool = createSerpApiSearchTool({ apiKey: 'test' });
    expect(tool).toBeDefined();
    expect(tool.id).toBe('serpapi-search');
  });

  it('should execute search and return normalized results', async () => {
    server.use(
      http.get('https://serpapi.com/search', () => {
        return HttpResponse.json(googleFixture);
      }),
    );

    const tool = createSerpApiSearchTool({ apiKey: 'test-key' });
    const result: any = await tool.execute!(
      { query: 'test' },
      testToolContext,
    );

    expect(result.engine).toBe('google');
    expect(result.results).toHaveLength(1);
    expect(result.results[0].title).toBe('Example Result');
  });

  it('should throw EmptyResultError when no results are found', async () => {
    server.use(
      http.get('https://serpapi.com/search', () => {
        return HttpResponse.json({ organic_results: [] });
      }),
    );

    const tool = createSerpApiSearchTool({ apiKey: 'test-key' });
    await expect(
      tool.execute!({ query: 'empty' }, testToolContext),
    ).rejects.toThrow('No results returned');
  });
});

describe('convenience tools', () => {
  it('should create a Google News tool with unique ID', () => {
    const tool = createGoogleNewsTool();
    expect(tool).toBeDefined();
    expect(tool.id).toBe('serpapi-google-news');
  });
});
