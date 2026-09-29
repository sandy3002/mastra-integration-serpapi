import { describe, it, expect } from 'vitest';
import { extractResults } from '../extractors';
import googleFixture from './fixtures/google.json';
import newsFixture from './fixtures/google_news.json';
import scholarFixture from './fixtures/google_scholar.json';
import shoppingFixture from './fixtures/google_shopping.json';

describe('extractResults', () => {
  it('should normalize Google organic results', () => {
    const results = extractResults('google', googleFixture);
    expect(results).toHaveLength(1);
    expect(results[0]).toEqual({
      title: 'Example Result',
      link: 'https://example.com',
      snippet: 'This is a test snippet.',
      position: 1,
      source: 'example.com',
    });
  });

  it('should normalize Google News results', () => {
    const results = extractResults('google_news', newsFixture);
    expect(results).toHaveLength(1);
    expect(results[0].source).toBe('News Source');
  });

  it('should normalize Google Scholar results', () => {
    const results = extractResults('google_scholar', scholarFixture);
    expect(results).toHaveLength(1);
    expect(results[0].source).toBe('Journal of Testing, 2026');
  });

  it('should normalize Google Shopping results', () => {
    const results = extractResults('google_shopping', shoppingFixture);
    expect(results).toHaveLength(1);
    expect(results[0].source).toBe('Store Name');
  });

  it('should return empty array for missing result key', () => {
    const results = extractResults('google', {});
    expect(results).toEqual([]);
  });
});
