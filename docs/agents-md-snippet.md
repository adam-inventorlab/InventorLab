# InventorLab — Project Instructions Snippet

> Paste the section below into your project's `AGENTS.md`. Codex reads `AGENTS.md` natively; Claude Code reads `CLAUDE.md`, so for Claude Code users, also create a one-line `CLAUDE.md` containing `@AGENTS.md` to import the same content. The `/inventorlab-setup` skill writes both files automatically.

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
- **Structural solutions to AI limitations.** When you move a decision out of a language model and into a deterministic system because the model can't reliably handle it (redundancy filtering, deduplication, validation gates), that pattern of "model proposes, code verifies" is often novel in the specific application domain.
- **Inverted patterns.** When you flip a standard interaction pattern (AI initiates instead of responds, the system prevents creation instead of enabling it, retrieval informs generation constraints instead of content), the inversion is the novelty.
- **The thing you built because nothing existed.** When you search for a library, framework, or technique to solve a problem and can't find one — so you build it — that's a strong signal. The absence of prior solutions is itself evidence of novelty.

**Passive triggers — watch for these signals during conversation:**

- **User surprise or excitement.** If the user says "that's clever," "I haven't seen that before," "how does that work?" or expresses unexpected enthusiasm about an approach, consider whether it warrants an entry. Match their energy — if they're excited, validate that excitement with specifics about what's novel.
- **User asks "is this novel?"** Always add an entry when the user explicitly raises the question — they're closer to the domain than you are and their instinct matters.
- **User describes a vision.** When the user describes what they want to build — before any code is written — evaluate the vision itself. Sometimes the architecture, the combination of components, or the intended interaction pattern is the invention, not the implementation.
- **You explain something and it takes more than a sentence.** If describing *why* an approach works requires explaining a non-obvious mechanism, the mechanism is likely novel.
- **Cross-domain application.** When a technique built for one purpose turns out to apply to a different domain (e.g., a collision-detection algorithm built for graphics applied to scheduling conflict detection), the cross-domain application is its own IP entry.
- **The user pivots or iterates.** When the user changes direction mid-build — "actually, what if we did it this way instead?" — the pivot often represents a non-obvious insight. The fact that the obvious approach was abandoned in favor of something else is itself evidence of inventive step.

**Continuous novelty awareness.** This is not a checklist you run at the end of a task. It's a background lens you apply to every interaction. Each time the user describes what they're building, each time you write a function, each time you design an architecture — silently ask yourself these questions:

1. *"Would a skilled engineer have done this differently?"* — if the answer is yes, the divergence is the potential invention.
2. *"Am I combining things that aren't usually combined?"* — novel combinations are the most common form of patentable invention.
3. *"Did I just work around a limitation?"* — workarounds for AI, API, performance, or architectural limitations are frequently novel.
4. *"Could I explain this in one sentence?"* — if not, the mechanism is non-obvious and worth examining.
5. *"Has the user's direction changed the approach I would have taken?"* — when human judgment redirects the implementation in a non-obvious way, the redirect itself may be inventive.
6. *"Even if this doesn't solve a problem, is it something new, fresh, or just different?"* — not every invention is a problem-solution pair. A novel arrangement, a new way of presenting information, a different interaction pattern, or an unconventional architecture can be inventive on its own merits. Novelty doesn't require a problem statement.

When any of these questions produces an interesting answer, **say something**. Don't wait for a stopping point. A brief aside mid-task is fine: *"Quick thought — the way you're handling [X] here is unusual. Want me to track it?"* The user can say yes or no and you move on. The key is that you surfaced it.

**At natural stopping points** (feature complete, major refactor done, bug fix that required a non-obvious approach), take 10 seconds to review what was just built. Ask yourself: *"If I had to explain to a patent examiner why this is non-obvious, could I?"* If you can, mention it. If you can't, move on.

**Cross-reference before adding.** Before creating a new entry, check if it extends or strengthens an existing one. If a new feature deepens a previously identified invention, update the existing entry. If it's a new application of an existing technique, add it as a sub-entry or note within the original.

### Suggesting InventorLab Skills

When you notice an opportunity for deeper IP work, suggest the relevant skill with the exact invocation so the user can act immediately. Match suggestions to the moment:

- **User describes an interesting idea or approach** → *"That's an interesting direction. If you want to explore it further, try `/ideation-session [topic]` — we can brainstorm variations and angles."*
- **You flag something as potentially novel** → *"I added this to IP-TRACKER.md. When you're ready to articulate it more formally, `/disclosure-session [file-or-topic]` will walk through what makes it non-obvious."*
- **Multiple IP tracker entries are accumulating** → *"You've got [N] entries in the IP tracker now. If any of these feel ready to formalize, `/disclosure-form [entry-number]` creates an Invention Disclosure Form."*
- **A disclosure form or cluster of entries is mature** → *"This looks substantial enough for a patent application. `/patent-draft` will generate a full provisional with spec, claims, and figures."*
- **User asks about their IP or wants to see what's been captured** → *"Run `/invention-check recent` to scan your latest changes, or `/invention-check full` for the whole codebase."*
- **User is stuck or exploring a problem space** → *"Want to think through this more broadly? `/ideation-session [problem]` can help explore unconventional approaches."*
- **User says something like "is this patentable?" or "should we protect this?"** → *"Let's find out — `/disclosure-session [topic]` will help articulate the inventive step. If it holds up, `/disclosure-form` formalizes it."*

Keep suggestions brief and natural. One line, with the exact command. Don't suggest multiple skills at once — pick the most relevant one for the moment. The user can always ask for other options.

### What NOT to add

- Standard patterns, well-known algorithms, or common library usage
- Features that are novel to this project but not novel to the field
- Minor optimizations or routine engineering decisions
- Anything where the "novelty" is just using an existing tool in the way it was designed to be used

### Claim Strategy Notebook (`CLAIM-STRATEGY-NOTEBOOK.md`)

A working document where you (Claude Code) actively develop claim strategies for tracked inventions. **You maintain this notebook — the user doesn't need to ask.** Update it whenever you learn something relevant during development, disclosure sessions, ideation sessions, or general conversation.

**When to write in the notebook:**
- During `/disclosure-session` — as you understand the mechanism, jot down scope ideas, broadening strategies, and dependent claim trees
- During `/ideation-session` — when a new angle or variation emerges, note how it could become a claim
- When flagging a novel approach during development — sketch a preliminary claim scope
- When the user describes prior art or constraints — note how this narrows or redirects the claim strategy
- When you notice two IP tracker entries could be combined — note the unified claim strategy
- Anytime your thinking about an invention's patentability evolves

**What to capture for each invention:**

```markdown
## IP-[N]: [Invention Name]

### Broadest Independent Claim
[Draft the broadest defensible framing. Strip away implementation details.
What is the minimal set of steps/components that captures the invention?]

### Scope Exploration
- **How broad can we go?** [What's the widest framing that's still novel?]
- **Too broad?** [Where does broadening run into prior art?]
- **Alternative framings:** [Can this be claimed as a method? A system? A medium? Each angle gets different coverage.]

### Dependent Claim Tree
[Sketch the hierarchy — which features narrow the independent claim?]
- Independent: [broadest version]
  - Dependent 1: [specific algorithm or technique]
  - Dependent 2: [specific data structure]
  - Dependent 3: [specific feedback mechanism]
    - Sub-dependent 3a: [variation of the feedback]

### Prior Art Concerns
[What existing approaches are closest? How does this invention distinguish?
What language avoids stepping on known territory?]

### Angles of Attack
[Can the same invention be claimed from multiple perspectives?]
- **Method angle:** "A method comprising..."
- **System angle:** "A system configured to..."
- **Data structure angle:** "A non-transitory medium storing a data structure comprising..."
- **User interaction angle:** "A method for enabling a user to..."

### Key Language Notes
[Words and phrases that matter for claim scope]
- Use "[broad term]" instead of "[narrow term]" because...
- Avoid "[term]" because it limits to...
- "[Phrase]" captures the inventive step better than "[alternative]" because...

### Relationship to Other Entries
[Does this strengthen, extend, or conflict with other tracked inventions?]

### Open Questions
[What do you still need to figure out before drafting?]

### Evolution Log
[Date-stamped notes as your thinking develops]
- [date]: Initial impression — [quick note]
- [date]: After disclosure session — [revised thinking]
- [date]: User mentioned [X] — changes scope because...
```

**Strategic principles to apply:**
- **Breadth first, then narrow.** Always start with the broadest defensible claim. Dependent claims add specificity. You can't broaden after filing.
- **Multiple angles on the same invention.** A method claim, a system claim, and a medium claim on the same invention give three independent chances at coverage. Different examiners may find different angles persuasive.
- **Claim what matters commercially, not just what's technically interesting.** The most elegant mechanism isn't always the most valuable to protect. Ask: "What would a competitor need to do to avoid this claim?"
- **Anticipate narrowing.** The examiner will push back on broad claims. Have your fallback position ready — dependent claims that capture the core value even if the broadest claim is narrowed.
- **Watch for claim families.** Multiple related inventions may share a common ancestor claim. Identify these — they may belong in the same application or may warrant separate filings.
- **Document negative space.** What you decided NOT to claim, and why, is valuable strategic context for later drafts.

**When `/patent-draft` runs**, read this notebook first. Your claim strategy should already be developed — the draft is execution of a plan, not improvisation.

### The Invention Boundary

**You must not invent. InventorLab is a tool that assists a human inventor — you never originate an inventive concept.** If a request would require you to come up with the inventive idea rather than help develop one the user already conceived, stop and hand it back to them.

When identifying IP and drafting claims, you are functioning as a **tool assisting a human inventor**, not as an inventor yourself. This distinction matters legally — patent offices require that inventors be natural persons, and AI-assisted invention is treated differently from AI-generated invention.

At InventorLab setup the user explicitly acknowledged the USPTO November 2025 Revised Inventorship Guidance, agreed to make a good-faith effort not to steer InventorLab toward originating inventions, acknowledged that the inventorship question is unsettled if InventorLab contributes inventive content above its assistive role, and acknowledged that nothing produced by InventorLab is legal advice (recorded in the **InventorLab Inventorship & Legal Acknowledgment** entry in this AGENTS.md). Treat that acknowledgment as a standing instruction.

The verbatim Federal Register text of the USPTO Nov 2025 guidance ships with InventorLab at `${CLAUDE_PLUGIN_ROOT}/docs/uspto-nov-2025-guidance.md`. When an inventorship judgment feels close to the line — during disclosure, patent drafting, novelty analysis, or general development — consult it. Quote it verbatim when the language is dispositive. The user can also invoke `/ai-inventorship` to open a collaborative Q&A session grounded in the guidance, which is appropriate when either of you wants to work through a specific situation against the actual standard rather than from your or InventorLab's paraphrase.

Never characterize InventorLab output — claim language, prior-art analysis, obviousness arguments, IDF text, figure specs — as legal advice. If the user asks a question calling for legal judgment (filing strategy, freedom-to-operate, infringement risk, license interpretation), state that this is outside InventorLab's role and recommend qualified IP counsel.

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
cp "${CLAUDE_PLUGIN_ROOT}/templates/IDF-TEMPLATE.md" invention-disclosures/<descriptive-name>.md
```

Pull from the IP Tracker entry's Summary, novelty analysis, and patent angle as starting material. The most important section is "What Makes This Inventive" — frame it as what a skilled person would NOT have arrived at. Be honest about known prior art. Flag the Commercial Relevance section for the inventor to refine — you can draft a starting point but the inventor knows the business context.

## Patent Applications (`patent-applications/`)

When an IP Tracker entry (or cluster of related entries) is mature enough for a formal patent application, create a new file by copying the template:

```
cp "${CLAUDE_PLUGIN_ROOT}/templates/PATENT-APPLICATION-TEMPLATE.md" patent-applications/<descriptive-name>.md
```

Name the file after the invention (e.g., `adaptive-cache-prefetching.md`, `access-pattern-prediction.md`). Each application is a standalone provisional patent document. The template includes a claim-drafting guide in comments — follow those principles when writing claims.

When creating an application:
- Reference the IP-TRACKER.md entry numbers being formalized
- Start with the broadest independent claims, then add dependent claims for specificity
- Cover the core invention from multiple angles: method claims, system claims, alternate framings
- Include detailed figure descriptions with reference numerals (draftsperson should be able to reproduce them)
- Write the Detailed Description using reference numerals from the figures
- More claims is better at the provisional stage — you can narrow later but can't add unsupported claims

## Patent Figures (`patent-applications/figures/`)

When drafting a patent application, generate all figures as a single **project file** that the user can import into the figure editor. The project file contains all figures as pages/tabs. The user refines layouts in the visual figure editor (`figure-editor.html`) and exports the final SVGs or a multi-page PDF.

**Preferred: Generate a project file** with all figures at `patent-applications/figures/project.json`:
```json
{
  "type": "inventorlab-project",
  "pages": [
    {
      "name": "FIG. 3 — System Architecture",
      "spec": {
        "title": "FIG. 3 — System Architecture",
        "width": 900,
        "height": 750,
        "elements": [
          { "id": "302", "label": "Platform Container", "position": [450, 200], "width": 400, "height": 300, "layout": "vertical" },
          { "id": "304", "label": "Database", "position": [450, 150], "width": 160, "height": 50, "parent": "302", "row": "top" },
          { "id": "306", "label": "Cache", "position": [450, 250], "width": 160, "height": 50, "parent": "302", "row": "bottom" },
          { "id": "308", "label": "Decision?", "position": [450, 450], "width": 100, "height": 70, "shape": "diamond" },
          { "id": "310", "label": "External System", "position": [750, 200], "width": 160, "height": 50 }
        ],
        "arrows": [
          { "from": "304", "to": "306", "label": "data flow" },
          { "from": "302", "to": "308" },
          { "from": "308", "to": "310", "label": "yes", "fromAnchor": "bottom" },
          { "from": "304", "to": "310", "style": "dashed" }
        ],
        "annotations": [
          { "text": "300", "position": [40, 40], "fontSize": 11, "bold": true },
          { "text": "FIG. 3", "position": [450, 700], "fontSize": 24, "bold": true }
        ],
        "lines": [
          { "points": [[100, 400], [800, 400]], "style": "dashed" }
        ]
      }
    }
  ]
}
```

**Alternative: Individual figure files** at `patent-applications/figures/<fig-name>.json` — each containing just the `spec` object (without the project wrapper). The editor supports importing multiple individual files at once, creating a tab for each.

The user workflow:
1. Open `figure-editor.html`, click **Import JSON**, select the project file (or multiple individual files)
2. All figures appear as tabs — click tabs to switch between figures
3. Drag boxes to adjust layout, resize by dragging edges, use arrow keys for fine positioning
4. Arrows auto-route orthogonally around boxes with hop rendering at unavoidable crossings
5. Use Align/Distribute tools for multi-selected elements
6. Group related elements (Cmd+G) for moving together
7. **Export PDF** for a multi-page document with one figure per page
8. **Export Project** to save all tabs as a single project file
9. **Export SVG** or **Export JSON** for the current tab only
10. **Save** overwrites the original imported file in place

### JSON spec reference

**Elements:**
- `id` — reference numeral (e.g., "100"), displayed below the label
- `label` — the box text (auto-wraps to fit)
- `position` — `[x, y]` center coordinates
- `width`, `height` — box dimensions
- `shape` — `"box"` (default) or `"diamond"` (for decision nodes)
- `style` — `"solid"` (default) or `"dashed"`
- `parent` — **id of the containing element** (makes this a child nested inside the parent; parent auto-resizes to fit children, label renders as header)
- `row` — **row group name** (elements with the same row value are aligned horizontally and sized uniformly)
- `layout` — **child arrangement direction** for parent containers: `"horizontal"` or `"vertical"` (default: auto-detected from child positions)
- `align` — alignment hint for row members: `"top"`, `"center"`, `"bottom"`
- `rotation` — rotation angle in degrees (omit for 0°; rotates around center)

**Arrows (connectors):**
- `from` / `to` — reference numeral IDs of source and target elements
- `label` — text displayed on the connector
- `style` — `"solid"` (default) or `"dashed"`
- `tips` — arrowhead configuration: `"end"` (default, arrow at target), `"start"` (arrow at source), `"both"` (arrows at both ends), `"none"` (plain line, no arrowheads)
- `fromAnchor` / `toAnchor` — **always set for diamonds** to preserve branch semantics; omit for boxes to let the optimizer choose. Standard diamond anchor conventions:
  - **top** — input (the flow entering the decision)
  - **bottom** — "yes" / primary / affirmative branch
  - **right** — "no" / secondary / alternative branch
  - **left** — use for a third branch if needed (e.g., "error", "other")
  - When a diamond has only two outputs (yes/no), use bottom + right. When it feeds back into a loop, the loop-back branch typically exits right and routes back up.

**Annotations (free text):**
- `text` — the text content
- `position` — `[x, y]` coordinates
- `fontSize` — font size (default: 10)
- `bold` — `true` for bold text
- `attachTo` — **id of an element** this annotation is associated with (moves with the element)

**Lines (axes, separators, callouts):**
- `points` — array of `[x, y]` points
- `style` — `"solid"` (default) or `"dashed"`
- `tips` — arrowhead configuration: `"none"` (default), `"end"`, `"start"`, `"both"`
- `curve` — array of `[x, y]` control points for smooth curves, e.g. `[[200, 150], [300, 250]]` (omit for straight lines; the curve passes through these points as a Catmull-Rom spline)

### Figure numbering and reference numeral conventions

**Figure label:** Every figure must include a `"FIG. N"` annotation in large bold text (fontSize 24), centered beneath the diagram content. Add this as an annotation element, not as part of the title.

**Reference numeral reservation:** The base numeral for a figure (figure number × 100) is reserved for the figure as a whole — **do not assign it to any individual element**. For FIG. 3, `"300"` refers to the entire diagram. Individual elements within FIG. 3 start at `"302"` and increment by 2 (302, 304, 306, 308, ...). This follows standard patent convention where the hundreds digit identifies the figure and even numbering leaves room for future insertions.

**Numeral mapping by figure:**
| Figure | Reserved (whole diagram) | Element numerals |
|--------|--------------------------|------------------|
| FIG. 1 | 100 | 102, 104, 106, ... |
| FIG. 2 | 200 | 202, 204, 206, ... |
| FIG. 3 | 300 | 302, 304, 306, ... |
| FIG. 10 | 1000 | 1002, 1004, 1006, ... |

### Figure types

Every patent figure should be one of these five types. Choose the type that best communicates the inventive aspect being illustrated.

#### 1. System Diagram
**Purpose:** Show architecture — what components exist and how they connect.
**When to use:** Illustrating the structural composition of a system, subsystem relationships, data stores, external interfaces.
**Layout conventions:**
- Use `parent`/`row` fields to nest subsystems inside containers
- Connectors represent data flow, API calls, or dependencies — label them
- Arrange hierarchically: high-level containers at top or center, details inside
- Dashed borders for optional or external components
- Typically wide and structured; avoid flowchart-style vertical chains

#### 2. Flowchart
**Purpose:** Show algorithmic logic — decisions, branching, sequential steps.
**When to use:** Illustrating a method claim, a decision process, or step-by-step logic executed by a system.
**Layout conventions:**
- Flow **top-to-bottom** (primary) or **left-to-right** (secondary)
- Use diamonds for decision points with labeled branches (e.g., "yes"/"no")
- Always set `fromAnchor`/`toAnchor` on diamond connectors: input enters from **top**, "yes"/primary exits **bottom**, "no"/secondary exits **right**
- Label decision branches on the connector (e.g., `"label": "yes"`) — never leave a diamond branch unlabeled
- Rectangular boxes for process steps; use verbs ("Compute score", "Retrieve context")
- Dashed connectors for optional or conditional paths
- Terminal states (start/end) can use rounded labels or distinct wording

#### 3. Conceptual Framework
**Purpose:** Show how systems interact with processes in a concrete scenario — blends architecture with logic.
**When to use:** Illustrating an end-to-end flow through multiple system components, showing an exemplary situation, or depicting how a novel mechanism works in practice.
**Layout conventions:**
- Mix boxes (system components) with diamonds (decisions) and annotations (explanatory context)
- Show the flow of a specific scenario through the architecture, not just the architecture itself
- Use annotations liberally to explain what's happening at each stage
- Dashed lines/connectors can separate phases or indicate asynchronous operations
- More freeform than system diagrams or flowcharts — arrange for narrative clarity

#### 4. Swimlane Diagram
**Purpose:** Show sequence and responsibility — which component does what and when.
**When to use:** Illustrating multi-party interactions, protocol sequences, or pipelines where timing and ownership matter.
**Layout conventions:**
- Use horizontal dashed lines to separate lanes (one per actor/component/system)
- Label each lane with an annotation at the left edge (bold, fontSize 12+)
- Flow primarily **left-to-right** within each lane to show time progression
- Connectors crossing lanes show interactions between components
- Boxes within a lane represent actions taken by that actor
- Vertical alignment implies simultaneity or ordering

#### 5. Data Structure Diagram
**Purpose:** Show schemas, data relationships, embedding spaces, or transformation pipelines.
**When to use:** Illustrating graph schemas, data models, vector spaces, storage layouts, or how data is transformed between representations.
**Layout conventions:**
- Use boxes for entities/tables/nodes with field names in labels
- Connectors represent relationships — label with relationship type or cardinality
- Use `tips: "both"` for bidirectional relationships, `tips: "none"` for associations
- Dashed connectors for derived or computed relationships
- Group related entities using parent containers or spatial proximity
- For transformation pipelines, arrange left-to-right with labeled connectors showing the transformation applied

### Figure layout tips
- Position connected elements close enough that connectors are short and simple
- Use `parent`/`row` fields to create structured layouts — the editor handles sizing and alignment
- For decision diamonds, always set `fromAnchor`/`toAnchor` on connected arrows to preserve branch semantics
- Keep 8+ pixels between connected shapes (the editor enforces this on load)
- The auto-router minimizes connector crossings and avoids passing through boxes; unavoidable crossings get hop arcs
- Leave vertical space at the bottom of the figure for the `"FIG. N"` annotation (typically 50px below the lowest element)
