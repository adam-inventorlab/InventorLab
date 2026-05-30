---
name: patent-audit
description: Audit a patent application for reference numeral consistency, claim support, and figure alignment. Use when the user asks to check, verify, or audit a patent application.
argument-hint: [spec-file]
allowed-tools: Read Glob Grep
---

# Patent Application Audit

> **Required reading before starting:** You MUST read the **Patent Figures**, **Patent Applications**, **Patent-Attorney Claim Drafting Style**, and **Patent-Attorney Specification Style** sections of `${CLAUDE_PLUGIN_ROOT}/protocols.md` before auditing. The figure conventions, the patent-application structure, the claim-style standards (forbidden lexicon, antecedent basis, §112 hygiene checklist, §112(d) compliance for dependents), and the spec-style standards (voice/framing, embodiment-phrasing variety, forbidden spec phrasing including `the present invention` / *must* / *requires*) are all part of the audit.

Perform a comprehensive audit of the patent specification checking for mechanical errors that could weaken the application.

## Input

Read the patent specification at `$ARGUMENTS` (default: `PATENT-APPLICATION.md` in the project root).

## Audit Checks

### 1. Reference Numeral Consistency
- Every reference numeral `(NNN)` used in a claim must appear in the Detailed Description
- Every numeral used in the Detailed Description should follow the figure numbering convention: FIG. N elements use the N00 series (N02, N04, N06...)
- The encompassing numeral (N00) for each figure should be referenced in the spec's "Referring to FIG. N" sentence
- No numeral should refer to two different components
- Cross-references between sections should use the correct numeral (e.g., "(216, FIG. 2)" not "(116, FIG. 2)" if the component is in FIG. 2)

### 2. Claim Dependencies
- Every dependent claim must reference a parent claim that exists
- The parent claim's subject matter must be compatible with the dependent claim's subject matter
- Claims about prediction shouldn't depend on claims about cache eviction, etc.

### 3. Figure-Spec Alignment
- Every figure listed in BRIEF DESCRIPTION OF THE FIGURES should be referenced in the Detailed Description
- Every "Referring to FIG. N" in the spec should have a corresponding entry in the Brief Description
- Figure numbers should be sequential with no gaps

### 4. Claim Support
- Every independent claim's key limitations should have corresponding description in the spec
- Look for claim language that describes functionality not covered by any spec section

### 5. Numeral Collisions
- Check for numerals that may have been double-shifted (e.g., shifted +100 twice = +200)
- Check for orphaned numerals (defined in spec but never used in claims, or vice versa)

## Output Format

Report findings in categories:

```
## Audit Results

### Critical (must fix)
- [list of broken references, wrong dependencies, missing support]

### Warning (should fix)
- [list of inconsistencies, orphaned numerals]

### Info
- [statistics: total claims, total figures, total unique numerals]
```

Be thorough. Read the ENTIRE document — every section of the Detailed Description and every claim.
