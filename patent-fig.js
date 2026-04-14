#!/usr/bin/env node
// patent-fig.js — Patent figure renderer.
// Takes a JSON spec and outputs clean SVG following patent drawing conventions.
// Usage: node patent-fig.js <spec.json> [output.svg]
//        node patent-fig.js --example > example-spec.json

const fs = require('fs');
const path = require('path');

// ── Drawing constants (patent conventions) ──
const DEFAULTS = {
  canvasWidth: 960,
  canvasHeight: 720,
  padding: 40,
  boxWidth: 160,
  boxHeight: 50,
  boxRadius: 0,
  fontSize: {
    title: 14,
    label: 11,
    numeral: 10,
    annotation: 9,
    legend: 9,
  },
  colors: {
    stroke: '#111',
    fill: 'none',
    text: '#111',
    numeral: '#555',
    annotation: '#777',
    legendBg: '#f8f8f8',
    legendBorder: '#ddd',
  },
  strokeWidth: {
    box: 1.5,
    arrow: 1.5,
    dashed: 1,
    axis: 1,
  },
  arrowSize: { width: 10, height: 7 },
  spacing: { groupGap: 40 },
};

// ── SVG helpers ──

function escapeXml(s) {
  return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function makeArrowMarkers() {
  return `  <defs>
    <marker id="ah" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="${DEFAULTS.colors.stroke}"/>
    </marker>
    <marker id="ah-s" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="${DEFAULTS.colors.stroke}"/>
    </marker>
    <marker id="ah-r" markerWidth="10" markerHeight="7" refX="1" refY="3.5" orient="auto">
      <polygon points="10 0, 0 3.5, 10 7" fill="${DEFAULTS.colors.stroke}"/>
    </marker>
  </defs>`;
}

function renderBox(el, opts = {}) {
  const w = el.width || DEFAULTS.boxWidth;
  const h = el.height || DEFAULTS.boxHeight;
  const [cx, cy] = el.position;
  const x = cx - w / 2;
  const y = cy - h / 2;
  const r = el.radius || DEFAULTS.boxRadius;
  const dashed = el.style === 'dashed' ? ` stroke-dasharray="5,3"` : '';
  const sw = el.style === 'dashed' ? DEFAULTS.strokeWidth.dashed : DEFAULTS.strokeWidth.box;
  const fill = el.fill || DEFAULTS.colors.fill;

  let svg = `  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${DEFAULTS.colors.stroke}" stroke-width="${sw}"${dashed}/>`;

  // Label
  const labelY = el.id ? cy - 3 : cy + 4;
  svg += `\n  <text x="${cx}" y="${labelY}" text-anchor="middle" font-size="${DEFAULTS.fontSize.label}" font-weight="bold" fill="${DEFAULTS.colors.text}">${escapeXml(el.label)}</text>`;

  // Reference numeral
  if (el.id) {
    svg += `\n  <text x="${cx}" y="${labelY + 16}" text-anchor="middle" font-size="${DEFAULTS.fontSize.numeral}" fill="${DEFAULTS.colors.numeral}">${el.id}</text>`;
  }

  // Subtitle
  if (el.subtitle) {
    const subY = el.id ? labelY + 28 : labelY + 16;
    svg += `\n  <text x="${cx}" y="${subY}" text-anchor="middle" font-size="${DEFAULTS.fontSize.annotation}" fill="${DEFAULTS.colors.annotation}">${escapeXml(el.subtitle)}</text>`;
  }

  return svg;
}

function getAnchorPoint(el, direction) {
  const w = el.width || DEFAULTS.boxWidth;
  const h = el.height || DEFAULTS.boxHeight;
  const [cx, cy] = el.position;
  switch (direction) {
    case 'top':    return [cx, cy - h / 2];
    case 'bottom': return [cx, cy + h / 2];
    case 'left':   return [cx - w / 2, cy];
    case 'right':  return [cx + w / 2, cy];
    default:       return [cx, cy];
  }
}

function inferAnchors(fromEl, toEl) {
  const [fx, fy] = fromEl.position;
  const [tx, ty] = toEl.position;
  const dx = tx - fx;
  const dy = ty - fy;

  // Pick the best anchor pair based on relative position
  if (Math.abs(dx) > Math.abs(dy)) {
    // Horizontal dominant
    return dx > 0
      ? { from: 'right', to: 'left' }
      : { from: 'left', to: 'right' };
  } else {
    // Vertical dominant
    return dy > 0
      ? { from: 'bottom', to: 'top' }
      : { from: 'top', to: 'bottom' };
  }
}

function renderArrow(arrow, elementsById) {
  const fromEl = elementsById[arrow.from];
  const toEl = elementsById[arrow.to];
  if (!fromEl || !toEl) return `<!-- Arrow error: ${arrow.from} → ${arrow.to} (element not found) -->`;

  const anchors = arrow.anchors || inferAnchors(fromEl, toEl);
  const [x1, y1] = getAnchorPoint(fromEl, anchors.from);
  const [x2, y2] = getAnchorPoint(toEl, anchors.to);

  const style = arrow.style || 'solid';
  const sw = style === 'dashed' ? DEFAULTS.strokeWidth.dashed : DEFAULTS.strokeWidth.arrow;
  const dashAttr = style === 'dashed' ? ' stroke-dasharray="5,3"' : style === 'long-dash' ? ' stroke-dasharray="8,4"' : '';
  const marker = style === 'dashed' ? 'ah-s' : 'ah';
  const bidir = arrow.bidirectional ? ` marker-start="url(#ah-r)"` : '';

  let svg = '';

  if (arrow.waypoints?.length) {
    // Curved path through waypoints
    const points = [[x1, y1], ...arrow.waypoints, [x2, y2]];
    let d = `M ${points[0][0]} ${points[0][1]}`;
    if (points.length === 3) {
      d += ` Q ${points[1][0]} ${points[1][1]} ${points[2][0]} ${points[2][1]}`;
    } else {
      for (let i = 1; i < points.length; i++) {
        d += ` L ${points[i][0]} ${points[i][1]}`;
      }
    }
    svg = `  <path d="${d}" fill="none" stroke="${DEFAULTS.colors.stroke}" stroke-width="${sw}"${dashAttr} marker-end="url(#${marker})"${bidir}/>`;
  } else {
    svg = `  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${DEFAULTS.colors.stroke}" stroke-width="${sw}"${dashAttr} marker-end="url(#${marker})"${bidir}/>`;
  }

  // Arrow label
  if (arrow.label) {
    const mx = (x1 + x2) / 2 + (arrow.labelOffset?.[0] || 0);
    const my = (x1 === x2 ? (y1 + y2) / 2 : (y1 + y2) / 2 - 8) + (arrow.labelOffset?.[1] || 0);
    svg += `\n  <text x="${mx}" y="${my}" text-anchor="middle" font-size="${DEFAULTS.fontSize.annotation}" fill="${DEFAULTS.colors.annotation}" font-style="italic">${escapeXml(arrow.label)}</text>`;
  }

  return svg;
}

function renderAnnotation(ann) {
  const [x, y] = ann.position;
  const lines = Array.isArray(ann.text) ? ann.text : [ann.text];
  let svg = '';
  lines.forEach((line, i) => {
    svg += `  <text x="${x}" y="${y + i * 13}" text-anchor="${ann.anchor || 'middle'}" font-size="${ann.fontSize || DEFAULTS.fontSize.annotation}" fill="${ann.color || DEFAULTS.colors.annotation}"${ann.bold ? ' font-weight="bold"' : ''}${ann.italic ? ' font-style="italic"' : ''}>${escapeXml(line)}</text>\n`;
  });
  return svg;
}

function renderLine(line) {
  const dashAttr = line.style === 'dashed' ? ' stroke-dasharray="6,4"' : '';
  return `  <line x1="${line.from[0]}" y1="${line.from[1]}" x2="${line.to[0]}" y2="${line.to[1]}" stroke="${line.color || DEFAULTS.colors.stroke}" stroke-width="${line.strokeWidth || DEFAULTS.strokeWidth.axis}"${dashAttr}/>`;
}

function renderGroup(group, elementsById) {
  const [x, y] = group.position;
  const w = group.width;
  const h = group.height;
  const dashAttr = group.style === 'dashed' ? ' stroke-dasharray="6,4"' : '';
  let svg = `  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${group.radius || 4}" fill="${group.fill || 'none'}" stroke="${group.stroke || DEFAULTS.colors.legendBorder}" stroke-width="1"${dashAttr}/>`;
  if (group.label) {
    svg += `\n  <text x="${x + 12}" y="${y + 16}" font-size="${DEFAULTS.fontSize.annotation}" font-weight="bold" fill="${DEFAULTS.colors.text}">${escapeXml(group.label)}</text>`;
  }
  return svg;
}

function renderLegend(legend, startY) {
  if (!legend?.length) return '';
  const x = DEFAULTS.padding;
  const w = DEFAULTS.canvasWidth - DEFAULTS.padding * 2;
  const h = legend.length * 24 + 20;
  let svg = `  <rect x="${x}" y="${startY}" width="${w}" height="${h}" rx="6" fill="${DEFAULTS.colors.legendBg}" stroke="${DEFAULTS.colors.legendBorder}" stroke-width="1"/>\n`;
  svg += `  <text x="${x + 16}" y="${startY + 18}" font-size="${DEFAULTS.fontSize.legend}" font-weight="bold" fill="${DEFAULTS.colors.text}">Legend:</text>\n`;

  legend.forEach((item, i) => {
    const ly = startY + 38 + i * 24;
    const dashAttr = item.style === 'dashed' ? ' stroke-dasharray="5,3"' : item.style === 'long-dash' ? ' stroke-dasharray="8,4"' : '';
    const marker = item.style === 'dashed' ? 'ah-s' : 'ah';
    svg += `  <line x1="${x + 16}" y1="${ly}" x2="${x + 56}" y2="${ly}" stroke="${DEFAULTS.colors.stroke}" stroke-width="${item.style === 'dashed' ? 1 : 1.5}"${dashAttr} marker-end="url(#${marker})"/>\n`;
    svg += `  <text x="${x + 68}" y="${ly + 4}" font-size="${DEFAULTS.fontSize.legend}" fill="${DEFAULTS.colors.numeral}">${escapeXml(item.label)}</text>\n`;
  });

  return svg;
}

// ── Main render ──

function render(spec) {
  const width = spec.width || DEFAULTS.canvasWidth;
  const height = spec.height || DEFAULTS.canvasHeight;

  // Override defaults if spec provides them
  if (spec.boxWidth) DEFAULTS.boxWidth = spec.boxWidth;
  if (spec.boxHeight) DEFAULTS.boxHeight = spec.boxHeight;

  // Build element lookup
  const elementsById = {};
  for (const el of spec.elements || []) {
    elementsById[el.id || el.label] = el;
  }

  const parts = [];

  // Header
  parts.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" font-family="Arial, Helvetica, sans-serif">`);
  parts.push(`  <rect width="${width}" height="${height}" fill="white"/>`);
  parts.push(makeArrowMarkers());

  // Title
  if (spec.title) {
    parts.push(`  <text x="${width / 2}" y="28" text-anchor="middle" font-size="${DEFAULTS.fontSize.title}" font-weight="bold" fill="${DEFAULTS.colors.text}">${escapeXml(spec.title)}</text>`);
  }

  // Groups (render first, behind elements)
  for (const group of spec.groups || []) {
    parts.push(renderGroup(group, elementsById));
  }

  // Lines (axes, separators)
  for (const line of spec.lines || []) {
    parts.push(renderLine(line));
  }

  // Elements (boxes)
  for (const el of spec.elements || []) {
    parts.push(renderBox(el));
  }

  // Arrows
  for (const arrow of spec.arrows || []) {
    parts.push(renderArrow(arrow, elementsById));
  }

  // Annotations
  for (const ann of spec.annotations || []) {
    parts.push(renderAnnotation(ann));
  }

  // Legend
  if (spec.legend) {
    const legendY = spec.legendY || (height - 100);
    parts.push(renderLegend(spec.legend, legendY));
  }

  parts.push('</svg>');
  return parts.join('\n');
}

// ── Example spec ──

function exampleSpec() {
  return {
    title: "FIG. 2 — The Reflexive Knowledge Construction Loop",
    width: 920,
    height: 650,
    elements: [
      { id: "200", label: "Discourse Input", position: [200, 85] },
      { id: "202", label: "Context Assembly", position: [460, 85] },
      { id: "204", label: "Graph Retrieval", position: [700, 180] },
      { id: "206", label: "Reasoning Model", position: [640, 300] },
      { id: "208", label: "Response Output", position: [830, 300], width: 120 },
      { id: "210", label: "Graph Mutations", position: [400, 370] },
      { id: "212", label: "Graph Database", position: [160, 260] },
      { id: "218", label: "Associative Notes", position: [420, 210], style: "dashed" },
      { id: "220", label: "Autonomous Exploration", position: [160, 400], width: 180 },
    ],
    arrows: [
      { from: "200", to: "202" },
      { from: "202", to: "204", waypoints: [[620, 120]] },
      { from: "204", to: "206", waypoints: [[690, 250]] },
      { from: "206", to: "208" },
      { from: "206", to: "210", waypoints: [[520, 360]] },
      { from: "210", to: "212", waypoints: [[270, 360]] },
      { from: "212", to: "204", waypoints: [[350, 160]], label: "retrieval from graph AI constructed" },
      { from: "206", to: "218", style: "dashed", waypoints: [[510, 240]], label: "authored during reasoning", labelOffset: [30, 0] },
      { from: "218", to: "202", style: "dashed", label: "surfaced by similarity in later sessions", labelOffset: [-30, -5] },
      { from: "220", to: "212", anchors: { from: "top", to: "bottom" }, bidirectional: true, label: "independent of discourse input", labelOffset: [-70, 0] },
    ],
    lines: [
      { from: [60, 470], to: [860, 470] },
      { from: [460, 445], to: [460, 500], style: "dashed" },
    ],
    annotations: [
      { text: "Session N (214)", position: [250, 492], bold: true },
      { text: "Session N+1 (216)", position: [660, 492], bold: true },
      { text: "mutations persist across sessions", position: [600, 445], italic: true },
    ],
    legend: [
      { style: "solid", label: "Primary data flow" },
      { style: "dashed", label: "Associative memory flow (passive, similarity-based)" },
      { style: "long-dash", label: "Cross-session persistence" },
    ],
    legendY: 530,
  };
}

// ── CLI ──

if (require.main === module) {
  const args = process.argv.slice(2);

  if (args[0] === '--example') {
    console.log(JSON.stringify(exampleSpec(), null, 2));
    process.exit(0);
  }

  if (args[0] === '--help' || !args[0]) {
    console.log('Usage:');
    console.log('  node patent-fig.js <spec.json> [output.svg]   Render a figure');
    console.log('  node patent-fig.js --example                  Print example spec JSON');
    console.log('  node patent-fig.js --example | node patent-fig.js /dev/stdin out.svg');
    process.exit(0);
  }

  const specPath = args[0];
  const spec = JSON.parse(fs.readFileSync(specPath, 'utf-8'));
  const svg = render(spec);

  if (args[1]) {
    fs.writeFileSync(args[1], svg);
    console.log(`Wrote ${args[1]}`);
  } else {
    console.log(svg);
  }
}

module.exports = { render, exampleSpec, DEFAULTS };
