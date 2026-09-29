import { describe, it, expect } from 'vitest';
import { inputSchema, outputSchema, supportedEngines } from '../schemas';

describe('schemas', () => {
  describe('inputSchema', () => {
    it('should accept valid input with required query', () => {
      const result = inputSchema.safeParse({ query: 'test' });
      expect(result.success).toBe(true);
    });

    it('should accept optional engine parameter', () => {
      const result = inputSchema.safeParse({
        query: 'test',
        engine: 'google_news',
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty query', () => {
      const result = inputSchema.safeParse({ query: '' });
      expect(result.success).toBe(false);
    });

    it('should reject invalid engine', () => {
      const result = inputSchema.safeParse({
        query: 'test',
        engine: 'invalid_engine',
      });
      expect(result.success).toBe(false);
    });

    it('should accept all optional parameters', () => {
      const result = inputSchema.safeParse({
        query: 'test',
        engine: 'google',
        location: 'New York',
        hl: 'en',
        gl: 'us',
        num: 10,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('outputSchema', () => {
    it('should accept valid output', () => {
      const result = outputSchema.safeParse({
        engine: 'google',
        results: [
          {
            title: 'Test',
            link: 'https://example.com',
            position: 1,
          },
        ],
      });
      expect(result.success).toBe(true);
    });

    it('should accept raw payload', () => {
      const result = outputSchema.safeParse({
        engine: 'google',
        results: [],
        raw: { search_metadata: {} },
      });
      expect(result.success).toBe(true);
    });

    it('should reject missing required fields', () => {
      const result = outputSchema.safeParse({
        results: [],
      });
      expect(result.success).toBe(false);
    });
  });

  describe('supportedEngines', () => {
    it('should contain exactly 4 engines', () => {
      expect(supportedEngines).toHaveLength(4);
    });

    it('should include all expected engines', () => {
      expect(supportedEngines).toContain('google');
      expect(supportedEngines).toContain('google_news');
      expect(supportedEngines).toContain('google_scholar');
      expect(supportedEngines).toContain('google_shopping');
    });
  });
});
