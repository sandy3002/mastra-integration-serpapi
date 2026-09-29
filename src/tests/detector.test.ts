import { describe, it, expect } from 'vitest';
import { detectEngine } from '../detector';

describe('detectEngine', () => {
  it('should return explicit engine when provided', () => {
    expect(detectEngine('any query', 'google_news')).toBe('google_news');
    expect(detectEngine('any query', 'google_scholar')).toBe('google_scholar');
  });

  it('should detect scholar queries', () => {
    expect(detectEngine('machine learning citation')).toBe('google_scholar');
    expect(detectEngine('academic paper on AI')).toBe('google_scholar');
    expect(detectEngine('research methods')).toBe('google_scholar');
  });

  it('should detect shopping queries', () => {
    expect(detectEngine('best price for laptop')).toBe('google_shopping');
    expect(detectEngine('buy wireless headphones')).toBe('google_shopping');
    expect(detectEngine('product deals')).toBe('google_shopping');
  });

  it('should detect news queries', () => {
    expect(detectEngine('breaking news today')).toBe('google_news');
    expect(detectEngine('latest headlines')).toBe('google_news');
    expect(detectEngine('news article about tech')).toBe('google_news');
  });

  it('should fallback to google for ambiguous queries', () => {
    expect(detectEngine('weather forecast')).toBe('google');
    expect(detectEngine('how to cook pasta')).toBe('google');
    expect(detectEngine('random query')).toBe('google');
  });
});
