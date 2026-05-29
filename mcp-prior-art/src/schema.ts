// Shared types across all sources. The Novelty Gate consumes results in this
// shape regardless of which source produced them.

export type PriorArtSource =
  | 'google-patents'
  | 'arxiv'
  | 'semantic-scholar';

export type PriorArtResult = {
  source: PriorArtSource;
  id: string;
  title: string;
  abstract?: string;
  authors_or_inventors?: string[];
  date?: string;              // ISO 8601 where possible
  classifications?: string[]; // CPC/IPC codes for patents, arXiv categories for preprints
  citation_count?: number;    // populated where the source exposes it
  jurisdiction?: string;      // ISO country code for patents
  status?: string;            // 'active' / 'expired' / 'pending' / etc. (best-effort)
  url: string;
  raw?: unknown;              // full source payload for downstream analysis
};

export type SearchOptions = {
  query: string;
  limit?: number;
  quality?: 'fast' | 'thorough';
  yearFrom?: number;
  yearTo?: number;
};

export function resolveLimit(opts: SearchOptions, fastDefault = 5, thoroughDefault = 25): number {
  if (opts.limit) return opts.limit;
  return opts.quality === 'thorough' ? thoroughDefault : fastDefault;
}
