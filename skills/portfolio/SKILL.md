---
name: portfolio
description: View and manage the IP portfolio — all patent drafts, IDFs, and whitepapers. Shows status, coverage, and what needs attention.
user_invocable: true
---

# /portfolio

View and manage the full IP document portfolio. Shows what exists, what each document covers, its status, and what needs attention.

## Usage

- `/portfolio` — show the full portfolio dashboard
- `/portfolio status` — same as above
- `/portfolio create patent [IP entries]` — create a new patent draft covering specified IP Tracker entries
- `/portfolio create idf [IP entries]` — create a new IDF covering specified entries
- `/portfolio create whitepaper [topic or IP entries]` — create a new whitepaper
- `/portfolio update [doc-id]` — review and update a specific document
- `/portfolio check` — scan for documents that may need updating based on IP Tracker changes

## The Portfolio Manifest

All documents are tracked in `PORTFOLIO.json` at the project root. This is the single source of truth for what exists and its state. Every skill that creates or modifies an IP document MUST update this manifest.

### Document lifecycle

```
draft → in-review → filed/published → [abandoned]
```

- **draft**: Being written or revised. The active working state.
- **in-review**: Complete draft, awaiting user review or IP counsel review.
- **filed**: Patent application filed with the patent office. IDF submitted to IP committee.
- **published**: Whitepaper published.
- **abandoned**: No longer being pursued. Kept for reference but not actively maintained.

## /portfolio (dashboard)

Display a formatted overview:

```
IP Portfolio Dashboard
══════════════════════

Patent Applications (2)
  [P-001] Adaptive Cache Prefetching System            DRAFT
          Covers: IP #1-32  |  Last updated: 2026-05-01
          Prior art: searched 2026-04-15  ⚠️  Stale (>30 days)

  [P-002] Access-Pattern-Driven Prediction Model       DRAFT
          Covers: IP #16  |  Last updated: 2026-04-20
          Prior art: searched 2026-04-20  ✓  Current

IDFs (1)
  [I-001] Hit-Rate Feedback Loop for Prefetching        IN-REVIEW
          Covers: IP #11, #27  |  Last updated: 2026-03-15
          Prior art: not searched  ⚠️

Whitepapers (1)
  [W-001] Predictive Resource Loading at the Edge       DRAFT
          Covers: IP #26  |  Last updated: 2026-05-05
          Published: not yet

──────────────────────────────────────────────────

IP Tracker Coverage
  32 entries total
  28 covered by at least one document
  4 uncovered: IP #33, #34, #35, #36  ← may need documents

Attention Needed
  ⚠️  P-001: Prior art search is stale (>30 days)
  ⚠️  I-001: No prior art search on record
  ⚠️  IP #33-36: Not covered by any document
  ⚠️  P-001: IP entries #28-32 added since last update
```

## /portfolio check

Scan for documents that need attention:

1. **Stale prior art**: Any document whose last prior art search is >30 days old
2. **Uncovered IP entries**: IP Tracker entries not covered by any document
3. **Stale documents**: Documents whose covered IP entries have been updated since the document was last updated — the invention has evolved but the document hasn't
4. **Missing documents**: IP entries marked as strong candidates that don't have patent applications, IDFs, or whitepapers yet
5. **Abandoned but active**: Documents marked abandoned but their IP entries are still active

For each issue found, suggest the action:
- Stale prior art → `/prior-art refresh [entry]`
- Uncovered entries → `/portfolio create [type] [entries]`
- Stale document → `/portfolio update [doc-id]`

## /portfolio create

Create a new document:

1. Check PORTFOLIO.json for existing documents covering the same IP entries — warn if overlap
2. Run the appropriate skill (`/patent-draft`, `/disclosure-form`, or `/whitepaper`)
3. Add the new document to PORTFOLIO.json with:
   - Auto-generated ID (P-001, I-001, W-001 format)
   - The IP Tracker entries it covers
   - Status: draft
   - Created timestamp
   - Initial history entry

## /portfolio update [doc-id]

Review and update an existing document:

1. Read the document and its covered IP Tracker entries
2. Check what has changed since the document was last updated:
   - Have the IP Tracker entries been modified?
   - Has new prior art been found?
   - Have the inventions evolved (new code, new features)?
   - Has the claim strategy changed?
3. Present the changes to the user and ask what to update
4. Make the updates (revise claims, update spec, add new sections)
5. Update PORTFOLIO.json with new timestamp and history entry

## Cross-document consistency

When updating any document, check for consistency with other documents covering overlapping IP entries:

- If a patent application and a whitepaper both cover IP #11, and the patent claims are narrowed based on new prior art, the whitepaper's description should reflect the same understanding
- If an IDF's novelty assessment changes, the corresponding patent application's claims may need revision
- Terminology should be consistent across documents — if a patent calls it "adaptive cache prefetching," the whitepaper shouldn't call it "predictive buffer loading"

## When other skills create documents

The following skills MUST update PORTFOLIO.json when they create or modify documents:

- `/patent-draft` — adds/updates patent entries
- `/disclosure-form` — adds/updates IDF entries
- `/whitepaper` — adds/updates whitepaper entries
- `/prior-art` — updates last_prior_art_search date on affected documents
- `/prior-art refresh` — same
- `/prior-art overcome` — may change document status or trigger updates

## Reading the portfolio at session start

At the start of any IP-related session (disclosure, ideation, patent drafting, prior art search), read PORTFOLIO.json to understand the current landscape:
- What documents exist
- What they cover
- What's been searched recently
- What needs attention

This context prevents duplicate work and ensures new contributions fit into the existing portfolio.
