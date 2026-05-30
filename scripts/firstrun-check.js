#!/usr/bin/env node
// InventorLab first-run onboarding check.
//
// Runs as a SessionStart hook. If the current project has not yet been
// configured for InventorLab (no InventorLab section in AGENTS.md or
// CLAUDE.md), it surfaces a getting-started nudge so the user discovers
// /inventorlab-setup. Once the project is configured it stays silent.
// It never disrupts a session: any error is swallowed and the hook
// exits cleanly.
'use strict';

const fs = require('fs');
const path = require('path');

try {
  const projectDir = process.env.CLAUDE_PROJECT_DIR
    || process.env.CODEX_PROJECT_DIR
    || process.cwd();

  // AGENTS.md is canonical (Codex reads natively; Claude Code reads via
  // an @AGENTS.md import in CLAUDE.md). Check both — either one having
  // an InventorLab section means the project is configured.
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
    'know InventorLab is active and help them get started:',
    '',
    '- Run /inventorlab-setup to configure this project. It adds IP-tracking',
    '  instructions to AGENTS.md (with a CLAUDE.md import for Claude Code),',
    '  creates the working directories, and enables Invention Radar',
    '  (background novelty detection as they code).',
    '',
    'Then mention the main commands available:',
    '  /invention-check     scan code for novel, potentially patentable IP',
    '  /novelty-check       quick novelty check on a hunch — results either way',
    '  /disclosure-session  articulate and formalize an existing invention',
    '  /ideation-session    divergent brainstorming of new approaches',
    '  /patent-draft        draft a provisional patent application',
    '  /patent-figures      generate patent figure files',
    '  /patent-audit        check a patent application for consistency',
    '  /prior-art           search for prior art on a tracked invention',
    '  /portfolio           view all IP documents and their status',
    '  /whitepaper          generate a technical whitepaper',
    '  /inventorlab-skills  list every skill with usage and guidance',
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
