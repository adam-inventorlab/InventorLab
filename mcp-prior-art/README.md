# inventorlab-prior-art (MCP server)

An MCP server that exposes prior-art search tools to Claude Code. Used by the InventorLab Novelty Gate to perform survivability analysis against published patents and academic literature.

## Tools exposed

| Tool | Source | Auth | Coverage |
|---|---|---|---|
| `search_google_patents` | Google Patents BigQuery | GCP service account | ~100 jurisdictions, full-text, includes the US |
| `search_arxiv` | arXiv | none | Preprints (CS, math, physics, stats) |
| `search_semantic_scholar` | Semantic Scholar | optional API key | Peer-reviewed papers, citation counts |
| `search_prior_art_all` | parallel fan-out | union of above | Single-call broad sweep |

All tools accept `{ query, limit?, quality? }`. `quality: "fast"` returns ~5 results (the Novelty Gate's default during ambient operation); `quality: "thorough"` returns ~25 (for explicit `/prior-art` sessions).

## Why no US-specific source

USPTO PatentsView (`search.patentsview.org`) was retired in 2025. Its replacement is the USPTO Open Data Portal (ODP) at `api.uspto.gov`, which is free for any use including commercial — but it requires every user of the plugin to register for and manage their own USPTO API key. We considered shipping ODP as a fourth source and decided against it: Google Patents BigQuery already indexes the entire USPTO grant feed, so the corpus overlap is near-complete. ODP would add per-user credential friction without meaningfully expanding coverage. If freshness on patents granted within the last 1-3 weeks ever becomes important (Google Patents typically has a 1-3 week ingestion lag), ODP can be added as a fourth source without touching the others.

We also looked at Lens.org, which has the most ergonomic API in the space. Lens's commercial-use terms require every commercial user to purchase a Professional Workspace license, which conflicts with the InventorLab thesis that solo developers and small teams should have low-friction access to defensible IP capture. So Lens is also out.

## Setup

```sh
cd ~/inventorlab/mcp-prior-art
npm install
npm run build
```

## Environment variables

| Var | Required for | Notes |
|---|---|---|
| `GOOGLE_APPLICATION_CREDENTIALS` | `search_google_patents` | Absolute path to a service-account JSON key with BigQuery user role on the `patents-public-data` dataset. |
| `GOOGLE_CLOUD_PROJECT` | `search_google_patents` (optional) | Defaults to the project in the credentials file. |
| `SEMANTIC_SCHOLAR_API_KEY` | `search_semantic_scholar` (optional) | Without it, anonymous rate limits apply (100 req / 5 min). Get a free key at semanticscholar.org/product/api. |

## Wiring into the InventorLab plugin

Add to the plugin's MCP config:

```json
{
  "mcpServers": {
    "inventorlab-prior-art": {
      "command": "node",
      "args": ["mcp-prior-art/dist/index.js"]
    }
  }
}
```

After build, the Novelty Gate Skill and `/prior-art` Skill should reference the new tools in their prompts:

> "When evaluating a candidate invention, call `search_prior_art_all` with the candidate's broadest claim phrasing. Review hits across patents and academic sources. Use the structured `classifications` and `date` fields to assess overlap with the candidate's CPC region and to identify whether each hit is plausibly prior art (filed before the candidate's conception date)."

## Cache

Results are cached at `~/.inventorlab/mcp-cache/<sha256>.json` for 24 hours. The cache key is the source name plus the request payload, so reruns of the same Novelty Gate query are free.

To clear: `rm -rf ~/.inventorlab/mcp-cache`.

## Smoke testing

A standalone script verifies each source independently:

```sh
USPTO_API_KEY=... SEMANTIC_SCHOLAR_API_KEY=... node smoke-test.mjs
```

(USPTO_API_KEY isn't used, but the script ignores unknown env vars.) Each source reports per-call status, latency, and the first few results. Useful for verifying credentials and diagnosing per-source failures.

## Coverage notes

- **Google Patents BigQuery**: covers applications and grants across most jurisdictions Google indexes, including the US. Includes machine-translated abstracts for non-English filings. Filing-date filtering is on the local jurisdiction's filing date.
- **arXiv**: preprints only; no peer review. CS papers concentrate in `cs.*` categories. API is slow (~10-20s per query); cache helps a lot for repeated Novelty Gate runs in the same session.
- **Semantic Scholar**: peer-reviewed and some preprint coverage; citation counts are the strongest unique signal. Anonymous rate limit is aggressive (100 req / 5 min); for real use, get the free API key.

## Roadmap

- USPTO Open Data Portal (ODP) — fourth source, gated on whether freshness on recent US patents becomes a practical issue.
- EPO Open Patent Services (OPS) — adds EP-specific search and family expansion.
- WIPO PATENTSCOPE — adds PCT applications, which often surface in international searches.
- Citation-graph expansion — given a hit, retrieve papers/patents that cite it and that it cites, both directions, to find adjacent prior art the keyword search missed.
