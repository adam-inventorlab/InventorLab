---
description: Generate patent figure project files from a patent specification. Use when drafting patent applications, creating or updating patent figures, or when the user asks about patent diagrams.
argument-hint: [spec-file]
allowed-tools: Read Glob Grep Write Bash
---

# Patent Figure Generation

> **Required reading before starting:** You MUST read the **Patent Figures** section of `${CLAUDE_PLUGIN_ROOT}/protocols.md` before generating or modifying any figure. It contains the JSON spec (elements, arrows, annotations, lines), figure types, page-sizing/orientation rules, reference-numeral conventions, the generation/visual-review loop, and layout tips. Operating from memory will produce non-conforming figures.

Generate all patent figures as a single InventorLab project file. Read the patent specification, analyze the Detailed Description sections, and produce a `project.json` containing all figures as tabs.

## Input

Read the patent specification at `$ARGUMENTS` (default: `PATENT-APPLICATION.md` in the project root). If not found, ask the user for the path.

## Output

Write the project file to `patent-applications/figures/project.json`.

## Process

1. **Read the spec** — scan all Detailed Description sections and the Brief Description of the Figures
2. **Plan figures** — determine which figures are needed, what type each is, and what it depicts
3. **Lead with simplicity** — if a complex figure exists, create a simpler high-level overview figure first (e.g., a 3-4 box conceptual overview before a detailed system architecture)
4. **Generate the project JSON** — create each figure spec following all conventions below
5. **Visual review loop** — render each figure and review it visually (see below)
6. **Open the figure editor** — launch the editor for review:
   ```bash
   open "${CLAUDE_PLUGIN_ROOT}/docs/figure-editor.html"
   ```
   Tell the user: *"I've opened the figure editor. Import `patent-applications/figures/project.json` to review and adjust all [N] figures."*
7. **Report** — tell the user what was generated

## Visual Review Loop

After generating the project JSON, render each figure to PNG and review it visually. Fix any issues found and re-render until satisfied. **Cap at 3 iterations per figure** to avoid infinite loops.

### How to render
```bash
node "${CLAUDE_PLUGIN_ROOT}/scripts/render-figure.js" patent-applications/figures/project.json --page N --out /tmp/fig-N.png
```
Or render all at once:
```bash
node "${CLAUDE_PLUGIN_ROOT}/scripts/render-figure.js" patent-applications/figures/project.json --all --outdir /tmp/fig-renders/
```

### What to check in each rendered image
- **Overlapping elements** — boxes/labels/annotations on top of each other. Fix: adjust positions.
- **Text overflow** — labels cut off or extending beyond box boundaries. Fix: increase box width/height or shorten label.
- **Crowded areas** — elements too close together. Fix: spread positions apart.
- **Bad connector routes** — connectors taking bizarre paths, crossing through boxes, or overlapping each other. Fix: set `fromAnchor`/`toAnchor` to pin the route, or add `waypoints` for manual routing.
- **Off-screen elements** — content positioned outside the visible area. Fix: adjust positions to fit within width/height.
- **Missing FIG. label** — the "FIG. N" annotation at the bottom. Fix: add it.
- **Missing encompassing numeral** — the "N00" annotation at top-left. Fix: add it.
- **Diamond too small for text** — decision diamonds with text overflowing. Fix: increase width/height.
- **Annotation misplacement** — explanatory text far from what it describes. Fix: reposition.

### How to fix connector routing issues
When a connector takes a bad route, you have two tools:
- **Pin anchors**: Set `fromAnchor` and/or `toAnchor` on the arrow to force which side of the element the connector exits/enters. This constrains the router to that anchor pairing.
- **Manual waypoints**: Add `waypoints: [[x1,y1], [x2,y2], ...]` to force the connector through specific intermediate points. The router uses these directly instead of auto-routing.

Example — force a connector to exit the bottom of box A and enter the left of box B:
```json
{ "from": "302", "to": "304", "fromAnchor": "bottom", "toAnchor": "left" }
```

Example — force a connector through a specific corridor:
```json
{ "from": "302", "to": "304", "waypoints": [[400, 300], [400, 500], [600, 500]] }
```

## Project File Format

```json
{
  "type": "inventorlab-project",
  "pages": [
    {
      "name": "FIG. 1 — Title",
      "spec": { "title": "...", "width": 900, "height": 750, "elements": [], "arrows": [], "annotations": [], "lines": [] }
    }
  ]
}
```

## Lessons Learned (READ THIS FIRST)

Before generating any figures, review past mistakes and their fixes:
!`cat "${CLAUDE_PLUGIN_ROOT}/skills/patent-figures/lessons.md"`

## Figure Conventions

Reference the conventions file for complete details:
!`cat "${CLAUDE_PLUGIN_ROOT}/docs/agents-md-snippet.md"`

## Quick Reference

### Figure Types (every figure must be one of these)
1. **System Diagram** — architecture, components, nesting, data flow
2. **Flowchart** — top-to-bottom logic, diamonds for decisions, verb-based labels
3. **Conceptual Framework** — hybrid showing a concrete scenario through system components
4. **Swimlane Diagram** — sequence/responsibility with horizontal lanes
5. **Data Structure Diagram** — schemas, relationships, embeddings, transformations

### Numbering
- FIG. N encompassing numeral = N * 100 (reserved, not assigned to any element)
- Element IDs start at N02, increment by 2: N02, N04, N06...
- Add encompassing numeral as annotation: `{ "text": "N00", "position": [40, 40], "fontSize": 11, "bold": true }`
- Add figure label as annotation: `{ "text": "FIG. N", "position": [center_x, bottom_y], "fontSize": 24, "bold": true }`

### Diamond Anchors (ALWAYS set for diamonds)
- **top** = input entering the decision
- **bottom** = "yes" / primary branch (`fromAnchor: "bottom"`)
- **right** = "no" / secondary branch (`fromAnchor: "right"`)
- Always label diamond branches on the connector

### Multi-line Text
Use `\n` in JSON strings for line breaks in annotations and connector labels.

### Connectors
- `tips`: `"end"` (default arrow), `"start"`, `"both"`, `"none"`
- `style`: `"solid"` (default), `"dashed"` (optional/async paths)
- Label all connectors that carry meaningful data flow

### Layout
- Leave 50px at bottom for FIG. label
- Flowcharts flow top-to-bottom
- Swimlanes use horizontal dashed lines with bold lane labels at left
- Keep connected elements close; the auto-router handles orthogonal paths

### Critical Layout Rules (learned from experience)

**NEVER use `parent`/`row` fields for flowcharts.** The auto-layout engine rearranges children into flat rows and overrides your positioning. Instead:
- Position all elements manually with explicit `[x, y]` coordinates
- Use **dashed lines** and **bold annotations** to visually group related elements (e.g., "PRE-SURVEY" label + dashed separator lines above and below the group)
- This gives you full control over the 2D layout

**Every element must have at least one connector.** Orphaned elements (no arrows connected) look broken. If elements are part of a group doing parallel work, connect them:
- Parallel activities in a group: connect from the predecessor to EACH parallel element, then from EACH to the successor
- Sequential activities: chain them with arrows

**Container boxes cause problems.** If you need to group elements visually:
- DO: Use dashed separator lines + bold annotation labels
- DON'T: Use large dashed boxes with children inside — the auto-layout will rearrange them

**Size figures to content.** Don't use 900x900 by default. Narrow figures (600-700px wide) with proper vertical spacing look better than wide sparse ones.

**Diamond routing.** The "yes" (primary) branch exits `fromAnchor: "bottom"`. The "no" or loop-back exits `fromAnchor: "right"`. When the right exit loops back up to a previous element, set `toAnchor: "right"` on the target too so the connector routes cleanly around the right side.
