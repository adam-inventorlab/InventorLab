---
description: Configure InventorLab for the current project. Adds the IP tracking snippet to CLAUDE.md and creates the required directories. Run once per project.
allowed-tools: Read Glob Grep Write Edit Bash
---

# InventorLab Setup

Configure the current project for InventorLab. This adds passive IP tracking to CLAUDE.md so the Invention Radar and other skills work automatically.

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
> 1. **Add IP tracking instructions to CLAUDE.md** — this tells me to watch for novel approaches as you code and proactively flag potential inventions
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

**Step 2: Ask about IP sensitivity level.**

After confirmation, ask:

> "One more thing — how much IP commentary do you want from me as you work? Pick a level from 1 to 10:
>
> **1-3 (Low):** I only speak up when something is clearly novel. You'll rarely hear about IP unless it's a strong signal. Best if you want to focus on building and check IP periodically with `/invention-check`.
>
> **4-6 (Medium):** I flag things that look promising and occasionally ask 'have you thought about this?' Good balance between building and IP awareness. **(5 is the default)**
>
> **7-10 (High):** I actively comment on the novelty of most things you build — including pointing out when something is NOT novel and why. I'll suggest angles, ask probing questions, and think out loud about patentability. Best if you want a constant IP-aware collaborator.
>
> What level works for you?"

Wait for the user's answer. If they don't pick a number, default to 5.

**Step 2b: Ask about output goals.**

After sensitivity level is set, ask:

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

Add the user's preference to the CLAUDE.md snippet after the sensitivity level:

```markdown
### InventorLab Output Goals: [user's stated goals]

[Brief behavioral instruction based on their choice, e.g.:]
- "Patent + Whitepaper: Watch for patentable inventions (novelty, non-obviousness) and also for systems worth explaining publicly. When flagging an invention, note whether it's better suited for patent protection, public documentation, or both. Suggest filing a provisional before publishing whitepapers that cover patentable material."
```

**Step 3: Configure the project.**

1. **Check for CLAUDE.md** — look for it in the project root. If it doesn't exist, create it.

2. **Check if snippet is already present** — search for "IP Tracker" or "IP-TRACKER.md" in CLAUDE.md. If found, tell the user it's already configured and ask if they want to update their sensitivity level.

3. **Add the snippet** — append the InventorLab CLAUDE.md snippet to the end of CLAUDE.md. The snippet is available at:
!`cat "${CLAUDE_PLUGIN_ROOT}/docs/claude-md-snippet.md"`

4. **Add the sensitivity level** — append this block to CLAUDE.md immediately after the snippet, customized with the user's chosen level:

```markdown
### InventorLab Sensitivity Level: [N]/10

[Insert the appropriate behavioral instruction from the table below]
```

Use these behavioral instructions based on the level:

| Level | Instruction to add to CLAUDE.md |
|-------|--------------------------------|
| 1 | `Only run the Novelty Gate on strong signals — clear departures from known approaches. Do not run prior art searches during routine development. Save IP observations for /invention-check runs.` |
| 2 | `Run the Novelty Gate on strong signals only — invention around failure, a non-obvious combination that surprises you. Keep IP commentary rare and high-conviction. Prior art searches only for things you're fairly confident about.` |
| 3 | `Run the Novelty Gate on strong signals and notable moderate signals. At major stopping points, review what was built and run the gate on anything that stood out.` |
| 4 | `Run the Novelty Gate on moderate-to-strong signals. At stopping points, review what was built and search anything that might be worth tracking. Prior art searches are becoming routine.` |
| 5 | `Run the Novelty Gate on all moderate-to-strong signals. Occasionally ask the user if an approach feels novel. At stopping points, review and search. This is the balanced default.` |
| 6 | `Run the Novelty Gate on anything that seems even slightly unusual. Prior art searches are frequent — the gate filters, so cast a wide net. Comment on why something is or isn't novel when relevant.` |
| 7 | `Run the Novelty Gate on nearly everything non-trivial. The prior art search IS the filter — your internal sense of novelty is just the trigger. Comment frequently on the novelty dimension. When something is NOT novel, say so and explain why.` |
| 8 | `Run the Novelty Gate aggressively — any design choice that isn't boilerplate gets a quick search. Treat IP awareness as a primary lens alongside the coding task. The prior art search cost is trivial; missing an invention is not.` |
| 9 | `Run the Novelty Gate on every significant piece of work. Draft claims and search on anything that's even mildly interesting. Comment on what's novel, what's not, and why. Proactively suggest /disclosure-session and /ideation-session.` |
| 10 | `Maximum IP awareness. Run the Novelty Gate on EVERYTHING — every design decision, architecture choice, and implementation approach gets draft claims and a prior art search. The bar for triggering a search is effectively zero — if it's code, search it. Comment on everything with reasoning. The user wants a constant IP-aware collaborator.` |

5. **Record the inventorship acknowledgment** — append this block to CLAUDE.md immediately after the sensitivity level block, filled in with today's date:

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

8. **Create CLAIM-STRATEGY-NOTEBOOK.md** — if it doesn't exist, copy from the template. This is a working document where you (Claude Code) develop claim strategies during disclosure and ideation sessions. The user doesn't need to manage it — you maintain it actively.

9. **Create PRIOR-ART.md** — if it doesn't exist, create it from the template at `prior-art-template.md`. This is a structured registry of prior art findings organized by IP Tracker entry. You maintain it during prior art searches — every search result goes here with source, overlap, distinction, and threat level.

10. **Create PORTFOLIO.json** — if it doesn't exist, create it from the portfolio template. This is the central manifest tracking all patent applications, IDFs, and whitepapers — their status, which IP entries they cover, prior art search dates, and history. You maintain it whenever any IP document is created or updated. The user manages their portfolio with `/portfolio`.

11. **Report** — tell the user what was configured:
```
InventorLab configured for this project:
  ✓ CLAUDE.md updated with IP tracking snippet
  ✓ IP sensitivity set to [N]/10
  ✓ Inventorship & legal acknowledgment recorded ([date])
  ✓ invention-disclosures/ directory created
  ✓ patent-applications/figures/ directory created
  ✓ whitepapers/ directory created
  ✓ IP-TRACKER.md created
  ✓ CLAIM-STRATEGY-NOTEBOOK.md created
  ✓ PRIOR-ART.md created
  ✓ PORTFOLIO.json created
  ✓ invention-provenance/ directory created

You're all set. Invention Radar is now active at level [N].
Output goals: [user's stated goals]

Available skills:
  /invention-check — scan code for novel approaches
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

## Changing the Sensitivity Level Later

If the user asks to change their IP sensitivity level at any time, find the `### InventorLab Sensitivity Level` section in CLAUDE.md and update the number and the behavioral instruction. No need to re-run setup.
