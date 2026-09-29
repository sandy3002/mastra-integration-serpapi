import type { SupportedEngine, NormalizedResult } from './schemas';

function extractGoogle(raw: any): NormalizedResult[] {
  const results = raw.organic_results || [];
  return results.map((r: any) => ({
    title: r.title || '',
    link: r.link || '',
    snippet: r.snippet,
    position: r.position || 0,
    source: r.displayed_link,
  }));
}

function extractGoogleNews(raw: any): NormalizedResult[] {
  const results = raw.news_results || [];
  return results.map((r: any) => ({
    title: r.title || '',
    link: r.link || '',
    snippet: r.snippet,
    position: r.position || 0,
    source: r.source?.name,
  }));
}

function extractGoogleScholar(raw: any): NormalizedResult[] {
  const results = raw.organic_results || [];
  return results.map((r: any) => ({
    title: r.title || '',
    link: r.link || '',
    snippet: r.snippet,
    position: r.position || 0,
    source: r.publication_info,
  }));
}

function extractGoogleShopping(raw: any): NormalizedResult[] {
  const results = raw.shopping_results || [];
  return results.map((r: any) => ({
    title: r.title || '',
    link: r.link || '',
    snippet: undefined,
    position: r.position || 0,
    source: r.source,
  }));
}

const extractors: Record<SupportedEngine, (raw: any) => NormalizedResult[]> = {
  google: extractGoogle,
  google_news: extractGoogleNews,
  google_scholar: extractGoogleScholar,
  google_shopping: extractGoogleShopping,
};

export function extractResults(
  engine: SupportedEngine,
  rawResponse: any,
): NormalizedResult[] {
  const extractor = extractors[engine];
  if (!extractor) {
    throw new Error(`No extractor for engine: ${engine}`);
  }
  return extractor(rawResponse);
}
