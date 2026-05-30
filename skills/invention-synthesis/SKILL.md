---
name: invention-synthesis
description: Review the Idea Buffer (IDEAS.md) and recent project activity for inventions that have been forming across multiple prompts or sessions but haven't crystallized into a tracked candidate yet. Finds threads that span time, synthesizes what they're converging on, and surfaces them for Novelty Gate evaluation. Use when an invention has been developing in conversation rather than in code.
user_invocable: true
---

# /invention-synthesis

Multi-prompt invention discovery. The Invention Radar's primary discovery loop is artifact-driven — it watches code, files, and architectural changes. That works for inventions that show up in code, but some inventions form **conversationally** first: a system architecture discussed across several prompts, a protocol that gets refined over multiple sessions, a research methodology that surfaces in dialog before any implementation exists. Those threads can vanish if no one is watching for them across time.

This skill is the cross-prompt collector. It reads the **Idea Buffer** (`IDEAS.md` — the lab-notebook-style proto-tracker the Radar writes to when conversational signals surface), looks for entries that have been touched repeatedly or that connect to each other, synthesizes what each thread is converging on, and surfaces the strongest candidates for the Novelty Gate.

## When to use

- *"I've been talking about [topic] in a few different prompts — am I onto something?"*
- After a long back-and-forth that touched several related concepts but didn't produce code
- Periodically (end of a session, end of a week, end of a sprint) to clean up the buffer
- When you suspect a multi-part invention has been forming in conversation but hasn't been captured yet
- After a major design discussion that didn't get implemented immediately

## Process

### Step 1: Gather inputs

Load all three context sources:

1. **`IDEAS.md`** — every entry in the Idea Buffer. Read the full file. Parse entries by date heading (`## YYYY-MM-DD · <title>`), capture tags and free-text body for each.
2. **`IP-TRACKER.md`** — every tracked invention. The synthesis pass should never re-promote something that's already there; cross-check by topic + name + tag overlap.
3. **Recent project signals** — `git log --oneline -30` for recent commits, and any session-level conversation context the host agent (Claude Code / Codex) currently holds. If the host agent has a notion of "previous turns in this session," include them; this captures threads that just formed in the active conversation.

### Step 2: Identify candidate threads

Cluster the Idea Buffer entries by topic. A **thread** is any of:

- Two or more entries that share one or more tags
- Entries whose free-text bodies reference the same concept, mechanism, or named idea (even if tagged differently)
- An entry that appears multiple times under slightly different framings (sign that the user keeps coming back to it)
- A single entry that has been added to or annotated multiple times since its creation
- An entry whose subject matter appears in recent git commits (sign that the conversational idea has started becoming code)

Don't over-cluster. The goal is to find *actual* threads, not synthetic ones. If two entries share a tag but are about substantively different things, they're not a thread.

For each candidate thread, name it (concisely — 4–7 words, hyphenated noun phrase) and identify the member entries by their date headings.

### Step 3: Synthesize each thread

For each thread, draft a **synthesis** — a 2–3 sentence statement of what the thread is converging on. The synthesis should:

- Be in the user's voice / use the user's vocabulary (pulled from the entry bodies)
- State the invention concretely enough that a Novelty Gate analysis could run on it
- Identify what's distinctive about the thread relative to standard practice
- Note what's still unclear or unresolved

Apply the Invention Boundary discipline here strictly. The synthesis should describe what *the user has been developing across prompts*, not introduce new inventive content of your own. If you find yourself wanting to add an angle the user hasn't expressed, stop — that's invention origination, not synthesis.

### Step 4: Decide which to send to the Gate

For each synthesized thread, judge:

- **Mature enough to evaluate?** — A thread that's still loose ("user mentioned X twice but the framing keeps shifting") is not yet a Novelty Gate candidate. Leave it in the buffer for further accretion.
- **Crystallized enough to evaluate?** — A thread that has a stable description across multiple entries, or one that's started showing up in code, is ready for the Gate.
- **Already covered?** — Cross-check against IP-TRACKER.md. If the thread is a refinement of an existing entry, *update* that entry rather than creating a new tracker candidate.

Report your judgment for each thread to the user before running anything destructive. Surface the synthesis and the recommendation; let the user confirm.

### Step 5: Run the Gate on confirmed candidates

For each thread the user wants evaluated, invoke the Novelty Gate (the same gate `/invention-check` and `/novelty-check` use):

1. Draft a portfolio of candidate claim framings along the six dimensions
2. Run the hybrid two-phase prior-art search (claim-driven + examiner combination hunting)
3. Apply the six-pillar obviousness analysis grounded in *Graham v. John Deere* and *KSR v. Teleflex*
4. Run the bidirectional amendment loop on each framing

Report the survivability matrix back to the user. Surface failures explicitly (the user already invested in this thread, so a negative result is important information). Apply the user-probing step from the Radar (Step 5b) on thin rejections — sometimes the user knows of distinguishing context the search didn't surface.

### Step 6: Promote, annotate, or retire

For each evaluated thread:

- **Survives the Gate** → promote to IP-TRACKER.md as a new entry. Include a "Provenance" note pointing back to the IDEAS.md entries it was synthesized from (by date heading). The buffer entries stay in IDEAS.md as a record of formation; do not delete them.
- **Fails the Gate** → annotate the IDEAS.md entries with the failure reason and date. Leave them in the buffer — a failed Gate today can succeed later if the prior-art landscape shifts or the invention is reframed. Do not delete.
- **Not yet mature** → leave alone. Note in the buffer that the thread was reviewed and is still developing.

### Step 7: Report

End with a brief summary to the user:

```
Synthesis complete.
  3 threads identified.
  2 evaluated, 1 deferred (still maturing).
  1 promoted to IP-TRACKER.md (entry #N).
  1 returned to buffer with failure note.
```

## Stance and discipline

- **Conservative on clustering.** A thread of two ideas that *might* be related is not a thread. Wait for clearer signal.
- **The Invention Boundary applies in synthesis form too.** Your job is to articulate what the user has been developing, not to invent the connecting tissue.
- **Idempotent.** Running `/invention-synthesis` twice in a row should produce no changes the second time. The skill should be safe to re-run.
- **Surface, don't auto-promote.** The user has final say on what graduates from IDEAS.md to IP-TRACKER.md.
- **Failure is informative.** A thread that fails the Gate is not a deletion-worthy event — it's a recorded learning. The buffer is permanent unless the user explicitly retires entries.

## How this fits with the rest of the suite

- **Invention Radar** writes to IDEAS.md when conversational signals surface (the proto-tracker).
- **/invention-check** scans code; finds artifact-anchored inventions.
- **/novelty-check** evaluates a specific hunch.
- **/invention-synthesis** (this skill) connects the dots across the buffer + activity, finding multi-prompt threads the artifact-driven discovery would miss.
- **/disclosure-session** + **/patent-draft** operate on whatever survives — they don't care which path produced the IP-TRACKER entry.

Multi-prompt inventions are the gap the artifact-first design left open. This skill is the closing element.
