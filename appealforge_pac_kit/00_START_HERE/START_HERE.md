# Start Here — AppealForge PAC

## One-line company

**AppealForge PAC helps post-acute providers turn Medicare Advantage denials into source-cited, physician-reviewable appeal packets before patients lose access to needed care.**

## The precise problem

Medicare Advantage post-acute denials, especially SNF admission and continued-stay denials, are often appealable but under-appealed because provider teams cannot rapidly assemble the right clinical evidence, map it to the denial reason, and produce a clean reconsideration packet under operational pressure.

## The wedge

Start with this use case:

> Generate a source-cited, human-reviewed Medicare Advantage reconsideration packet for a denied SNF admission or continued-stay authorization in under 10 minutes from the denial letter, referral bundle, and clinical notes.

Do **not** start with full prior authorization automation. Appeals have a clearer input, a stated denial reason, a deadline, and measurable win/loss outcomes.

## The product promise

Upload the denial letter and clinical PDFs. AppealForge PAC extracts the denial reason, builds an evidence map, shows missing evidence, drafts an appeal packet, and exports a human-approved PDF.

## Non-negotiables

1. No uncited clinical claims.
2. No autonomous clinical decision-making.
3. No live PHI in prototype/demo.
4. No external LLM with PHI unless every vendor has a BAA and retention controls.
5. Every user action involving PHI must be audit logged.
6. Every packet must be versioned.
7. The UI must feel like a premium clinical command center, not a generic admin dashboard.

## Build order

1. Visual shell and login experience.
2. Case dashboard.
3. New case upload.
4. Denial parser review.
5. Evidence map.
6. Missing evidence checklist.
7. Packet editor.
8. PDF export.
9. Outcome tracker.
10. Audit/security pass.
11. Seeded synthetic demo cases.
12. End-to-end tests.

## Codex usage

Use `05_CODEX/SPRINT_00_COMBINED_ULTRA.md` for a sustained combined build. Use the individual sprint prompts if Codex stops early or if you want more controlled phases. The prompts are intentionally detailed and repetitive because the goal is to prevent a shallow scaffold and force actual implementation, polish, tests, demo data, and documentation.

## Files that matter most

- `02_PRODUCT/PRD.md`
- `03_DESIGN/Design_System.md`
- `03_DESIGN/Screen_Specs.md`
- `04_ENGINEERING/Architecture.md`
- `04_ENGINEERING/schema.prisma`
- `04_ENGINEERING/openapi.yaml`
- `05_CODEX/MASTER_TOKENMAX_PROMPT.md`
- `06_COMPLIANCE/Clinical_Safety_Guardrails.md`
- `07_GTM/Pilot_Validation_Plan.md`

## Success definition for v1

A regional SNF operator can use the demo to process 3 historical de-identified denials and say:

- "This found evidence faster than our team."
- "The packet format is something we would actually send after review."
- "This would be worth a paid pilot if it works on our cases."
