# inventorlab-prior-art (MCP server)

An MCP server that exposes prior-art search tools to Claude Code. Used by the InventorLab Novelty Gate to perform survivability analysis against published patents and academic literature.

## Tools exposed

| Tool | Source | Auth | Coverage |
|---|---|---|---|
| `search_patentsview` | USPTO PatentsView 2.0 | none | US-granted patents |
| `search_google_patents` | Google Patents BigQuery | GCP service account | ~100 jurisdictions, full-text |
| `search_arxiv` | arXiv | none | Preprints (CS, math, physics, stats) |
| `search_semantic_scholar` | Semantic Scholar | optional API key | Peer-reviewed papers, citation counts |
| `search_prior_art_all` | parallel fan-out | union of above | Single-call broad sweep |

All tools accept `{ query, limit?, quality? }`. `quality: "fast"` returns ~5 results (the Novelty Gate's default during ambient operation); `quality: "thorough"` returns ~25 (for explicit `/prior-art` sessions).

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

Add to the plugin's MCP config (path depends on Claude Code plugin manifest conventions):

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

## Coverage notes

- **PatentsView**: US-granted patents. Does not cover US applications (only granted patents are in the dataset).
- **Google Patents BigQuery**: covers applications and grants across most jurisdictions Google indexes. Includes machine-translated abstracts for non-English filings. Filing-date filtering is on the local jurisdiction's filing date.
- **arXiv**: preprints only; no peer review. CS papers concentrate in cs.* categories.
- **Semantic Scholar**: peer-reviewed and some preprint coverage; citation counts are the strongest unique signal.

## Roadmap

- EPO Open Patent Services (OPS) — adds EP-specific search and family expansion.
- WIPO PATENTSCOPE — adds PCT applications, which often surface in international searches.
- Lens.org — combines patents + scholarly literature with a single API call.
- Citation-graph expansion — given a hit, retrieve papers/patents that cite it and that it cites, both directions, to find adjacent prior art the keyword search missed.
