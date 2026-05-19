# Figure Generation — Lessons Learned

This file is read by the `/patent-figures` skill every time it generates figures. Each entry documents a mistake that was made and the fix that resolved it. **Check these before generating figures to avoid repeating past errors.**

---

### 1. Container parent references break on renumbering
**Mistake:** After renumbering figures (e.g., FIG. 5 → FIG. 6), child elements had `parent: "506"` instead of `parent: "606"`. The parent ID referenced a non-existent element, so children floated outside their containers.
**Fix:** When renumbering figures, always update `parent` fields on all child elements to match the new parent ID. Better yet: avoid `parent` fields entirely (see lesson #2).

### 2. Auto-layout flattens parent/child elements into single rows
**Mistake:** Used `parent` and `row` fields to create 2-column grids inside containers. The `layoutPass()` function detected spatial containment and rearranged all children into a single horizontal row, ignoring the intended 2-column layout.
**Fix:** Never use `parent`/`row`/`layout` fields for flowcharts. Instead, position all elements manually with explicit `[x, y]` coordinates and use **dashed separator lines + bold annotation labels** to visually group elements. This gives full control over layout.

### 3. Dashed container boxes cause the same auto-layout problem
**Mistake:** Used large dashed-border boxes as visual containers with children positioned inside. Even without `parent` fields, the auto-layout detected that smaller elements were spatially inside larger ones and rearranged them.
**Fix:** Don't use container boxes at all for grouping in flowcharts. Use dashed lines (horizontal separators) and bold text annotations for section labels. Example:
```json
{ "text": "PRE-SURVEY", "position": [80, 195], "fontSize": 9, "bold": true }
```
With lines:
```json
{ "points": [[70, 185], [550, 185]], "style": "dashed" }
```

### 4. Orphaned elements — children with no connectors
**Mistake:** Put elements inside containers but didn't connect them with arrows. They rendered but looked broken — floating boxes with no relationship to the flow.
**Fix:** Every element must have at least one connector. For parallel activities in a group, connect from the predecessor to EACH parallel element, then from EACH to the successor. If elements represent parallel options, use dashed connectors with `tips: "none"` between them.

### 5. Loop-back connectors don't render when routing backwards
**Mistake:** Created a connector from a diamond (lower in the figure) back up to an earlier element (higher in the figure) using `fromAnchor: "right"` and `toAnchor: "right"`. The connector existed in the JSON but didn't render visibly.
**Fix:** This appears to be a router limitation with backward-routing connectors. Workarounds:
- Route the loop-back to a CLOSER target (the element just above the diamond rather than one much higher)
- Use the LEFT side instead of the right for loop-backs
- Add explicit `waypoints` with coordinates that clear all obstacles
- As a last resort, the user can add the loop-back manually in the editor

### 6. Figure width should match content, not default to 900
**Mistake:** Used `"width": 900` for all figures regardless of content. Narrow flowcharts looked sparse with too much horizontal whitespace.
**Fix:** Size figures to content. Narrow flowcharts work well at 600-700px wide. Only use 900+ for wide system diagrams or swimlane diagrams with many parallel lanes.

### 7. Diamond text overflow
**Mistake:** Created diamonds with default size (100x70) but multi-line text that didn't fit inside the diamond shape's inscribed rectangle.
**Fix:** Diamonds need more space than boxes for the same text. The usable text area is ~65% of the diamond's width/height. Use at least 130x80 for two-line text, 140x90 for three lines. The editor auto-grows diamonds, but starting larger avoids layout surprises.

### 8. FIG. label overlapping with content
**Mistake:** Placed the "FIG. N" annotation too close to the last element, causing overlap.
**Fix:** Leave at least 60px between the bottom of the last element and the FIG. label. Set the figure `height` accordingly.

### 9. Annotations should use \n for line breaks, not \\n
**Mistake:** Used literal `\\n` in annotation text, which rendered as the characters "\n" instead of a line break.
**Fix:** Use actual `\n` (JSON escape sequence for newline). In JSON: `"text": "line one\nline two"`. The figure editor splits on `\n` and renders each line as a separate `<tspan>`.

### 10. Diamond branch conventions matter for readability
**Mistake:** Inconsistent use of diamond exit points — sometimes "yes" went bottom, sometimes right.
**Fix:** Always follow the convention:
- **top** = input entering the decision
- **bottom** = "yes" / primary / continue branch
- **right** = "no" / secondary / exit branch
- Always set `fromAnchor` on diamond connectors
- Always label both branches

### 11. Figures must fit on an 8.5×11 page with USPTO margins
**Mistake:** Elements were positioned in an unbounded coordinate space (up to 900+ px wide) and relied on content-based export. This made figures inconsistent in size and hard to print.
**Fix:** Each figure is a US Letter page at 72 DPI. Margins per USPTO 37 CFR 1.84(g): top 71px, left 71px, right 43px, bottom 28px. Drawable area:
- **Landscape** (792×612): x 80–740, y 120–540
- **Portrait** (612×792): x 80–560, y 120–710
Set `"orientation"` on both the page and spec objects. The encompassing numeral goes centered at top (`[396, 82]` landscape / `[306, 82]` portrait). FIG. N label goes centered at bottom (`[396, 578]` / `[306, 755]`). All element positions and sizes must fit within the drawable area.

### 12. Box sizes should be compact — size to label text
**Mistake:** Boxes were 130-190px wide regardless of label length, making figures look sparse and wasting page space.
**Fix:** Size boxes to their label text: 1-word → 70-90px, 2-word → 90-120px, 3-word → 100-130px. Let text wrap rather than making wide boxes. Heights: 30-40px single-line, 45-55px wrapped. The editor auto-grows boxes to fit text, so specifying compact sizes in JSON is safe — the editor won't shrink below what the text needs.

### 13. Use short labels in figures
**Mistake:** Box labels repeated full component names (e.g., "Adaptive Multi-Stage Request Throttling Subsystem"), making boxes unnecessarily large and crowding the page.
**Fix:** Shorten labels for figures (e.g., "Throttling Subsystem"). Use the full name in the specification text. The reference numeral ties the short label to its full description. Aim for 1-3 word labels.

### 14. Only two annotations per figure
**Mistake:** Figures had 4-9 annotations with explanatory text (phase labels, descriptions, callouts). These cluttered the drawing, got occluded by connectors, and duplicated information from the spec.
**Fix:** Only include two annotations: the encompassing numeral (e.g., "100") and the "FIG. N" label. All explanatory detail belongs in the specification text. Clean figures: labeled boxes, reference numerals, connectors, nothing else.

### 15. Minimum 24px gap between connected elements
**Mistake:** Elements were positioned too close together (5-23px edge-to-edge), causing connectors to render as tiny stubs or not appear at all.
**Fix:** Maintain at least 30px edge-to-edge gap between all connected elements (24px absolute minimum). The orthogonal router needs space to draw segments. When a figure is too cramped vertically, either switch to portrait orientation or rearrange elements horizontally.

### 16. Connector rendering failures
**Observations from debugging:** Connectors may not render visually when:
- Elements are too close together (< 24px gap) — the router produces zero-length segments
- The `from` or `to` ID doesn't match any element in the figure — silent failure
- Elements overlap — the router can't find a path around them
- Backward-routing connectors (from lower to higher element) can fail with some anchor combinations
**Pre-flight check:** Before finalizing a figure, verify that every arrow's `from` and `to` IDs exist in the elements array, and that connected elements have adequate spacing. Run the audit script to catch issues programmatically.

### 17. Container save bug — layout overrides manual changes
**Mistake:** After manually resizing a container in the editor, saving and reimporting would reset the container to its auto-calculated size because `loadSpec` sets `_layoutDone = false`, triggering `layoutPass()` which recalculated container dimensions.
**Fix:** The layout pass now only *grows* containers (never shrinks), and no longer re-centers parents on their children. Manual position and size changes persist through save/load cycles.

### 18. Visual self-correction loop
**Best practice:** After generating figures programmatically, render them to PNG using the headless Puppeteer renderer (`node "${CLAUDE_PLUGIN_ROOT}/scripts/render-figure.js" --all --outdir ./renders/`) and visually inspect each one. Look for:
- Missing connectors (from/to ID mismatches or too-close elements)
- Elements outside the page bounds (gray area visible)
- Overlapping text (connector labels crossing element labels)
- Orphan elements (boxes with no connectors)
- Cramped layouts that would benefit from portrait orientation
Fix issues in the JSON, re-render, and re-inspect. This loop catches problems that JSON auditing alone misses.
