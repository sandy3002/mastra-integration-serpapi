# @sandy3002/mastra-integration-serpapi

SerpApi search tools for Mastra with deterministic routing across Web, News, Scholar, and Shopping results.

## Install

```bash
npm install @sandy3002/mastra-integration-serpapi @mastra/core serpapi zod
```

Set your SerpApi key in the environment:

```bash
export SERPAPI_API_KEY=your-key
```

SerpApi's free tier allows 250 searches per month. Search calls consume that quota.

## Usage

```ts
import { Agent } from '@mastra/core/agent';
import { createSerpApiSearchTool } from '@sandy3002/mastra-integration-serpapi';

const webSearch = createSerpApiSearchTool({
  includeRawPayload: true,
});

const agent = new Agent({
  name: 'research-agent',
  instructions: 'Use search when current information is needed.',
  model: 'openai/gpt-4o-mini',
  tools: { webSearch },
});
```

The tool accepts `query`, plus optional `engine`, `location`, `hl`, `gl`, and `num` values. Without an explicit engine, it routes queries to one of:

- `google`
- `google_news`
- `google_scholar`
- `google_shopping`

Use a convenience factory when the vertical is known:

```ts
import { createGoogleScholarTool } from '@sandy3002/mastra-integration-serpapi';

const scholarSearch = createGoogleScholarTool();
```

## Standalone helpers

```ts
import {
  detectEngine,
  extractResults,
} from '@sandy3002/mastra-integration-serpapi';

const engine = detectEngine('latest climate news');
const results = extractResults(engine, serpApiResponse);
```

## Output

Results share a normalized shape:

```ts
{
  engine: 'google',
  results: [
    {
      title: 'Example result',
      link: 'https://example.com',
      snippet: 'Summary text',
      position: 1,
      source: 'example.com'
    }
  ],
  raw: {} // included only when includeRawPayload is true
}
```

Empty result arrays throw `EmptyResultError`. API failures throw `SerpApiError` with a stable error code such as `MISSING_API_KEY`, `SERPAPI_RESPONSE_ERROR`, `CLIENT_CLOSED_REQUEST`, or `EMPTY_RESULT`.

## Development

```bash
npm install
npm run test
npm run build
```

The package targets ES2022 ESM and Mastra Core 1.x. Live SerpApi smoke tests should be run separately with a valid `SERPAPI_API_KEY` so normal tests remain deterministic.
