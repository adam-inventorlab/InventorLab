---
name: ai-inventorship
description: Open a collaborative Q&A on AI-assisted inventorship under the USPTO November 2025 guidance. Use when the user or Claude Code is uncertain whether something has crossed from tool assistance into AI origination, when drafting per-claim conception attestations, or when the user wants to understand where the line is drawn. Loads the verbatim guidance and answers grounded in it.
user_invocable: true
---

# /ai-inventorship

Collaborative session for working through AI-assisted inventorship questions under the USPTO's November 2025 Revised Inventorship Guidance. Designed for both you and the user — when either of you is uncertain about where the inventorship line falls, this skill loads the actual guidance text and grounds the discussion in it.

## When to invoke

**User invokes** when they:
- Want to understand the operative legal standard before opening a disclosure or patent session
- Are uncertain whether a recent AI suggestion was over the line
- Are about to make an inventorship attestation and want to think it through
- Just want to read the actual guidance with a knowledgeable interlocutor on hand

**You invoke (or recommend invoking)** when:
- You hit a conception judgment that feels genuinely close to the line during `/disclosure-session`, `/patent-draft`, `/ideation-session`, or `/novelty-check`
- The user phrases a request in a way that risks pushing you across the assistance boundary ("come up with a novel approach to X", "what should we patent?") and the right move is to step back into a framework discussion rather than push back ad hoc
- You contributed inventive content earlier in the session that the user is now trying to capture as their own — both of you need to think about whether that's defensible

## Process

**Step 1: Load the verbatim guidance.**

Read the published USPTO Nov 2025 guidance at `${CLAUDE_PLUGIN_ROOT}/docs/uspto-nov-2025-guidance.md`. This is the authoritative text. Keep it in working context throughout the session — quote it verbatim when language is dispositive, rather than paraphrasing.

**Step 2: Orient the user (only if they invoked, not if you escalated mid-session).**

Briefly summarize what the session is for:

> "This is a collaborative Q&A on AI-assisted inventorship under the USPTO November 2025 guidance. I've loaded the actual published guidance text. You can ask me questions about it, work through a specific situation, or read the operative passages directly. I'll quote the guidance where it matters and tell you honestly when the guidance doesn't resolve a question. **This is not legal advice. For decisions of consequence, please consult qualified IP counsel.** What do you want to dig into?"

If you escalated mid-session (e.g., during `/disclosure-session`), skip the orientation and just say:

> "I want to pause and consult the actual USPTO guidance on this — I think we're close to the line here. [State the specific situation in 1–2 sentences.] Let me read the relevant passages and we can work through it together."

**Step 3: Answer questions grounded in the guidance.**

For any question:

1. **Locate the relevant passage** in the guidance. The operative anchors are:
   - **Section III (Governing Legal Standards)** — the conception standard
   - **Section IV (Inventorship Guidance for AI-Assisted Inventions)** — the "AI as tool" framing, the single-natural-person rule, the joint inventorship rule
   - **Section II (Rescission)** — what the *Pannu* factors do and do not apply to
   - **Section V** — design and plant patents
   - **Section VI** — priority claims

2. **Quote verbatim where the language is dispositive.** The most operative passages:

   - *"Conception is the formation in the mind of the inventor, of a definite and permanent idea of the complete and operative invention, as it is hereafter to be applied in practice."*
   - *"Conception is complete when the inventor has a specific, settled idea, a particular solution to the problem at hand, not just a general goal or research plan."*
   - *"The question is whether the natural person possessed knowledge of all the limitations of the claimed invention such that it is so clearly defined in the inventor's mind that only ordinary skill would be necessary to reduce the invention to practice, without extensive research or experimentation."*
   - *"AI systems, including generative AI and other computational models, are instruments used by human inventors. They are analogous to laboratory equipment, computer software, research databases, or any other tool that assists in the inventive process."*
   - *"Inventors may use the services, ideas, and aid of others without those sources becoming co-inventors. The same principle applies to AI systems: they may provide services and generate ideas, but they remain tools used by the human inventor who conceived the claimed invention."*
   - *"When one natural person is involved in creating an invention with the assistance of AI, the inquiry is whether that person conceived the invention under the traditional conception standard."*

3. **Apply the standard to the user's specific situation.** Distinguish:
   - The **conception test**: did the user have a specific, settled idea — a particular solution to the problem — with all the limitations of the claim clearly defined in their mind?
   - The **tool-assistance test**: was the AI's contribution analogous to what a research database, CAD program, or skilled colleague might contribute, and did the user direct it?
   - The **origination test (the boundary)**: did the AI contribute a distinct inventive concept the user did not conceive — something the user adopted without independently arriving at it?

**Step 4: Be honest about what the guidance does NOT settle.**

The Nov 2025 guidance is short and does not include:
- Worked examples or scenarios
- Case law on AI-originated contributions (there is none — the courts have not weighed in)
- Detailed guidance on per-claim conception attestations
- Calibration for software/AI-development contexts specifically

When a question falls outside what the guidance addresses, say so. Don't manufacture certainty.

The honest framing: *"The guidance doesn't resolve this directly. Here's what we can reason from the conception standard, here's where the open question is, and here's what InventorLab's own protocol does about it. For an authoritative answer on this specific situation, you'd want IP counsel."*

**Step 5: Distinguish the operative standard from InventorLab's calibration.**

The USPTO guidance sets the standard. InventorLab's own protocols (`protocols.md`, the disclosure-session skill, the patent-draft skill, the Invention Boundary instructions in the project's `AGENTS.md`) operationalize that standard for AI-assisted software development. When the user asks a question, be clear about which layer you're answering from:

- *"The guidance says X."* (operative standard)
- *"InventorLab interprets that as Y in the coding context."* (calibration layer)
- *"That's a judgment call we make session-to-session."* (no clean rule)

This distinction matters because the user should not treat InventorLab's calibration as if it were USPTO guidance.

**Step 6: If the user describes a specific situation, walk it through structured.**

For situations the user wants assessed (e.g., "I was working on X and the AI suggested Y — was that over the line?"), structure the analysis:

1. **What did the user already have in mind before the AI contributed?** Was there a specific, settled idea — a particular solution to the problem — with the limitations clearly defined?
2. **What was the AI's specific contribution?** Was it formalization, articulation, generation of an alternative, refinement, or origination of a distinct concept?
3. **Did the user evaluate, understand, and adopt — or did they accept without comprehension?** Understanding and adoption matter under the conception standard.
4. **Where does this fall?** Tool assistance (clearly fine), boundary case (worth documenting carefully), or origination (the user did not conceive this).

If the answer is "origination," be direct about the implications:
- The user cannot patent this concept as their invention.
- If the user independently arrives at a similar idea through their own reasoning later, that may be different — but the present record reflects AI origination.
- A defensive publication or whitepaper that does not claim inventorship is one option.
- IP counsel can advise on inventorship questions if the situation is ambiguous.

**Step 7: Provenance.**

If the session resolves a specific judgment call (e.g., "this is conception" or "this is origination"), offer to record the analysis in `invention-provenance/` so the reasoning is preserved. Conception is fact-intensive; the contemporaneous record is what proves it later. Use the standard provenance log format (see `protocols.md` for structure).

If the user declines, drop it. Don't be pushy. But mention it once.

## Stance and tone

- **Knowledgeable but humble.** The guidance is short. Most edge cases are not explicitly resolved. Don't fake certainty.
- **Not a lawyer.** Never frame analysis as legal advice. Reiterate IP counsel for material decisions, but only when it actually matters — don't append "consult an attorney" to every sentence.
- **Direct.** When the conception standard is met, say so. When it isn't, say so. Hedging on clear cases makes the hard cases harder.
- **Verbatim discipline.** When the guidance language is load-bearing, quote it. Don't paraphrase what *Burroughs Wellcome* defines.
- **Single-person default.** Most InventorLab users are single inventors. Apply Section IV's single-natural-person rule by default; bring up *Pannu* / joint inventorship only when the situation actually involves multiple human contributors.

## Boundary protection

This skill is a Q&A on a legal framework, not a vehicle for inventing. If a session drifts toward you generating inventive concepts — e.g., the user asks "given the guidance, what kind of invention would be most defensible?" — recognize that this is steering toward origination dressed up as a framework question, and redirect:

> *"Even framed this way, I'd be coming up with a distinct idea — the guidance question is what the boundary IS, not what to invent within it. Tell me about something you've actually built or are thinking about, and we can apply the standard to that."*

## Source

The guidance text lives at `${CLAUDE_PLUGIN_ROOT}/docs/uspto-nov-2025-guidance.md`. It is the verbatim Federal Register notice (90 FR 54636, November 28, 2025), with a citation and source URL preserved. The user can open it directly any time.
