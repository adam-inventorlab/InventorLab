#!/usr/bin/env node
// render-figure.js
// Renders a figure JSON (or project JSON) to PNG images using Puppeteer.
// Usage:
//   node render-figure.js <input.json> [--page N] [--out output.png]
//   node render-figure.js project.json --all --outdir ./renders/
//
// Requires: npm install puppeteer (peer dependency)

const fs = require('fs');
const path = require('path');

async function renderFigure(editorPath, spec, outputPath, opts = {}) {
  let puppeteer;
  try {
    puppeteer = require('puppeteer');
  } catch {
    console.error('Puppeteer is required. Install with: npm install puppeteer');
    process.exit(1);
  }

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 1000 });

  // Load the figure editor
  const editorUrl = 'file://' + path.resolve(editorPath);
  await page.goto(editorUrl, { waitUntil: 'networkidle0', timeout: 15000 });

  // Inject the spec and render — no optimization, JSON is the source of truth
  await page.evaluate((specJson) => {
    const spec = JSON.parse(specJson);
    loadSpec(spec);

    // Deselect everything
    if (typeof selectElement === 'function') selectElement(null);

    // Fit to screen
    if (typeof fitToScreen === 'function') fitToScreen();

    // Render
    if (typeof render === 'function') render();
  }, JSON.stringify(spec));

  // Wait for rendering to settle
  await new Promise(r => setTimeout(r, 500));

  // Compute content bounds and crop
  const bounds = await page.evaluate(() => {
    const svg = document.getElementById('canvas');
    if (!svg) return null;
    // Get all non-background elements
    const els = Array.from(svg.children).slice(5); // skip defs, bg-gray, page-rect, grid-rect, margin-rect
    if (els.length === 0) return null;

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const el of els) {
      try {
        const bbox = el.getBBox();
        if (bbox.width === 0 && bbox.height === 0) continue;
        minX = Math.min(minX, bbox.x);
        minY = Math.min(minY, bbox.y);
        maxX = Math.max(maxX, bbox.x + bbox.width);
        maxY = Math.max(maxY, bbox.y + bbox.height);
      } catch {}
    }
    if (minX === Infinity) return null;
    return { minX, minY, maxX, maxY };
  });

  if (bounds) {
    // Set viewBox to content bounds with padding
    const PAD = 30;
    await page.evaluate((b, pad) => {
      const svg = document.getElementById('canvas');
      const vw = b.maxX - b.minX + pad * 2;
      const vh = b.maxY - b.minY + pad * 2;
      svg.setAttribute('viewBox', `${b.minX - pad} ${b.minY - pad} ${vw} ${vh}`);

      // Resize the canvas-wrap to match aspect ratio
      const wrap = document.getElementById('canvas-wrap');
      const scale = Math.min(1400 / vw, 1000 / vh);
      wrap.style.width = (vw * scale) + 'px';
      wrap.style.height = (vh * scale) + 'px';
    }, bounds, PAD);

    await new Promise(r => setTimeout(r, 200));
  }

  // Screenshot the canvas area
  const canvasEl = await page.$('#canvas-wrap');
  if (canvasEl) {
    await canvasEl.screenshot({ path: outputPath, type: 'png' });
  } else {
    await page.screenshot({ path: outputPath, type: 'png' });
  }

  await browser.close();
  return outputPath;
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('Usage: node render-figure.js <input.json> [--page N] [--out output.png] [--all --outdir ./renders/]');
    process.exit(1);
  }

  const inputFile = args[0];
  const pageNum = args.indexOf('--page') >= 0 ? parseInt(args[args.indexOf('--page') + 1]) : null;
  const outFile = args.indexOf('--out') >= 0 ? args[args.indexOf('--out') + 1] : null;
  const renderAll = args.includes('--all');
  const outDir = args.indexOf('--outdir') >= 0 ? args[args.indexOf('--outdir') + 1] : './renders';

  // Find the figure editor HTML
  const editorPaths = [
    path.join(__dirname, '..', 'docs', 'figure-editor.html'),
    path.join(process.cwd(), 'docs', 'inventorlab', 'figure-editor.html'),
    path.join(process.cwd(), 'figure-editor.html'),
  ];
  const editorPath = editorPaths.find(p => fs.existsSync(p));
  if (!editorPath) {
    console.error('Cannot find figure-editor.html. Searched:', editorPaths);
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));

  if (raw.type === 'inventorlab-project' && raw.pages) {
    // Project file
    if (renderAll) {
      if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
      for (let i = 0; i < raw.pages.length; i++) {
        const pg = raw.pages[i];
        const name = (pg.name || `page-${i + 1}`).replace(/[^a-zA-Z0-9_-]/g, '_');
        const out = path.join(outDir, `${name}.png`);
        console.log(`Rendering page ${i + 1}/${raw.pages.length}: ${pg.name}...`);
        await renderFigure(editorPath, pg.spec, out);
        console.log(`  → ${out}`);
      }
    } else if (pageNum !== null) {
      const pg = raw.pages[pageNum - 1];
      if (!pg) { console.error(`Page ${pageNum} not found (${raw.pages.length} pages)`); process.exit(1); }
      const out = outFile || `figure-${pageNum}.png`;
      await renderFigure(editorPath, pg.spec, out);
      console.log(out);
    } else {
      console.log(`Project with ${raw.pages.length} pages. Use --page N or --all`);
      raw.pages.forEach((pg, i) => console.log(`  ${i + 1}. ${pg.name}`));
    }
  } else {
    // Single figure
    const out = outFile || 'figure.png';
    await renderFigure(editorPath, raw, out);
    console.log(out);
  }
}

main().catch(err => { console.error(err); process.exit(1); });
