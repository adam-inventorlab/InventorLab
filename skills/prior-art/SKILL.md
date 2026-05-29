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

Before searching, draft 8-12 lightweight claim framings of the invention. These are disposable — written to make the search precise and to discover which framings survive prior art. Different framings of the same invention have different prior-art vulnerabilities. Finding out which survive upfront is the whole point.

A claim framing varies along several **independent dimensions**. **Vary along as many as the invention admits, and compose dimensions to produce a wide net.** No single dimension exhausts the search space; the goal is coverage, not redundancy.

**Statutory form (the parallel three-angle set).** Always include at least one framing each as:
- **Method claim**: "A method comprising: [steps]..."
- **System claim**: "A system comprising: [components and functions]..."
- **Computer-readable medium / data-structure claim**: "A non-transitory computer-readable medium storing instructions..." or "A data structure comprising: [elements and relationships]..."

The three statutory forms search different patent-corpus subsets: method claims dominate in software/process patents; system claims dominate in hardware/architecture patents; medium and data-structure claims dominate where storage or transmission is the inventive locus.

Beyond statutory form, vary along the following dimensions, and compose them:

**Scope dimension — zoom in / zoom out.**
- **Broadest principle (zoom out)**: strip every technology-specific term to its abstract equivalent. "A Redis instance" → "a data store." "Cosine similarity" → "a similarity measure." "A gradient-boosted classifier" → "a computational model." Find the inventive principle that survives independent of implementation choices. Most vulnerable to prior art; most valuable if it survives.
- **Mid-abstraction**: re-introduce 1-2 domain-specific anchors. Technology-agnostic but more constrained.
- **Implementation-specific (zoom in on the mechanism)**: the actual technique with its actual components, fully named. Most defensible against prior-art rejection; narrowest in coverage.

A claim drafted at the principle level finds prior art that uses entirely different technology to do the same thing. A claim drafted at the mechanism level finds prior art that names the same technique under different terminology. You need both.

**Feature-emphasis dimension — which element carries the novelty.** The same invention is rarely novel along every dimension simultaneously. Identify which feature is doing the inventive work, then draft framings where different features carry that weight:
- **Mechanism-as-novelty**: the technique itself is the inventive step.
- **Sequence-as-novelty**: the ordering is the inventive step; the components are known but their interaction order is new.
- **Feedback-as-novelty**: a loop modifies its own future inputs in a way prior art doesn't.
- **Integration-as-novelty**: components are known but they cross a boundary that prior art keeps separate.
- **Outcome-as-novelty**: the achievement is what's novel; the means are familiar but the result is qualitatively different.
- **Negative-as-novelty**: the invention works *without* a constraint prior art requires; the inventive step is what is *not* needed.

For each framing, search as if that aspect alone is the inventive part. Different aspects yield different search hits because different patent and academic literatures cluster around different inventive emphases.

**Aspect dimension — what kind of claim character.** Patent-attorney drafting characterizes claims by what kind of property they assert. Each aspect is a different search target:
- **Structural**: what the invention *is* (components, data layout, system topology)
- **Functional**: what it *does* (operations, transformations, capabilities)
- **Behavioral**: how it *behaves* under conditions (responses to inputs, state transitions)
- **Architectural**: how its parts *relate* (interfaces, dependencies, control flow)
- **Interactive**: what it *exchanges* with its environment (inputs, outputs, side effects)
- **Procedural**: the *steps* it executes (the method as an ordered sequence)
- **Outcome**: the *result* it produces from the outside
- **Negative**: what it *prevents* or *avoids* (claims framed against a constraint)

**Perspective dimension — vantage point.**
- **Builder's perspective**: how you construct and configure it
- **Operator's perspective**: how it behaves at runtime
- **User's perspective**: what it enables from the outside
- **Data's perspective**: what happens to information as it flows through

**Temporal dimension — snapshot / sequence / lifecycle.**
- **Snapshot**: the invention at a single moment — its instantaneous configuration
- **Sequence**: the invention as an ordered series of steps — what happens in what order
- **Lifecycle**: the invention as a process unfolding over time — including state birth, transformation, and retirement

Same invention, searched as a snapshot vs. as a lifecycle, finds different prior art. Patent literature is biased toward snapshots; academic literature is biased toward lifecycles. Drafting both ensures both literatures are surveyed.

**Domain dimension — transposition into adjacent fields.** Some inventions have analogs in adjacent fields under different terminology. A graph-based memory architecture might have analogs in cognitive psychology, database theory, knowledge representation, and graph neural networks — under four different vocabularies. **Always draft at least one framing that asks: *what would this mechanism be called in a different field?*** The Novelty Gate's biggest false negatives are inventions that have prior art in a vocabulary the inventor doesn't know.

---

**Composing dimensions.** Framings don't have to be one-dimensional. A single framing can be (for example) "the broadest abstraction of the mechanism viewed from the operator's perspective as a lifecycle, transposed into the language of database systems" — that's one framing composing five dimensions. Draft enough framings that each dimension is exercised at least twice, that no dimension dominates the portfolio, and that compositions exercise pairs of dimensions you suspect of being independently vulnerable to prior art.

The result is a survivability matrix: for each framing, which dimensions hold up against prior art and which collapse. The broadest framing that survives along the most dimensions becomes the independent claim. Framings that survive only along narrower dimensions become dependent claims — fallback positions if the independent is challenged. The scope at which prior art starts catching the claim, on each dimension, tells you exactly how broad your protection can be along that dimension.

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

### 4. Execute searches

Use WebSearch for each query. For promising results, use WebFetch to read the full content. Focus on:

- **Patents and patent applications** — these are the most relevant for patentability
- **Academic papers** — especially those describing systems or methods
- **Technical blog posts and documentation** — may constitute prior art if published before the invention date
- **Open source projects** — code that implements similar approaches

### 5. Analyze findings

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

### 6. Generate amendments to distinguish over close prior art

When the analysis identifies high or medium-threat references, the response is **not** to kill the threatened framing. The response is to draft amendments that distinguish the claim over the reference and see whether the amended claim still captures something genuinely novel.

This serves two purposes:

1. **Diagnostic.** The amendment that's required to distinguish tells you exactly where the actual novelty lives. If you have to add "wherein the data store is reflexively constructed by the same agent that reads it" to overcome a reference, the reflexivity is the inventive step. The amendment is a finger pointing at the load-bearing limitation.
2. **Recovery.** The amended claim — narrower than the original but distinguishing over the prior art — is a candidate dependent claim or even a revised independent. Prior art that would have killed the original framing now bounds the claim from below, not extinguishes it.

For each high or medium-threat reference:

- **Identify what the reference teaches.** Be specific about which claim limitations it covers, element by element.
- **Identify what the reference does NOT teach.** Compare against the invention as it actually exists. What is present in the invention that the reference doesn't have?
- **Draft a narrowing amendment.** Add the missing limitation to the claim. The amendment phrasing should be:
  - **Specific enough** that the limitation is observable in the invention but not in the reference.
  - **General enough** that it captures the inventive principle, not just an incidental implementation choice.
  - **Functional or structural** rather than purely lexical — "wherein the X is performed [how / by what mechanism]" rather than just renaming the same concept.
- **Draft a pivoting amendment.** Instead of narrowing along the same dimension, restructure the claim to a different dimension (see Section 2). If the reference is killing the procedural framing, try amending to a structural framing that points at the same invention. The original scope is preserved but the claim character shifts. If the procedural pivot also gets caught, try the perspective pivot, the temporal-frame pivot, or the domain transposition.
- **Verify the amendment.** Re-evaluate against the original reference: does the amended claim now distinguish? Then re-search against the new amendment language: does the amended claim survive a fresh prior-art sweep, or does the amendment language itself find new references?
- **Record the amendment.** In the survivability matrix, each amended framing is a new entry. Note what the amendment cost in scope: the amendment narrowed the claim along one dimension to escape prior art on another, or pivoted to a different dimension and preserved scope.

**The amendment portfolio is informative even when filing is not the goal.** When the user is deciding whether to pursue patent protection, the amendment depth reveals the actual size and shape of the defensible IP:

- A claim that needs only a single small amendment to distinguish from existing prior art is defensible *and* broad — strong IP.
- A claim that needs three or more significant amendments to distinguish is defensible but narrow — the IP is real but the moat is thin.
- A claim that cannot be amended to distinguish without losing the inventive concept is not patentable — but the negative result is itself the right answer, and worth reporting cleanly.

Iterate steps 5 and 6 until the survivability matrix stabilizes — meaning every surviving framing has either been fully analyzed against the prior-art catalog or amended to the point where further amendment would dissolve the inventive concept. The stable matrix is what the report describes.

### 7. Produce the prior art report

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

### 8. Update working documents

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
