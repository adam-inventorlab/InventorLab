# InventorLab for Claude Code

A drop-in configuration for [Claude Code](https://claude.ai/claude-code) that turns your AI coding assistant into a continuous intellectual property analyst. As you build, Claude identifies novel methodologies and generates structured IP artifacts — patent claims, paper abstracts, and publication candidates — as a side effect of normal development work.

## What it does

When you're working with Claude Code on a project, InventorLab makes Claude:

- **Notice novelty in real time** — as you build features, Claude recognizes when an approach is unusual or not widely documented
- **Generate structured IP artifacts** — patent-style claims, paper abstracts, prior art differentiation
- **Maintain a living IP portfolio** — a single file that grows organically as your project develops
- **Capture context at the point of invention** — rationale, alternatives considered, and problem context are freshest during development, not months later in a patent interview

## Setup

### 1. Add the snippet to your CLAUDE.md

Copy the contents of `claude-md-snippet.md` and paste it into your project's `CLAUDE.md` file (create one if it doesn't exist).

### 2. Add the IP tracker template

Copy `IP-TRACKER-TEMPLATE.md` to your project root as `IP-TRACKER.md`.

### 3. Add the patent application template

Copy `PATENT-APPLICATION-TEMPLATE.md`, `figure-editor.html`, and `patent-fig.js` into a `docs/inventorlab/` directory (or wherever you prefer). The template creates patent applications; the editor and renderer create patent figures.

### 4. Work normally

That's it. As you build, Claude will add entries to the IP tracker when it notices novel approaches. When entries are mature:

- **Independent inventors:** Tell Claude to "start a patent application for entry #X" → drafts a full provisional application
- **Corporate inventors:** Tell Claude to "create an IDF for entry #X" → drafts an Invention Disclosure Form for your IP committee

## File structure

```
your-project/
  CLAUDE.md                              ← contains the InventorLab snippet
  IP-TRACKER.md                          ← living tracker (identification)
  docs/inventorlab/
    PATENT-APPLICATION-TEMPLATE.md       ← provisional application template
    IDF-TEMPLATE.md                      ← invention disclosure form template
    figure-editor.html                   ← visual patent figure editor
    patent-fig.js                        ← CLI figure renderer (optional)
  patent-applications/                   ← for independent inventors
    your-first-invention.md              ← created from template when ready
    figures/
      fig-1.json                         ← figure specs (Claude generates these)
      fig-1.svg                          ← exported SVGs (you create in the editor)
  invention-disclosures/                 ← for corporate inventors
    your-first-invention.md              ← created from IDF template
```

## How it works

Claude Code reads `CLAUDE.md` at the start of every conversation. The InventorLab snippet instructs Claude to:

1. **Identify** — monitor the work being done for novel approaches. When something qualifies, add a structured entry to `IP-TRACKER.md` with summary, novelty analysis, paper angle, and patent angle. Mention the addition to the user.
2. **Formalize** — two paths depending on your situation:
   - **Patent application** (independent inventors): drafts a full provisional with background, claims, detailed description with reference numerals, and figure specs following the built-in claim-drafting guide
   - **Invention Disclosure Form** (corporate inventors): drafts an IDF with problem statement, invention description, inventive step analysis, prior art, and commercial relevance — formatted for your company's IP committee
3. **Iterate** — as the project evolves, entries get updated, new entries get added, and applications get refined. The tracker is the intake funnel; the applications and IDFs are the formalized output.

The patent application template includes an embedded claim-drafting guide (in comments) that teaches Claude how to write effective patent claims: broad independent claims with minimal elements, dependent chains for specificity, alternate angle claims for coverage, and hybrid claims that combine inventions.

## What qualifies as "novel"

The snippet includes both active triggers (things Claude checks for as it works) and passive triggers (signals it watches for during conversation):

**Active triggers:**
- **Invention around failure** — when a standard approach fails and you build a workaround, the workaround is often the IP
- **Non-obvious combinations** — when combining two techniques produces emergent results neither could achieve alone
- **Structural solutions to AI limitations** — when you move a decision from a model to deterministic code because the model can't handle it reliably
- **Inverted patterns** — when you flip a standard interaction pattern (AI initiates instead of responds, system prevents instead of enables)
- **The thing you built because nothing existed** — when you can't find a prior solution, the absence is evidence of novelty

**Passive triggers:**
- User expresses surprise or excitement about an approach
- User asks "is this novel?"
- Explaining the approach requires describing a non-obvious mechanism
- A technique built for one purpose applies to a different domain

Claude also performs periodic self-audits at natural stopping points and cross-references new findings against existing entries to avoid duplication.

## Customization

Edit the snippet to fit your domain. The template entries are from an AI research platform — replace them with examples relevant to your field. The structure (Summary, What makes it novel, Paper angle, Patent angle) works across domains, but you can adjust the fields.

## Limitations

- Claude's assessment of novelty is based on its training data, not a patent search. Treat all entries as **candidates for review**, not confirmed novel inventions.
- This is not legal advice. Consult IP counsel before filing anything.
- The quality of IP identification depends on Claude having context about what you're building. Projects with good CLAUDE.md documentation produce better results.

## AI-Assisted Invention, Not AI Invention

Patent law requires that inventors be natural persons. AI cannot be named as an inventor (*Thaler v. Vidal*, Fed. Cir. 2022). However, AI-*assisted* invention — where a human conceives, directs, and evaluates, using AI as a tool — is fully patentable.

The USPTO's [Revised Inventorship Guidance for AI-Assisted Inventions](https://www.federalregister.gov/documents/2025/11/28/2025-21457/revised-inventorship-guidance-for-ai-assisted-inventions) (November 2025) explicitly classifies AI systems as "instruments used by human inventors, analogous to laboratory equipment, computer software, research databases, or any other tool." The guidance eliminated the Pannu factor analysis for single-inventor AI-assisted cases — if a natural person uses AI as a tool and forms a "definite and permanent idea" of the invention, they're the inventor.

InventorLab is designed with this framework built in:
- The **CLAUDE.md snippet** instructs Claude to position itself as an assistive tool, not an inventor — framing IP as "here's what *you* built that's novel"
- The **patent application template** includes an AI-assisted invention statement documenting that the human directed the inventive work, citing the current USPTO guidance and relevant case law
- The **workflow itself** creates contemporaneous documentation that the AI was configured as an instrument and the human exercised inventive judgment

This structural framing produces a paper trail that may be valuable if inventorship is ever questioned.

## What to do with your patent application

Once you have a draft application, here's the practical path forward. This is general information, not legal advice — consult a patent attorney for your specific situation.

### Step 1: File a provisional patent application

A provisional application is the best first move for most software inventors. It's simpler and cheaper than a full (non-provisional) application, and it does one critical thing: **establishes your priority date**. That date is what matters if someone else files something similar later.

**What it costs:**
- Micro entity (most independent developers): ~$160
- Small entity (companies under 500 employees): ~$320
- Large entity: ~$640

**How to file:**
- Create an account at [USPTO Patent Center](https://patentcenter.uspto.gov)
- Select "Provisional" application type
- Upload your draft application as a PDF (the markdown exports cleanly to PDF)
- Upload your figure SVGs
- Pay the filing fee
- You'll receive a provisional application number and filing date

**What you don't need for a provisional:**
- Formal claims (though including them, as InventorLab generates, strengthens your filing)
- Formal drawings (your SVGs from the figure editor are sufficient)
- An attorney (though having one review is always wise)

### Step 2: Use your 12-month window wisely

A provisional gives you **12 months** from the filing date. During that time:

- **Validate the market** — is this invention worth the cost of a full patent? Is anyone else doing it?
- **Refine your claims** — as you continue developing, you may discover better ways to frame the invention
- **Consider a prior art search** — a patent attorney or search firm can assess what already exists and how your claims hold up against it
- **Decide whether to proceed** — not every provisional needs to become a non-provisional. The provisional protects your priority date while you decide.

If you don't file a non-provisional before the 12 months expire, the provisional lapses and your priority date is lost. The provisional itself is never published and never becomes a patent — it only serves as a priority placeholder.

### Step 3: Convert to a non-provisional (when ready)

This is where professional help matters most. A patent attorney will:

- Conduct or review a prior art search
- Refine your claims to maximize scope while avoiding prior art
- Format the application to USPTO standards
- Handle prosecution (responding to examiner rejections and office actions)
- Advise on continuation and divisional strategies if you have multiple inventions

**What InventorLab saves you:** A well-drafted provisional with structured claims, detailed descriptions, and figure specs significantly reduces the time (and therefore cost) your attorney spends. Instead of starting from a conversation about what you built, they start from a near-complete document.

### What InventorLab gives you vs. what it doesn't

| InventorLab provides | InventorLab does NOT provide |
|---|---|
| Structured draft application | Prior art search |
| Claim families (broad, dependent, alternate) | Freedom-to-operate analysis |
| Figure specs + visual editor | Prosecution strategy |
| AI-assisted invention documentation | Legal advice or attorney-client relationship |
| IP identification during development | Novelty or patentability opinion |
| Living IP portfolio | Filing or submission to the USPTO |

## Disclaimer

This tool is provided as-is for informational and educational purposes only. **Nothing in this repository constitutes legal advice, patent counsel, or professional work product.** The templates, claim-drafting guide, and generated outputs are starting points for discussion with qualified intellectual property counsel — not substitutes for it. The authors are not acting as your attorneys and no attorney-client relationship is created by using this tool. Patent law is jurisdiction-specific and fact-dependent; consult a registered patent attorney or agent before making filing decisions.

## License

This configuration is released into the public domain under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). Use it however you want.

## Origin

Developed at the [Kairos Frontier Institute](https://kairosfrontier.institute) during the construction of a human-AI collaborative research platform. The approach produced 30+ paper candidates and 25+ patent entries organically during active development sessions.

Learn more at [inventorlab.ai](https://inventorlab.ai)
