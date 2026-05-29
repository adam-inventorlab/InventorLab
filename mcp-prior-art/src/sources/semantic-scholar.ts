// Semantic Scholar Graph API (api.semanticscholar.org/graph/v1/paper/search)
// Free. Optional SEMANTIC_SCHOLAR_API_KEY env var raises rate limits from
// 100 req / 5min (anonymous) to 1 req/sec (authenticated). Get a key at
// https://www.semanticscholar.org/product/api.
// Best for peer-reviewed academic prior art with citation counts.

import { cached } from '../cache.js';
import { PriorArtResult, SearchOptions, resolveLimit } from '../schema.js';

const ENDPOINT = 'https://api.semanticscholar.org/graph/v1/paper/search';
const FIELDS = [
  'paperId',
  'title',
  'abstract',
  'authors',
  'year',
  'citationCount',
  'externalIds',
  'publicationDate',
  'publicationVenue',
  'url',
].join(',');

type RawPaper = {
  paperId: string;
  title: string;
  abstract?: string;
  authors?: { name?: string }[];
  year?: number;
  citationCount?: number;
  externalIds?: Record<string, string>;
  publicationDate?: string;
  publicationVenue?: { name?: string };
  url?: string;
};

export async function searchSemanticScholar(opts: SearchOptions): Promise<PriorArtResult[]> {
  const limit = resolveLimit(opts);
  const url =
    `${ENDPOINT}?query=${encodeURIComponent(opts.query)}` +
    `&limit=${limit}&fields=${FIELDS}`;

  return cached('semantic-scholar', { url }, async () => {
    const headers: Record<string, string> = {};
    if (process.env.SEMANTIC_SCHOLAR_API_KEY) {
      headers['x-api-key'] = process.env.SEMANTIC_SCHOLAR_API_KEY;
    }
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`Semantic Scholar ${res.status}: ${await res.text()}`);
    const json = (await res.json()) as { data?: RawPaper[] };

    return (json.data ?? []).map((p): PriorArtResult => ({
      source: 'semantic-scholar',
      id: p.paperId,
      title: p.title,
      abstract: p.abstract,
      authors_or_inventors: (p.authors ?? [])
        .map((a) => a.name)
        .filter((n): n is string => !!n),
      date: p.publicationDate ?? (p.year ? `${p.year}-01-01` : undefined),
      citation_count: p.citationCount,
      url: p.url ?? `https://www.semanticscholar.org/paper/${p.paperId}`,
      raw: p,
    }));
  });
}
