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

Run prior-art queries through **two complementary search modalities in parallel** and merge the results. Neither alone catches everything; together they cover the substantive prior-art surface.

**Structured sources via the bundled MCP server.** Call `search_prior_art_all` with the query for each claim framing — this fans out in parallel to:

- **Google Patents BigQuery** — patents and applications across ~100 jurisdictions, full-text indexed
- **arXiv** — preprints (CS, math, physics, statistics)
- **Semantic Scholar** — peer-reviewed papers with citation counts

For finer control, the individual tools (`search_google_patents`, `search_arxiv`, `search_semantic_scholar`) can be called directly. All structured-source results return typed fields (title, abstract, classifications, dates, citation counts, jurisdiction) that feed directly into the anticipation and obviousness analysis in step 5.

**Web search via WebSearch.** Run the same queries against general web search to catch prior art that does not appear in patent or academic indexes — technical blog posts, open-source projects (GitHub READMEs, project documentation, code), conference talks, product launches, internal company docs published externally, news articles, vendor whitepapers. Web search is often the only route to this kind of non-traditional prior art, and it is frequently the most disqualifying when present. Use `WebFetch` on promising results to read the full content.

**Run both modalities for each query, in parallel.** Treat them as complementary, not alternative. The structured tools give authoritative coverage of the formal patent and academic literature; web search gives broad coverage of everything else. Merge the results into a single working set, deduplicate by URL or near-match title (a paper indexed in Semantic Scholar may also appear in a web result), and rank by relevance to the claim framing.

Focus on:

- **Patents and patent applications** — most directly relevant for patentability. Structured tools surface these by default; the `cpc` classifications on returned results let you assess overlap with the invention's likely classification region
- **Academic papers** — especially peer-reviewed or well-cited. Semantic Scholar's `citation_count` field is a strong signal of importance
- **Technical blog posts and documentation** — may constitute prior art if published before the invention date. Web search is the primary route
- **Open source projects** — code that implements similar approaches. Web search plus targeted `site:github.com` queries
- **Conference talks and slides** — often surface only via web search, but are valid prior art if publicly accessible

**This is Phase 1 — claim-driven search.** After it completes, triage: did any single reference anticipate any framing? If yes, that framing is dead under §102 and goes directly to the amendment pass (Step 6). If no, the §102 question is resolved for that framing (presumptively novel) and the real question becomes §103 obviousness — which is where Phase 2 earns its keep.

#### Phase 2 — Examiner-style combination hunting (selective)

Phase 1 finds references that share vocabulary with the claim. Phase 2 finds references that an examiner would use to construct an obviousness argument, even when those references use vocabulary the inventor would never have searched for. The two phases find different prior art, and the prior art Phase 2 surfaces is exactly the kind that ambushes claims during prosecution.

**Trigger.** Run Phase 2 for any framing where Phase 1 found NO anticipating reference but the broadest framing is plausibly obvious under at least one KSR rationale (Step 5, Pillar 2). For framings where Phase 1 already found anticipation, skip Phase 2 — the framing is going to the amendment pass anyway.

**Procedure.** For each Phase-2-triggered framing:

1. **Articulate the hypothetical primary reference.** Ask the adversarial question: *if PHOSITA were to construct an obviousness rejection against this framing, what would the dominant primary reference need to teach?* List the elements of the framing the hypothetical primary would cover (typically the largest portion — the secondary references fill the gaps). Predict the vocabulary it would use, which may differ from the inventor's. Predict the venue: which CPC/IPC classification region, which academic journal, which industry blog domain.

2. **Search for the hypothetical primary.** Use the hybrid tools with the predicted vocabulary, targeted at the predicted venues. This is one targeted search per framing, not a full sweep. Use both structured tools (especially `search_google_patents` with `yearFrom` and CPC-region filtering if known) and `WebSearch` (especially `site:` qualifiers for predicted domains).

3. **For each hypothetical primary that surfaces, identify the gap.** Element by element: what does the primary teach? What doesn't it teach? The unteached elements are the secondary-reference targets.

4. **Search for gap-fillers.** Predicted vocabulary, predicted venues. One targeted search per gap, structured plus web. Two or three gap-filler candidates per primary is normal.

5. **Cross-modality combinations are legally valid and should be actively considered.** PHOSITA is presumed to read across patents, peer-reviewed academic literature, and major technical blogs and conference proceedings. A primary reference from Google Patents combined with a secondary reference from arXiv is a fair combination if PHOSITA would consult both. **Do not artificially silo combinations by source — the inventive landscape does not.** When merging the references found in Phase 2 with those from Phase 1, treat the merged set as one corpus for combination analysis.

The hunt is also done in reverse when warranted: sometimes the most defensible obviousness argument starts not from a primary reference but from a *secondary* reference that obviously implies modifying a known primary. If that reversed structure is more natural, hypothesize the secondary first and search for the primary it would obviously combine with.

Phase 2's search effort is targeted, not exhaustive. On framings where it triggers, the additional search cost is roughly 1.3–1.5× Phase 1 alone — significantly less than a second full sweep. On framings where it does not trigger (Phase 1 already anticipates), the cost is zero.

### 5. Analyze findings — the six-pillar obviousness framework

The analysis is grounded in three Supreme Court decisions governing §103 obviousness: *Graham v. John Deere* (1966) which established the factual inquiries and recognized "secondary considerations" as objective indicia of non-obviousness; *KSR v. Teleflex* (2007) which broadened the rationales for obviousness beyond TSM and required flexibility in the analysis; and the line of Federal Circuit cases requiring articulated reasoning with rational underpinnings — no conclusory rejection.

**Anticipation analysis (35 U.S.C. §102) — first pass.**

For each reference, check whether it teaches ALL elements of any framing. A single reference covering every limitation anticipates. Per reference, document:

- **Title, source, date, URL** — full citation
- **Modality of source** — Google Patents / arXiv / Semantic Scholar / WebSearch / other
- **Claim elements taught** — element by element, which limitations the reference covers
- **Claim elements not taught** — which limitations are absent (these are the potential distinguishing features)
- **Anticipation verdict** — ANTICIPATED / NOT ANTICIPATED / ARGUABLE

If anticipated, the framing dies under §102 and goes to the amendment pass (Step 6). If not, proceed to §103.

**Obviousness analysis (35 U.S.C. §103) — six pillars.**

For each candidate combination of 2-3 references that collectively cover all claim elements — **including cross-modality combinations spanning Google Patents, arXiv, Semantic Scholar, and WebSearch results** — evaluate each pillar:

#### Pillar 1 — PHOSITA

Define the person of ordinary skill in the art (PHOSITA) for this technical field before evaluating anything else. PHOSITA calibrates the entire obviousness standard.

- **Education level** and years of relevant experience
- **Adjacent fields** PHOSITA is familiar with
- **Literature PHOSITA is presumed to read** — typically patents in the classification region, peer-reviewed papers in the field, major technical blogs and conference proceedings, and (in fast-moving software fields) GitHub and the dominant open-source projects

A combination obvious to a PhD-level cryptographer may be non-obvious to a CS undergrad. State PHOSITA explicitly — every pillar below depends on this definition.

**PHOSITA reads across publication types.** A software PHOSITA reads patents AND papers AND major engineering blogs. This is why cross-modality combinations are within PHOSITA's reach and are legally valid combinations — a primary reference from Google Patents combined with a secondary from arXiv is a fair combination for PHOSITA to make.

#### Pillar 2 — Rationale identification

KSR held that TSM alone is insufficient. At least one of seven rationales must support the combination. State explicitly which apply:

1. **TSM (teaching, suggestion, or motivation)** — does any reference teach, suggest, or motivate combining the others?
2. **Combination of known elements** — combining known prior-art elements via known methods to yield predictable results
3. **Substitution of known elements** — substituting one known element for another in the same role to yield predictable results
4. **Application of known technique** — using a known technique to improve similar devices in the same way
5. **Predictable use** — applying a known technique to a known device ready for improvement, yielding predictable results
6. **"Obvious to try"** — selecting from a finite set of identified, predictable solutions
7. **Design need or market pressure** — known design needs pushing toward predictable variations

A single rationale is weaker than two or three rationales jointly supporting the combination. Document each that applies.

#### Pillar 3 — Specific modification path

Articulate the actual modification step by step. The modification must be concrete, articulable, and credible — *not* a vague assertion that "the references could be combined."

Format: *"PHOSITA would modify [Reference A's component X] by [verb] [element Y] with [Reference B's element Z], producing [result]."*

Name the combination type using the taxonomy:

- **Substitution** — replace element X with element Y of the same role (most common)
- **Integration** — combine A's components with B's components into a unified system
- **Transformation** — apply A's process to B's data or domain (e.g., applying a method developed for image processing to audio data)
- **Layering** — use A as a preprocessing or postprocessing layer for B
- **Recombination** — use A's mechanism for a different purpose that B addresses

Naming the combination type forces precision and makes the analysis reviewable. If no combination type fits, the modification path is probably not articulable — which itself is evidence against obviousness.

#### Pillar 4 — Reasonable expectation of success

Would PHOSITA reasonably expect the combination to predictably work? Mere possibility of success is insufficient. If the references suggest the combination is speculative, the inventive concept is exotic relative to PHOSITA's expectations, or the result has not been demonstrated to be predictable, expectation of success is weakened.

#### Pillar 5 — Rebuttal evidence (intrinsic to the references)

Examine the references themselves for arguments against obviousness:

- **Teaching away** — does any reference discourage, contradict, or warn against the proposed combination? Strong rebuttal.
- **Unexpected results** — does the combination produce results qualitatively different from what PHOSITA would predict (synergy, emergent behavior, counterintuitive outcomes)? Strong rebuttal.
- **The whole vs. the parts** — does the combined system, taken as a whole, look qualitatively different from any individual reference? Greater-than-sum-of-parts is a recognized argument against obviousness.

#### Pillar 6 — Secondary considerations (objective indicia, Graham factors)

These are extrinsic to the references and can rebut even a persuasive obviousness case. They rarely apply at the candidate-invention stage, but when present they are decisive at prosecution. Note when present:

- **Long-felt but unsolved need** — the field has wanted this solution for years without arriving at it
- **Failure of others** — competitors tried and failed to achieve similar results
- **Commercial success** — the invention generated market success traceable to the inventive features (not marketing or unrelated factors — the nexus matters)
- **Industry praise** — peer recognition, awards, citations
- **Copying** — competitors copied rather than designing around
- **Initial skepticism** — experts initially doubted the approach
- **Licensing** — others paid for rights, signaling industry respect

**Obviousness verdict.** Combine the pillars:

- **Obvious** — at least one KSR rationale, articulable modification path, reasonable expectation of success, no significant rebuttal, no significant secondary considerations
- **Non-obvious** — no rationale survives, OR no articulable modification path, OR strong rebuttal evidence, OR strong secondary considerations
- **Arguable** — partial support on multiple pillars; document the tension explicitly

**Threat level** — combining §102 and §103 assessments:

- **High (§102)** — single reference anticipates
- **High (§103)** — clear KSR rationale, articulable modification path, no significant rebuttal
- **Medium** — KSR rationale present but rebuttal or weak modification path keeps it arguable
- **Low** — tangential; worth noting but not dispositive against any framing

### 6. Amendment iteration — engineering survival, with adversarial review

When the analysis identifies a high or medium-threat reference (anticipation under §102) or combination (obviousness under §103), the response is **not** to kill the framing immediately. The response is to iteratively engineer amendments that steer around the specific killing art, re-search the amended version to confirm it does not encounter NEW killing art, and adversarially evaluate the amendment itself for obviousness in light of the same art that killed the original.

This iteration is what turns the framework from "evaluate prior art against the claim" into "engineer the broadest defensible claim against the prior art." The amendment loop is informative even when filing is not the goal — amendment depth reveals the actual size and shape of the defensible IP.

For each high or medium-threat framing, run the loop below. The loop is an explicit cycle: Step 6a → 6b → 6c → return to 6a, up to the termination conditions in Step 6d.

#### Step 6a — Articulate a targeted amendment

The amendment must specifically steer around the killing reference or combination. Not generic narrowing — deliberate steering.

- **Identify what the killing art teaches** (element by element, including which references in the killing combination teach which elements)
- **Identify what it does NOT teach** that the invention actually has
- **Draft a narrowing amendment** that adds the missing limitation. Phrasing constraints:
  - *Specific enough* to be observable in the invention but not in the killing art
  - *General enough* to capture the inventive principle, not an incidental implementation detail
  - *Functional or structural*, not lexical — "wherein the X is performed by [mechanism]" rather than renaming the same concept
- **Optionally draft a pivoting amendment** that restructures the framing to a different dimension from Step 2 (scope / feature emphasis / aspect / perspective / temporal frame / domain transposition). The original scope is preserved but the claim character shifts, potentially escaping the killing art entirely.

#### Step 6b — Adversarial obviousness check on the amendment itself

Wear the examiner hat AGAIN. Apply the six-pillar framework from Step 5 to the *amended* framing in light of the same killing art that motivated the amendment. Is the amendment itself obvious to PHOSITA, given the references already on the table?

Common amendment failure modes (each maps to a KSR rationale):

- **Substitution failure (Rationale 3)** — the amendment swaps in a known alternative. "Wherein the optimizer uses Adam instead of SGD" is obvious if the killing art teaches optimization.
- **Known-technique failure (Rationale 4)** — the amendment applies a known technique to the same problem. "Wherein the cache uses LRU eviction" is obvious if the killing art teaches caching.
- **"Obvious to try" failure (Rationale 6)** — the amendment picks one value from a small finite set. "Wherein the threshold is 0.5" is obvious if PHOSITA would pick from {0.3, 0.5, 0.7}.
- **Design-need failure (Rationale 7)** — the amendment responds to a known design need. "Wherein the system is fault-tolerant" responds to a generic engineering need.

If the amendment is itself obvious under any pillar, **the amendment is non-viable**. Try a different amendment direction (different missing limitation, or pivot to a different dimension). If no amendment direction articulably steers around the art without being obvious itself, exit the loop and DECLARE DEAD.

#### Step 6c — Re-search the amended framing

The amendment introduces new claim language with new search terms. Run Phase 1 (claim-driven) AND Phase 2 (examiner combination hunting, if triggered) against the amended version. The amended version must survive its own search — the amendment language may surface prior art the original search missed because the original framing did not use those terms.

If the amended framing now encounters NEW killing art, return to Step 6a with the new killing art as the target. If it survives, record it in the survivability matrix at the amended scope and stop.

#### Step 6d — Termination conditions

Exit the loop at any of:

- **Survives** → record as survivor at narrowed scope; stop
- **No articulable amendment path** that steers around the killing art without being itself obvious → DECLARE DEAD
- **Addition depth > 3 cumulative limitations across all iterations** → claim is too narrow to carry inventive value (any further narrowing dissolves the inventive concept); DECLARE DEAD
- **Each candidate amendment direction dies in Step 6b** (each is itself obvious) → DECLARE DEAD

#### What the amendment portfolio reveals about the IP

Document every amendment attempt, surviving and not. The amendment depth diagnoses the IP shape:

- **Survives with no amendment** → strong, broad IP
- **Survives with one small narrowing** → strong, somewhat narrower IP
- **Survives with two or three substantive amendments** → real but narrow IP; the moat is thin
- **Dies at any termination condition** → not patentable as conceived. The failures themselves are diagnostic about where the inventive concept's center of gravity actually lies and where it shades into known territory. A clean "not patentable" answer with documented amendment attempts is often more useful than a marginal "barely defensible at extreme narrowing" answer.

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
