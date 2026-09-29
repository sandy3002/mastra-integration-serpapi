import { describe, it, expect } from 'vitest';
import { getEngineConfig, engineRegistry } from '../engines/registry';

describe('engineRegistry', () => {
  it('should contain all 4 supported engines', () => {
    expect(Object.keys(engineRegistry)).toHaveLength(4);
    expect(engineRegistry).toHaveProperty('google');
    expect(engineRegistry).toHaveProperty('google_news');
    expect(engineRegistry).toHaveProperty('google_scholar');
    expect(engineRegistry).toHaveProperty('google_shopping');
  });

  it('should return correct config for google', () => {
    const config = getEngineConfig('google');
    expect(config.serpApiEngine).toBe('google');
    expect(config.resultKey).toBe('organic_results');
  });

  it('should return correct config for google_news', () => {
    const config = getEngineConfig('google_news');
    expect(config.serpApiEngine).toBe('google_news');
    expect(config.resultKey).toBe('news_results');
  });
});
