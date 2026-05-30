---
name: invention-check
description: Review code for novel approaches that may warrant IP tracking. Supports full codebase audit or recent-changes-only mode. Use when finishing a feature, completing a refactor, or when the user asks about novelty or IP.
argument-hint: [recent|full|path/to/dir]
allowed-tools: Read Glob Grep Bash Edit Agent
---

# Invention Discovery Check

Review code for novel methodologies, systems, and techniques that may warrant entries in `IP-TRACKER.md`.

## Modes

Based on `$ARGUMENTS`:
- **No argument or `recent`** — review recent git changes (`HEAD~5..HEAD`)
- **`full`** — comprehensive audit of the entire codebase
- **A path (e.g., `lib/cache/`)** — audit a specific directory

## Process

### Recent mode
1. Run `git diff HEAD~5..HEAD --stat` to identify changed files
2. Read the modified files
3. Check existing `IP-TRACKER.md`
4. Apply invention triggers
5. Update or add entries

### Full codebase mode
1. Read `IP-TRACKER.md` to understand what's already tracked
2. Map the codebase structure — list the source tree and read key entry-point files to identify the major subsystems
3. Identify the major subsystems of the codebase and dispatch one Agent per subsystem to explore it in parallel. For each subsystem, the Agent should read the relevant source files, apply the invention triggers below, and report any novel approaches it finds.
4. Collect findings from all subsystems
5. Cross-reference against existing IP tracker entries
6. Add new entries, update existing ones that have deepened
7. Report summary

### Path mode
1. Read all source files in the specified directory
2. Check existing `IP-TRACKER.md`
3. Apply invention triggers to the code
4. Update or add entries

## Invention Triggers

### Active triggers (check for these in the code)

- **Invention around failure.** A standard approach failed and a workaround was built. The workaround is often the most patentable part. Document both the failure mode and the solution.
- **Non-obvious combinations.** Two existing systems or techniques were combined and the combination produces a result that neither could achieve alone. The combination itself is the invention.
- **Structural solutions to AI limitations.** A decision was moved out of a language model and into a deterministic system because the model can't reliably handle it (redundancy filtering, deduplication, validation gates). The "model proposes, code verifies" pattern is often novel.
- **Inverted patterns.** A standard interaction pattern was flipped (AI initiates instead of responds, system prevents creation instead of enabling it, retrieval informs generation constraints instead of content).
- **The thing built because nothing existed.** A library, framework, or technique was searched for, couldn't be found, and was built from scratch. The absence of prior solutions is evidence of novelty.
- **Reflexive/self-referential systems.** A system that constructs a resource it later consumes as input — particularly where the system's output quality improves as the resource grows. Look for loops where construction and consumption share the same data structure.
- **Deterministic gates on generative output.** Similarity checks, redundancy filters, validation gates, or other deterministic mechanisms that constrain what a generative model is allowed to produce.
- **Proactive AI behavior.** Systems where the AI initiates actions without human prompting — acting on a schedule, surfacing suggestions the user didn't ask for, or starting work in response to detected conditions.

### Passive triggers (check for these signals)

- **Cross-domain application.** A technique built for one purpose applies to a different domain.
- **Non-obvious mechanism.** If describing why an approach works requires explaining a non-obvious mechanism, the mechanism is likely novel.
- **Absence of prior art.** Code that implements something you'd expect to find as a library but couldn't — the custom implementation signals novelty.
- **Complex interaction between simple components.** Individual components are straightforward, but their interaction produces emergent behavior that isn't obvious from any single component.

## IP Tracker Entry Format

When adding an entry, include:
- **Summary**: What it does and why it exists
- **What makes it novel**: How it differs from standard approaches — be specific
- **Paper angle**: How this could be framed as an academic contribution
- **Patent angle**: A method claim framing — "A computer-implemented method comprising..." — describing the core inventive step

## Important Framing

You are functioning as a **tool assisting a human inventor**, not as an inventor yourself.
- Frame novel approaches as something the **user built** or **directed**
- The inventive contribution is the user's
- Never claim or imply that you are an inventor or co-inventor

## Cross-reference

Before creating a new entry, check if it extends or strengthens an existing one. If a new feature deepens a previously identified invention, update the existing entry rather than creating a duplicate.
