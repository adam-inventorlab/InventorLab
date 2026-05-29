// Google Patents Public Dataset via BigQuery (patents-public-data.patents.publications)
// Coverage: ~100 patent offices globally; full-text search-friendly.
// Auth: requires either GOOGLE_APPLICATION_CREDENTIALS env var pointing to a
// service-account JSON key, or workload identity if running on GCP.
// Cost: BigQuery free quota is 1 TB/month of query scan; these queries are
// kept small with date ranges and LIMIT clauses to stay well under quota.

import { BigQuery } from '@google-cloud/bigquery';
import { cached } from '../cache.js';
import { PriorArtResult, SearchOptions, resolveLimit } from '../schema.js';

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || undefined;
const bq = new BigQuery(PROJECT_ID ? { projectId: PROJECT_ID } : {});

// publications dataset schema is documented at
// https://cloud.google.com/bigquery/public-data/google-patents

const SQL = `
SELECT
  publication_number,
  (SELECT text FROM UNNEST(title_localized) LIMIT 1) AS title,
  (SELECT text FROM UNNEST(abstract_localized) LIMIT 1) AS abstract,
  country_code AS jurisdiction,
  filing_date,
  publication_date,
  ARRAY(SELECT code FROM UNNEST(cpc)) AS cpc_codes
FROM \`patents-public-data.patents.publications\`
WHERE
  filing_date BETWEEN @yearFromInt AND @yearToInt
  AND (
    REGEXP_CONTAINS(LOWER((SELECT text FROM UNNEST(title_localized) LIMIT 1)), @rx)
    OR REGEXP_CONTAINS(LOWER((SELECT text FROM UNNEST(abstract_localized) LIMIT 1)), @rx)
  )
LIMIT @lim
`;

export async function searchGooglePatents(opts: SearchOptions): Promise<PriorArtResult[]> {
  const limit = resolveLimit(opts);
  const yearFrom = opts.yearFrom ?? 1990;
  const yearTo = opts.yearTo ?? new Date().getFullYear();

  const tokens = opts.query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => t.replace(/[^a-z0-9]/g, ''))
    .filter(Boolean);

  if (tokens.length === 0) return [];

  const params = {
    rx: `\\b(${tokens.join('|')})\\b`,
    yearFromInt: yearFrom * 10000 + 101,
    yearToInt: yearTo * 10000 + 1231,
    lim: limit,
  };

  return cached('google-patents', { sql: SQL, params }, async () => {
    const [rows] = await bq.query({ query: SQL, params });
    return rows.map((r: any): PriorArtResult => ({
      source: 'google-patents',
      id: r.publication_number,
      title: r.title || '',
      abstract: r.abstract || '',
      date: String(r.filing_date),
      classifications: r.cpc_codes || [],
      jurisdiction: r.jurisdiction,
      url: `https://patents.google.com/patent/${r.publication_number}`,
      raw: r,
    }));
  });
}
