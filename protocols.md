# InventorLab — On-Demand Protocols

Detailed conventions, templates, and workflows for InventorLab IP work. CLAUDE.md carries the always-on behavioral layer (triggers, novelty awareness, publication-awareness pause, USPTO compliance rules). This file contains material consulted on-demand during specific IP tasks.

**Read this file when:**
- Maintaining the Claim Strategy Notebook
- Writing an Invention Provenance Log (during `/disclosure-session` or `/ideation-session`)
- Creating an IDF or a patent application
- Generating or refining patent figures
- Looking up the full skill-suggestion mapping

---

## Full Skill-Suggestion Mapping

CLAUDE.md keeps a condensed list of the most common matches. The full mapping:

- **User describes an interesting idea or approach** → *"That's an interesting direction. If you want to explore it further, try `/ideation-session [topic]` — we can brainstorm variations and angles."*
- **You flag something as potentially novel** → *"I added this to IP-TRACKER.md. When you're ready to articulate it more formally, `/disclosure-session [file-or-topic]` will walk through what makes it non-obvious."*
- **Multiple IP tracker entries are accumulating** → *"You've got [N] entries in the IP tracker now. If any of these feel ready to formalize, `/disclosure-form [entry-number]` creates an Invention Disclosure Form."*
- **A disclosure form or cluster of entries is mature** → *"This looks substantial enough for a patent application. `/patent-draft` will generate a full provisional with spec, claims, and figures."*
- **User asks about their IP or wants to see what's been captured** → *"Run `/invention-check recent` to scan your latest changes, or `/invention-check full` for the whole codebase."*
- **User is stuck or exploring a problem space** → *"Want to think through this more broadly? `/ideation-session [problem]` can help explore unconventional approaches."*
- **User says something like "is this patentable?" or "should we protect this?"** → *"Let's find out — `/disclosure-session [topic]` will help articulate the inventive step. If it holds up, `/disclosure-form` formalizes it."*
- **User wants to explain or document an approach** → *"If you want to write this up as a technical whitepaper, `/whitepaper [topic]` will generate one."*
- **User asks "has anyone done this before?" or "is this really novel?"** → *"Let me check — `/prior-art [topic]` will search patents, papers, and technical publications for similar approaches."*
- **Before drafting any patent claims** → *"I'll run `/prior-art` first to understand the landscape. Claims should maneuver around existing prior art, not ignore it."*
- **User wants to see all their IP documents** → *"`/portfolio` shows all your patent drafts, IDFs, and whitepapers — their status, what they cover, and what needs attention."*
- **User is working on something covered by an existing document** → *"This touches IP entry #[N], which is covered by [document]. Want me to update it?"*
- **User asks to see or edit figures** → Open the figure editor with the project loaded. Run: `python3 -m http.server 8787 --directory . > /dev/null 2>&1 & open "http://localhost:8787/docs/inventorlab/figure-editor.html?file=/patent-applications/figures/project.json"`
- **User is deciding between patent and whitepaper** → *"A patent protects — it gives you exclusive rights. A whitepaper publishes — it prevents others from patenting the same thing. `/whitepaper` for defense, `/patent-draft` for offense. You can do both if you file the provisional first."*

Keep suggestions brief and natural. One line, with the exact command. Don't suggest multiple skills at once — pick the most relevant one for the moment. The user can always ask for other options.

---

## Claim Strategy Notebook (`CLAIM-STRATEGY-NOTEBOOK.md`)

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

---

## Invention Provenance Log (`invention-provenance/`)

A directory of session transcripts documenting the conception and development of inventions. **You (Claude Code) maintain these logs automatically** during `/disclosure-session`, `/ideation-session`, and whenever significant IP-related discussion occurs during development.

**Purpose:** To create a contemporaneous record establishing that the human user conceived the invention, consistent with the USPTO's November 2025 Revised Inventorship Guidance for AI-Assisted Inventions. Under this guidance, the standard inventorship test applies — the inventor must have had the invention "clearly defined in the inventor's mind." These logs document that the user conceived the invention, understood all its limitations, and used Claude Code as an assistive tool. They are rarely needed — but when inventorship is questioned (by a patent office, a court, an employer, or a co-inventor), a clear contemporaneous record is the strongest evidence available.

**When to log:**
- Every `/disclosure-session` — full transcript
- Every `/ideation-session` — full transcript
- During development when an IP tracker entry is created or significantly updated
- When the user makes a key inventive decision (adopting an approach, rejecting an alternative, redirecting the direction)

**Log file naming:** `invention-provenance/[date]-[topic-slug].md`

**Log format:**

```markdown
# Invention Provenance Log
**Date:** [ISO date]
**Participants:** [user identifier], Claude Code (assistive tool)
**Related IP Tracker Entries:** [entry numbers]
**Session Type:** [disclosure-session | ideation-session | development]

---

## Annotated Transcript

**[USER]** [User's message — verbatim or summarized]
> *Provenance note: User directed [specific aspect]. This represents the user's conception of [what was conceived].*

**[CLAUDE]** [Claude's response — summarized, not verbatim]
> *Provenance note: Claude provided [analysis/suggestion/implementation] in response to user's direction. This constitutes tool assistance, not inventive contribution.*

**[USER]** [User's evaluation/decision]
> *Provenance note: User evaluated Claude's suggestion and [adopted/modified/rejected] it. The user's decision to [specific decision] constitutes the inventive act.*

...

## Inventorship Summary (USPTO November 2025 Conception Standard)

**Conception:** [Did the user have the invention "clearly defined in the inventor's mind such that only ordinary skill would be necessary to reduce the invention to practice"? Document the specific moment and statement where the user demonstrated this understanding. Be specific — "the user described using embedding similarity as a creation gate, explained why a threshold was needed, and specified that feedback should redirect the generator" not "the user discussed the system."]

**User's understanding of each claim limitation:** [For each key limitation of the claimed invention, document that the user understood and directed it. The user must possess knowledge of ALL limitations — not just the headline concept but the specific elements that make up the claims.]

**Direction:** [Who directed the development approach? Document key directional decisions — choosing one approach over another, redirecting after a failed attempt, selecting which aspects to pursue.]

**Evaluation:** [Who evaluated whether the approach was meritorious? Document the user's critical judgment — accepting, rejecting, or modifying Claude Code's suggestions. Under the 2025 guidance, when Claude Code suggests something and the user evaluates, understands, and adopts it, the user's comprehension establishes their conception.]

**AI Role:** Claude Code functioned as an assistive tool — analogous to CAD software, a research database, or laboratory equipment. Claude provided [list specific contributions: analysis, articulation, prior art search, claim language drafting, code implementation, etc.]. The user conceived the invention and used Claude Code as a tool to develop and formalize it.

---
*This log was generated contemporaneously with the inventive activity described above. It reflects the actual course of interaction between the human inventor and the AI assistive tool.*
```

**Important behavioral notes:**
- **Be honest.** If you (Claude) suggested something novel that the user then adopted, document it accurately — note that Claude suggested it AND that the user evaluated, adopted, and directed its implementation. The user's evaluation and adoption is what establishes inventorship under USPTO guidance.
- **Don't over-attribute to the user.** If Claude originated an idea, say so. The log's credibility depends on accuracy.
- **Don't over-attribute to Claude.** Claude processes information and generates responses. The user provides the problem, the direction, the evaluation, and the decision to pursue. These are the inventive acts.
- **Timestamp key moments** when practical — especially when the user makes a pivotal inventive decision.
- **The log is for the user's benefit.** They may never need it. But if they do, it should be unimpeachable.

---

## Invention Disclosure Forms (`invention-disclosures/`)

For inventors working within a company, create an Invention Disclosure Form (IDF) instead of (or before) a patent application. The IDF is what corporate IP committees use to evaluate whether an invention is worth filing.

When the user asks for an IDF, copy the template:

```
cp docs/inventorlab/IDF-TEMPLATE.md invention-disclosures/<descriptive-name>.md
```

Pull from the IP Tracker entry's Summary, novelty analysis, and patent angle as starting material. The most important section is "What Makes This Inventive" — frame it as what a skilled person would NOT have arrived at. Be honest about known prior art. Flag the Commercial Relevance section for the inventor to refine — you can draft a starting point but the inventor knows the business context.

---

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

---

## Patent Figures (`patent-applications/figures/`)

When drafting a patent application, generate all figures as a single **project file** that the user can import into the figure editor. The project file contains all figures as pages/tabs. The user refines layouts in the visual figure editor (`figure-editor.html`) and exports the final SVGs or a multi-page PDF.

**Preferred: Generate a project file** with all figures at `patent-applications/figures/project.json`:
```json
{
  "type": "inventorlab-project",
  "pages": [
    {
      "name": "FIG. 3 — System Architecture",
      "orientation": "landscape",
      "spec": {
        "title": "FIG. 3 — System Architecture",
        "orientation": "landscape",
        "elements": [
          { "id": "302", "label": "Platform Container", "position": [350, 200], "width": 200, "height": 150, "layout": "vertical" },
          { "id": "304", "label": "Database", "position": [350, 160], "width": 100, "height": 35, "parent": "302", "row": "top" },
          { "id": "306", "label": "Cache", "position": [350, 220], "width": 100, "height": 35, "parent": "302", "row": "bottom" },
          { "id": "308", "label": "Decision?", "position": [350, 370], "width": 70, "height": 55, "shape": "diamond" },
          { "id": "310", "label": "External System", "position": [550, 200], "width": 100, "height": 35 }
        ],
        "arrows": [
          { "from": "304", "to": "306", "label": "data flow" },
          { "from": "302", "to": "308" },
          { "from": "308", "to": "310", "label": "yes", "fromAnchor": "bottom" },
          { "from": "304", "to": "310", "style": "dashed" }
        ],
        "annotations": [
          { "text": "300", "position": [396, 85], "fontSize": 11, "bold": true },
          { "text": "FIG. 3", "position": [396, 575], "fontSize": 24, "bold": true }
        ],
        "lines": [
          { "points": [[85, 380], [710, 380]], "style": "dashed" }
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

### Page sizing and orientation

Each figure must fit on a US Letter page (8.5" × 11") with USPTO-compliant margins. The editor renders pages at 72 DPI with the following coordinate spaces:

| Orientation | Page size | Margin bounds (drawable area) |
|-------------|-----------|-------------------------------|
| **Landscape** | 792 × 612 | x: 72–720, y: 72–540 (648 × 468 usable) |
| **Portrait** | 612 × 792 | x: 72–540, y: 72–720 (468 × 648 usable) |

Margins are 1" (72pt) uniform on all sides — centered on the page and exceeding all USPTO 37 CFR 1.84(g) minimums.

**Choose orientation per figure:**
- **Landscape** (default) — best for wide diagrams: system architectures, pipelines, swimlanes, most flowcharts
- **Portrait** — best for tall diagrams: deep flowcharts, vertical hierarchies, long sequential processes

**Position all elements within the margin bounds.** The encompassing numeral annotation goes near the top of the page — it doesn't need to be centered, just positioned where it looks neat and doesn't overlap with elements. The `FIG. N` annotation goes near the bottom — again, not necessarily centered, just placed where it looks clean and doesn't overlap with content. Both can be offset from center to avoid collisions with elements or connectors.

Set `"orientation"` on both the page object and the spec:
```json
{ "name": "FIG. 1 — Overview", "orientation": "landscape", "spec": { "orientation": "landscape", ... } }
```

### Figure generation workflow

When generating patent figures, follow this loop:

1. **Generate JSON** — create the figure spec with compact boxes, short labels, uniform sizes, and positions within margin bounds
2. **Render to PNG** — use `render-figure.js` (which runs the layout optimizer automatically) to produce an image
3. **Visual review** — look at the rendered PNG and evaluate qualitative qualities:
   - **Balance**: Is the composition centered and visually weighted evenly, or is everything crammed into one corner?
   - **Symmetry**: Do parallel branches (e.g., yes/no from a diamond) mirror each other? Are rows and columns visually even?
   - **Flow**: Does the diagram read naturally — top-to-bottom for flowcharts, left-to-right for pipelines? Is the entry point obvious?
   - **Grouping**: Are logically related elements visually proximate? Do phases/sections form clear visual clusters?
   - **Whitespace**: Is space used evenly, or are there awkward gaps next to crowded areas?
   - **Connector clarity**: Are connector paths clean and readable, or do they create a tangle? Can you trace each path easily?
   - **Professional appearance**: Does it look like it belongs in a patent filing?
4. **Adjust and re-render** — if the figure doesn't meet qualitative standards, modify the JSON (reposition elements, change orientation, rearrange layout) and re-render. Common fixes:
   - Lopsided → redistribute elements to center the composition
   - Tangled connectors → swap element positions to uncross paths
   - Cramped → switch to portrait or split a row into two rows
   - Awkward whitespace → tighten spacing or add elements to fill the gap
   - Poor flow → reorder elements so the primary path reads top-to-bottom or left-to-right
5. **Repeat** until the figure is clean, balanced, and professional

This loop typically takes 1-3 iterations per figure. The first render catches major layout issues; subsequent passes refine aesthetics.

### Opening the figure editor for the user

After creating or updating figures, **automatically open the figure editor with the project loaded** so the user can review and refine. Use a local static server from the project root:

```bash
# Start a static server in the background and open the editor with the project loaded
python3 -m http.server 8787 --directory . &
SERVER_PID=$!
open "http://localhost:8787/docs/inventorlab/figure-editor.html?file=/patent-applications/figures/project.json"
# The server can be killed later: kill $SERVER_PID
```

This works on any project — no dependencies beyond Python 3. The `?file=` parameter auto-loads the project file. The user sees the editor with all figures loaded as tabs, ready to refine.

Do this whenever:
- Figures are first generated (`/patent-figures` or `/patent-draft`)
- Figures are updated or regenerated
- The user asks to see or edit figures

### SVG illustrations for complex figures

For figures that go beyond block diagrams — user interactions, device depictions, mechanical components, physical layouts — generate **raw SVG** instead of JSON. SVG supports arbitrary shapes: curves, paths, silhouettes, device outlines, gears, anything.

**When to use SVG vs JSON:**
- **JSON** (figure editor): Block diagrams, flowcharts, system architectures, pipelines, swimlanes, data structure diagrams — anything composed of boxes, diamonds, and connectors
- **SVG** (direct generation): User depictions, device illustrations, mechanical parts, physical layouts, cross-sections, anything requiring freeform shapes

**SVG generation process:**
1. Write the SVG file directly (Claude Code generates XML)
2. Save to `patent-applications/figures/[name].svg`
3. Render to PNG via Puppeteer for visual review
4. Iterate until the illustration is clean and accurate

**Importing SVG into the figure editor:**
SVG files can be imported into the figure editor as background layers. The user can then add reference numerals, FIG. N labels, and connectors on top using the editor's native tools. To import: click "Import SVG" in the editor toolbar, select the SVG file, position and scale it on the page.

### Figure layout tips
- **All elements must fit within margin bounds as generated — no manual adjustment needed.** Every element's edges (position ± half width/height), every connector path, every annotation, and every line must fall entirely within the drawable area. The figure must be print-ready from the JSON alone. If a visual review shows anything clipped by the margin dashes, fix the JSON and re-render — don't leave it for the user to drag into place.
- **Minimize annotations.** Only include the encompassing numeral (e.g., "300") and the `FIG. N` label as annotations. Do not add explanatory text annotations to the drawing — they take up space, get occluded by connectors, and look awkward. All explanatory detail belongs in the specification text, not the figure. The figure should be clean: labeled boxes, reference numerals, and connectors. The spec describes what the figure shows.
- **Keep boxes compact.** Size boxes to fit their label text, not wider. A box labeled "Database" needs ~80px wide, not 160px. The editor auto-wraps text, so a 100px box with a longer label will wrap to two lines — that's fine and preferred over a wide box. Typical widths: short labels (1 word) → 70-90px, medium labels (2-3 words) → 90-120px, long labels → 100-130px (let it wrap). Heights: 30-40px for single-line, 45-55px for wrapped text. Parent containers should be only as large as needed to hold their children.
- **Use short labels in figures.** If a component's full name is long (e.g., "Adaptive Multi-Stage Request Throttling Subsystem"), shorten it for the figure label (e.g., "Throttling Subsystem") and use the full name in the specification text. Figure labels should be 1-3 words when possible. The reference numeral ties the short figure label to its full description in the spec.
- **Element spacing.** Connected elements should be exactly 24px apart (edge-to-edge). No connectors shorter than 24px. The editor's layout optimizer enforces this, but generate positions that approximate it in JSON.
- **Uniformity.** Elements that serve similar roles should have identical widths and/or heights — don't let them vary by a few pixels. If three boxes in a row are 90px, 95px, and 88px wide, make them all 90px. Similarly, align element centers: if three boxes are in a column, give them the exact same x-coordinate. If they're in a row, give them the exact same y-coordinate. The editor auto-snaps elements within 8px of each other's size or position on import, but generate uniform values in JSON to begin with.
- Position connected elements close enough that connectors are short and simple
- Use `parent`/`row` fields to create structured layouts — the editor handles sizing and alignment
- For decision diamonds, always set `fromAnchor`/`toAnchor` on connected arrows to preserve branch semantics
- Keep 8+ pixels between connected shapes (the editor enforces this on load)
- The auto-router minimizes connector crossings and avoids passing through boxes; unavoidable crossings get hop arcs
- Leave vertical space at the bottom of the figure for the `"FIG. N"` annotation (typically 50px below the lowest element)

---

## Patent-Attorney Claim Drafting Style

When drafting, broadening, or revising patent claims, follow the conventions below. They reflect top-tier patent prosecution style and are calibrated to (a) maximize claim scope, (b) minimize §112 vulnerabilities, (c) avoid §101 abstract-idea pitfalls, and (d) produce claims that read like attorney work product rather than specification prose.

**Why this matters.** Every word in a claim is a limitation. Adjectives narrow. Subjective qualifiers attract §112(b) indefiniteness rejections. Imported specification context narrows without need. LLM-drafted claims systematically over-specify because the training distribution rewards descriptive completeness — the opposite of claim economy. Counter-instruct accordingly.

### Preamble patterns

Use these three forms for parallel claim sets. The system and medium preambles are formulaic — use them verbatim:

| Claim type | Preamble |
|---|---|
| Method | `A method comprising:` (preferred) or `A computer-implemented method comprising:` |
| System | `A system comprising one or more computers and one or more storage devices storing instructions that, when executed by the one or more computers, cause the one or more computers to perform operations comprising:` |
| Medium | `A non-transitory computer-readable medium storing instructions that, when executed by one or more computers, cause the one or more computers to perform operations comprising:` |

For domain-tied preambles (e.g., `A method of operating on database queries, comprising:`) use only when the domain itself is part of the inventive step. The plain `A method comprising:` is broader and almost always preferred.

The body of operations should be **identical** across method, system, and medium claims. Reuse, don't rephrase. The wrappers are formula; the body is the invention.

### Element structure

- **Each element starts with a gerund.** *receiving, generating, processing, training, identifying, determining, storing, outputting.* Consistent voice across elements.
- **Semicolons between elements.** Last element introduced with `; and`.
- **One operation per element.** Don't combine multiple operations with conjunctions inside one element.
- **`wherein` clauses for sub-features.** When an element has structural details, introduce them with `wherein the X [is/comprises/includes] Y`. Keep them short.
- **Single sentence per claim.** No periods inside a claim until the closing period.

### Antecedent basis (§112(b) discipline)

- **Indefinite article on first introduction.** `a plurality of nodes`, `an input image`, `one or more processors`.
- **Definite article on subsequent reference.** `the plurality of nodes`, `the input image`, `the one or more processors`.
- **Every `the X` must have a prior `a X` or `an X`** with the exact same noun phrase. Mismatches trigger §112(b) rejections.
- **Use `the` not `said`.** Modern usage; `said` is archaic.
- **Never introduce a noun in a `wherein` clause without its own `a/an`** unless it modifies an already-introduced noun.
- **Be consistent in noun phrasing.** If you introduce `a plurality of training cases`, do not later refer to `the training cases` (mismatch) — refer to `the plurality of training cases`.

### Forbidden lexicon

These do not appear in claim text:

**Subjective qualifiers** (§112(b) indefiniteness):
- *intelligent, smart, advanced, novel, innovative*
- *comprehensive, complete, entire, full*
- *efficient, optimal, optimized, improved*
- *robust, reliable, stable*
- *substantial, substantially* (without numerical bound)
- *appropriate, suitable, proper* (without antecedent definition)
- *rigorous, thorough, careful*
- *qualitatively different* (replace with a specific structural distinction)

**Filler adverbs** (no patentable weight):
- *actively, proactively, autonomously* (when not specifying a control mechanism)
- *structurally* (when not specifying structure)
- *automatically, dynamically, selectively, intelligently* (often filler — strike unless tied to a specific mechanism)
- *seamlessly, transparently*

**Vague functional / result-without-mechanism phrasing** (§112(b) risk):
- `thereby achieving X` without specifying mechanism
- `in a way that X` without specifying how
- `such that the system X` if `X` is descriptive prose rather than a structural property

**Imported context** (unnecessary narrowing):
- Spec-derived qualifiers like `during software development`, `for a human developer`, `in conjunction with [a specific other system]` — strike unless the context is part of the inventive step.
- User-type qualifiers (`by a human`, `for an end user`) — strike unless human role is structurally claimed.
- Phase qualifiers (`during initialization`, `at runtime`) — strike unless tied to a specific operation.

**Prose-y multi-clause patterns** (specification voice intruding into claim space):
- `…such that…`
- `…in a way that…`
- Long chained `wherein` clauses that read as paragraphs.
- Embedded justifications: `…because…`, `…since…`, `…in order to ensure…`.

### Required patterns

**Generic over specific in independent claims.** Replace specific technologies with broader equivalents at the broadest claim level:
- `AI coding assistant` → `system` or `computing system`
- `large language model` → `model`
- `embedding vector` → `vector representation`
- `Slack channel` → `communication channel`

The specific technology becomes a dependent claim: `wherein the system is an AI coding assistant`, `wherein the model is a large language model`. Free narrowings, free fallback positions.

**First/second qualifiers for distinguishable items.** When two items differ in a relational way, use `a first X` and `a second X different from the first`. Avoid subjective distinguishing adjectives (e.g., `the better X`, `the more relevant X`).

**Functional language with structure.** `configured to [verb]` is acceptable for programmable components. `based on` is acceptable for relationships. `using` is acceptable for tooling. `to generate / to identify / to produce` is acceptable as a purpose clause when tied to a specific step.

**Actor inclusion in each step.** When a claim involves a specific actor (a device, a system, a particular component), include the actor in each gerund-led element using `, [by/at] the [actor]` immediately after the gerund:

> `receiving, at a client device, sensor data captured by a sensor coupled to the client device;`
> `processing, by the client device, the sensor data to produce a feature representation;`
> `transmitting, by the client device, the feature representation to a server.`

This pattern (a) disambiguates which actor performs which step in multi-actor claims, (b) tightens enablement by specifying the locus of each operation, and (c) reads cleanly. Use when the actor identity is part of the claimed structure; omit when generic.

**Sub-list `(i)`, `(ii)`, `(iii)` for multi-factor inputs.** When an operation depends on multiple inputs or factors, enumerate them explicitly inside the element rather than chaining `and` or splitting into multiple `wherein` clauses:

> `determining whether a candidate region of an input image corresponds to a target object class based at least on (i) a classification score generated by a neural network for the candidate region, (ii) a first set of coordinates identifying a position of the candidate region within the input image, and (iii) a second set of coordinates identifying a position of a reference region within the input image`

The `(i)/(ii)/(iii)` form is preferred over chained `and` because it makes each input a discrete claim limitation that the examiner (and later, infringement analysis) can address individually. Use `based at least on` rather than `based on` when the listed factors are necessary but not exclusive — leaves room for additional unenumerated factors without requiring claim amendment.

**`respective` for parallel per-element attributes.** When each item in a plurality has its own instance of an attribute, use `a respective X` rather than enumerating:

> `each item of the plurality of items having a respective relevance score indicating a probability that the item satisfies a query`

The `respective` form binds the attribute to each individual element of the plurality, providing antecedent basis for later references (`the respective relevance score of each item`) and avoiding ambiguity about whether the attribute is shared across elements or per-element.

**Drafting dimensions — apply to every claim.** Patent claim drafting operates in a multi-dimensional space. Any subject matter can be characterized in many ways, all of them potentially true; the drafter's job is to deliberately choose a position in this space rather than defaulting to whatever framing first emerges. These dimensions apply at every drafting step — initial drafting, revision, audit, broadening, narrowing — and to every claim, independent and dependent alike. Below the dimensions are described in detail; the central principle is that the drafter should consciously consider all of them when writing or revising any claim.

The drafter has at least the following levers:

- **Push and pull (scope direction)** — push outward by stripping qualifiers, generalizing technologies, and removing imported context to broaden the claim; pull inward by adding features, specifying implementations, and constraining the domain to narrow the claim. Every adjective is a pull. Every generalization is a push. The independent claim should be pushed as far as the prior art allows; the dependents pull back to specific implementations.
- **Zoom-in and zoom-out (abstraction level)** — zoom in by replacing abstract terms with concrete implementations; zoom out by replacing concrete terms with abstract equivalents. The same operation can be described as `applying a 1×1 convolutional layer` (concrete), `applying a feature-extraction layer` (mid), or `applying a transformation that produces a feature representation` (abstract).
- **Pivot aspect** — change which part or property of the invention is being characterized. Structural, functional, behavioral, architectural, interactive, outcome, procedural, and negative aspects are all available. (See "aspect variety" below.)
- **Combine or isolate** — describe a single aspect alone (allowing maximum breadth on that aspect), or combine two or more aspects in conjunction within one claim (each aspect can then be described more broadly because the conjunction provides specificity).
- **Shift perspective** — frame the claim from a builder's viewpoint, an operator's viewpoint, a user's viewpoint, or a data viewpoint.
- **Reframe temporally** — describe a snapshot (a state or arrangement), a sequence (an ordering of operations), or a lifecycle (a process spanning time).
- **Vary element-type emphasis** — for a method claim, the emphasis can be on the mechanism itself, the sequence of steps, a feedback or reflexive property, the integration of components, the outcome achieved, or what the system avoids.

These dimensions are not orthogonal taxonomies — they interact and combine. A multi-aspect claim can describe one aspect from a builder perspective and another from a user perspective. A claim can pull on one dimension while pushing on another. The point is to think in this space deliberately, not to constrain claims to a fixed schema.

**Apply to every claim, not just the headline drafts.** When generating a multi-angle claim portfolio, the dimensions inform which claims to draft. When revising any claim, the dimensions inform the revision: *can I push this further? Can I zoom out? Am I stuck in one perspective? Is there an aspect I haven't characterized?* When auditing a portfolio, check that the claims collectively span the space rather than clustering at one position.

**Novelty-anchored broadening (free-ride limitations).** Within any single claim, identify which limitations carry the novelty (the elements that distinguish from prior art) and which are structural support. **Pull** (narrow) only the novelty-bearing limitations to the precision required for distinguishability; **push** (broaden) every other limitation aggressively.

The rationale: a claim's survivability rests on the claim as a whole. So long as at least one limitation is novel, the combination is novel. Broadening the non-novel limitations does not weaken survivability — the novel limitation still anchors the claim — but it dramatically expands the infringement territory. The broad limitations get a "free ride" on the novelty's distinguishability: any party who matches the novel limitation cannot escape by varying the structural support.

*Example.* Suppose an invention's novelty is in applying a confidence-threshold criterion to a graph traversal output. A novelty-anchored draft might recite:

> *"identifying, in the graph, a node of the plurality of nodes that has no incoming edge of a specified type **and that satisfies a confidence-threshold criterion**;"*

The bolded fragment carries the novelty and is the source of distinguishability over prior art. The rest — `the graph`, `the plurality of nodes`, `the edge of a specified type` — can be described very broadly because they do not need to carry distinguishability. They hitch a ride.

*When the novelty is in a combination.* If novelty is in the combination of two or more elements rather than a single element, identify the *combination* as the anchor and broaden each individual element. The combination provides the distinguishability; the individual elements do not need to.

*Practical drafting flow:*
1. Identify the inventive concept and its specific novelty contribution (often a single sentence: "the novel part is X").
2. Determine which limitation expresses the novelty.
3. For that limitation, pull to the precision required to distinguish from prior art (no further; over-pulling narrows the claim unnecessarily).
4. For every other limitation in the claim, push as broadly as possible. Strip qualifiers, generalize technologies, remove imported context.
5. Verify the result reads as a broad claim with one or two precise novel limitations — the attorney target.

This technique combines with the dimensions above: the novelty might sit in a structural aspect or a behavioral aspect; it might be at any abstraction level; it might be characterized from any perspective. Once the novelty's position is chosen, the rest of the claim can be pushed broad along all other dimensions.

A portfolio with five claims all at `(structural aspect, mid abstraction, builder perspective, snapshot temporal)` is weak. A portfolio with claims at `(structural, abstract, user, snapshot)`, `(behavioral, mid, operator, lifecycle)`, `(outcome, abstract, user, sequence)`, `(structural, concrete, builder, snapshot)`, `(negative, abstract, data, snapshot)` is strong. Different positions in the space cover different prior-art and infringement territory.

**Aspect variety across multi-angle claim drafts.** Within the dimensions framework above, **aspect variety** is among the most important levers. When generating a portfolio of claim drafts characterizing a single invention, the central goal is to draft claims that describe genuinely different aspects of the invention, each true, each at a deliberately chosen level of abstraction. The portfolio should not repeat the same idea in different words; it should sample broadly across the inventive territory.

**The bike example.** A bicycle can be described in many ways, all true:
- *"A vehicle comprising handlebars …"* — characterizes a structural component (the steering interface).
- *"A vehicle comprising two wheels …"* — characterizes different structural components (the rolling support).
- *"A vehicle that, in response to leaning, redirects forward motion in a corresponding lateral direction …"* — characterizes a behavioral property (how it handles).
- *"A method of human-powered locomotion comprising …"* — characterizes the use case / purpose.
- *"A frame defining a path for transferring rider-applied torque to a rolling element …"* — characterizes the architectural relationship between components.

Each is a true and distinct claim of the same bike. None is more "correct" than another. A portfolio that sticks to one aspect (say, the structural inventory: handlebars, frame, wheels) leaves the behavioral and use-case territory uncovered.

**Two dimensions of variety:**

1. **Aspect dimension** — different *kinds* of true descriptions:
   - **Structural aspects** — the components and their physical/logical arrangement
   - **Functional aspects** — what each component does
   - **Behavioral aspects** — how the system responds, adapts, or behaves over time
   - **Architectural aspects** — how components interact, communicate, or are organized
   - **Interactive aspects** — how a user (or another system) experiences or controls the invention
   - **Outcome / use-case aspects** — what the invention enables or produces
   - **Procedural aspects** — what sequence of steps the invention performs
   - **Negative / limitation aspects** — what the invention avoids or eliminates

2. **Abstraction dimension** — within any aspect, the level at which the aspect is described:
   - **Concrete** — specific implementation (e.g., *"a 1×1 convolutional layer with ReLU activation"*)
   - **Mid-level** — functional grouping (e.g., *"a feature-detection layer"*)
   - **Abstract** — the principle independent of implementation (e.g., *"a transformation that produces a feature representation"*)

**A robust portfolio samples both dimensions.** A 5-claim portfolio for a single invention might look like:
- Claim A: structural aspect at abstract level (the broadest defensible structural framing)
- Claim B: structural aspect at concrete level (specific implementation, narrower fallback)
- Claim C: behavioral aspect at mid level (how the system responds in operation)
- Claim D: outcome aspect at abstract level (what the system enables, broadly)
- Claim E: procedural aspect at mid level (the sequence of operations performed)

These five claims cover a much larger inventive territory than five claims that all describe the same structural arrangement at slightly different scopes.

**The ordering matters.** When generating the multi-angle portfolio, identify the inventive concept first, then deliberately enumerate the aspects:
- *What components / structures does it have?* (structural aspects)
- *What does it do?* (functional aspects)
- *How does it respond / change / adapt?* (behavioral aspects)
- *How are the parts arranged or related?* (architectural aspects)
- *What does the user experience?* (interactive aspects)
- *What does it enable / produce?* (outcome aspects)
- *What sequence of operations does it perform?* (procedural aspects)
- *What does it avoid / eliminate?* (negative aspects)

Then, for each aspect that is a true description, draft one or more claims at one or more abstraction levels. Drop aspects that are uninteresting or that don't survive prior art; retain the rest as the portfolio.

**Lexical variety is a tertiary tool.** Once aspect and abstraction are chosen, secondary breadth can come from varying terminology across claims (e.g., `identify` / `detect` / `select` / `determine` for the same kind of operation, used across different claims). This is helpful but is not the primary source of portfolio strength. Aspect breadth and abstraction breadth do most of the work.

**Caveats:**
- **Each claim must still be a true description.** Aspect variety is not aspect *fabrication*. Don't draft a "behavioral aspect" claim for an invention that has no behavioral property — that produces a claim that is either invalid (no §112(a) support) or irrelevant.
- **Don't overload a single claim with multiple aspects.** Each claim should be focused on one aspect at one abstraction level. Aspect variety operates *across* the portfolio, not within a single claim.
- **Anchor every aspect in the specification.** If you claim a behavioral aspect, the spec must describe that behavior. If you claim an outcome aspect, the spec must describe the outcome. Each aspect-claim has a corresponding spec-anchor.

**Structural comparison for relational properties.** Avoid subjective relational adjectives (`closer`, `more relevant`, `better`) by stating the structural comparison directly:

> `a first separation between a first coordinate of a selected element and a reference coordinate being greater than a second separation between a second coordinate of a different element and the reference coordinate`

The `[first X] being [comparison] than [second X]` pattern is unambiguous and §112-clean.

### Independent / dependent claim hierarchy

The independent claim should be **as broad as the inventive concept allows in view of the prior art and without §101 risk** — not narrower out of inventor caution. Every adjective, qualifier, specific implementation, or imported context not strictly required by the inventive step belongs in a dependent claim.

**Dependent claim ladder pattern:**

```
Claim 1 (independent, broadest):
   <core invention without specific implementation>

Claim 2 (dependent on Claim 1):
   wherein <specific technology / first narrowing>

Claim 3 (dependent on Claim 1):
   wherein <specific configuration / second narrowing>

Claim 4 (dependent on Claim 1 or 3):
   further comprising <additional optional step>
```

Each adjective stripped from the independent → at least one dependent claim.

**§112(d) requirement.** Every dependent claim must further limit its parent. Adding redundant or non-limiting features fails §112(d).

### Three-angle parallel claim sets

For each major inventive concept, draft three independent claims with **identical bodies**:

1. **Method claim** — `A method comprising: …`
2. **System claim** — using the formulaic system preamble
3. **Medium claim** — using the formulaic medium preamble

The body of operations is identical — reuse the gerund-led element list across all three. Different examiners may find different angles persuasive; three angles maximize the chance that at least one survives prior art and §101.

### §101 (abstract idea) risk avoidance

Software claims can be rejected as directed to abstract ideas if they recite pure information processing without a technical implementation. To stay safe:

- **Tie operations to specific technical artifacts.** Memory, processor, network, storage device, sensor.
- **Specify a concrete technical effect.** Reduced computation, novel data structure, improved system performance, new interaction modality.
- **Avoid pure mental-process descriptions.** `analyzing`, `evaluating`, `judging` without specifying how the operation is performed in computing terms.
- **Recite a specific technical improvement.** Not just "the system performs the analysis better" — what specifically about the data structure, algorithm, or architecture is improved?

The safe posture: **broadest defensible without crossing into pure-information-handling abstract idea**.

### §112 hygiene checklist

Before finalizing any claim:

- [ ] Every `the X` has a prior `a X` or `an X` with the same noun phrase (antecedent basis)
- [ ] No subjective qualifiers from the forbidden lexicon
- [ ] No filler adverbs
- [ ] Each element starts with a gerund (or matches the preamble's structural form)
- [ ] Single sentence (one period, at the end)
- [ ] No `and/or` (use proper Boolean structure)
- [ ] Every dependent claim further limits its parent (§112(d))
- [ ] No `means for [verb]` unless §112(f) construction is intentional
- [ ] No unnecessary imported context from the specification

### Worked example: narrow → broad

**Before** (LLM-drafted, narrow):
> A computer-implemented method comprising:
> (a) maintaining a graph data structure in which nodes represent intellectual property entities and edges represent typed relationships among said entities;
> (b) traversing the graph data structure to identify nodes lacking specified incoming or outgoing edges of one or more designated edge types; and
> (c) presenting the identified nodes as inputs to a claim strategy process performed in conjunction with an AI coding assistant operating during software development by a human developer.

Issues:
- Imported context tail: `in conjunction with an AI coding assistant operating during software development by a human developer` — 17 words of free narrowing.
- Undefined functional term: `claim strategy process`.
- Undefined entity term: `intellectual property entities`.
- Archaic: `said`. Redundant: `specified` and `designated` carry the same meaning.
- Prose-y: `in which`, `among said`.

**After** (attorney style):
> A method comprising:
> storing, in a memory, a graph comprising a plurality of nodes and a plurality of edges, each edge having a type;
> identifying, by traversing the graph, a node of the plurality of nodes lacking an edge of a specified type; and
> outputting an identifier of the identified node.

Dependents (preserve all stripped specificity):
> 2. The method of Claim 1, wherein each node of the plurality of nodes represents an item selected from inventions, mechanisms, components, problems, claims, and gaps.
> 3. The method of Claim 1, wherein the specified type is a CLAIMED_BY edge type indicating that the node is referenced by a patent claim.
> 4. The method of Claim 1, further comprising performing the method during operation of an AI coding assistant.
> 5. The method of Claim 1, wherein outputting comprises providing the identifier as an input to a claim drafting process.

The independent claim is now ~½ the length and dramatically broader; every stripped narrowing exists as a dependent claim. Coverage is preserved; scope is expanded.

### Application checklist for converting an existing patent application

When applying these rules to a drafted patent application:

1. List each independent claim
2. For each, identify:
   - Imported context tails (preambles longer than the operations need)
   - Subjective qualifiers (the forbidden lexicon)
   - Filler adverbs
   - Specific technologies in the independent that could be generalized
   - Multi-clause prose patterns
3. Draft a broadened version stripping the above
4. Confirm the broadened version still captures the inventive step
5. Run prior art against the broadened version (use existing `/prior-art` workflow)
6. If clean, adopt; if anticipated, narrow back incrementally toward the original until clean
7. Move every stripped narrowing to a dependent claim that further limits the broadened independent
8. Verify §112 hygiene checklist passes
9. Verify §112(d) — each new dependent further limits its parent
10. Add parallel system and medium claims using the formulaic preambles, with the body of operations identical to the method claim

The result: a tighter independent claim, a richer dependent claim ladder, and a three-angle parallel claim set for each inventive concept.

---

## Patent-Attorney Specification Style

The specification (Field, Background, Summary, Detailed Description, Abstract) carries different style conventions from the claims. Top-tier prosecution practice favors a tight, neutral, embodiment-flexible voice that supports broad claim construction and avoids creating prosecution history that could be used against the patent during litigation.

These guidelines **augment** existing spec-drafting practices already in use; they do not override them. When existing spec text departs from these patterns for a specific reason (e.g., a deliberately argumentative Background section that establishes a sequential-to-concurrent inversion narrative), preserve the deliberate choice and apply these patterns to the surrounding text.

### Voice and framing

- **Use `this specification relates to…`** instead of `the present invention relates to…`
- **Use `this specification describes techniques for…`** instead of `the present invention provides…`
- **Use `embodiments described herein`** instead of `the present invention`

The reason: under *Phillips v. AWH Corp.*, statements about "the present invention" can be construed by courts as binding claim-construction admissions that narrow the scope of every claim. Statements about "this specification" or "embodiments described herein" leave room for embodiments not yet described and avoid this construction lock-in.

### Section structure

Standard section order:

1. **Field** (optional — short, broad-to-specific in one sentence)
2. **Background** (problem identification + existing approaches + limitations)
3. **Summary** (multi-aspect terse listing + advantages statement)
4. **Brief Description of the Figures** (one paragraph per figure)
5. **Detailed Description** (standard opening boilerplate + body)
6. **Claims** (preceded by `What is claimed is:`)
7. **Abstract**

If a Field section is used, follow the broad-to-specific pattern:

> *"The following relates generally to [broad domain] and more specifically to [specific aspect]."*

### Background style

The Background should accomplish three things in order: (a) describe the technical area, (b) identify the problem the invention addresses, and (c) describe existing approaches and their limitations. Avoid editorializing; let the limitations speak through neutral descriptions of what existing approaches do and don't do.

Avoid arguing the patent's novelty in the Background — save that for the claims. The Background creates prosecution history; statements there about what is "known" or "conventional" can be used to broaden the scope of prior art admissions.

### Summary style

The Summary should be **terse**, not a re-articulation of the Detailed Description. Use the multi-aspect pattern:

> *"In one aspect, a method for [doing X] is provided, the method comprising [mirror of independent method claim's body, summarized]."*
>
> *"In another aspect, a system for [doing X] is provided, the system comprising [mirror of independent system claim's body, summarized]."*
>
> *"In a further aspect, a non-transitory computer-readable medium storing instructions for [doing X] is provided, the instructions when executed by one or more computers cause the one or more computers to perform operations comprising [mirror of medium claim's body, summarized]."*

Each aspect should map to a corresponding independent claim. Three aspects, three claim forms (method/system/medium), summary symmetry.

After the aspects, follow with an **advantages statement**:

> *"Specific implementations of the techniques described herein may provide one or more of the following advantages."*

Then enumerate the advantages — each advantage in a separate sentence or bullet, framed as benefits enabled by the techniques rather than claims of what the invention "does." Frame advantages as enabled possibilities, not guarantees:

> *"Implementations can perform [X] more efficiently."* ✓
> *"The invention performs [X] more efficiently."* ✗ (over-claims; ties to claim construction)

### Embodiment phrasing

When introducing alternative configurations, use these phrasings in approximately this order of preference:

- **`In some implementations,`** — preferred default
- **`In some embodiments,`** — acceptable equivalent
- **`In other implementations,`** — for variations
- **`In a further implementation,`** — for additional variations
- **`In particular embodiments,`** — for narrower or specific cases
- **`In further aspects,`** — for additional inventive variations
- **`In one example,`** / **`In another example,`** — for concrete illustrations

The variety of phrasings prevents the Detailed Description from reading mechanically and signals to the examiner and to courts that the patent contemplates a wide range of embodiments. **Do not** use only one phrasing throughout — vary to reinforce embodiment breadth.

### Reference numeral integration

Reference numerals in the Detailed Description should be tied to figure labels and used consistently. Two acceptable styles:

**Inline bold:** *"The image processing system **100** receives data characterizing an input image."*

**Parenthetical:** *"a feedforward neural network (100) having a plurality of layers (102) is shown."*

Conventions:
- **First mention** of an element introduces its reference numeral in one of the two styles above.
- **Subsequent mentions** repeat the numeral; do not omit it after introduction.
- Every reference numeral in the spec must correspond to a labeled element in a figure.
- Use the same noun phrase consistently — `the image processing system 100`, not `the image system 100` or `the system 100` after introduction (though `the system` alone is acceptable when context is unambiguous).

### Detailed Description opening boilerplate

A standard opening paragraph for the Detailed Description:

> *"Various embodiments will be described in connection with the figures that follow. For ease of reading, reference numerals are used consistently across the figures to identify equivalent or analogous elements where appropriate."*

This is boilerplate-style language but valuable: it establishes (a) that what follows describes embodiments (not "the invention"), and (b) that reference numeral repetition is intentional, avoiding examiner confusion when a numeral appears in multiple figures.

### Forbidden phrasing

These do not appear in spec text:

**Claim-construction-fragile phrases:**
- `the present invention` — replace with `this specification` or `embodiments described herein`
- `is necessary` / `must` / `requires` — replace with `may include` / `can be configured to` / `is configured to`
- `always` / `never` — replace with `in some implementations` framing
- `the only way` / `the sole approach` — never use; locks scope

**Marketing language:**
- *revolutionary, innovative, breakthrough, best-in-class, cutting-edge*
- *novel, inventive, original* (used as adjectives describing the invention itself — these belong in arguments to the examiner, not in the spec)
- *seamlessly, effortlessly, transparently* (when describing user experience)

**Hedging that creates §112 issues:**
- `approximately`, `about`, `roughly` (without numerical bounds)
- `substantially`, `essentially` (without specific structural reference)

### Specificity in the Detailed Description

The Detailed Description should describe at least one embodiment with concrete specificity — parameter values, sequences, configurations. This satisfies §112(a) enablement and provides fallback positions during prosecution:

> *"In some implementations, units of an intermediate layer may be selectively deactivated with a probability of 0.5, such that on average each unit is enabled during half of the training iterations and deactivated during the remaining half."*

Concrete numbers, ratios, sequences, and configurations strengthen the spec without narrowing the claims (which use generic terms).

### Implementation flexibility language

Use modal verbs to preserve breadth across embodiments:

- **`may`** — most flexible (`the system may include…`)
- **`can`** — slightly more definite (`the system can be configured to…`)
- **`is configured to`** — describes capability without action requirement
- **`includes`** vs. **`comprises`** — `comprises` is preferred in claims; `includes` is fine in spec prose
- **`such as`** — for non-limiting examples (`such as a convolutional layer or a fully-connected layer`)
- **`for example`** / **`e.g.`** — for non-limiting illustration

Avoid: `must`, `requires`, `always`, `is necessary`. These create implicit limitations that examiners and courts can read into all claims.

### Advantages statement template

The advantages statement (after the multi-aspect Summary) follows this template:

> *"Specific implementations of the techniques described herein may provide one or more of the following advantages."*
>
> *"[Advantage 1: framed as an enabled possibility tied to a specific technique]."*
>
> *"[Advantage 2: similar framing]."*

Each advantage should describe a specific technical or operational benefit enabled by the techniques. Avoid:
- Vague advantages (`improved performance` without specifying what improves)
- Marketing claims (`revolutionary efficiency`)
- Universal claims (`solves all problems with X`)

Frame each advantage as enabled by an embodiment, not as a property of "the invention."

### Application checklist for converting an existing specification

When applying these guidelines to an existing patent application:

1. Search and replace `the present invention` → `this specification` or `embodiments described herein`
2. Identify any uses of `must`, `requires`, `always`, `necessary`, `essential`, `only` and either remove or replace with modal-verb framing
3. Identify and remove marketing adjectives (revolutionary, innovative, etc.)
4. Verify that `In some implementations,` and variants appear where embodiments are introduced
5. Verify that every reference numeral in the spec corresponds to a labeled element in the figures
6. Verify that the Summary uses the multi-aspect pattern and includes an advantages statement
7. Verify that the Background identifies a specific problem and describes existing approaches with their limitations (rather than describing the invention)
8. Verify the Detailed Description has the standard opening boilerplate
9. Verify that at least one embodiment is described with concrete specificity (parameter values, sequences, configurations)
10. Verify that the Field section (if present) follows the broad-to-specific one-sentence pattern
