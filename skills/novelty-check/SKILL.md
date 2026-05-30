---
name: novelty-check
description: User-invokable quick novelty check. Drafts claim framings, runs hybrid prior-art search across structured sources and the web, and reports results — including failures — directly to the user. Unlike the silent Novelty Gate, results are ALWAYS surfaced.
user_invocable: true
---

# /novelty-check

When the user has a hunch that something they are building or thinking about might be novel and wants a structured check, `/novelty-check` runs the same drafting + searching + analysis pipeline as the Novelty Gate, with one critical difference:

**Results are always surfaced to the user, including failures.**

The Novelty Gate (invention-radar) is silent and only surfaces survivors. That is the right behavior for ambient flow-preservation: the inventor should not be interrupted by false positives. `/novelty-check` is the opposite — the user explicitly invoked it, so flow is already broken, and they want the truthful answer either way: did this survive prior art, or didn't it?

## Usage

- `/novelty-check [description of an idea]` — check a free-text idea
- `/novelty-check [file path or code snippet]` — check what's in code
- `/novelty-check [IP Tracker entry number]` — check a tracked entry

## When to use vs. other skills

| Skill | When to use |
|---|---|
| **`/novelty-check`** | "I have a hunch this might be novel. Run the gate and tell me what you find — pass OR fail." |
| **`/invention-check`** | "Scan my codebase for novel approaches I might have missed." |
| **`/prior-art`** | "I have a tracked invention and want a deep, structured prior-art report committed to PRIOR-ART.md." |
| **`/disclosure-session`** | "I have a confirmed-novel idea and want to articulate and formalize it for IP capture." |

The Novelty Gate (background, ambient) runs silently as the user codes. `/novelty-check` is the user-invoked version of the same check — and unlike the Gate, it tells the user about everything, including failures.

## Process

### Step 1: Parse input

- **IP Tracker entry number** → read IP-TRACKER.md and use the entry's summary, novelty claims, and patent angle as the input
- **File path** → read the file and extract the apparent inventive approach (the user may need to clarify which aspect is the candidate)
- **Free-text idea** → use directly

If the input is ambiguous (e.g., a multi-file path with several arguably-inventive techniques), ask the user ONE clarifying question — what specifically they think might be novel — then proceed.

### Step 2: Draft a portfolio of claim framings

Draft 5-8 disposable claim framings of the input, varying along the same six dimensions used by `/prior-art` and the Novelty Gate:

- **Scope** — broadest principle / mid-abstraction / implementation-specific
- **Feature-emphasis** — which element carries the novelty (mechanism / sequence / feedback / integration / outcome / negative)
- **Aspect** — structural / functional / behavioral / procedural / negative
- **Perspective** — builder / operator / user / data
- **Temporal frame** — snapshot / sequence / lifecycle
- **Domain transposition** — what would this be called in an adjacent field

Fewer framings than `/prior-art` (which uses 8-12) — this is a quicker check. But cover at least the scope dimension (broadest + mid + narrowest) and at least one domain transposition into an adjacent field. The transposition is the most common source of "I missed prior art because I didn't know the vocabulary they use" failures.

### Step 3: Hybrid search — two phases

**Phase 1: claim-driven search.** Run prior-art queries via the same hybrid strategy as `/prior-art`:

- **`search_prior_art_all`** (MCP) — structured coverage of Google Patents BigQuery, arXiv, Semantic Scholar
- **`WebSearch`** — broader coverage of blog posts, open-source projects (GitHub READMEs, code, project docs), conference talks, product launches, vendor docs

Run both in parallel for each framing. Treat as complementary — the structured sources give authoritative patent/academic coverage; web search catches the broader technical literature. Merge results, deduplicate by URL or near-match title.

**Triage.** For each framing: did any single reference anticipate? If yes, that framing is dead under §102 and goes to the amendment pass (Step 5). If no, the §102 question is resolved and the real question becomes §103 obviousness.

**Phase 2: examiner-style combination hunting (selective).** For any framing where Phase 1 found no anticipation but the broadest framing is plausibly obvious under a KSR rationale, hypothesize what a *primary* reference would need to teach to plausibly support an obviousness rejection, search for it, then hypothesize and search for the gap-fillers. One targeted search per hypothesized reference, not a full sweep.

Phase 2 finds prior art that the claim-driven search missed because the inventor's vocabulary differs from the prior-art community's. This is exactly the prior art that ambushes claims during prosecution. Cross-modality combinations are legally valid — PHOSITA reads patents AND academic literature AND major technical blogs, so a primary from Google Patents combined with a secondary from arXiv is fair game.

For `/novelty-check` specifically, keep Phase 2 light: one or two hypothesized primaries per framing, one or two gap-filler searches per primary. This is a quick check, not a deep search.

### Step 4: Analyze findings — six-pillar obviousness framework (lightweight)

For each candidate combination of 2-3 references (including cross-modality combinations spanning patent and academic and web sources), evaluate using a streamlined version of the six-pillar framework from `/prior-art` Step 5:

1. **PHOSITA** — define the person of ordinary skill for this technical field briefly. What literature do they read across patents, papers, and blogs?
2. **Rationale identification** — at least one of seven KSR rationales must support the combination: TSM / combination of known elements / substitution / application of known technique / predictable use / "obvious to try" / design need.
3. **Specific modification path** — articulate the modification step by step, using the combination taxonomy (substitution / integration / transformation / layering / recombination).
4. **Reasonable expectation of success** — would PHOSITA predictably expect this to work?
5. **Rebuttal evidence (intrinsic)** — teaching away, unexpected results, the whole vs. the parts.
6. **Secondary considerations (Graham factors)** — *evaluate only if the user's input contains evidence of these (long-felt need, failure of others, commercial success, industry praise, copying, skepticism, licensing)*. Otherwise skip — these are evidentiary and rarely available at the candidate-invention stage.

Per-framing verdict: **SURVIVES**, **FAILS (anticipation)**, **FAILS (obviousness)**, or **MARGINAL (arguable)**.

The lightweight version is faster than `/prior-art`'s full analysis because it skips the documentation-rich form of the verdict — but pillars 1–5 are applied to every candidate combination. Pillar 6 is only invoked when the input provides evidence.

### Step 5: Lightweight amendment iteration

For any framing that FAILS or is MARGINAL, run the amendment loop. `/novelty-check`'s version is lighter than `/prior-art`'s — **maximum 2 iterations**, not 3 — because this is a quick check, not an exhaustive prosecution-grade analysis. The loop still includes the adversarial check on the amendment itself.

**For each failing framing, iterate up to 2 times:**

1. **Articulate a targeted amendment** that steers around the specific killing reference or combination. Two types: narrowing (add the missing limitation) and pivoting (restructure to a different dimension). Not generic narrowing — deliberate steering.
2. **Adversarial obviousness check on the amendment itself.** Wear the examiner hat: apply the six-pillar framework to the amendment+art combination. Is the amendment itself obvious under any of the seven KSR rationales? Common failure modes: substitution of known elements (Rationale 3), application of known technique (Rationale 4), "obvious to try" variation (Rationale 6), design-need response (Rationale 7).
3. **Re-search the amended framing.** Run Phase 1 against the amended version (and Phase 2 if triggered). The amendment language may surface new prior art.

**Termination conditions** (same as `/prior-art`, capped at 2 iterations for `/novelty-check`):

- **Survives** → record as survivor at narrowed scope; stop
- **No articulable amendment path** that steers around the killing art without being itself obvious → DECLARE DEAD
- **Addition depth > 3 cumulative limitations** → claim is too narrow to carry inventive value; DECLARE DEAD
- **Each candidate amendment dies in the adversarial check** (each is itself obvious) → DECLARE DEAD
- **2 iterations completed without survival** → exit the loop; report as DEAD with the amendment attempts documented

The amendment failures are themselves diagnostic — they reveal where the inventive concept's center of gravity lies and where it shades into known territory. Even when a framing dies, the documented amendment attempts tell the user something useful about the IP shape.

### Step 6: Report to the user (ALWAYS — including failures)

This is the core difference from the ambient Novelty Gate. **Surface results to the user regardless of outcome.** Use one of the following structures.

**If at least one framing SURVIVES — likely novel:**

> *"Looks novel — at least one framing survives.*
> 
> *Surviving framings: [list framings that survived, with the dimension(s) they vary on]*
> *Strongest survivor: [framing with broadest defensible scope]*
> *Close prior art I considered and ruled out: [up to 3 closest references with brief 'why it does not disqualify' notes]*
> 
> *Want me to add this to IP-Tracker for follow-up? Or run a full `/prior-art` for a deeper check?"*

**If NO framings survive — clean failure:**

> *"Not novel — this approach is already covered by prior art.*
> 
> *Killing reference(s): [list 1-3 references that anticipate or render obvious; include title, source, date, URL]*
> *Per-framing failure: [briefly, for each framing, the killing reference and why]*
> *Closest amendments I considered: [up to 2 amendments and why each either fails or narrows past the inventive concept]*
> 
> *The closest path to defensibility would be [name the most promising amendment if any; otherwise 'no obvious path']. Want me to track this as 'evaluated, not pursuable' so the same idea does not get re-evaluated later?"*

**If results are MIXED — some survive, some fail:**

> *"Partially novel — depends on how you frame it.*
> 
> *What survives: [list surviving framings with the dimension(s) they vary on]*
> *What fails: [list failing framings with the killing reference]*
> *The defensible scope is [what's actually claimable, based on the survivors]*
> *Strongest amendment to recover broader scope: [the most promising amendment from the pass, if any]*
> 
> *Want me to add the surviving framings to IP-Tracker?"*

In all three cases, references are cited with title, source, date, and URL so the user can verify directly. Do not hide prior art or soften failures — the whole point of this skill is that the user gets the truthful answer.

### Step 7: Optional follow-up actions

Based on the verdict, offer next steps:

- **Survived** → suggest `/disclosure-session` to articulate and formalize, or simply add to IP-Tracker for follow-up
- **Failed** → optionally track as "evaluated, not pursuable" so the same idea is not re-evaluated. No PRIOR-ART.md update unless the user explicitly tracks the invention as a Tracker entry
- **Mixed** → offer to (a) add the surviving framings to IP-Tracker, or (b) run `/prior-art` for a deeper iteration that might find a stronger framing the quick check missed

The skill does NOT automatically write to PRIOR-ART.md (that is `/prior-art`'s job — heavy, structured, persistent). It does NOT automatically write to IP-TRACKER.md (that is the user's call). It produces a conversational result and lets the user decide what is worth tracking.

## What this skill does NOT do

- **Not a replacement for `/prior-art`.** `/prior-art` is the deep, structured search that updates working documents and runs amendment iteration to stabilization. `/novelty-check` is the quick "did this survive?" question with one amendment per failure.
- **No automatic PRIOR-ART.md update.** Findings stay conversational unless the user explicitly tracks the invention.
- **No code scanning.** That is `/invention-check`'s job. `/novelty-check` evaluates a single described idea or tracked entry, not a codebase.

## The intellectual firewall still applies

Prior art surfaced during `/novelty-check` is for assessment only. **Teachings from prior art are NEVER incorporated into the user's invention.** If the user's idea fails the gate, the skill reports that — it does not suggest "but here is how to combine these references to make something different." That would cross from assistance into idea generation, which is prohibited under the USPTO November 2025 Revised Inventorship Guidance and would compromise the user's inventorship.

What the skill MAY do is suggest amendments that distinguish the user's *existing* conception over the prior art (e.g., "the limitation [X] you already implemented would distinguish over reference [Y]"). What it MAY NOT do is propose new inventive elements the user has not already conceived.

If the user asks "how could I make this novel?" — that is a request for idea generation, not assistance. Decline and ask the user what direction *they* are considering taking the idea, then help them develop it.

## Sensitivity level

`/novelty-check` runs the same six-dimensional drafting + hybrid search + amendment pass regardless of the sensitivity level configured by `/inventorlab-setup`. The sensitivity level affects ambient Novelty Gate behavior (how readily the radar runs autonomously) — but `/novelty-check` is explicitly user-invoked, so the user wants the full check every time.
