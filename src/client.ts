import { getJson } from 'serpapi';
import { SerpApiError } from './errors';

interface SearchParams {
  engine: string;
  q: string;
  api_key: string;
  location?: string;
  hl?: string;
  gl?: string;
  num?: number;
}

export async function searchSerpApi(
  engine: string,
  params: Omit<SearchParams, 'engine'>,
  abortSignal?: AbortSignal,
): Promise<any> {
  const apiKey = params.api_key || process.env.SERPAPI_API_KEY;

  if (!apiKey) {
    throw new SerpApiError('Missing SerpApi API key', 'MISSING_API_KEY');
  }

  try {
    const response = await getJson(engine, { ...params, api_key: apiKey });

    if (response.error) {
      throw new SerpApiError(
        typeof response.error === 'string'
          ? response.error
          : JSON.stringify(response.error),
        'SERPAPI_RESPONSE_ERROR',
      );
    }

    return response;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new SerpApiError('Request aborted', 'CLIENT_CLOSED_REQUEST');
    }
    if (error instanceof SerpApiError) {
      throw error;
    }
    throw new SerpApiError(
      error.message || 'Unknown error',
      'SERPAPI_RESPONSE_ERROR',
    );
  }
}
