# InventorLab

**Turn what you're building into patents as you build.**

You're building software. Some of what you build is novel — a clever workaround, a non-obvious combination of techniques, a pattern you invented because nothing existed. That's intellectual property, and it's walking out the door every time you `git push` without documenting it.

InventorLab is a plugin for [Claude Code](https://claude.com/claude-code) and [Codex](https://github.com/openai/codex) — same skills, same MCP server, same protocols — that watches your code for novel inventions as you build, helps you articulate what makes them non-obvious, and drafts patent applications with figures, all from the terminal.

## Install

### Claude Code

```
/plugin marketplace add adam-inventorlab/InventorLab
/plugin install inventorlab@inventorlab
```

### Codex

```
codex marketplace add https://github.com/adam-inventorlab/InventorLab
/plugins
```

Then select **inventorlab** in the plugin browser. (Codex's official plugin directory is in development; the Git marketplace command is the canonical install path today.)

### After install

Run the setup skill in your project. It writes the IP-tracking instructions to `AGENTS.md` (read natively by Codex, and by Claude Code via a one-line `@AGENTS.md` import in `CLAUDE.md` that the skill creates), sets up the working directories, and enables Invention Radar.

- **Claude Code:** `/inventorlab-setup`
- **Codex:** `$inventorlab:inventorlab-setup` — or just describe what you want (e.g. *"set up InventorLab in this project"*); Codex matches skills by description.

### Invoking skills (the other commands)

Throughout the documentation, skills are written with the Claude Code slash-command syntax (`/disclosure-session`, `/patent-draft`, `/prior-art`, etc.). Codex users can invoke any of them in either of two ways:

- **Plugin-namespaced**: `$inventorlab:disclosure-session`, `$inventorlab:patent-draft`, etc.
- **Natural language**: describe what you want and Codex picks the matching skill via its description.

Both work; pick whichever feels right. The skill names themselves are identical across hosts.

## Updating

InventorLab uses each host's built-in plugin update mechanism — there is no separate "InventorLab updater."

### Claude Code

Three ways to receive new versions:

**Manual update.** Refresh the marketplace catalog and apply any available update:

```
/plugin marketplace update inventorlab
/reload-plugins
```

If a newer InventorLab version is on GitHub, your installed copy moves to it. `/reload-plugins` activates the new version without restarting Claude Code.

**Automatic updates.** Claude Code can refresh the marketplace and update InventorLab at session startup. Third-party marketplaces (including InventorLab) default to *auto-update off*, so you opt in once:

1. Run `/plugin`
2. Go to the **Marketplaces** tab
3. Select **inventorlab**
4. Choose **Enable auto-update**

After that, each new Claude Code session checks for updates. When one is applied, Claude Code prompts you to run `/reload-plugins` to activate it.

**For teams** — administrators can set `"autoUpdate": true` on the InventorLab entry in `extraKnownMarketplaces` (managed `settings.json`) to force auto-update for everyone without per-user opt-in.

**Recommendation.** Auto-update is convenient and keeps you on the latest Novelty Gate, prior-art tooling, and skill prompts. The trade-off is that every push to InventorLab's `main` branch reaches your session at the next startup. If you prefer to control when changes land — for example because you depend on stable Novelty Gate behavior in a regulated workflow — leave auto-update off and update manually after reviewing the [release tags](https://github.com/adam-inventorlab/InventorLab/tags).

### Codex

Codex's plugin system uses Git-backed marketplaces. To refresh InventorLab to the latest version, re-fetch the marketplace and reinstall:

```
codex marketplace update inventorlab
/plugins
```

Then re-select **inventorlab** in the plugin browser. Codex's auto-update conventions are evolving alongside the official Plugin Directory rollout; check the [release tags](https://github.com/adam-inventorlab/InventorLab/tags) for what's new in each version.

## What It Does

### It watches while you work
**Invention Radar** runs in the background. When you write code that looks novel — a workaround for an AI limitation, an inverted design pattern, a technique you built because no library existed — it flags it:

> *"Interesting — instead of retrying on failure, this falls back to a completely different strategy. That failover pattern is non-obvious. Added to IP tracker. Try `/disclosure-session` when you're ready to dig in."*

### It helps you think
**`/ideation-session`** is divergent brainstorming. Describe a problem or a direction, and Claude explores it with you — importing patterns from other domains, inverting assumptions, following threads. Ideas that stick get tracked.

**`/disclosure-session`** is convergent. Point it at code you've already built, and it reads the mechanism, asks probing questions, and helps you articulate the inventive step: *"What would a skilled engineer have done instead? Why wouldn't they have arrived at your approach?"*

### It writes the paperwork
**`/disclosure-form`** walks you through creating a formal Invention Disclosure Form — the document IP committees use to decide whether to file. Section by section, interactively.

**`/patent-draft`** generates a full provisional patent application: specification, claims, and figure specs. Point it at an IDF or IP tracker entries and it produces a filing-ready draft.

**`/patent-figures`** generates all patent figures as a project file for the built-in visual editor — system diagrams, flowcharts, conceptual frameworks, swimlanes, and data structure diagrams.

**`/patent-audit`** checks everything for consistency — reference numerals match between spec and figures, claim dependencies point to the right parents, nothing was double-shifted during editing.

### It scans what you've already built
**`/invention-check full`** audits your entire codebase for novel approaches you may have missed. It looks for invention-around-failure patterns, non-obvious combinations, structural solutions to AI limitations, inverted patterns, and cross-domain applications.

## The Pipeline

```
  Build something          ──→  Invention Radar detects signal
                                        │
  Or scan existing code    ──→  /invention-check full
                                        │
                                        ▼
                               Silent prior art search
                              (Novelty Gate — you see nothing)
                                        │
                              ┌─────────┴──────────┐
                              ▼                     ▼
                           PASSES                  FAILS
                        (flagged to you)         (silently filtered)
                              │
                              ▼
                     /disclosure-session
                  "What's the inventive step?"
                    + strategic questioning
                   informed by prior art
                              │
                  ┌───────────┼───────────┐
                  ▼           ▼           ▼
           /patent-draft  /disclosure   /whitepaper
            Provisional     -form       Technical
            application   Formal IDF    whitepaper
                  │                         │
             ┌────┴────┐                    ▼
             ▼         ▼                  Figures
       /patent-   /patent-             (auto-opens
        figures     audit                editor)
       (auto-opens             │
        editor)         │
             │          │
             └────┬─────┘
                  ▼
       Review with IP counsel → File

  /portfolio — see everything, what's covered, what needs attention
  /prior-art — search, refresh, overcome at any time
```

## All Skills

### Discovery

**`/invention-check`** — Scan your code for novel approaches
- `/invention-check full` — audit the entire codebase
- `/invention-check recent` — scan only recent changes
- `/invention-check path/to/file.js` — scan a specific file or directory
- **When to use:** Periodically (e.g., after completing a feature), or when you suspect you've built something novel but aren't sure. Good for catching inventions you didn't notice while building.

**Invention Radar** (always-on, no invocation needed) — Monitors your code as you write it. When you build something that looks even slightly novel, it silently drafts claims from multiple angles, runs a prior art search, and only flags it to you if it survives. You never see the false positives.
- **When it activates:** Automatically, during normal development. The sensitivity level (1-10, set during setup) controls how aggressively it searches.

**`/novelty-check [idea, file, or entry number]`** — Explicit novelty check, with full disclosure
- `/novelty-check using a typed graph as both retrieval substrate and memory` — check a free-text idea
- `/novelty-check src/cache/prefetch.js` — check what's in a file
- `/novelty-check 7` — check IP Tracker entry #7
- **When to use:** When you have a hunch something might be novel and want a structured check, on demand. Runs the same drafting + hybrid search + amendment pass as the Novelty Gate, but **always surfaces results — including failures**. Where the silent Gate filters out non-novel candidates before you see them, `/novelty-check` tells you what you found regardless of outcome (survived, failed, mixed) and cites the closest prior art so you can verify directly.

### Exploration

**`/ideation-session [topic or problem]`** — Divergent brainstorming
- `/ideation-session adaptive rate limiting` — explore a topic
- `/ideation-session "how to prevent cache staleness"` — explore a problem
- `/ideation-session` — open-ended: "What's on your mind?"
- **When to use:** When you're stuck, curious, or want to explore a design space before building. Uses cross-domain imports, inversions, constraint removal, and combinatorial thinking. Promising ideas get a quick prior art check before suggesting you track them.

**`/prior-art [topic or entry number]`** — Search for prior art
- `/prior-art adaptive cache prefetching` — search on a topic
- `/prior-art 16` — search on IP Tracker entry #16
- `/prior-art all` — scan all entries that haven't been searched
- `/prior-art refresh 16` — re-run search after the invention evolved
- `/prior-art overcome 16` — evaluate whether recent changes overcome previously found prior art
- **When to use:** Before any formal IP work (disclosure, patent draft). Also when an invention evolves — new features may overcome old prior art or create new distinguishing elements. The Novelty Gate does quick searches automatically, but `/prior-art` does a thorough search with distinction analysis from multiple angles.

### Articulation

**`/disclosure-session [file, topic, or entry number]`** — Articulate an invention
- `/disclosure-session lib/cache/prefetch.js` — start from code
- `/disclosure-session "the adaptive cache prefetching system"` — start from a topic
- `/disclosure-session 16` — start from IP Tracker entry #16
- `/disclosure-session` — choose from IP Tracker entries
- **When to use:** When you've built something novel and want to articulate exactly what makes it non-obvious. Interactive and conversational — Claude Code reads your code, asks probing questions (informed by silent prior art research), and helps you find the inventive step in your own words.

### Documentation

**`/disclosure-form [entry number or topic]`** — Create an Invention Disclosure Form
- `/disclosure-form 16` — from IP Tracker entry
- `/disclosure-form` — choose interactively
- **When to use:** When working at a company that has an IP committee. The IDF is the internal document they use to decide whether to file. Walk-through format, section by section.

**`/patent-draft [entry numbers or IDF path]`** — Draft a provisional patent application
- `/patent-draft 1,3,5` — cover specific IP Tracker entries
- `/patent-draft invention-disclosures/adaptive-cache-prefetching.md` — from an IDF
- `/patent-draft` — choose interactively
- **When to use:** When you're ready to draft a filing. Generates the full specification (broad-to-narrow with liberal "in some implementations" language and concrete examples), claims (informed by prior art search), and figures (auto-opens the editor). Review with IP counsel before filing.

**`/whitepaper [topic or entry numbers]`** — Generate a technical whitepaper
- `/whitepaper "adaptive cache prefetching"` — on a topic
- `/whitepaper 11,27` — covering specific IP entries
- **When to use:** When you want to explain your system publicly — to peers, potential adopters, or the community. Also for defensive publication: establishing prior art that prevents others from patenting your approach. Different voice than a patent (honest about limitations, generous with citations, engaging narrative).

**`/patent-figures [spec file]`** — Generate patent figures
- `/patent-figures PATENT-APPLICATION.md` — from a spec
- `/patent-figures` — uses default spec location
- **When to use:** After drafting a patent application, or to regenerate figures after spec changes. Creates a project.json with all figures, runs the visual review loop, and auto-opens the figure editor.

**`/patent-audit [spec file]`** — Audit a patent application
- `/patent-audit PATENT-APPLICATION.md` — check a specific file
- **When to use:** Before submitting to IP counsel. Checks reference numeral consistency, claim support in the spec, figure alignment, and cross-references.

### Management

**`/portfolio`** — View and manage your IP document portfolio
- `/portfolio` — dashboard showing all documents, status, and attention items
- `/portfolio create patent 1,3,5` — create a new patent draft
- `/portfolio create idf 11` — create a new IDF
- `/portfolio create whitepaper "topic"` — create a new whitepaper
- `/portfolio update P-001` — review and update a specific document
- `/portfolio check` — scan for stale documents, uncovered entries, stale prior art
- **When to use:** To see the big picture — what's been captured, what's covered, what needs attention. Especially useful when managing multiple patents, IDFs, and whitepapers across many inventions.

### Setup

**`/inventorlab-setup`** — Configure InventorLab for a new project
- **When to use:** Once, at the start of a project. Sets sensitivity level, output goals, creates working documents (IP Tracker, Claim Strategy Notebook, Prior Art Registry, Portfolio). Explains the invention boundary and USPTO compliance.

### Reference

**`/inventorlab-skills`** — List every InventorLab skill, grouped by category
- **When to use:** When you can't remember a command, when you want to see the full toolset at a glance, or when onboarding a collaborator who just installed the plugin. Cheap to run, no side effects.

## What makes InventorLab different

### The Novelty Gate
Before flagging anything to you, Claude Code silently drafts claims along **six independent dimensions** — scope (zoom in on the mechanism, zoom out to the broad principle), feature emphasis, aspect (structural / functional / behavioral / procedural / negative), perspective (builder / operator / user / data), temporal frame (snapshot / sequence / lifecycle), and domain transposition (what would this be called in an adjacent field). Each framing is searched against the prior-art landscape, evaluated for anticipation and obviousness, and **amended where it meets close prior art** — narrowing or pivoting along a different dimension. The amendments themselves are diagnostic: the limitation required to distinguish is, in effect, the load-bearing inventive step. Only candidates whose framings survive the amendment pass reach you. The IP Tracker stays high-signal, not a dump of everything that felt novel.

### Prior Art Searching
- `/prior-art [topic]` — full search with distinction analysis along the six drafting dimensions, plus an explicit amendment pass against close prior art
- `/prior-art refresh [N]` — re-search after an invention evolves
- `/prior-art overcome [N]` — evaluate whether new features overcome previously found prior art
- Prior art findings go to PRIOR-ART.md — a structured registry mapping findings to each IP Tracker entry
- **Backed by a dedicated MCP server** (`mcp-prior-art/`) that exposes Google Patents BigQuery, arXiv, and Semantic Scholar as typed tools, letting the Novelty Gate and `/prior-art` skill query structured sources rather than relying on generic web search. See `mcp-prior-art/README.md` for the setup details.
- **Intellectual Firewall** — prior art informs assessment only, never design. Teachings from prior art are never incorporated into your inventions.

### Whitepapers and Defensive Publication
- `/whitepaper [topic]` — generate a technical whitepaper with literature search, Background and Related Work, honest Discussion section
- A whitepaper published publicly establishes prior art that prevents others from patenting the approaches it describes.

### Portfolio Management
- `/portfolio` — dashboard of all your IP documents, their status, what they cover, what needs attention
- Tracks which IP Tracker entries are covered by which documents
- Flags stale prior art, uncovered entries, documents that need updating
- Cross-document consistency checks

### The Invention Boundary
Claude Code assists but never invents. During IP work, if a response would cross from helping you develop YOUR idea into Claude Code generating a distinct idea of its own, it refuses and asks you to rephrase. Outside IP work, Claude Code can brainstorm freely — but if you later try to patent an idea that originated from Claude Code, it will flag that and decline.

## Also Included

- **Figure Editor** — visual HTML editor for patent and whitepaper diagrams with orthogonal connector routing, multi-page tabs, SVG import, PDF export, layout optimizer
- **Templates** — patent application, IDF, and whitepaper templates
- **Prior-art MCP server** (`mcp-prior-art/`) — exposes Google Patents BigQuery, arXiv, and Semantic Scholar as typed tool calls to the Novelty Gate and `/prior-art` skill. Installed and built automatically by the plugin's postinstall step.
- **CLAUDE.md snippet** — conventions for passive IP tracking, prior art workflow, USPTO compliance, and the intellectual firewall

## USPTO Compliance

All skills adhere to the USPTO's **November 2025 Revised Inventorship Guidance for AI-Assisted Inventions**. There is no special standard for AI-assisted inventions — the same conception test applies to all inventions. Claude Code functions as an assistive tool. The touchstone is whether the human inventor had the invention "clearly defined in the inventor's mind." Claude Code helps articulate and formalize; the user conceives, directs, and evaluates.

Provenance logs are maintained automatically during disclosure and ideation sessions, documenting who conceived what and what role Claude Code played — providing contemporaneous evidence of inventorship if ever needed.

## Author

InventorLab is created and maintained by **Adam Carlson**.

- Website: [inventorlab.ai](https://inventorlab.ai)
- Contact: [adam@inventorlab.ai](mailto:adam@inventorlab.ai)

## License

MIT
