---
name: prior-art
description: Search for prior art relevant to a tracked invention or topic. Updates the Claim Strategy Notebook with findings.
user_invocable: true
---

# /prior-art

Search for prior art relevant to an invention, approach, or topic. Produces a structured assessment of what exists, how it relates, and what it means for patentability and claim strategy.

## Usage

- `/prior-art [topic or description]` — search for prior art on a topic
- `/prior-art [IP Tracker entry number]` — search for prior art on a tracked invention
- `/prior-art all` — scan all IP Tracker entries that haven't been searched yet
- `/prior-art refresh [IP Tracker entry number]` — re-run the search on a previously searched invention (e.g., after the invention has evolved, new features have been added, or you want to check if a previously rejected idea now distinguishes)
- `/prior-art overcome [IP Tracker entry number]` — specifically evaluate whether recent changes to the invention overcome previously identified prior art

## Evolving inventions and overcoming prior art

Inventions are not static. As the user develops their system, new features, architectural changes, or design decisions may:

1. **Add new claim elements** that distinguish from previously found prior art — a feature added last week might be exactly the element that separates the invention from the closest reference
2. **Change the combination** in ways that make previously obvious combinations non-obvious — the way elements interact may have changed
3. **Produce unexpected results** that weren't apparent when the initial search was run — real-world performance data can demonstrate non-obviousness
4. **Shift the inventive core** — what seemed like the novel part may not be, but a different aspect that emerged during development IS novel

**Users should re-run prior art searches when:**
- They've added significant new functionality to a tracked invention
- They've changed the architecture or mechanism of an invention
- They want to revisit an idea that previously failed the Novelty Gate
- They're preparing for a disclosure session or patent draft and want current results
- They've been developing for a while and the IP Tracker entries may be stale

### The `/prior-art refresh` flow

When refreshing a previously searched invention:

1. Read the existing PRIOR-ART.md entry for this invention — review what was found before
2. Read the current IP Tracker entry — identify what has changed since the last search
3. Draft NEW claims that reflect the invention as it exists NOW, not as it existed when last searched
4. Search against the new claims — the search targets may be completely different
5. Compare new findings against old findings — has the prior art landscape changed? Have new references appeared? Have old threats been overcome by new features?
6. Update PRIOR-ART.md with the new search, noting what changed and why
7. If previously identified prior art is now overcome, note this explicitly: "Previously, [Reference X] covered claim element [Y]. The invention now includes [new element Z] which distinguishes because [reason]. The prior art threat from [Reference X] is reduced from High to Low."

### The `/prior-art overcome` flow

When specifically evaluating whether changes overcome prior art:

1. Read PRIOR-ART.md — identify all High and Medium threat references
2. Read the current state of the invention (IP Tracker, code, recent changes)
3. For each threat, evaluate: does the invention NOW have an element that distinguishes from this reference?
4. Re-draft claims incorporating the new distinguishing elements
5. Search specifically for the new elements to ensure THEY aren't anticipated
6. Update PRIOR-ART.md and CLAIM-STRATEGY-NOTEBOOK.md with the analysis
7. Report to the user: which threats are overcome, which remain, and what the updated claim strategy looks like

## Process

### 1. Understand the invention

If given an IP Tracker entry number, read IP-TRACKER.md and extract the invention's summary, novelty claims, and patent angle. If given a topic, ask the user for a brief description of what they've built and what they think is novel.

### 2. Draft a portfolio of pre-search claims

Before searching, draft 8-12 lightweight claim framings of the invention. These are disposable — written to make the search precise and to discover which angles survive prior art. The key insight: different framings of the same invention have different prior art vulnerabilities. Finding out which survive upfront is the whole point.

**Claim types:**
- **System claim**: "A system comprising: [components and functions]..."
- **Interaction claim**: "A method for enabling [outcome] by [mechanism]..."
- **Data/structure claim** (if applicable): "A data structure comprising: [elements and relationships]..."

**Multiple method claims with different emphasis:**
Each method claim foregrounds a different feature as the key inventive element. The same invention, told from different angles:

- **Mechanism-focused**: Emphasizes the core technique — what makes it work
- **Sequence-focused**: Emphasizes ordering — what happens first, what depends on what
- **Feedback-focused**: Emphasizes loops — how outputs modify future inputs
- **Integration-focused**: Emphasizes how components combine — what crosses system boundaries
- **Outcome-focused**: Emphasizes what's achieved — the capability, not the mechanism
- **Negative-focused**: Emphasizes what's prevented — "without requiring [thing prior art needs]"

**Different perspectives on the same invention:**
- **Builder's perspective**: How you construct and configure it
- **Operator's perspective**: How it behaves at runtime
- **User's perspective**: What it enables from the outside
- **Data's perspective**: What happens to information as it flows through

**Varying scope — broad to narrow via abstraction:**
For each angle, draft claims at different levels of specificity. Broad claims require active abstraction — finding the general principle underneath the specific implementation:

- **Broadest (maximum abstraction)**: Ask: "What is this REALLY doing at the most fundamental level?" Replace every technology-specific term with its abstract equivalent. "A Redis instance" → "a data store." "Cosine similarity" → "a similarity measure." "A gradient-boosted classifier" → "a computational model." The broadest claim captures the inventive principle independent of any technology choice. Most vulnerable to prior art but most valuable if it survives.
- **Medium**: Re-introduces 1-2 domain-specific features. Technology-agnostic but more constrained.
- **Narrowest**: Implementation-specific. Defensible, limited coverage.

The abstraction process often reveals that the invention is more general than the user realized — a technique built for one kind of data store might actually be a general method for any typed relational data store. Broad claims protect that generality.

The broadest surviving claim becomes the independent claim. Narrower survivors become dependents — fallback positions. The scope at which prior art starts catching the claim tells you exactly how broad your protection can be.

Each claim gets searched independently. The result is a survivability matrix showing which framings at which scope hold up — revealing not just where the novelty lives, but how wide the moat is.

### 3. Formulate search queries from the draft claims

Generate 10-15 search queries targeting both the full combination and individual elements:

- **Full combination searches**: Search for the complete claimed combination
  - `"[element A]" AND "[element B]" AND "[element C]" patent OR method`
- **Per-element searches**: Search for each claim element independently — if every element exists, the question becomes whether the combination is obvious
  - `"[element A]" system method patent`
- **Direct prior art**: Search for the exact technique
  - `"[technique name]" patent OR "prior art"`
- **Component prior art**: Search for individual components the invention combines
- **Academic prior art**: Research papers describing similar approaches
  - `"[concept]" methodology approach`
- **Patent databases**: Existing patents
  - `site:patents.google.com [key terms from claims]`
  - `"US patent" [key terms]`
- **Alternative approaches**: Search for different solutions to the same problem
  - `[problem being solved] solution approach system`

### 3. Execute searches

Use WebSearch for each query. For promising results, use WebFetch to read the full content. Focus on:

- **Patents and patent applications** — these are the most relevant for patentability
- **Academic papers** — especially those describing systems or methods
- **Technical blog posts and documentation** — may constitute prior art if published before the invention date
- **Open source projects** — code that implements similar approaches

### 4. Analyze findings

**Anticipation analysis (35 U.S.C. 102):** For each reference, check whether it teaches ALL elements of any draft claim. A single reference that covers every limitation of a claim anticipates it — the claim is not novel.

For each significant piece of prior art found, document:

- **Title and source** — full citation
- **Date** — when it was published (critical for priority)
- **Relevance** — what aspect of the invention it relates to
- **Claim elements covered** — which specific elements from the draft claims does this reference teach?
- **Claim elements NOT covered** — which elements are absent? These are the potential distinguishing features
- **Distinction** — how the invention differs from this prior art

**Obviousness analysis (35 U.S.C. 103):** After individual analysis, check whether any COMBINATION of 2-3 references collectively covers all claim elements. For each potential combination:

- **References**: [Ref A] + [Ref B] (+ [Ref C] if needed)
- **Coverage**: Together, do they teach all elements of any draft claim?
- **Motivation to combine**: Would a person of ordinary skill have reason to combine these references? Is there a teaching, suggestion, or motivation in any of them pointing toward the combination?
- **Reasonable expectation of success**: Would combining these references predictably produce the claimed invention?
- **Teaching away**: Does any reference teach AWAY from the combination — discouraging or contradicting it?
- **Unexpected results**: Does the invention's combination produce results qualitatively different from what the individual references would predict?
- **Mechanism of combination**: HOW would a skilled person combine these references? Be specific — "modify Reference A's [component] by replacing [element X] with Reference B's [element Y]." If you can't articulate a concrete modification path, the combination may not be obvious. Vague assertions that references "could be combined" are insufficient — the modification must be specific and credible.
- **The combination as a whole**: Step back and evaluate the entire combined system, not just the individual pieces. Does the combination, taken as a whole, look different from what any single reference teaches? Sometimes individual elements are known but the overall system they create is qualitatively different — greater than the sum of its parts. Consider the invention's architecture, interaction patterns, and emergent properties that arise from the specific way elements are integrated.
- **Obviousness verdict**: Obvious (clear motivation + specific modification path + predictable whole) / Non-obvious (no motivation, no clear modification path, teaching away, unexpected results, or the whole is qualitatively different) / Arguable

**Threat level** — considering both anticipation and obviousness:
  - **High (anticipation)**: A single reference teaches the core claimed combination; the claim is anticipated
  - **High (obviousness)**: Multiple references obviously combine to cover the claim; clear motivation to combine
  - **Medium**: References cover components but the combination is arguably non-obvious; claims need careful distinguishing language
  - **Low**: Tangentially related; worth noting but doesn't threaten claims under either 102 or 103

### 5. Produce the prior art report

Output a structured report:

```markdown
## Prior Art Search: [Invention Name]

**Date**: [search date]
**Queries executed**: [count]
**Significant results**: [count]

### Key Findings

#### [Prior Art Title 1]
- **Source**: [URL/citation]
- **Date**: [publication date]
- **Relevance**: [which aspect of the invention]
- **Overlap**: [what it teaches]
- **Distinction**: [how the invention differs]
- **Threat level**: [High/Medium/Low]

[...repeat for each significant finding...]

### Distinction Analysis

For each piece of close prior art, analyze the distinction from **multiple angles**:

#### Technical Distinction
- What specific technical mechanism differs?
- Is the difference in the algorithm, the data structure, the architecture, or the interaction model?
- Would a skilled engineer reading the prior art arrive at this invention? If not, why not?

#### Structural Distinction
- Does the invention combine components in a way the prior art doesn't?
- Is there a feedback loop, reflexive property, or emergent behavior absent from prior art?
- Does the invention operate at a different granularity or scale?

#### Functional Distinction
- Does the invention solve a problem the prior art doesn't address?
- Does it produce a qualitatively different outcome, not just a better version of the same outcome?
- Does it enable a use case that wasn't possible with prior art approaches?

#### Domain Distinction
- Is the invention applying a known technique to a new domain?
- Does the new domain create unique constraints that required adaptation?

#### Temporal/Process Distinction
- Does the invention change WHEN something happens (ordering, timing, sequencing)?
- Does it change the lifecycle or evolution of a process?

### Key Distinguishing Features

Rank the features that most strongly distinguish the invention from all prior art found:

1. **[Feature]** — distinguishes from [prior art A, B, C] because [reason]. Claim priority: High.
2. **[Feature]** — distinguishes from [prior art A, D] because [reason]. Claim priority: High.
3. **[Feature]** — distinguishes from [prior art B] because [reason]. Claim priority: Medium.
[...etc.]

These ranked features directly inform independent claim drafting — the top features should appear in independent claims, lower-ranked features become dependent claims.

### Assessment

**Overall novelty**: [Strong/Moderate/Weak]
- [Summary of what's genuinely novel vs. what's known]
- [Which angles of distinction are strongest]

**Recommended claim strategy**:
- [How to frame claims around the strongest distinguishing features]
- [What language to use/avoid based on prior art terminology]
- [Which dependent claims become more important as fallback positions]

**Gaps in the search**:
- [Areas where more searching might be needed]
- [Databases not checked that should be]
```

### 6. Update working documents

**Prior Art Registry** (PRIOR-ART.md):
- This is the primary record. Add a section for the invention with all findings.
- If the file doesn't exist, create it from the template at `prior-art-template.md`.
- Each finding gets: source, date, what it teaches, overlap, distinction, threat level, claim impact.
- The distinction should use the inventor's own words where possible — captured during strategic questioning, not paraphrased from the prior art.

**Claim Strategy Notebook** (CLAIM-STRATEGY-NOTEBOOK.md):
- Add or update the "Prior Art Concerns" section for the relevant invention
- Update "Key Language Notes" with terms to use or avoid based on findings
- Revise "Broadest Independent Claim" if prior art necessitates narrowing
- Add new "Angles of Attack" if findings suggest alternative framings

**IP Tracker** (IP-TRACKER.md):
- Add a "Prior art searched: [date]" note to the entry
- If findings significantly change the novelty assessment, update the entry

## When to search proactively

The Invention Radar should trigger a prior art search at these moments:

- **When adding a new IP Tracker entry** — before writing the "What makes it novel" section, do a quick search (3-5 queries) to validate. If you find something that teaches the same thing, tell the user honestly instead of writing a false novelty claim.

- **During `/disclosure-session`** — after the user describes the mechanism, search before articulating the inventive step. Find out what's actually new vs. what you assumed was new.

- **During `/patent-draft`** — before writing the independent claims, search to understand the landscape. The broadest defensible claim depends on what already exists.

- **During `/whitepaper` Background section** — search for related work to cite. This is expected in a whitepaper and strengthens the paper.

## Intellectual Firewall

**This is the most important rule in the entire prior art system.**

Prior art is searched to ASSESS novelty and INFORM claim strategy. It is NEVER used to IMPROVE or MODIFY the invention. These rules are absolute:

- **Never suggest adding features, techniques, or approaches found in prior art to the user's invention.** If a patent describes an interesting mechanism, do not propose incorporating it. The invention is what the user built — prior art is what others built. They stay separate.

- **Never incorporate terminology from prior art into the invention's description or claims.** Describe the invention in the inventor's own words. If the user says "embedding gate," use "embedding gate" — don't switch to the prior art's phrasing even if it seems more precise.

- **Never suggest "combining" the invention with a prior art approach.** This contaminates provenance and muddies inventorship.

- **Never let prior art findings steer the direction of ideation or development.** If you search during an ideation session and find an interesting approach in prior art, do NOT introduce it as an idea. The ideation must come from the user's own thinking.

- **Assessment is the only purpose.** Prior art answers two questions: "Is this novel?" and "How do we frame claims to distinguish?" It never answers: "How could we improve this?"

If prior art reveals a genuinely better approach than what the inventor built, the correct response is silence about the alternative and honesty about the novelty assessment: "The core concept exists in prior art. The novelty is specifically in [what the inventor actually did differently]." The inventor may independently arrive at improvements through their own reasoning — and that's fine. But Claude Code must never be the conduit for prior art teachings entering the invention.

**Why this matters:** If Claude Code reads Patent X, then suggests Feature Y from Patent X to the user, and the user adopts it — the user's invention now contains elements conceived by the prior art author, channeled through Claude Code. This creates provenance problems, potential infringement issues, and undermines the user's inventorship claim. The firewall prevents this entirely.

## Honesty is mandatory

If a prior art search reveals that an invention is NOT novel — that someone else has already published or patented the same approach — say so clearly. Do not minimize the finding or stretch to distinguish. The user needs accurate information to make good IP decisions.

If the prior art teaches the same core concept but differs in implementation details, say: "The core concept is known. The novelty, if any, is in [specific implementation detail]. Claims would need to be narrowed to [specific scope]."

If the prior art is a direct hit, say: "This appears to be prior art that teaches the same approach. I recommend removing this from the IP tracker or significantly revising the novelty claim."
