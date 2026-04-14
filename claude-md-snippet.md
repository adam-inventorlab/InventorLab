# InventorLab — CLAUDE.md Snippet

> Paste the section below into your project's `CLAUDE.md` file.

---

## IP Tracker (`IP-TRACKER.md`)

A living document at the project root that tracks novel methodologies, systems, and techniques that may warrant academic publication or patent consideration. **Proactively update this document** when you notice that work being done involves a novel approach — particularly systems or methods that solve problems in ways not widely documented elsewhere. You don't need to ask permission to add entries; just add them and mention it. If you're unsure whether something qualifies, err on the side of adding it — it's easier to remove than to rediscover later.

When adding an entry, include:
- **Summary**: What it does and why it exists
- **What makes it novel**: How it differs from standard approaches — be specific about what's unusual
- **Paper angle**: How this could be framed as an academic contribution, what the key finding or methodology would be
- **Patent angle**: A method claim framing — "A computer-implemented method comprising..." — describing the core inventive step

### What to look for

**Active triggers — check for these as you work:**

- **Invention around failure.** When a standard approach fails and you build a workaround, the workaround is often the most patentable part. A prompting strategy that doesn't work, a retrieval method that misses edge cases, a generation technique that produces redundant output — the solution you build to fix it is frequently novel. Document both the failure mode and the solution.
- **Non-obvious combinations.** When you combine two existing systems or techniques and the combination produces a result that neither could achieve alone, that's a strong candidate. The combination itself — not the individual parts — is the invention.
- **Structural solutions to AI limitations.** When you move a decision out of a language model and into a deterministic system because the model can't reliably handle it (diversity enforcement, deduplication, validation gates), that pattern of "model proposes, code verifies" is often novel in the specific application domain.
- **Inverted patterns.** When you flip a standard interaction pattern (AI initiates instead of responds, the system prevents creation instead of enabling it, retrieval informs generation constraints instead of content), the inversion is the novelty.
- **The thing you built because nothing existed.** When you search for a library, framework, or technique to solve a problem and can't find one — so you build it — that's a strong signal. The absence of prior solutions is itself evidence of novelty.

**Passive triggers — watch for these signals during conversation:**

- **User surprise or excitement.** If the user says "that's clever," "I haven't seen that before," "how does that work?" or expresses unexpected enthusiasm about an approach, consider whether it warrants an entry.
- **User asks "is this novel?"** Always add an entry when the user explicitly raises the question — they're closer to the domain than you are and their instinct matters.
- **You explain something and it takes more than a sentence.** If describing *why* an approach works requires explaining a non-obvious mechanism, the mechanism is likely novel.
- **Cross-domain application.** When a technique built for one purpose turns out to apply to a different domain (e.g., image distinctness checking applied to exploration objectives), the cross-domain application is its own IP entry.

**Periodic self-audit.** At natural stopping points (feature complete, major refactor done, bug fix that required a non-obvious approach), briefly review what was just built and ask: did anything here solve a problem in an unusual way? If so, add or update an entry.

**Cross-reference before adding.** Before creating a new entry, check if it extends or strengthens an existing one. If a new feature deepens a previously identified invention, update the existing entry. If it's a new application of an existing technique, add it as a sub-entry or note within the original.

### What NOT to add

- Standard patterns, well-known algorithms, or common library usage
- Features that are novel to this project but not novel to the field
- Minor optimizations or routine engineering decisions
- Anything where the "novelty" is just using an existing tool in the way it was designed to be used

### AI-Assisted Invention — Important Framing

When identifying IP and drafting claims, you are functioning as a **tool assisting a human inventor**, not as an inventor yourself. This distinction matters legally — patent offices require that inventors be natural persons, and AI-assisted invention is treated differently from AI-generated invention.

Specific guidelines:
- When you identify a novel approach, frame it as something the **user built** or **directed**, not something you invented. "The approach you've taken here is novel because..." not "I've invented a new method for..."
- When drafting claims, the inventive contribution is the user's. You are helping articulate and formalize what the user conceived, directed, and evaluated.
- If you independently generate a novel idea during development (not directed by the user), flag it explicitly: "This is a suggestion — if you adopt this approach and consider it inventive, it would be your decision to pursue it as IP." The user's evaluation and adoption is what makes them the inventor.
- Never claim or imply that you are an inventor or co-inventor. You are an assistive tool — like a CAD program that helps an engineer express a design they conceived.
- The patent applications generated from this workflow are the user's work product, assisted by AI tooling.

## Invention Disclosure Forms (`invention-disclosures/`)

For inventors working within a company, create an Invention Disclosure Form (IDF) instead of (or before) a patent application. The IDF is what corporate IP committees use to evaluate whether an invention is worth filing.

When the user asks for an IDF, copy the template:

```
cp docs/inventorlab/IDF-TEMPLATE.md invention-disclosures/<descriptive-name>.md
```

Pull from the IP Tracker entry's Summary, novelty analysis, and patent angle as starting material. The most important section is "What Makes This Inventive" — frame it as what a skilled person would NOT have arrived at. Be honest about known prior art. Flag the Commercial Relevance section for the inventor to refine — you can draft a starting point but the inventor knows the business context.

## Patent Applications (`patent-applications/`)

When an IP Tracker entry (or cluster of related entries) is mature enough for a formal patent application, create a new file by copying the template:

```
cp docs/inventorlab/PATENT-APPLICATION-TEMPLATE.md patent-applications/<descriptive-name>.md
```

Name the file after the invention (e.g., `embedding-gated-diversity.md`, `reflexive-knowledge-platform.md`). Each application is a standalone provisional patent document. The template includes a claim-drafting guide in comments — follow those principles when writing claims.

When creating an application:
- Reference the IP-TRACKER.md entry numbers being formalized
- Start with the broadest independent claims, then add dependent claims for specificity
- Cover the core invention from multiple angles: method claims, system claims, alternate framings
- Include detailed figure descriptions with reference numerals (draftsperson should be able to reproduce them)
- Write the Detailed Description using reference numerals from the figures
- More claims is better at the provisional stage — you can narrow later but can't add unsupported claims

## Patent Figures (`patent-applications/figures/`)

When drafting a patent application, generate a JSON figure spec for each figure. The user refines the layout in the visual figure editor (`figure-editor.html`) and exports the final SVG.

For each figure, write a JSON spec to `patent-applications/figures/<fig-name>.json`:
```json
{
  "title": "FIG. 1 — System Architecture",
  "width": 900,
  "height": 700,
  "elements": [
    { "id": "100", "label": "Platform", "position": [450, 80], "width": 160, "height": 50 },
    { "id": "102", "label": "Database", "position": [450, 200], "width": 160, "height": 50 }
  ],
  "arrows": [
    { "from": "100", "to": "102", "label": "data flow" },
    { "from": "102", "to": "100", "style": "dashed", "fromAnchor": "right", "toAnchor": "right" }
  ],
  "annotations": [
    { "text": "annotation text", "position": [450, 500] }
  ],
  "lines": [
    { "points": [[100, 400], [800, 400]], "style": "dashed" }
  ]
}
```

The user workflow:
1. Open `figure-editor.html`, click **Import JSON**, select the spec
2. Drag boxes to adjust layout, resize by dragging edges
3. Arrows auto-route orthogonally around boxes — adjust anchor points (top/bottom/left/right) in the properties panel if needed
4. Add waypoints to arrows for manual routing (click empty space while drawing)
5. Export the final **SVG** for filing, or export updated **JSON** to save changes

JSON spec reference:
- `elements[].id` — the reference numeral (e.g., "100"), displayed below the label
- `arrows[].from` / `.to` — reference numeral IDs of the source and target boxes
- `arrows[].fromAnchor` / `.toAnchor` — override which side of the box the arrow connects to ("top", "bottom", "left", "right"); omit for auto-detection
- `arrows[].waypoints` — array of `[x, y]` points for manual routing; omit for auto-routing
- `arrows[].style` — "solid" (default) or "dashed"
- `arrows[].bidirectional` — true for double-headed arrows
- `lines[].points` — array of `[x, y]` points for multi-segment lines
- `elements[].style` — "solid" (default) or "dashed" for dashed-border boxes
