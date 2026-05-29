// arXiv search API (export.arxiv.org/api/query)
// Free, no auth. Returns Atom XML. Useful for CS, math, physics, stats prior art.
// Docs: https://info.arxiv.org/help/api/index.html

import { XMLParser } from 'fast-xml-parser';
import { cached } from '../cache.js';
import { PriorArtResult, SearchOptions, resolveLimit } from '../schema.js';

const ENDPOINT = 'http://export.arxiv.org/api/query';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
});

type RawEntry = {
  id?: string;
  title?: string;
  summary?: string;
  published?: string;
  author?: { name?: string } | { name?: string }[];
  category?: { '@_term'?: string } | { '@_term'?: string }[];
};

export async function searchArxiv(opts: SearchOptions): Promise<PriorArtResult[]> {
  const limit = resolveLimit(opts, 5, 20);
  const url =
    `${ENDPOINT}?` +
    `search_query=${encodeURIComponent(`all:${opts.query}`)}` +
    `&start=0&max_results=${limit}` +
    `&sortBy=relevance&sortOrder=descending`;

  return cached('arxiv', { url }, async () => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`arXiv ${res.status}`);
    const text = await res.text();
    const parsed = parser.parse(text);
    const entries: RawEntry[] = (() => {
      const e = parsed?.feed?.entry;
      if (!e) return [];
      return Array.isArray(e) ? e : [e];
    })();

    return entries.map((e): PriorArtResult => {
      const authors = (() => {
        if (!e.author) return [];
        const arr = Array.isArray(e.author) ? e.author : [e.author];
        return arr.map((a) => a.name).filter((n): n is string => !!n);
      })();
      const cats = (() => {
        if (!e.category) return [];
        const arr = Array.isArray(e.category) ? e.category : [e.category];
        return arr.map((c) => c['@_term']).filter((t): t is string => !!t);
      })();
      return {
        source: 'arxiv',
        id: e.id ?? '',
        title: (e.title ?? '').replace(/\s+/g, ' ').trim(),
        abstract: (e.summary ?? '').replace(/\s+/g, ' ').trim(),
        authors_or_inventors: authors,
        date: e.published,
        classifications: cats,
        url: e.id ?? '',
        raw: e,
      };
    });
  });
}
