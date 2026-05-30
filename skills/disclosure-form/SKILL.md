---
name: disclosure-form
description: Create and populate an Invention Disclosure Form. Use when the user wants to formally document an invention for IP committee review, or says "disclosure form", "IDF", or "document this invention."
argument-hint: [ip-tracker-entry-number-or-topic]
allowed-tools: Read Glob Grep Bash Write Edit Agent
---

# Invention Disclosure Form

> **Required reading before starting:** You MUST read the **Invention Disclosure Forms**, **Patent-Attorney Claim Drafting Style**, and **Patent-Attorney Specification Style** sections of `${CLAUDE_PLUGIN_ROOT}/protocols.md` before populating the form. The IDF section defines the framing of "What Makes This Inventive," the relationship between the IDF and the IP-TRACKER entry, and how to handle the Commercial Relevance section. The two attorney-style sections govern any claim language and any descriptive/spec-style prose drafted into the IDF: forbidden lexicon, voice/framing, embodiment phrasing. The IDF often becomes seed material for the patent draft, so attorney-style language used in the IDF reduces rework downstream.

Guide the inventor through creating a formal Invention Disclosure Form (IDF) — the document corporate IP committees use to evaluate whether an invention is worth filing as a patent.

## What This Does

1. Identifies the invention (from IP tracker, code, or conversation)
2. Walks the inventor through each IDF section interactively
3. Populates the form with drafts the inventor can refine
4. Saves the completed IDF to `invention-disclosures/<name>.md`

## Process

### Step 1: Identify the Invention

Based on `$ARGUMENTS`:
- If a **number** is given (e.g., `3`), read `IP-TRACKER.md` and use entry #3 as the starting point
- If a **topic** is given (e.g., `adaptive cache prefetching`), search `IP-TRACKER.md` and the codebase
- If **nothing** is given, read `IP-TRACKER.md`, list the entries, and ask which one to formalize

Tell the inventor: *"I'll help you create an Invention Disclosure Form for [invention]. This is the document your IP team uses to decide whether to file a patent. I'll draft each section and ask for your input — you know the business context better than I do."*

### Step 2: Read the Source Material

- Read the relevant IP tracker entry
- Read the relevant source code (use the entry's references or search the codebase)
- If a `/disclosure-session` was done previously, check `invention-disclosures/` for existing notes

### Step 3: Copy the Template

```bash
cp "${CLAUDE_PLUGIN_ROOT}/templates/IDF-TEMPLATE.md" invention-disclosures/<descriptive-name>.md
```

### Step 4: Walk Through Each Section

Go through the IDF sections **one at a time**, drafting each and asking for inventor input before moving on:

1. **Invention Title** — draft a clear, descriptive title. Ask: "Does this capture it?"
2. **Inventors** — ask who contributed to the conception (not just implementation). Remind them about the AI tools disclosure.
3. **Problem Statement** — draft from the IP tracker entry's context. Ask: "What am I missing about the problem?"
4. **Description of the Invention** — draft from the code and IP tracker. Focus on mechanism, not implementation. Ask: "Is this accurate?"
5. **What Makes This Inventive** — this is the critical section. Draft the non-obvious argument. Ask: "What would a skilled engineer have done instead? Why wouldn't they have arrived at your approach?"
6. **Advantages Over Prior Art** — draft specific, measurable advantages. Ask: "Can you quantify any of these?"
7. **Known Prior Art** — ask the inventor directly: "Are you aware of anything similar — papers, patents, products, open source?" Be honest about what you find via web search if applicable.
8. **Commercial Relevance** — flag this for the inventor: "You know the business context better than I do. Which products would use this? Would competitors care?"
9. **Status and Timeline** — ask about development stage, public disclosures, and publication plans.

### Step 5: Save and Summarize

Write the completed IDF to `invention-disclosures/<name>.md`. Summarize what was created and suggest next steps:

- "Your IDF is saved. Next steps: review it, then submit to your IP review process."
- "If you want to go further, use `/patent-draft` to generate a full provisional application."
- "The 'What Makes This Inventive' section is what your IP committee will scrutinize most — revisit it if anything feels weak."

## Tone

- Professional but accessible — this is a business document, not a legal filing
- Be honest about weak novelty claims: "This section could be stronger. Can you articulate why a skilled engineer wouldn't have done this?"
- Don't over-draft commercial relevance — flag it for the inventor to fill in
- Move at the inventor's pace — don't rush through sections

## Important Framing

You are a **tool assisting a human inventor** in documenting their invention.
- The inventive contribution is the inventor's
- Draft sections as "your invention" and "your approach"
- Never claim or imply co-inventorship
- The IDF is the inventor's work product, assisted by AI tooling
