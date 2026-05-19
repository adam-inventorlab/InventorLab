#!/usr/bin/env node
// InventorLab first-run onboarding check.
//
// Runs as a SessionStart hook. If the current project has not yet been
// configured for InventorLab (no InventorLab section in CLAUDE.md), it
// surfaces a getting-started nudge so the user discovers /inventorlab-setup.
// Once the project is configured it stays silent. It never disrupts a
// session: any error is swallowed and the hook exits cleanly.
'use strict';

const fs = require('fs');
const path = require('path');

try {
  const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
  const claudeMd = path.join(projectDir, 'CLAUDE.md');

  let configured = false;
  if (fs.existsSync(claudeMd)) {
    configured = fs.readFileSync(claudeMd, 'utf8').includes('InventorLab');
  }

  if (configured) {
    process.exit(0); // already set up — stay silent
  }

  const message = [
    'The InventorLab plugin is installed, but this project has not been',
    'configured for IP tracking yet (no InventorLab section in CLAUDE.md).',
    'At a natural point in the conversation, let the user know InventorLab',
    'is active and help them get started:',
    '',
    '- Run /inventorlab-setup to configure this project. It adds IP-tracking',
    '  instructions to CLAUDE.md, creates the working directories, and',
    '  enables Invention Radar (background novelty detection as they code).',
    '',
    'Then mention the main commands available:',
    '  /invention-check     scan code for novel, potentially patentable IP',
    '  /disclosure-session  articulate and formalize an existing invention',
    '  /ideation-session    divergent brainstorming of new approaches',
    '  /patent-draft        draft a provisional patent application',
    '  /patent-figures      generate patent figure files',
    '  /patent-audit        check a patent application for consistency',
    '  /prior-art           search for prior art on a tracked invention',
    '  /portfolio           view all IP documents and their status',
    '  /whitepaper          generate a technical whitepaper',
    '',
    'Keep it concise and friendly. Surface this once; do not repeat it.'
  ].join('\n');

  process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'SessionStart',
      additionalContext: message
    }
  }));
  process.exit(0);
} catch (e) {
  // Onboarding must never break a session.
  process.exit(0);
}
