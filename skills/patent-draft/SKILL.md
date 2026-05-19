---
description: Generate a draft provisional patent application from IP tracker entries, invention disclosure forms, or code. Use when the user wants to draft a patent, create a provisional application, or write claims.
argument-hint: [idf-file-or-ip-tracker-entries]
allowed-tools: Read Glob Grep Bash Write Edit Agent
disable-model-invocation: true
---

# Patent Application Drafting

> **Required reading before starting:** You MUST read the **Claim Strategy Notebook**, **Patent Applications**, **Patent Figures**, **Patent-Attorney Claim Drafting Style**, and **Patent-Attorney Specification Style** sections of `${CLAUDE_PLUGIN_ROOT}/protocols.md` before drafting. The two attorney-style sections are the source of truth for both claim language and spec text: preamble patterns and forbidden lexicon for claims; voice/framing and embodiment phrasing for the spec.
>
> **Drafting dimensions apply to every claim.** When drafting any claim — independent or dependent, in the initial multi-angle portfolio or in revision — deliberately position the claim along the drafting dimensions described in the Patent-Attorney Claim Drafting Style section: aspect (structural / functional / behavioral / architectural / interactive / outcome / procedural / negative), abstraction level (concrete / mid / abstract), scope direction (push to broaden / pull to narrow), single-aspect vs multi-aspect within one claim, perspective (builder / operator / user / data), temporal framing (snapshot / sequence / lifecycle), and element-type emphasis. Verify that the portfolio collectively spans the dimensional space — multiple claims at the same position is weak coverage.
>
> **Novelty-anchored broadening — apply to every claim.** Within any single claim, identify which limitation(s) carry the novelty and pull only those tight to the precision required for distinguishability. Push every other limitation broad — broad limitations get a free ride on the novelty's distinguishability and dramatically expand infringement coverage without weakening survivability. The drafting flow: identify the novel limitation, pull it to precision, push everything else broad, verify the result reads as a broad claim with one or two precise novel limitations. Apply the per-claim application checklist to every independent claim and the per-spec application checklist to every section of spec text. The notebook entry for the invention should already exist — if it does, follow it; if not, build one as part of the drafting process.

Generate a comprehensive draft provisional patent application. This is the most formal artifact InventorLab produces — a document that could be filed with the USPTO after review by IP counsel.

## What This Does

1. Gathers source material (IDFs, IP tracker entries, code)
2. Generates a complete patent application with specification, claims, and figure plan
3. Generates the figure project file for the visual editor
4. Saves everything to `patent-applications/`

## IMPORTANT: User-Only Invocation

This skill has side effects (creates legal documents). It cannot be auto-triggered — the user must explicitly invoke `/patent-draft`.

## Process

### Step 1: Gather Source Material

Based on `$ARGUMENTS`:
- If an **IDF file path** is given (e.g., `invention-disclosures/adaptive-cache-prefetching.md`), use that as the primary source
- If **IP tracker entry numbers** are given (e.g., `1,3,5`), read those entries from `IP-TRACKER.md`
- If **nothing** is given, read `IP-TRACKER.md` and list entries. Ask: "Which entries should this application cover? You can combine related entries into one application."

Also read:
- **`CLAIM-STRATEGY-NOTEBOOK.md`** — this is critical. Your accumulated claim strategies, scope explorations, broadening/narrowing notes, prior art concerns, and dependent claim trees are here. This notebook should drive your claim drafting, not improvisation. Walk the user through your strategy before drafting.
- Relevant source code (search based on the invention descriptions)
- Any existing IDFs in `invention-disclosures/`
- Any existing patent applications in `patent-applications/` (to avoid duplication)

### Step 1b: Prior Art Search

**Before planning claims, search for prior art.** This is not optional — claims must be written to maneuver around existing prior art, not in ignorance of it.

For each invention being included in the application:
1. Run 5-10 web searches targeting the core technique, its components, and the problem it solves
2. Search for existing patents: `site:patents.google.com [key terms]`
3. Search for academic papers describing similar approaches
4. Search for alternative solutions to the same problem

For each significant piece of prior art found, document:
- What it teaches and how the invention distinguishes from it
- Threat level (High/Medium/Low) to claim scope

**Use prior art findings to shape the claims:**
- **Broadest independent claims** must be drafted to exclude what prior art teaches. If prior art teaches a general method, your independent claim needs the specific element that distinguishes your approach.
- **Distinguishing language** — use terms and phrasings that clearly separate the invention from prior art. If prior art uses "comparing embeddings," and your invention adds a threshold gate with feedback, the claim should center on the gate + feedback loop, not the comparison.
- **Dependent claims as fallback positions** — if the broadest independent claim is at risk from prior art, the dependent claims are your safety net. Each dependent claim narrows in a way that moves further from prior art.
- **Document the strategy** — update CLAIM-STRATEGY-NOTEBOOK.md with: what prior art was found, how each independent claim distinguishes from it, and which dependent claims provide fallback if the independent claim is narrowed during prosecution.

Present prior art findings to the user before proceeding:

```
Prior Art Landscape:
────────────────────
Closest prior art: [title] — teaches [what], but our invention distinguishes by [what]
Other relevant: [2-3 more with brief notes]
Claim strategy: [how claims will be framed to navigate around prior art]

Proceed with this strategy? (yes / adjust)
```

### Step 2: Plan the Application

Before writing, present a plan to the inventor:

```
Application Plan:
─────────────────
Title: [proposed title]
Core invention: [1-2 sentence summary of the broadest claim]
Claim families: [list of independent claim topics]
Figures needed: [list with types — system diagram, flowchart, etc.]
Estimated claims: [rough count]

Proceed? (yes / adjust)
```

Wait for confirmation before drafting.

### Step 3: Copy the Template

```bash
cp "${CLAUDE_PLUGIN_ROOT}/templates/PATENT-APPLICATION-TEMPLATE.md" patent-applications/<descriptive-name>.md
```

### Step 4: Draft the Application

Follow the template structure. Key principles:

**Specification (Detailed Description):**

**Narrative coherence — the specification as a sustained argument.** The specification should read as a unified intellectual argument for why the invention exists, not as a catalog of features. Key principles:

- **Central throughline.** Identify the one sentence that captures the core invention. Every section should advance this throughline. Each mechanism should be explained not just in terms of what it does, but in terms of what it contributes to the central argument. If a section doesn't connect to the throughline, either find the connection or question whether the section belongs.

- **Motivated transitions.** The reader should never wonder "why are we talking about this now?" End each section by implying the next: "Having described how the system predicts the next resource from an access pattern, we now turn to how the predicted resource is loaded into the cache." The transition carries the throughline forward and builds the reader's sense that the system is a coherent whole.

- **Progressive accumulation.** Introduce concepts early that later sections build on. If Section 2 establishes a principle, Sections 4, 8, and 11 should reference it — each time deepening the reader's understanding. By the time the reader reaches a complex claim like adaptive prediction under a shifting access pattern, they've already encountered its prerequisites across multiple contexts and the claim feels inevitable rather than surprising.

- **Recurring scenario.** Where possible, thread a single example scenario through multiple sections — a client request in Section 3 is recorded as part of an access pattern, that pattern drives a prediction in Section 4, the predicted resource is loaded into the cache in Section 8, a subsequent request hits the cache in Section 9, and the measured hit rate adjusts the prediction model in Section 11. This shows the system as a living whole, not a collection of parts.

- **"So what" at every level.** Each mechanism should answer: why does this matter to the overall system? Not just "what it does" but "what it enables that wouldn't exist without it." Connect features to consequences.

- **Anticipate the reader's questions.** When making a counter-conventional design choice, explain it before the reader wonders "why would you do it this way?" Paragraphs that begin "This represents a deliberate departure from conventional practice..." preempt skepticism by acknowledging the obvious alternative and explaining why it was rejected.

The reader — whether a patent examiner, a judge, a potential licensee, or opposing counsel — should finish the specification feeling that they understand a coherent system whose parts depend on each other, not that they've read a list of independent mechanisms.

**Broad-to-narrow funnel structure.** The specification should progressively narrow from the most abstract description to the most specific. Each section, and the application as a whole, follows this pattern:

1. **Broadest framing first** — open each section with the most general description of the concept. No implementation details, no specific technologies. Describe WHAT it does and WHY, not HOW.
2. **Intermediate detail** — introduce the mechanism and architecture. Reference the figures. Describe how components interact.
3. **Specific implementations** — narrow into concrete examples, specific technologies, exact flows. This is where "in some implementations" language appears heavily.

This funnel serves claim support: the broadest language supports the broadest independent claims, the intermediate detail supports medium-scope dependent claims, and the specifics support narrow dependent claims. If a broad claim is narrowed during prosecution, the spec already has the narrower description to support the fallback.

**"In some implementations" — use liberally.** Every feature that isn't essential to the broadest independent claim should be introduced with "In some implementations..." This language:
- Preserves flexibility — it signals that the feature is optional, not a requirement of the invention
- Supports dependent claims — each "in some implementations" paragraph can map to a dependent claim
- Prevents limiting the invention — without this language, an examiner may argue that a described feature is a required limitation

Use it for: specific algorithms, particular data structures, UI behaviors, optimization strategies, fallback mechanisms, configuration options, specific model types, deployment architectures, and any feature that enhances but isn't core to the invention. Aim for "in some implementations" appearing at least once every 2-3 paragraphs throughout the detailed description.

**Examples and use cases — include generously.** Concrete examples make abstract concepts tangible, demonstrate breadth of application, and provide evidence that the inventor understood the full scope. Include:
- **Illustrative examples** within each section: "For example, when a participant mentions [X], the system may [Y], producing [Z]." These show the mechanism in action.
- **Use case scenarios** that demonstrate the invention in different domains or contexts: "In an educational setting, the platform may... In a legal research context, the platform may..."
- **Before/after comparisons** that show what happens with and without the invention: "Without the [mechanism], a conventional system would [limitation]. With the [mechanism], the system instead [advantage]."
- **Edge cases and failure modes** that show the invention handles non-obvious scenarios: "When [unusual condition], the system [specific behavior], which prevents [problem]."

Examples serve double duty — they make the spec readable AND they provide written description support for claims. A claim limitation that's described only abstractly is weaker than one that's also illustrated with a concrete example.

**Other principles:**
- Use reference numerals consistently (FIG. N elements start at N02, increment by 2)
- The encompassing numeral (N × 100) refers to the whole diagram — don't assign it to an element
- Describe each figure's content in its corresponding section
- Include enough detail that a skilled person could implement the invention
- Don't limit the invention to specific technologies ("a database" not "PostgreSQL")
- Use "it will be appreciated that" for variations: "It will be appreciated that the number of [X], the specific [Y], and the [Z] may vary across implementations."

**Claims (prior-art-informed):**
- Start with the broadest independent claim that **clears known prior art** — the claim must include at least one element that distinguishes from the closest prior art found in Step 1b
- Add dependent claims for each specific feature — these are fallback positions if the independent claim is narrowed during prosecution
- Include system claims mirroring the method claims
- More claims is better at the provisional stage
- Each independent claim should stand alone — don't require reading other claims
- Use consistent terminology with the specification
- **Claim language should affirmatively distinguish from prior art** — if the closest prior art teaches "retrieving documents by keyword matching," and your invention uses "traversing typed edges from seed nodes selected by embedding similarity," the claim language should use the latter phrasing, not generic "retrieving" language that could be read on the prior art

**Brief Description of Figures:**
- Each figure gets a one-sentence description with the encompassing numeral
- Identify the figure type (system diagram, flowchart, conceptual framework, swimlane, data structure)

### Step 5: Generate Figures

After the spec is drafted, use the `/patent-figures` skill conventions to generate `patent-applications/figures/project.json` with all figures as a project file.

### Step 5b: Open the Figure Editor

Open the figure editor so the user can review and refine:

```bash
open "${CLAUDE_PLUGIN_ROOT}/docs/figure-editor.html"
```

Tell the user to import their project file — the editor loads every figure as a tab, ready to drag, resize, and adjust:
> *"I've opened the figure editor. Import `patent-applications/figures/project.json` to load all [N] figures, adjust anything that needs tweaking, and Export PDF when you're satisfied."*

### Step 6: Report

Tell the inventor what was created:

```
Patent Application Draft Complete
──────────────────────────────────
Specification: patent-applications/<name>.md
  - [N] detailed description sections
  - [N] claims ([N] independent, [N] dependent)
  - [N] figures planned

Figures: patent-applications/figures/project.json
  - Open docs/figure-editor.html and import to review/refine

Next steps:
  1. Review the specification — especially claims and detailed description
  2. Refine figures in the visual editor
  3. Run /patent-audit to check for consistency errors
  4. Submit to qualified IP counsel for review before filing

REMINDER: This is a draft. Do not file without review by qualified IP counsel.
```

### Step 7: Update PORTFOLIO.json

Add or update the document entry in PORTFOLIO.json:
```json
{
  "id": "P-NNN",
  "type": "patent",
  "title": "[application title]",
  "file": "patent-applications/[name].md",
  "status": "draft",
  "ip_tracker_entries": [list of covered entry numbers],
  "created_at": "[now]",
  "last_updated": "[now]",
  "last_prior_art_search": "[date from Step 1b]",
  "notes": "",
  "history": [{ "date": "[now]", "action": "created", "summary": "Initial draft with N claims covering IP entries ..." }]
}
```

Also read PORTFOLIO.json at the START of this skill (Step 1) to check for existing patent applications covering the same IP entries — warn if overlap.

## Claim Drafting Guide

### Independent Claims
- **Method claims**: "A computer-implemented method comprising: [steps]"
- **System claims**: "A system comprising: [components configured to perform steps]"
- **Medium claims**: "A non-transitory computer-readable medium storing instructions that, when executed, cause a processor to: [steps]"

### Dependent Claims
- Reference the parent: "The method of claim 1, further comprising..."
- Add one feature per dependent claim
- Cover: specific algorithms, thresholds, data structures, fallback behaviors, UI elements, timing, configurations

### Claim Language
- Use "comprising" (open-ended) not "consisting of" (closed)
- "A" introduces a new element; "the" or "said" refers back to it
- Avoid trade names, specific languages, or product names
- Present tense, active voice

## Important Framing

This is a legal document draft. Disclaimers matter:
- Include the AI-Assisted Invention Statement from the template
- The inventor is the named person, not the AI
- All content should be reviewed by qualified IP counsel before filing
- Include "This is not legal advice" where appropriate
