#!/usr/bin/env node

const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';
const BLUE = '\x1b[38;5;69m';
const CYAN = '\x1b[38;5;75m';
const WHITE = '\x1b[38;5;255m';
const GRAY = '\x1b[38;5;242m';
const GREEN = '\x1b[38;5;114m';
const YELLOW = '\x1b[38;5;221m';
const BG = '\x1b[48;5;234m';

const banner = `
${BLUE}${BOLD}    ██╗███╗   ██╗██╗   ██╗███████╗███╗   ██╗████████╗ ██████╗ ██████╗ ${CYAN}██╗       █████╗ ██████╗${RESET}
${BLUE}${BOLD}    ██║████╗  ██║██║   ██║██╔════╝████╗  ██║╚══██╔══╝██╔═══██╗██╔══██╗${CYAN}██║      ██╔══██╗██╔══██╗${RESET}
${BLUE}${BOLD}    ██║██╔██╗ ██║██║   ██║█████╗  ██╔██╗ ██║   ██║   ██║   ██║██████╔╝${CYAN}██║      ███████║██████╔╝${RESET}
${BLUE}${BOLD}    ██║██║╚██╗██║╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║   ██║   ██║██╔══██╗${CYAN}██║      ██╔══██║██╔══██╗${RESET}
${BLUE}${BOLD}    ██║██║ ╚████║ ╚████╔╝ ███████╗██║ ╚████║   ██║   ╚██████╔╝██║  ██║${CYAN}███████╗ ██║  ██║██████╔╝${RESET}
${BLUE}${BOLD}    ╚═╝╚═╝  ╚═══╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝${CYAN}╚══════╝ ╚═╝  ╚═╝╚═════╝${RESET}

${GRAY}    ─────────────────────────────────────────────────────────────────────${RESET}
${WHITE}${BOLD}    Turn what you're building into patents as you build.${RESET}
${DIM}    InventorLab watches your code for novel inventions as you build,${RESET}
${DIM}    helps you articulate what makes them non-obvious, and drafts${RESET}
${DIM}    patent applications with figures — all from the terminal.${RESET}
${GRAY}    ─────────────────────────────────────────────────────────────────────${RESET}

${YELLOW}${BOLD}    Skills installed:${RESET}

${GREEN}    /invention-check${RESET} ${DIM}Discover novel IP in your codebase${RESET}
${GRAY}                     ${DIM}Usage: /invention-check full${RESET}
${GRAY}                            ${DIM}/invention-check recent${RESET}
${GRAY}                            ${DIM}/invention-check lib/cache/${RESET}

${GREEN}    /ideation-session${RESET} ${DIM}Divergent brainstorming — explore what could be built${RESET}
${GRAY}                     ${DIM}Usage: /ideation-session adaptive rate limiting${RESET}
${GRAY}                     ${DIM}Adheres to USPTO AI-assisted invention guidance${RESET}

${GREEN}    /disclosure-session${RESET}${DIM} Articulate and formalize an existing invention${RESET}
${GRAY}                     ${DIM}Usage: /disclosure-session lib/cache/prefetch.js${RESET}

${GREEN}    /disclosure-form${RESET} ${DIM}Create an Invention Disclosure Form for IP review${RESET}
${GRAY}                     ${DIM}Usage: /disclosure-form 3${RESET}
${GRAY}                            ${DIM}/disclosure-form adaptive cache prefetching${RESET}

${GREEN}    /patent-draft${RESET}    ${DIM}Draft a provisional patent application${RESET}
${GRAY}                     ${DIM}Usage: /patent-draft invention-disclosures/my-invention.md${RESET}

${GREEN}    /patent-figures${RESET}  ${DIM}Generate patent figure project files from a spec${RESET}
${GRAY}                     ${DIM}Usage: /patent-figures PATENT-APPLICATION.md${RESET}

${GREEN}    /patent-audit${RESET}    ${DIM}Audit reference numerals, claims, and figure alignment${RESET}
${GRAY}                     ${DIM}Usage: /patent-audit PATENT-APPLICATION.md${RESET}

${GREEN}    /prior-art${RESET}       ${DIM}Search for prior art relevant to a tracked invention${RESET}
${GRAY}                     ${DIM}Usage: /prior-art adaptive cache prefetching${RESET}

${GREEN}    /whitepaper${RESET}      ${DIM}Generate a technical whitepaper from your inventions${RESET}
${GRAY}                     ${DIM}Usage: /whitepaper${RESET}

${GREEN}    /portfolio${RESET}       ${DIM}View and manage your full IP document portfolio${RESET}
${GRAY}                     ${DIM}Usage: /portfolio${RESET}

${YELLOW}${BOLD}    Always active:${RESET}

${CYAN}    Invention Radar${RESET} ${DIM}Background monitoring for novel IP as you code${RESET}
${GRAY}                     ${DIM}Flags potential inventions in real time — no invocation needed${RESET}

${YELLOW}${BOLD}    Also included:${RESET}

${WHITE}    Figure Editor${RESET}    ${DIM}Visual editor for patent diagrams (HTML)${RESET}
${GRAY}                     ${DIM}Open docs/figure-editor.html in a browser${RESET}

${WHITE}    Templates${RESET}        ${DIM}Patent application & invention disclosure templates${RESET}
${GRAY}                     ${DIM}See templates/ directory${RESET}

${GRAY}    ─────────────────────────────────────────────────────────────────────${RESET}
${WHITE}${BOLD}    Get started:${RESET}  ${DIM}Run ${GREEN}/inventorlab-setup${RESET}${DIM} in your project to configure${RESET}
${DIM}                  CLAUDE.md, create directories, and enable IP tracking.${RESET}
${GRAY}    ─────────────────────────────────────────────────────────────────────${RESET}
`;

console.log(banner);
