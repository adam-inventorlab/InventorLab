// Standalone smoke test for each prior-art source.
// Calls each search function with a real query and reports what comes back.
// Google Patents will fail without GCP credentials and Semantic Scholar will
// rate-limit without an API key — both expected during pre-setup testing.

import { searchGooglePatents } from './dist/sources/google-patents.js';
import { searchArxiv } from './dist/sources/arxiv.js';
import { searchSemanticScholar } from './dist/sources/semantic-scholar.js';

const QUERY = 'retrieval augmented generation';
const COMMON = { query: QUERY, quality: 'fast' };

function summary(name, results) {
  console.log(`\n${'─'.repeat(60)}`);
  console.log(`${name}: ${results.length} result(s)`);
  console.log('─'.repeat(60));
  results.slice(0, 3).forEach((r, i) => {
    console.log(`\n  [${i + 1}] ${r.title?.slice(0, 100) ?? '(no title)'}`);
    if (r.date) console.log(`      date: ${r.date}`);
    if (r.authors_or_inventors?.length) {
      const list = r.authors_or_inventors.slice(0, 3).join(', ');
      const more = r.authors_or_inventors.length > 3 ? ` (+${r.authors_or_inventors.length - 3} more)` : '';
      console.log(`      ${name.includes('patent') ? 'inventors' : 'authors'}: ${list}${more}`);
    }
    if (r.jurisdiction) console.log(`      jurisdiction: ${r.jurisdiction}`);
    if (r.citation_count !== undefined) console.log(`      citations: ${r.citation_count}`);
    if (r.url) console.log(`      url: ${r.url.slice(0, 80)}`);
  });
}

async function tryRun(name, fn) {
  try {
    const t0 = Date.now();
    const results = await fn();
    const ms = Date.now() - t0;
    console.log(`✓ ${name} (${ms}ms)`);
    summary(name, results);
    return { name, ok: true, count: results.length, ms };
  } catch (e) {
    console.log(`✗ ${name}: ${e.message?.slice(0, 200)}`);
    return { name, ok: false, error: e.message };
  }
}

console.log(`Smoke test — query: "${QUERY}"\n`);

const results = await Promise.all([
  tryRun('google-patents', () => searchGooglePatents(COMMON)),
  tryRun('arxiv', () => searchArxiv(COMMON)),
  tryRun('semantic-scholar', () => searchSemanticScholar(COMMON)),
]);

console.log(`\n${'═'.repeat(60)}`);
console.log('Summary:');
console.log('═'.repeat(60));
for (const r of results) {
  const tag = r.ok ? '✓' : '✗';
  const detail = r.ok ? `${r.count} results in ${r.ms}ms` : `failed: ${r.error?.slice(0, 80)}`;
  console.log(`  ${tag} ${r.name.padEnd(20)} ${detail}`);
}
