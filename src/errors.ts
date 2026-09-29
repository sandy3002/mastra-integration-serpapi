export class SerpApiError extends Error {
  code: string;
  status?: number;

  constructor(message: string, code: string, status?: number) {
    super(message);
    this.name = 'SerpApiError';
    this.code = code;
    this.status = status;
  }
}

export class EmptyResultError extends SerpApiError {
  constructor(engine: string, query: string) {
    super(
      `No results returned for engine "${engine}" with query "${query}"`,
      'EMPTY_RESULT',
    );
    this.name = 'EmptyResultError';
  }
}
