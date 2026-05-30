---
name: inventorlab-skills
description: List every skill InventorLab provides — grouped by category, with one-line purpose, common usage forms, and when to use each.
user_invocable: true
---

# /inventorlab-skills

Show the user a complete, organized list of every InventorLab skill currently available, with usage and guidance on when to invoke each. This is the discoverability and recall skill — the answer to "what can InventorLab actually do?" and "what's that command I'm trying to remember?"

## Output

Produce the following structured listing in the chat. The categories mirror the inventive workflow: setup → discovery → exploration → articulation → output → management. The user reads it top to bottom and finds whichever command they need.

Use Markdown for the formatting. Keep skill names in `code` formatting so they're easy to spot. Use a single blank line between skills. Do not editorialize — this is a reference, not a tutorial.

```
# InventorLab Skills

InventorLab provides skills for the full inventive workflow — from
ambient novelty monitoring as you build, through formal disclosure
and patent drafting, to publication and portfolio management. All
skills run inside your Claude Code session as slash commands.

## Setup

`/inventorlab-setup`
  Configure InventorLab for the current project. Adds IP tracking
  conventions to AGENTS.md (and a one-line CLAUDE.md that imports it
  for Claude Code), creates working documents (IP Tracker, Claim
  Strategy Notebook, Prior Art Registry, Portfolio), and sets your
  sensitivity level (1-10). Run once at the start of a project.

`/ai-inventorship`
  Collaborative Q&A on AI-assisted inventorship under the USPTO
  November 2025 Revised Inventorship Guidance. Loads the verbatim
  guidance text and answers questions grounded in it. Use when you
  or InventorLab is uncertain whether something has crossed from
  tool assistance into AI origination, when drafting per-claim
  conception attestations, or just to understand where the line
  is drawn. Not legal advice — for material decisions, consult IP
  counsel.

## Discovery

Invention Radar (always-on, no invocation)
  Background monitoring. Watches your work for novelty signals as
  you build and silently runs the Novelty Gate (drafting, prior-art
  search, anticipation/obviousness analysis, amendment pass). Only
  flags candidates that survive — false positives never reach you.

`/invention-check`
  Scan code for novel approaches you may have missed. Usage:
    /invention-check full        — audit the entire codebase
    /invention-check recent      — scan recent changes only
    /invention-check path/file   — scan a specific file or directory

`/novelty-check`
  Quick novelty check on a hunch, with full disclosure of results
  including failures. Same drafting + hybrid search + amendment
  pass as the Novelty Gate, but always tells you what was found
  regardless of outcome. Usage:
    /novelty-check "[your idea]"
    /novelty-check path/to/file.js
    /novelty-check 7              — IP Tracker entry number

## Exploration

`/ideation-session [topic or problem]`
  Divergent brainstorming. Uses cross-domain imports, inversions,
  constraint removal, and combinatorial thinking. Promising ideas
  get a quick novelty check before being suggested for tracking.
  Usage:
    /ideation-session adaptive rate limiting
    /ideation-session "how to prevent cache staleness"
    /ideation-session                — open-ended

`/prior-art [topic or entry number]`
  Deep, structured prior-art search with anticipation/obviousness
  analysis and an amendment iteration to stabilization. Findings
  are committed to PRIOR-ART.md. Usage:
    /prior-art adaptive cache prefetching
    /prior-art 16                  — by IP Tracker entry number
    /prior-art all                 — entries not yet searched
    /prior-art refresh 16          — re-run after the invention evolves
    /prior-art overcome 16         — does new work overcome old prior art?

## Articulation

`/disclosure-session [file, topic, or entry number]`
  Articulate and formalize an invention through guided dialogue.
  Pulls out the architectural commitments, rejected alternatives,
  prior-art landscape, and conception trajectory. Produces a
  structured disclosure document and a contemporaneous provenance
  log conforming to the USPTO November 2025 conception standard.

`/disclosure-form [entry number or topic]`
  Generate an Invention Disclosure Form (IDF) from a tracked
  invention or topic. Pulls from the IP Tracker entry, disclosure
  session, and Claim Strategy Notebook.

## Patents and Figures

`/patent-draft [IDF, entry number, or topic]`
  Draft a provisional patent application. Broadest-claims-first,
  multi-angle (method / system / medium), with figures, in
  patent-attorney register. Reuses disclosure material and Claim
  Strategy Notebook contents.

`/patent-figures [patent application path]`
  Generate patent figure project files (JSON specs that render to
  USPTO-compliant PNG). Reference numerals managed automatically.

`/patent-audit [patent application path]`
  Audit an existing patent application for consistency: claim-figure
  alignment, reference-numeral integrity, spec-claim coverage, and
  patent-attorney style.

## Publication

`/whitepaper [topic or entry numbers]`
  Generate a technical whitepaper from one or more inventions or
  topics. Includes literature search, Background and Related Work,
  and an honest Discussion section. A published whitepaper
  establishes prior art (defensive publication) that prevents others
  from patenting the same approach.

## Management

`/portfolio`
  Dashboard of every IP document in the project — patent drafts,
  IDFs, whitepapers — with status, what IP Tracker entries each
  covers, prior-art freshness, and cross-document consistency
  checks. Maintained automatically as documents are created and
  updated.

`/inventorlab-skills`
  This list. Run it when you need to look up a command or remind
  yourself what's available.

## Behind the scenes

Three working documents are maintained automatically by the skills.
You don't need to manage them — they grow as inventions develop:

  IP-TRACKER.md                 — accumulating tracker of inventions
                                  that have survived the Novelty Gate
  CLAIM-STRATEGY-NOTEBOOK.md    — per-invention claim strategies,
                                  scope explorations, drafting notes
  PRIOR-ART.md                  — structured registry of prior-art
                                  findings, keyed by tracker entry
  invention-provenance/         — session transcripts for USPTO
                                  conception evidence
  PORTFOLIO.json                — central manifest of every IP doc

## Prior-art search backing

InventorLab ships a bundled MCP server (mcp-prior-art) that exposes
structured search across:

  Google Patents BigQuery       — ~100 jurisdictions including US
  arXiv                         — preprints (CS, math, physics, stats)
  Semantic Scholar              — peer-reviewed, citation counts
  WebSearch                     — broader coverage (blogs, OSS, talks)

The Novelty Gate, /prior-art, and /novelty-check all use these
sources in parallel and merge the results.

## Configuration

Per-user credentials are needed for two of the structured sources:

  GOOGLE_APPLICATION_CREDENTIALS — required for Google Patents
                                   (or set up gcloud Application
                                   Default Credentials)
  SEMANTIC_SCHOLAR_API_KEY       — optional; raises rate limits
                                   from anonymous (100 req / 5 min)

arXiv and WebSearch need no configuration.

## Updates

Manual:  /plugin marketplace update inventorlab
         /reload-plugins

Auto:    /plugin  →  Marketplaces  →  inventorlab  →  Enable auto-update
```

## When to invoke this skill

- The user asks "what can InventorLab do?" or "what's that command for...?"
- The user types a partial slash command and isn't sure what to complete it with
- Onboarding a new collaborator who just installed the plugin
- The user reports a problem and you need to point them at the right skill

Do not invoke this skill unprompted — it is reference material, not a workflow step.
