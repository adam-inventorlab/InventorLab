<!-- DISCLAIMER: This template is provided for informational and educational purposes
     only. Nothing herein constitutes legal advice or professional work product. Review
     all submissions with your company's IP counsel. No attorney-client relationship is
     created by use of this template. -->

# INVENTION DISCLOSURE FORM

> **Instructions for Claude Code:** When creating a new IDF, copy this template to `invention-disclosures/<descriptive-name>.md` and fill it in. Reference specific IP-TRACKER.md entry numbers in comments. The IDF should be persuasive but honest — the goal is to give an IP committee enough information to decide whether to file a patent application.
>
> **Instructions for the inventor:** This form captures the essential information your company's IP team needs to evaluate an invention for patent filing. Fill it out as completely as you can. Incomplete sections are OK — mark them as TBD and your IP team will follow up. **Submit this to your company's IP review process, not directly to the USPTO.**

---

## 1. Invention Title

<!-- A clear, descriptive title. Not a marketing name — something that describes what the invention does.
     Good: "Embedding-Based Diversity Enforcement for AI-Generated Content"
     Bad: "SmartGen Pro" -->

[Title]

---

## 2. Inventors

<!-- List every person who made an inventive contribution — meaning they contributed to the
     conception of the invention, not just implementation. Building what someone else designed
     does not make you an inventor. Conceiving the approach does.

     Be thorough. Omitting a true inventor can invalidate a patent.
     Including a non-inventor can also cause problems. When in doubt, include them
     and let IP counsel make the determination. -->

| Name | Role/Title | Contribution to this invention |
|------|-----------|-------------------------------|
| [Name] | [Role] | [What this person conceived, designed, or figured out — be specific] |
| | | |

**AI tools used in development:** [List any AI tools used, e.g., "Claude Code for implementation assistance." This documents AI-assisted invention per USPTO guidance.]

---

## 3. Problem Statement

<!-- What problem does this invention solve? Describe the state of the art — what exists today
     and why it's inadequate. Write this for someone intelligent but not necessarily in your
     field. 2-3 paragraphs. -->

**What exists today:**

[Describe current approaches and their limitations.]

**Why existing approaches are inadequate:**

[Explain the specific gap or failure mode your invention addresses.]

---

## 4. Description of the Invention

<!-- How does it work? Describe the invention clearly enough that a technical person could
     understand the approach without reading your code. Focus on WHAT it does and WHY it
     works, not implementation details like specific languages or libraries.

     Include:
     - The core mechanism or method
     - How the components interact
     - What makes the approach different from obvious solutions
     - Any key design decisions and why they matter -->

[Describe the invention.]

---

## 5. What Makes This Inventive

<!-- This is the most important section. Why is this non-obvious? Someone skilled in the field,
     aware of all prior art, would not have arrived at this solution without inventive insight.

     Strong arguments:
     - "The standard approach is X, but we discovered that X fails because of Y, so we built Z"
     - "Combining techniques A and B produces result C, which neither achieves alone"
     - "Everyone assumes you need X to solve this; we showed you can do it with Y instead"
     - "This solves a problem that wasn't recognized as a problem until we encountered it"

     Weak arguments:
     - "We used a new library/framework" (that's implementation, not invention)
     - "It's faster" (optimization alone is rarely inventive)
     - "Nobody else has built this exact product" (product novelty ≠ inventive step) -->

[Explain what makes this non-obvious.]

---

## 6. Advantages Over Prior Art

<!-- Concrete benefits compared to existing approaches. Be specific.
     "Better performance" is weak. "Reduces false positive rate from 40% to 3% because
     the embedding comparison catches semantic similarity that keyword matching misses" is strong. -->

| Advantage | Compared to what | Why it matters |
|-----------|-----------------|----------------|
| [Specific advantage] | [Existing approach] | [Business or technical impact] |
| | | |

---

## 7. Known Prior Art

<!-- List anything you're aware of that's related — papers, patents, products, open-source
     projects, blog posts. This is NOT a formal prior art search. It's what you know about.

     Being thorough here helps your IP team. If you know about something similar, say so
     and explain how your invention differs. Hiding known prior art can invalidate a patent. -->

| Reference | Relationship to this invention |
|-----------|-------------------------------|
| [Paper, patent, product, or URL] | [How it's related and how your invention differs] |
| | |

**Are you aware of any public disclosures of this invention?** [Yes/No — if yes, describe when, where, and what was disclosed. Public disclosure starts a clock on filing deadlines.]

---

## 8. Commercial Relevance

<!-- Why should the company invest in patenting this? Connect the invention to business value.
     IP committees have limited budgets — they need to prioritize. -->

**Products or services this applies to:**

[Which current or planned products would use this invention?]

**Competitive advantage:**

[Would a patent on this prevent competitors from doing something valuable? Would it be detectable if a competitor used it?]

**Licensing potential:**

[Could this be licensed to others? Is there an industry that would benefit?]

---

## 9. Development Status

<!-- Where is this in the development lifecycle? -->

- [ ] Concept only (not yet built)
- [ ] Prototype / proof of concept
- [ ] Implemented in development
- [ ] Deployed in production
- [ ] Published or publicly disclosed

**Date of conception:** [When was the inventive idea first formed? Be as specific as possible.]

**Date of first implementation:** [When was it first built/coded?]

**Date of first disclosure:** [When was it first shared outside the inventor team — presentation, demo, publication, product launch? If not yet disclosed, say so.]

---

## 10. Supporting Materials

<!-- Reference any materials that help explain the invention. Don't paste code — point to it. -->

- **Code location:** [Repository, branch, file paths]
- **Design documents:** [Links or file paths]
- **IP Tracker entry:** [Entry number in IP-TRACKER.md, if applicable]
- **Figure specs:** [JSON figure specs in patent-applications/figures/, if any]
- **Demo or screenshots:** [If available]

---

## 11. Additional Notes

<!-- Anything else the IP team should know. Upcoming deadlines, related inventions,
     co-development with external parties, open-source considerations, etc. -->

[Any additional context.]

---

<!-- ═══════════════════════════════════════════════════════════════════════
     GUIDANCE FOR CLAUDE CODE

     When generating an IDF from an IP Tracker entry:

     1. Pull the Summary, What makes it novel, Paper angle, and Patent angle
        from the tracker entry as starting material.

     2. The "What Makes This Inventive" section (§5) is the most important.
        Frame it as: "A person skilled in the art would not have arrived at
        this solution because..." — focus on what's non-obvious, not just
        what's new.

     3. The "Known Prior Art" section (§7) should include anything mentioned
        in the tracker entry's novelty analysis. Be honest about what exists
        and how the invention differs.

     4. The "Commercial Relevance" section (§8) requires the inventor's input —
        you can draft a starting point based on what you know about the project,
        but flag it for the inventor to review and refine.

     5. For "Inventors" (§2), list the user as the inventor. Note AI tools
        used. Do not list yourself as an inventor or co-inventor.

     6. Keep the language accessible — IDFs are read by patent attorneys,
        IP committee members, and sometimes business leaders who may not
        be deeply technical.

     7. The IDF is a persuasion document. It should make the reader think
        "yes, this is worth filing." But it must be honest — overstating
        novelty or hiding prior art causes real problems downstream.

     ═══════════════════════════════════════════════════════════════════════ -->
