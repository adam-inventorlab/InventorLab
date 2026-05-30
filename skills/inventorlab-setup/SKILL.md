---
name: inventorlab-setup
description: Configure InventorLab for the current project. Adds the IP tracking snippet to AGENTS.md (read by Codex natively; imported by Claude Code via a minimal CLAUDE.md) and creates the required directories. Run once per project.
allowed-tools: Read Glob Grep Write Edit Bash
---

# InventorLab Setup

Configure the current project for InventorLab. This adds passive IP tracking to the project's instruction file (`AGENTS.md` — read natively by Codex and imported by Claude Code via a one-line `CLAUDE.md`) so the Invention Radar and other skills work automatically.

## Process

**Step 0: Show the InventorLab banner.**

Before anything else, display the InventorLab banner so the user sees the wordmark and a summary of what the plugin provides. Run this with the Bash tool, exactly as written:

```
node "${CLAUDE_PLUGIN_ROOT}/postinstall.js"
```

It prints the InventorLab block-lettering banner and the list of available skills. Let its output show to the user, then continue to Step 1.

**Step 1: Explain and confirm.**

Tell the user what you're about to do:

> "I'm going to configure InventorLab for this project. Here's what I'll do:
>
> 1. **Add IP tracking instructions to your project's instruction file** — this tells me to watch for novel approaches as you code and proactively flag potential inventions. The content is written to `AGENTS.md` (the cross-vendor convention Codex reads natively). For Claude Code users, a minimal `CLAUDE.md` is also created containing `@AGENTS.md` so the same instructions are picked up.
> 2. **Create directories** — `invention-disclosures/`, `patent-applications/figures/`, `whitepapers/`, `invention-provenance/`
> 3. **Create working documents** — IP tracker, claim strategy notebook, prior art registry
> 4. **Set up provenance logging** — session transcripts that document the inventive process for USPTO compliance
>
> **Before we begin — a few things to understand.**
>
> InventorLab operates inside a legal framework that matters: the **USPTO's November 2025 Revised Inventorship Guidance**. The standard turns on *conception* — whether you, a natural person, have the invention clearly defined in your mind. AI is treated as a tool you use, like a CAD program or a research database. Using AI does not disqualify you as inventor, **provided** the conception is yours.
>
> What this means in practice:
>
> - **I am supposed to assist, not invent.** Searching prior art, drafting claims from concepts you've articulated, generating figures, formalizing your ideas — all tool assistance. Coming up with a distinct inventive concept you didn't conceive is over the line, and I am designed to abstain from it.
> - **You play a role too.** The boundary holds if you don't steer me toward originating inventions. Asking 'what should we patent?' or 'come up with something novel' pushes me toward the line. Asking me to develop YOUR idea is fine.
> - **If I cross the line anyway, the inventorship question on whatever I contributed is unsettled.** The USPTO has not provided clear case law on AI-originated contributions, and the courts have not weighed in. The safest course is ensuring the inventive concepts in any filing are ones you conceived.
> - **None of this is legal advice.** InventorLab is a drafting and research tool. Nothing it produces — claim language, prior-art analysis, obviousness arguments, IDF text, figure specs — is legal advice. Work with qualified IP counsel before filing, especially for anything strategically or commercially important.
>
> If you want to read the actual USPTO guidance or work through a specific situation against it, InventorLab ships the verbatim Federal Register text in `docs/uspto-nov-2025-guidance.md` and a collaborative Q&A skill `/ai-inventorship` you can invoke any time.
>
> Before I proceed with setup, I need you to acknowledge the following:
>
> > **"I acknowledge that:**
> > - **I understand the USPTO's November 2025 Revised Inventorship Guidance,** which holds that conception by a natural person is the inventorship standard and that AI can assist but cannot originate inventive concepts.
> > - **I will make a good-faith effort not to steer InventorLab toward originating inventions,** and I understand InventorLab is designed to abstain from doing so.
> > - **I understand that if InventorLab contributes inventive content above and beyond its assistive role, the inventorship question on that content is unsettled.**
> > - **I understand that nothing in, produced by, or associated with InventorLab constitutes legal advice,** and that InventorLab encourages me to work with qualified IP counsel."
>
> Reply to confirm you acknowledge each of these points, and I'll proceed with setup."

Wait for the user's explicit acknowledgment before continuing. A vague "ok" is not enough — the user must clearly affirm all four points. If they push back on any one of them, do not proceed with setup; explain that the acknowledgment is a single package and ask again. Note today's date — you will record the acknowledgment in Step 3.

**Step 2: Ask about IP visibility level.**

After confirmation, ask:

> "One more thing — how in-the-loop do you want to be on the IP work I'm doing? Background work always runs at full intensity (Novelty Gate on every signal, full prior-art coverage, IP Tracker populated automatically) regardless of what you pick. This setting just controls how much I interrupt you about it. Pick 1 through 5:
>
> **1 — Silent.** I work in the background and never bring up IP unless you ask. IP-TRACKER.md, IDEAS.md, and PRIOR-ART.md fill in automatically; you check them on your own schedule. Best if you want maximum flow.
>
> **2 — Session digest.** Silent during work. At the end of a session, one brief summary: *"3 entries added since we started; one worth looking at."* Quick and skippable.
>
> **3 — Notify on novel.** Brief interruption when something passes the Novelty Gate. *"Quick — this looks novel. Added to tracker."* No further nudging. **Default.**
>
> **4 — Notify and propose.** Same as 3, plus a follow-up: *"Want me to open a disclosure session?"* / *"Should I run prior-art on this now?"* You drive from there.
>
> **5 — Active collaborator.** Real-time commentary on the novelty dimension as you code. Probing questions during dev. Proactively suggests `/disclosure-session`, `/ideation-session`, `/prior-art`, `/invention-synthesis`. IP is in the active conversation. Best if IP is a primary focus.
>
> What level works for you?"

Wait for the user's answer. If they don't pick a number, default to 3.

**Step 2b: Ask about output goals.**

After visibility level is set, ask:

> "Last question — what kind of IP output matters most to you? InventorLab can produce several types of documents, and knowing your goals helps me tailor everything:
>
> **Patent Applications** — full provisional patent drafts with claims, specification, and figures. Best if you want exclusive legal rights to your inventions. Requires novelty and non-obviousness.
>
> **Invention Disclosure Forms (IDFs)** — internal documents for IP committees to evaluate whether to file. Best if you work at a company and need to get inventions into the pipeline.
>
> **Whitepapers** — technical documents that explain your system to peers, adopters, or the community. Not focused on legal claims — focused on clarity and credibility. Publishing one publicly also establishes prior art that prevents others from patenting your approach.
>
> **Some combination** — many projects benefit from multiple outputs. For example, file a provisional patent for the core invention, then publish a whitepaper covering the broader system.
>
> Which of these interest you? You can always change your mind later — all the skills are available regardless."

Record the user's preference. This shapes how you use the Invention Radar:
- **Patent-focused** → emphasize novelty, non-obviousness, claim scope when flagging inventions
- **IDF-focused** → emphasize commercial relevance and how to frame for internal review
- **Whitepaper-focused** → emphasize clarity of explanation, comparisons to alternatives, impact
- **Defensive publication** → emphasize getting things documented and published quickly
- **Combination** → apply all lenses

Add the user's preference to the AGENTS.md snippet after the visibility level:

```markdown
### InventorLab Output Goals: [user's stated goals]

[Brief behavioral instruction based on their choice, e.g.:]
- "Patent + Whitepaper: Watch for patentable inventions (novelty, non-obviousness) and also for systems worth explaining publicly. When flagging an invention, note whether it's better suited for patent protection, public documentation, or both. Suggest filing a provisional before publishing whitepapers that cover patentable material."
```

**Step 3: Configure the project.**

1. **Check for AGENTS.md** — look for it in the project root. If it doesn't exist, create it. If a `CLAUDE.md` exists but no `AGENTS.md`, treat the existing `CLAUDE.md` as legacy and move its content into a new `AGENTS.md` (preserving it), then replace `CLAUDE.md` with the single-line import described in step 1c.

1b. **Check if snippet is already present** — search for "IP Tracker" or "IP-TRACKER.md" in AGENTS.md (and CLAUDE.md if it exists). If found, tell the user it's already configured and ask if they want to update their visibility level.

1c. **Ensure Claude Code compatibility** — verify a `CLAUDE.md` exists at the project root containing at minimum the line `@AGENTS.md` (which tells Claude Code to import AGENTS.md). If `CLAUDE.md` doesn't exist, create it with exactly that line. If it exists but does not already import AGENTS.md, prepend `@AGENTS.md` on its own line at the top. This is the bridge so Claude Code picks up the same instructions Codex reads natively.

2. **Add the snippet** — append the InventorLab snippet to the end of AGENTS.md. The snippet is available at:
!`cat "${CLAUDE_PLUGIN_ROOT}/docs/agents-md-snippet.md"`

3. **Add the visibility level** — append this block to AGENTS.md immediately after the snippet, customized with the user's chosen level:

```markdown
### InventorLab Visibility Level: [N]/5

Background IP work runs at full intensity regardless of this level — Invention Radar always watches for novelty signals, the Novelty Gate always runs on candidates, prior-art coverage stays thorough, and IDEAS.md / IP-TRACKER.md / PRIOR-ART.md / CLAIM-STRATEGY-NOTEBOOK.md populate automatically. This level only controls how much you surface that work to the user during the session.

[Insert the appropriate behavioral instruction from the table below]
```

Use these behavioral instructions based on the level:

| Level | Instruction to add to AGENTS.md |
|-------|--------------------------------|
| 1 | `Silent mode. Do not proactively mention IP work, novel-finding observations, or surface tracker updates during the session. Continue running the Novelty Gate, populating IDEAS.md and IP-TRACKER.md, and updating PRIOR-ART.md and CLAIM-STRATEGY-NOTEBOOK.md in the background. The user will inspect these files on their own schedule. Only break silence if (a) the user explicitly asks about IP, (b) a publication action is imminent that would compromise IP rights (Publication Watchdog), or (c) the Invention Boundary is about to be crossed and you need to surface it.` |
| 2 | `End-of-session digest mode. Silent during work. When a session is winding down, surface one brief summary covering what was added to IP-TRACKER.md and IDEAS.md since the start of the session, plus a one-line note on anything that looks particularly worth a deeper look. Do not interrupt mid-task. Publication Watchdog and Invention Boundary still surface in real time as exceptions.` |
| 3 | `Notify-on-novel mode (default). When something passes the Novelty Gate, briefly interrupt to surface it: a one-or-two-sentence note that the candidate was added to the tracker. Do not press for further action. Continue silently otherwise. Publication Watchdog and Invention Boundary still surface in real time.` |
| 4 | `Notify-and-propose mode. Same as level 3 (brief surface when something passes the Gate), plus a follow-up offer: "want me to open /disclosure-session on this?" or "should I run /prior-art now?" — appropriate to the situation. Let the user drive whether to accept. Continue silently otherwise.` |
| 5 | `Active collaborator mode. IP is part of the active conversation. Comment in real time on the novelty dimension as the user codes. Ask probing questions about design choices that look inventive. Proactively suggest /disclosure-session, /ideation-session, /prior-art, /invention-synthesis when the moment fits. Treat IP awareness as a primary lens alongside the coding task. Be a colleague who notices and surfaces, not a silent observer.` |

5. **Record the inventorship acknowledgment** — append this block to AGENTS.md immediately after the visibility level block, filled in with today's date:

```markdown
### InventorLab Inventorship & Legal Acknowledgment

On [date], the user acknowledged that they:

- Understand the **USPTO November 2025 Revised Inventorship Guidance** — conception by a natural person is the inventorship standard; AI can assist but cannot originate inventive concepts.
- Will make a **good-faith effort not to steer InventorLab toward originating inventions**, and understand InventorLab is designed to abstain from doing so.
- Understand that **if InventorLab contributes inventive content above and beyond its assistive role, the inventorship question on that content is unsettled** — neither USPTO guidance nor case law has resolved it.
- Understand that **nothing in, produced by, or associated with InventorLab constitutes legal advice**, and that InventorLab encourages working with qualified IP counsel.

Honor this acknowledgment every session:

1. **Operate strictly as an assistive tool.** If a request would require originating an inventive concept rather than developing the user's own, decline and redirect to the user's conception, per the Invention Boundary defined above.
2. **Do not characterize InventorLab output as legal advice** at any point — not in commit messages, not in document headers, not in conversational responses. If the user asks a question that calls for legal judgment (filing strategy, freedom-to-operate opinions, infringement risk, license interpretation), state that this is outside InventorLab's role and recommend they consult IP counsel.
```

6. **Create directories** — ensure these directories exist:
   - `invention-disclosures/`
   - `patent-applications/`
   - `patent-applications/figures/`
   - `invention-provenance/`
   - `whitepapers/`

7. **Create IP-TRACKER.md** — if it doesn't exist, create it with a starter template:
```markdown
# IP Tracker

Inventions and novel approaches identified in this project.

---

<!-- Entries will be added here by InventorLab -->
```

7b. **Create IDEAS.md** — if it doesn't exist, create it with a starter template:
```markdown
# Ideas — InventorLab Idea Buffer

Lab-notebook-style proto-tracker. Where IP-TRACKER.md holds inventions that have survived the Novelty Gate, this file holds conversational signals that *might* be inventive but aren't yet ready to be tracked candidates — typically because they exist only in dialog and have no code artifact yet.

Multi-prompt inventions are the gap the artifact-first discovery loop leaves open. Append entries as ideas surface; run `/invention-synthesis` periodically to find threads forming across entries and promote them to IP-TRACKER.md when they survive the Gate. Entries here are permanent — even failed-Gate ideas stay (annotated) as a record of how thinking developed.

---

<!-- Entries will be added here by InventorLab -->
```

8. **Create CLAIM-STRATEGY-NOTEBOOK.md** — if it doesn't exist, copy from the template. This is a working document where you (Claude Code) develop claim strategies during disclosure and ideation sessions. The user doesn't need to manage it — you maintain it actively.

9. **Create PRIOR-ART.md** — if it doesn't exist, create it from the template at `prior-art-template.md`. This is a structured registry of prior art findings organized by IP Tracker entry. You maintain it during prior art searches — every search result goes here with source, overlap, distinction, and threat level.

10. **Create PORTFOLIO.json** — if it doesn't exist, create it from the portfolio template. This is the central manifest tracking all patent applications, IDFs, and whitepapers — their status, which IP entries they cover, prior art search dates, and history. You maintain it whenever any IP document is created or updated. The user manages their portfolio with `/portfolio`.

11. **Report** — tell the user what was configured:
```
InventorLab configured for this project:
  ✓ AGENTS.md created/updated with IP tracking snippet
  ✓ CLAUDE.md created/updated with @AGENTS.md import (Claude Code bridge)
  ✓ IP visibility level set to [N]/5
  ✓ Inventorship & legal acknowledgment recorded ([date])
  ✓ invention-disclosures/ directory created
  ✓ patent-applications/figures/ directory created
  ✓ whitepapers/ directory created
  ✓ IP-TRACKER.md created
  ✓ IDEAS.md created (Idea Buffer for conversational inventions)
  ✓ CLAIM-STRATEGY-NOTEBOOK.md created
  ✓ PRIOR-ART.md created
  ✓ PORTFOLIO.json created
  ✓ invention-provenance/ directory created

You're all set. Invention Radar is now active at level [N].
Output goals: [user's stated goals]

Available skills:
  /invention-check — scan code for novel approaches
  /novelty-check — quick novelty check on a hunch — results either way
  /invention-synthesis — find multi-prompt inventions in the Idea Buffer
  /disclosure-session — articulate and formalize an invention
  /disclosure-form — create an Invention Disclosure Form
  /ideation-session — brainstorm novel approaches
  /patent-draft — generate a full provisional patent application
  /patent-figures — generate patent figure project files
  /patent-audit — audit a patent application for consistency
  /whitepaper — generate a technical whitepaper
  /ai-inventorship — collaborative Q&A on the USPTO Nov 2025
                     inventorship guidance (verbatim text included)

Behind the scenes, I maintain working documents:
  • PORTFOLIO.json — central manifest of all patent drafts, IDFs, and whitepapers
  • CLAIM-STRATEGY-NOTEBOOK.md — claim strategies, scope, and drafting notes
  • PRIOR-ART.md — structured registry of prior art findings per invention
  • invention-provenance/ — session transcripts for inventorship records

Use /portfolio to see your full IP document portfolio at any time.

Important: I run prior art searches before flagging inventions (the Novelty
Gate) and during disclosure/patent sessions. Prior art findings inform
assessment and claim strategy ONLY — I will never suggest incorporating
teachings from prior art into your inventions. Your ideas stay yours.

You can peek at any of these anytime.
```

## Changing the Visibility Level Later

If the user asks to change their IP visibility level at any time, find the `### InventorLab Visibility Level` section in AGENTS.md (or in CLAUDE.md if a legacy installation predates the AGENTS.md migration) and update the number and the behavioral instruction. No need to re-run setup.

If a project's AGENTS.md still has the legacy `### InventorLab Sensitivity Level` (1-10 scale) from before the v2.11.0 reframing, treat it as functionally equivalent — replace the heading and the body with the new 1-5 framing, mapping the old level conservatively (old 1-2 → new 1, old 3-4 → new 2, old 5 → new 3, old 6-8 → new 4, old 9-10 → new 5) unless the user requests otherwise.
