import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { searchSerpApi } from '../client';
import { SerpApiError } from '../errors';

const server = setupServer();

describe('searchSerpApi', () => {
  beforeEach(() => server.listen());
  afterEach(() => server.close());

  it('should throw MISSING_API_KEY if no key is provided', async () => {
    delete process.env.SERPAPI_API_KEY;
    await expect(
      searchSerpApi('google', { q: 'test', api_key: '' }),
    ).rejects.toThrow(SerpApiError);
    await expect(
      searchSerpApi('google', { q: 'test', api_key: '' }),
    ).rejects.toHaveProperty('code', 'MISSING_API_KEY');
  });

  it('should map SerpApi error responses to SerpApiError', async () => {
    server.use(
      http.get('https://serpapi.com/search', () => {
        return HttpResponse.json({ error: 'Invalid API key' });
      }),
    );
    await expect(
      searchSerpApi('google', { q: 'test', api_key: 'fake' }),
    ).rejects.toThrow('Invalid API key');
    await expect(
      searchSerpApi('google', { q: 'test', api_key: 'fake' }),
    ).rejects.toHaveProperty('code', 'SERPAPI_RESPONSE_ERROR');
  });

  it('should handle successful responses', async () => {
    server.use(
      http.get('https://serpapi.com/search', () => {
        return HttpResponse.json({ organic_results: [{ title: 'Test' }] });
      }),
    );
    const result = await searchSerpApi('google', {
      q: 'test',
      api_key: 'test-key',
    });
    expect(result).toHaveProperty('organic_results');
    expect(result.organic_results).toHaveLength(1);
  });
});
