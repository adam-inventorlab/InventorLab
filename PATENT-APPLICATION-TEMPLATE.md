<!-- DISCLAIMER: This template and its claim-drafting guide are provided for informational
     and educational purposes only. Nothing herein constitutes legal advice, patent counsel,
     or professional work product. All outputs should be reviewed by qualified IP counsel
     before filing. No attorney-client relationship is created by use of this template. -->

# PATENT APPLICATION: [TITLE IN ALL CAPS]

> **Instructions for Claude Code:** When creating a new patent application, copy this template to `patent-applications/<descriptive-name>.md` and fill it in. Reference specific IP-TRACKER.md entry numbers in comments. Do not modify this template file. Remember: you are an assistive tool helping the inventor articulate their invention. The inventive contribution is the human's. Do not generate novel inventive concepts — formalize what the inventor has conceived and directed.
>
> **Instructions for the inventor:** This template produces a draft provisional patent application. Provisional applications establish a filing date and do not require formal claims — but including well-drafted claims strengthens the filing and makes the non-provisional conversion easier. **This is not legal advice. Review all sections with qualified IP counsel before filing.**

<!-- ═══════════════════════════════════════════════════════════════════════
     AI-ASSISTED INVENTION STATEMENT

     Patent law requires that inventors be natural persons. AI systems
     cannot be named as inventors (Thaler v. Vidal, Fed. Cir. 2022).

     Under the USPTO's Revised Inventorship Guidance for AI-Assisted
     Inventions (Federal Register, November 28, 2025; 90 FR 94518),
     AI systems are explicitly classified as "instruments used by human
     inventors, analogous to laboratory equipment, computer software,
     research databases, or any other tool that assists in the inventive
     process." The guidance confirms that AI-assisted inventions are
     not categorically unpatentable, and that a human who uses an AI
     system to develop an idea is the one who "conceived" the invention.

     The November 2025 guidance eliminated the Pannu factor analysis
     (joint inventorship test) for AI-assisted inventions involving
     a single natural person inventor, replacing it with a standard
     conception analysis: the inventor must form a "definite and
     permanent idea of the complete and operable invention."

     This application was drafted with the assistance of AI tooling.
     The AI functioned as an assistive instrument — analogous to
     laboratory equipment, CAD software, or research databases —
     helping the inventor articulate, formalize, and document
     inventions that the inventor conceived, directed, and evaluated.

     The inventive contributions described herein are the work of the
     named inventor(s). The AI did not autonomously conceive any claimed
     invention. The inventor(s) formed a definite and permanent idea
     of each claimed invention and exercised inventive judgment
     including: directing the development of the systems described,
     evaluating approaches and selecting among alternatives,
     identifying which aspects constitute novel contributions, and
     determining the scope and framing of the claims.

     Users of this template should:
     1. Ensure they can personally attest to each claimed invention —
        that they conceived it, directed its development, or made the
        inventive decisions that produced it
     2. Review all AI-generated draft language for accuracy and to
        confirm it reflects their actual inventive contribution
     3. Name only natural persons who made inventive contributions
        as inventors
     4. Consult qualified IP counsel regarding inventorship
        determination

     References:
     • Thaler v. Vidal, No. 2021-2347 (Fed. Cir. Aug. 5, 2022)
     • Revised Inventorship Guidance for AI-Assisted Inventions,
       90 FR 94518 (Nov. 28, 2025)
     • Executive Order 14179, "Removing Barriers to American
       Leadership in Artificial Intelligence" (Jan. 23, 2025)
     ═══════════════════════════════════════════════════════════════════════ -->

---

## FIELD OF THE INVENTION

<!-- 1-2 sentences. Broad field first, then narrow to the specific domain. -->
<!-- Pattern: "The present invention relates generally to [broad field], and more particularly to [specific domain and what makes it distinct]." -->

The present invention relates generally to [broad field], and more particularly to [specific technique or system].

---

## BACKGROUND OF THE INVENTION

<!-- 2-4 paragraphs. Establish the problem space, what exists today, why it's inadequate, and what's needed. -->
<!-- Paragraph 1: Describe the current state of the art — what exists, how it works. Be fair but highlight limitations. -->
<!-- Paragraph 2: Explain why the current approaches are inadequate for the specific problem you're solving. -->
<!-- Paragraph 3: (Optional) Additional context on failed approaches or why the problem is harder than it appears. -->
<!-- Paragraph 4: "There exists a need for..." — state what's missing. This sets up the Summary. -->

[Current state of the art and its limitations.]

There exists a need for [what your invention provides that doesn't exist].

---

## SUMMARY OF THE INVENTION

<!-- Broad overview of what the invention provides. One paragraph for the overall system, then "In one aspect..." paragraphs for each major claim family. -->
<!-- Each "In one aspect" should correspond to an independent claim. Keep them broad here — details go in the Detailed Description. -->

The present invention provides [broad one-sentence description of the overall system or method].

In one aspect, the invention provides a method comprising [broadest framing of the core inventive step].

In another aspect, the invention provides [second claim family].

In further aspects, the invention provides methods for [list additional aspects].

---

## BRIEF DESCRIPTION OF THE FIGURES

<!-- ═══════════════════════════════════════════════════════════════════════
     FIGURES AND REFERENCE NUMERALS — HOW THIS WORKS

     Patent figures and the text description work together. Reference
     numerals are the glue — they appear in both the figures and the
     Detailed Description, creating a shared vocabulary.

     THE WORKFLOW:

     1. WRITE a brief description of each figure in this section.
        This is the Brief Description of the Figures required by
        patent convention — a short paragraph per figure explaining
        what it shows and listing the key elements with their
        reference numerals.

     2. GENERATE a JSON figure spec for each figure. Claude Code will
        write this to patent-applications/figures/<fig-name>.json.
        The spec defines every box, arrow, label, and reference numeral.

     3. BUILD the figure visually. Open figure-editor.html (included
        in the InventorLab package), import the JSON spec, and refine
        the layout — drag boxes, adjust arrow routing, resize elements.
        The editor renders patent-ready SVGs with orthogonal arrows
        that automatically route around boxes.

     4. EXPORT the finished SVG from the editor. Replace this section's
        placeholder text with the actual figure file references.

     5. USE the same reference numerals throughout the Detailed
        Description. Every time you mention "the reasoning model,"
        write "the reasoning model (110)." This creates a tight linkage
        between the figures and the text.

     REFERENCE NUMERAL CONVENTION:
     • Start at 100 for FIG. 1, 200 for FIG. 2, 300 for FIG. 3, etc.
     • Within a figure, increment by 2: 100, 102, 104...
     • This leaves room for inserting elements later without renumbering.
     • The reference numeral is also the element's ID in the JSON spec.

     BRIEF DESCRIPTION GUIDELINES:
     Each figure entry below should include:
     • A title (e.g., "System architecture diagram")
     • A 2-4 sentence description of what the figure shows
     • A listing of the key elements with reference numerals
     • Enough context that a reader understands the figure's purpose

     ═══════════════════════════════════════════════════════════════════════ -->

*[FIGURES TO BE CREATED USING THE FIGURE EDITOR PRIOR TO FILING]*

**FIG. 1** — [Title — e.g., "System architecture diagram"]. [Brief description of what the figure shows. List key elements with reference numerals: "The figure shows a platform (100) comprising a graph database (102), a reasoning model (110), and a context assembly module (114). Arrows indicate data flow between components."]

<!-- JSON spec: patent-applications/figures/fig-1.json -->
<!-- SVG output: patent-applications/figures/fig-1.svg -->

**FIG. 2** — [Title]. [Brief description with reference numerals.]

<!-- JSON spec: patent-applications/figures/fig-2.json -->
<!-- SVG output: patent-applications/figures/fig-2.svg -->

---

## DETAILED DESCRIPTION OF PREFERRED EMBODIMENTS

The following description sets forth specific details in order to provide a thorough understanding of the invention. It will be apparent to those skilled in the art that the invention may be practiced without some or all of these specific details. In some instances, well-known structures and operations are not described in detail to avoid unnecessarily obscuring the invention. Reference is made to the accompanying figures, which form a part hereof.

<!-- ═══════════════════════════════════════════════════════════════════════
     WRITING THE DETAILED DESCRIPTION

     This section is the heart of the application. It describes how
     the invention works, organized by functional area, with constant
     reference to the figures.

     Rules for reference numerals:
     • First mention of any element: include the numeral and the
       figure it comes from: "the reasoning model (110, FIG. 1)"
     • Subsequent mentions: include just the numeral:
       "the reasoning model (110) generates..."
     • Every section should open by referencing its primary figure:
       "Referring to FIG. 3, the system processes..."
     • Use numerals from OTHER figures when describing interactions:
       "...which is stored in the graph database (102, FIG. 1)"

     Organize by functional section, not by figure. A section may
     reference multiple figures. The goal is a readable narrative
     that happens to be precisely cross-referenced to the drawings.

     ═══════════════════════════════════════════════════════════════════════ -->

### 1. [First Functional Section — e.g., System Architecture Overview]

Referring to FIG. 1, the system (100) comprises [walk through the major components, introducing each with its reference numeral. Every element shown in the figure should be mentioned and explained here.]

### 2. [Second Functional Section]

Referring to FIG. 2, [continue with the next functional area. Cross-reference elements from FIG. 1 where they interact with elements in FIG. 2.]

[Continue with additional sections as needed.]

---

## CLAIMS

<!-- ═══════════════════════════════════════════════════════════════════════
     CLAIM DRAFTING GUIDE

     This guide encodes principles for writing strong patent claims.
     Claude Code should follow these principles when drafting claims.
     Delete this comment block before filing.

     ── THE PHILOSOPHY ──

     A patent claim is a single sentence that defines the boundary of
     an invention. Writing good claims is about ABSTRACTION — not
     "being broad" in the sense of removing things, but seeing the
     invention from 30,000 feet. What is the essence of what's happening
     here, described at its most fundamental level?

     The goal is clarity and elegance. We write in plain English. We don't
     invent jargon or coin phrases to keep claims short. We take exactly
     as much space as the invention requires — sometimes that's two
     limitations, sometimes it's seven. The length follows from the
     invention, not from a target word count.

     ── INDEPENDENT CLAIMS ──

     The independent claim captures the most abstracted version of the
     invention. It's the 30,000-foot view — not a summary of the
     implementation, but a clear statement of what's fundamentally
     happening that makes this invention what it is.

     Principles:
     • Every limitation must do real work. If removing a limitation
       doesn't change what's being claimed, remove it.
     • Use functional language ("generating," "comparing," "providing")
       not implementation language ("using a neural network,"
       "via cosine similarity"). The claim should read as WHAT the system
       does, not HOW it does it at the code level.
     • Plain English. Don't compress language to save space. Don't use
       invented terms. A claim should be readable by an intelligent
       person outside the field and make sense.
     • The number of limitations isn't prescribed. Two limitations can
       be perfect. Seven can be necessary. Let the invention dictate
       the structure.

     The "wherein" clause:
     • A "wherein" clause is an opportunity to say more than you could
       in the body of the claim — to frame something already stated
       from a slightly different angle, to make the inventive step
       explicit, to connect the dots.
     • Think of it as: "and the reason this matters is..."
     • Not every claim needs a wherein. But when the inventive result
       isn't self-evident from the method steps alone, a wherein clause
       makes it unmistakable.

     Pattern:
       A computer-implemented method comprising:
       (a) [what the system does];
       (b) [what the system does with the result];
       wherein [why this combination constitutes the invention].

     Example (good — abstracted, clear, plain English):
       A computer-implemented method comprising:
       (a) at least intermittently building, by an AI agent, a
           knowledge graph;
       (b) reasoning, by the AI agent, with portions of the
           knowledge graph;
       wherein the AI agent's knowledge graph building and reasoning
       are mutually influential and reflexive.

     Example (too narrow — claims an implementation, not an invention):
       A computer-implemented method comprising:
       (a) using a Claude Sonnet 4.6 model to generate XML mutations;
       (b) executing Cypher queries against a FalkorDB instance;
       (c) embedding nodes using Gemma 12B...
       [This claims specific tools. Someone using different tools
        to achieve the same result would not infringe.]

     You may also write a DETAILED independent claim — a second
     independent claim in the same family that walks through the full
     method with more specificity. This captures the invention at a
     lower altitude while the abstracted claim holds the high ground.

     ── DEPENDENT CLAIMS ──

     Dependent claims build on an independent claim. They serve
     multiple purposes:

     1. SPECIFICITY — They narrow the independent claim in a
        particular direction. "The method of Claim 1, wherein the
        knowledge graph comprises typed edges encoding intellectual
        relationships." This is the conventional understanding.

     2. INSURANCE — If the independent claim is invalidated by prior
        art, a dependent claim may survive because it's narrower.
        Each dependent claim is a fallback position.

     3. REVEALING BREADTH — This is the non-obvious one. A good
        dependent claim can make you realize the independent claim
        is broader than you initially thought. When you write
        "The method of Claim 1, wherein the AI agent's reasoning
        in a subsequent session is informed by knowledge graph
        structure created during a prior session" — you realize
        Claim 1 doesn't REQUIRE cross-session persistence, it's
        even broader than that. The dependent claim illuminates
        the independent claim's scope by showing one specific
        instance that falls within it.

     Chaining is fine and often valuable:
       Claim 2 depends on Claim 1
       Claim 3 depends on Claim 2
       Claim 4 depends on Claim 1 (not Claim 2)
     This creates a tree of increasing specificity along
     different branches.

     Dependent claim starters:
     • "The method of Claim X, wherein..." — narrows something
       already stated
     • "The method of Claim X, further comprising..." — adds a
       new step not present in the parent claim

     ── ALTERNATE ANGLE CLAIMS ──

     The same invention claimed from a different perspective.
     This is about coverage. If someone designs around one framing
     of the invention, an alternate angle may still capture them.

     Types:
     • System claim vs. method claim (same invention, different form)
     • Different entry point (claim the generation vs. the retrieval)
     • Different abstraction level (claim the pipeline vs. the gate)
     • User-perspective vs. system-perspective
     • Different "protagonist" (claim what the AI does vs. claim
       what the platform does vs. claim what the user experiences)

     Each alternate angle is its own independent claim. It should
     stand alone — readable and defensible without reference to
     other claims.

     ── HYBRID CLAIMS ──

     Claims that combine two inventions from the same portfolio.
     The combination itself may be non-obvious even if each
     individual invention is known.

     Pattern:
       A computer-implemented method comprising:
       (a) [element from Invention A];
       (b) [element from Invention B];
       wherein [the synergistic result — what emerges from combining
       A and B that neither achieves alone].

     Hybrids are particularly valuable when two inventions interact
     in your actual system. If Invention A feeds into Invention B
     in practice, the claim covering their combination captures
     the real-world system better than either individual claim.

     ── MECHANISTIC CLAIMS ──

     Claims that go deep on HOW a specific mechanism works.
     More detailed than typical dependent claims. Useful when the
     mechanism itself — not just the high-level method — is the
     inventive contribution.

     These are appropriate when the novelty is in the engineering:
     the specific way a gate operates, the specific comparison
     algorithm, the specific feedback loop. Write these when
     you'd answer "what's novel?" with a technical explanation
     rather than a conceptual one.

     ── GENERAL PRINCIPLES ──

     • More claims is better at the provisional stage.
       You can always narrow or abandon claims later.
       You CANNOT add new claims that weren't supported by the
       original filing. Err on the side of inclusion.
     • Cover the core invention from multiple angles before
       moving to secondary inventions. Depth on the primary
       invention matters more than breadth across inventions.
     • Every claim should be independently defensible — it should
       make sense and be enforceable on its own.
     • Use consistent terminology throughout. If you call it a
       "knowledge graph" in Claim 1, don't call it a "concept
       network" in Claim 5.
     • Avoid means-plus-function language ("means for generating")
       unless intentional — it limits scope to the specific
       structures described in the specification.
     • Reference numerals from the detailed description can appear
       in claims in parentheses (e.g., "a reasoning model (110)")
       but they do not limit claim scope — they're navigational aids.
     • When in doubt about whether to include a claim, include it.
       A provisional application is the place to be comprehensive.

     ═══════════════════════════════════════════════════════════════════════ -->

<!-- Organize claims into numbered sections by invention family. -->
<!-- Use Roman numerals for section headers, Arabic numerals for claims. -->

**I. [FIRST CLAIM FAMILY NAME]**

1. A computer-implemented method comprising: (a) [first element]; (b) [second element]; wherein [inventive result].

2. The method of Claim 1, wherein [first narrowing].

3. The method of Claim 1, further comprising [additional step].

**II. [SECOND CLAIM FAMILY NAME]**

4. A computer-implemented method comprising: [...]

---

*Abstract: [One paragraph, 150 words max. Describe the invention at a high level — what it does, how it works at the broadest level, and what result it achieves. This is not a marketing summary — it's a technical abstract that helps patent examiners classify the application.]*
