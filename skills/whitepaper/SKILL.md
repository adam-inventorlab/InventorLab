---
name: whitepaper
description: Generate a technical whitepaper from tracked inventions, code, or a topic.
user_invocable: true
---

# /whitepaper

Generate a technical whitepaper — a document that explains a system, methodology, or approach to a technical or business audience. Unlike a patent application, a whitepaper emphasizes *how it works and why it matters*, not legal claims. Unlike an IDF, it's written for external audiences, not internal IP committees.

## Usage

- `/whitepaper [topic or IP Tracker entry number]` — generate a whitepaper on the specified topic

## How a whitepaper differs from a patent application

| Aspect | Patent Application | Whitepaper |
|--------|-------------------|------------|
| **Audience** | Patent examiner | Peers, adopters, investors, community |
| **Goal** | Stake legal claims | Explain and persuade |
| **Prior art** | Distinguish from it | Cite and build on it openly |
| **Limitations** | Minimize or omit | Acknowledge honestly (builds credibility) |
| **Implementation** | Abstract enough for broad claims | Concrete — code, configs, performance data welcome |
| **Voice** | Formal, legalistic | Engaging, can be opinionated |
| **Figures** | Reference numerals, USPTO format | Clean diagrams, no legal formatting |
| **Novelty** | Central — must prove non-obviousness | Helpful but not required |
| **Structure** | Claims + supporting spec | Narrative: problem → approach → results |

## Whitepaper structure

Generate the whitepaper with these sections:

1. **Abstract** (150-300 words) — What the paper covers and why it matters. Standalone summary.

2. **Introduction** — The problem space. What exists today, what's insufficient, why this work is needed. Set the stage without overselling.

3. **Background and Related Work** — Openly cite and discuss prior art, related systems, and alternative approaches. Position this work within the landscape. This is where whitepapers differ most from patents — be generous with attribution and context.

4. **Approach / Architecture** — The core of the paper. How the system works. Include:
   - High-level architecture
   - Key design decisions and their rationale
   - Component interactions
   - Data flows and processing pipelines
   - Algorithms or methods (with enough detail to understand, not necessarily reproduce)

5. **Key Innovations** — What's new or different about this approach. Not framed as patent claims, but as technical contributions. "We introduce..." or "Our approach differs from..." language.

6. **Implementation** — Concrete details. Technology stack, scale, performance characteristics, deployment model. Code snippets if they clarify the architecture. Configuration examples if relevant.

7. **Results / Impact** — What the system has produced. Metrics, qualitative outcomes, case studies. If it's deployed, describe real-world results. If it's a design, describe expected impact with supporting reasoning.

8. **Discussion** — Honest assessment. What works well, what doesn't, what surprised you. Trade-offs made and why. This section builds credibility — readers trust authors who acknowledge limitations.

9. **Future Work** — Where this goes next. Open problems, planned extensions, research questions. Invite the community to build on this.

10. **References** — Proper citations for everything referenced in Background and throughout.

## Process

1. **Gather source material:**
   - Read IP-TRACKER.md for tracked inventions
   - Read relevant source code to understand implementation
   - Read PATENT-APPLICATION.md if it exists (reuse spec content, reframe for whitepaper voice)
   - Read any existing documentation

2. **Literature search for the Background and Related Work section.** This is different from a prior art search conducted for IP reasons. The goal here is not to assess patentability — it's to find work worth citing, comparing against, and building on. Search for:

   - **Foundational work** — seminal papers and systems that the whitepaper's approach builds on. These give the reader context and show the author is grounded in the field.
   - **Alternative approaches** — other systems or methods that solve the same or similar problems differently. Compare honestly: what they do well, where they fall short, how this work differs.
   - **Complementary work** — research that supports or extends the whitepaper's approach from a different angle. Citing complementary work strengthens the argument.
   - **Recent developments** — papers from the last 1-2 years that the reader would expect to see cited. Missing a major recent paper signals lack of awareness.
   - **Contrasting perspectives** — work that disagrees with or challenges the whitepaper's approach. Engaging with criticism builds credibility.

   Run 10-15 web searches targeting academic papers, technical reports, and significant blog posts. For each relevant find, note the citation, key contribution, and how it relates to the whitepaper. These feed directly into:
   - Section 3 (Background and Related Work) — the core citations and comparisons
   - Section 5 (Key Innovations) — positioning the work relative to what was found
   - Section 10 (References) — the full citation list

   This search is about intellectual honesty and thoroughness, not legal positioning. Be generous — a well-cited whitepaper carries more weight than one that appears to exist in a vacuum.

3. **Draft the whitepaper** in markdown. Write in a clear, technical voice — authoritative but accessible. Use first-person plural ("we") for design decisions.

3. **Generate figures** if the whitepaper needs diagrams. Most whitepapers benefit from at least 2-3 figures (system overview, key mechanism, data flow or comparison).

   Save to `whitepapers/figures/project.json` (separate from patent figures). Use the same figure editor JSON format, but with whitepaper conventions:

   **What's different from patent figures:**
   - **No reference numerals** — boxes have labels only, no "302" underneath
   - **No encompassing numeral** — no "300" at the top of the page
   - **Descriptive figure titles instead of "FIG. N"** — use a meaningful title annotation at the bottom: "System Architecture Overview" not "FIG. 1"
   - **No USPTO margin requirements** — use the full page. Margins of 36px (0.5") on all sides are sufficient for clean whitespace.
   - **Richer labels are fine** — whitepaper boxes can have slightly longer labels since there's no patent brevity constraint. "Adaptive Multi-Tier Cache Invalidation" is fine.
   - **SVG illustrations welcome** — user depictions, device mockups, and other freeform visuals are common in whitepapers

   **What's the same:**
   - Same JSON project format, same editor
   - Same page sizing (US Letter, landscape or portrait per figure)
   - Same visual review loop (render, review, fix)
   - Same compact box sizing and alignment principles
   - Same connector routing

   **Element format for whitepaper figures** (note: no `id` field):
   ```json
   { "label": "Cache Layer", "position": [396, 300], "width": 100, "height": 40 }
   ```

   After generating, open the figure editor:
   ```bash
   open "${CLAUDE_PLUGIN_ROOT}/docs/figure-editor.html"
   ```
   In the editor, import `whitepapers/figures/project.json` to load the figures.

   Reference figures from the whitepaper markdown using relative paths:
   ```markdown
   ![System Architecture](figures/system-overview.svg)
   ```

4. **Review and refine** — Read the draft critically:
   - Does the abstract stand alone?
   - Is the background fair and thorough?
   - Are the innovations clearly articulated?
   - Is the discussion honest about limitations?
   - Would a knowledgeable reader learn something?

5. **Save** to `whitepapers/[descriptive-name].md`

6. **Update PORTFOLIO.json** — add the whitepaper entry:
   ```json
   {
     "id": "W-NNN",
     "type": "whitepaper",
     "title": "[whitepaper title]",
     "file": "whitepapers/[name].md",
     "status": "draft",
     "ip_tracker_entries": [list of covered entry numbers, if any],
     "created_at": "[now]",
     "last_updated": "[now]",
     "notes": "",
     "history": [{ "date": "[now]", "action": "created", "summary": "Initial draft" }]
   }
   ```
   Also read PORTFOLIO.json at the START to check for existing documents covering the same IP entries.

## IP interaction

- A whitepaper IS a public disclosure once you share it. The Publication Awareness system applies.
- If the whitepaper covers tracked inventions from IP-TRACKER.md, inform the user before they distribute it:
  - US: 12-month grace period starts from the publication date
  - International: most jurisdictions have absolute novelty — publication destroys foreign patent rights
  - If the user intends to file patents, suggest filing a provisional BEFORE publishing the whitepaper
