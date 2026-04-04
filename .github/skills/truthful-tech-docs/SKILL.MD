---
name: truthful-tech-docs
description: Truthfulness guardrail skill, not just a documentation skill. The best pattern is a skill that forces the model to ground every claim in source code, specs, or docs, and refuse to invent anything.
version: '1.0'
---

# Truthful Tech Docs

## Purpose
Write technical documentation only from verified sources in the repo or provided specs.

## Rules
- Do not invent features, APIs, behavior, examples, or architecture.
- Do not fill gaps with “likely”, “probably”, or generic assumptions.
- If a detail is not verified, write "Unknown" or leave a TODO.
- Every nontrivial claim must be traceable to a file, symbol, test, or spec section.
- Prefer short, accurate sentences over polished but speculative prose.
- If source material conflicts, call out the conflict instead of resolving it silently.
- Ask for clarification when the request depends on missing or ambiguous facts.

## Allowed outputs
- README sections
- API reference summaries
- Architecture overviews
- Changelogs
- Doc comments
- Migration notes

## Verification checklist
Before finalizing, confirm:
- Each claim is grounded in source material.
- Examples compile or are clearly labeled as illustrative.
- Names, versions, and endpoints match the source.
- No invented dependencies or behaviors are present.