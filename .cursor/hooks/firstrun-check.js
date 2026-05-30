#!/usr/bin/env node
// InventorLab first-run onboarding check (Cursor variant).
//
// Runs as a sessionStart hook. If the current project isn't yet configured
// for InventorLab (no InventorLab section in AGENTS.md or CLAUDE.md), it
// surfaces a getting-started nudge to the agent so the user learns about
// /inventorlab-setup. Once the project is configured it stays silent.
// Errors never disrupt a session — they're swallowed and the hook exits.
'use strict';

const fs = require('fs');
const path = require('path');

try {
  const projectDir = process.env.CURSOR_WORKSPACE_DIR
    || process.env.WORKSPACE_DIR
    || process.env.PWD
    || process.cwd();

  // Either AGENTS.md or CLAUDE.md containing "InventorLab" means the project
  // is already configured. Cursor reads AGENTS.md natively, so AGENTS.md is
  // the canonical check.
  let configured = false;
  for (const filename of ['AGENTS.md', 'CLAUDE.md']) {
    const filePath = path.join(projectDir, filename);
    if (fs.existsSync(filePath)
        && fs.readFileSync(filePath, 'utf8').includes('InventorLab')) {
      configured = true;
      break;
    }
  }

  if (configured) {
    process.exit(0); // already set up — stay silent
  }

  const message = [
    'The InventorLab plugin is installed, but this project has not been',
    'configured for IP tracking yet (no InventorLab section in AGENTS.md',
    'or CLAUDE.md). At a natural point in the conversation, let the user',
    'know InventorLab is active and help them get started.',
    '',
    '- Invoke the inventorlab-setup skill (e.g. /inventorlab-setup, or',
    '  describe what you want — Cursor matches skills by description).',
    '  It adds IP-tracking instructions to AGENTS.md, creates working',
    '  directories, and enables Invention Radar (per-turn IP-aware lens).',
    '',
    'Then mention the main skills available:',
    '  invention-check      scan code for novel, potentially patentable IP',
    '  novelty-check        quick novelty check on a hunch — results either way',
    '  invention-synthesis  find multi-prompt inventions in the Idea Buffer',
    '  disclosure-session   articulate and formalize an existing invention',
    '  ideation-session     divergent brainstorming of new approaches',
    '  patent-draft         draft a provisional patent application',
    '  patent-figures       generate patent figure files',
    '  patent-audit         check a patent application for consistency',
    '  prior-art            search for prior art on a tracked invention',
    '  portfolio            view all IP documents and their status',
    '  whitepaper           generate a technical whitepaper',
    '  ai-inventorship      Q&A on the USPTO Nov 2025 inventorship guidance',
    '  inventorlab-skills   list every skill with usage and guidance',
    '',
    'Keep it concise and friendly. Surface this once; do not repeat it.'
  ].join('\n');

  // Cursor sessionStart hooks pipe stdout to the agent as additional context.
  process.stdout.write(message);
  process.exit(0);
} catch (e) {
  // Onboarding must never break a session.
  process.exit(0);
}
