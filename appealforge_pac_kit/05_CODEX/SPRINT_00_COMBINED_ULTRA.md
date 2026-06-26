# SPRINT 00 — COMBINED ULTRA TOKENMAX BUILD

Paste this into Codex when you want one aggressive, sustained implementation sprint.

## Mission

Build a demo-ready AppealForge PAC app from scratch or from the existing repo seed. Do not stop at scaffold. Keep going until the entire synthetic demo workflow is usable, polished, tested, and documented.

## Product one-liner

AppealForge PAC helps post-acute providers turn Medicare Advantage denials into source-cited, physician-reviewable appeal packets before patients lose access to needed care.

## Non-negotiables

- Use the AppealForge design system.
- Build the actual screens, not placeholders.
- Use synthetic data only.
- No uncited clinical claims.
- Evidence items must have document id, page number, quote.
- Draft packets must be marked draft.
- Human approval required before approved export.
- Audit all sensitive actions.
- Do not log PHI.
- Make the app feel premium.

## Work protocol

Create `.codex/progress.md` immediately. Maintain it as a checklist.

Use this loop until complete:

1. Inspect repo.
2. Plan the next concrete batch.
3. Implement files.
4. Run checks.
5. Fix errors.
6. Update `.codex/progress.md`.
7. Continue.

Do not stop after a single batch unless every acceptance criterion below is satisfied.

## Acceptance criteria

### Functional
- Demo login works.
- Dashboard loads with seeded cases.
- New case screen exists.
- Case overview exists.
- Denial parser review exists.
- Evidence map exists with source drawer.
- Missing evidence checklist exists.
- Packet editor exists.
- Packet export works or has local stub with generated file.
- Outcome tracker works.
- Audit log records events.
- Admin settings page exists.

### Design
- Login is beautiful.
- Dashboard is visually distinct.
- Evidence map is the hero screen.
- Packet preview looks like warm paper.
- Cards, badges, typography, spacing, and microcopy are polished.
- App does not look like default shadcn.

### Data
Seed:
- organization;
- 2 facilities;
- 4 users;
- 3 patients with synthetic labels;
- 3 auth cases;
- denial letters;
- extracted pages;
- criteria;
- evidence items;
- evidence gaps;
- packet versions;
- audit events.

### Tests
- `pnpm lint` passes or documented if unavailable.
- `pnpm typecheck` passes.
- Unit tests for citation validator and unsupported claim blocker.
- E2E test for demo login -> case -> evidence -> packet.

## Required UI details

### Login
- Full-screen dark gradient.
- Logo.
- Hero statement.
- Evidence stats.
- Trust tags.
- Login card.
- Demo mode button.

### Dashboard
- KPI strip.
- Urgent queue.
- Case list with deadline badges.
- Payer pattern panel.
- Recent audit activity.

### Evidence map
- Criteria cards with status rail.
- Source quote drawer.
- Confidence indicators.
- Missing evidence gaps.
- Reviewer status controls.

### Packet editor
- Structured sections.
- Paper preview.
- Citation chips.
- Unsupported claim warning.
- Export button.
- Version history.

## AI/data logic in demo

For demo, use deterministic seeded extraction. Do not call external AI. Build interfaces as if an AI pipeline exists, but populate with synthetic data and pure functions.

Implement:
- `validateCitation`
- `validateEvidenceItem`
- `blockUnsupportedClaims`
- `generatePacketMarkdown`
- `getCaseEvidenceProgress`
- `getDeadlineUrgency`

## If blocked

Do not stop. Create the simplest functional fallback and continue:
- If PDF export dependency fails, create markdown/HTML export and document it.
- If database setup is absent, use Prisma SQLite fallback for demo only or document how to switch.
- If auth is too heavy, create demo session guard and continue.
- If a component library is unavailable, implement custom components.

## Final deliverables inside repo

- Working app.
- `README.md`.
- `.codex/progress.md`.
- `docs/demo-script.md`.
- `docs/safety-guardrails.md`.
- tests.
- seeded synthetic data.

## Start now

Begin implementation. Keep going through the acceptance criteria. Do not merely describe what you would do.
