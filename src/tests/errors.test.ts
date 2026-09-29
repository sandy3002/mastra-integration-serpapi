import { describe, it, expect } from 'vitest';
import { SerpApiError, EmptyResultError } from '../errors';

describe('SerpApiError', () => {
  it('should create error with code and message', () => {
    const error = new SerpApiError('API key missing', 'MISSING_API_KEY');
    expect(error.message).toBe('API key missing');
    expect(error.code).toBe('MISSING_API_KEY');
    expect(error.name).toBe('SerpApiError');
  });

  it('should accept optional status code', () => {
    const error = new SerpApiError(
      'Server error',
      'SERPAPI_RESPONSE_ERROR',
      500,
    );
    expect(error.status).toBe(500);
  });

  it('should be instance of Error', () => {
    const error = new SerpApiError('test', 'TEST');
    expect(error).toBeInstanceOf(Error);
  });
});

describe('EmptyResultError', () => {
  it('should create error with engine and query context', () => {
    const error = new EmptyResultError('google', 'test query');
    expect(error.message).toContain('google');
    expect(error.message).toContain('test query');
    expect(error.code).toBe('EMPTY_RESULT');
    expect(error.name).toBe('EmptyResultError');
  });

  it('should extend SerpApiError', () => {
    const error = new EmptyResultError('google_news', 'query');
    expect(error).toBeInstanceOf(SerpApiError);
  });
});
