// USPTO PatentsView 2.0 (search.patentsview.org/api/v1)
// Free, no auth required. US-granted patents. Best for US-focused searches.
// Docs: https://search.patentsview.org/docs/

import { cached } from '../cache.js';
import { PriorArtResult, SearchOptions, resolveLimit } from '../schema.js';

const ENDPOINT = 'https://search.patentsview.org/api/v1/patent/';

type RawPatent = {
  patent_id: string;
  patent_title: string;
  patent_abstract: string;
  patent_date: string;
  cpc_section?: string[];
  inventors?: { inventor_name?: string }[];
};

export async function searchPatentsview(opts: SearchOptions): Promise<PriorArtResult[]> {
  const limit = resolveLimit(opts);

  // PatentsView's query DSL: _text_any matches any of the words across the listed fields.
  // We hit title and abstract together.
  const body = {
    q: {
      _text_any: {
        patent_title: opts.query,
        patent_abstract: opts.query,
      },
    },
    f: [
      'patent_id',
      'patent_title',
      'patent_abstract',
      'patent_date',
      'cpc_section',
      'inventors.inventor_name',
    ],
    o: { size: limit },
  };

  return cached('patentsview', body, async () => {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error(`PatentsView ${res.status}: ${await res.text()}`);
    }
    const json = (await res.json()) as { patents?: RawPatent[] };

    return (json.patents ?? []).map((p): PriorArtResult => ({
      source: 'patentsview',
      id: p.patent_id,
      title: p.patent_title,
      abstract: p.patent_abstract,
      authors_or_inventors: (p.inventors ?? [])
        .map((x) => x.inventor_name)
        .filter((n): n is string => !!n),
      date: p.patent_date,
      classifications: p.cpc_section,
      jurisdiction: 'US',
      url: `https://patents.google.com/patent/US${p.patent_id}`,
      raw: p,
    }));
  });
}
