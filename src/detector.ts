import type { SupportedEngine } from './schemas';

const scholarPatterns = [
  /citation/i,
  /paper/i,
  /research/i,
  /academic/i,
  /scholar/i,
];
const shoppingPatterns = [/price/i, /buy/i, /shop/i, /product/i, /deal/i];
const newsPatterns = [/news/i, /breaking/i, /latest/i, /headline/i, /article/i];

export function detectEngine(
  query: string,
  explicitEngine?: SupportedEngine,
): SupportedEngine {
  if (explicitEngine) {
    return explicitEngine;
  }

  for (const pattern of scholarPatterns) {
    if (pattern.test(query)) return 'google_scholar';
  }

  for (const pattern of shoppingPatterns) {
    if (pattern.test(query)) return 'google_shopping';
  }

  for (const pattern of newsPatterns) {
    if (pattern.test(query)) return 'google_news';
  }

  return 'google';
}
