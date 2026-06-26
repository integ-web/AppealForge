# MASTER TOKENMAX PROMPT — AppealForge PAC

You are Codex working inside a repository. Build AppealForge PAC as a polished, demo-ready B2B healthcare workflow app.

## Product

AppealForge PAC helps post-acute providers generate source-cited, human-reviewed Medicare Advantage denial appeal packets from denial letters and clinical PDFs.

The product does not make medical necessity decisions. It assembles evidence and packet drafts for human review.

## Design bar

Do not create a bland app. Use the design direction in:

- `03_DESIGN/Design_Direction.md`
- `03_DESIGN/Design_System.md`
- `03_DESIGN/Screen_Specs.md`
- `03_DESIGN/tokens.json`
- `03_DESIGN/static_mockups/index.html`

The app should feel premium, calm, trustworthy, and visually distinct. The login page must be beautiful.

## Core rules

1. Never generate uncited clinical claims.
2. Every evidence item must link to document id, page number, and quote.
3. Missing evidence becomes a checklist gap, not invented content.
4. AI-generated text is draft until human approved.
5. Every packet has versions.
6. Audit view/upload/extraction/generation/edit/approval/export/delete.
7. Do not log PHI.
8. Use synthetic demo data only.
9. Do not stop at scaffolding.
10. Continue building through UI, workflow, tests, seed data, and polish.

## Stack

- Next.js 15
- TypeScript
- Prisma
- PostgreSQL
- Tailwind CSS with custom AppealForge tokens
- Server-side PDF generation
- Background jobs or job abstraction
- Vitest
- Playwright
- No external PHI services in demo

## Required screens

1. Login
2. Case dashboard
3. New case upload
4. Case overview
5. Denial parser review
6. Evidence map
7. Missing evidence checklist
8. Packet editor
9. Packet PDF export
10. Outcome tracker
11. Admin settings
12. Audit log

## Required seeded synthetic cases

1. SNF admission denied for "does not meet skilled level of care"
2. Continued stay denied for "custodial care"
3. IRF admission denied for "could be treated at lower level of care"

## Required data entities

Use the Prisma schema from `04_ENGINEERING/schema.prisma` as the starting point.

Core entities:
- Organization
- Facility
- User
- Patient
- AuthCase
- Document
- ExtractedPage
- DenialFinding
- Criterion
- EvidenceItem
- EvidenceGap
- PacketVersion
- CommunicationLog
- AppealOutcome
- AuditEvent

## Long-running anti-premature-stop protocol

You are not done after creating a folder structure. You are not done after making static pages. You are not done after one green build.

Keep a living checklist in `.codex/progress.md`. After every milestone:
1. update the checklist;
2. run the most relevant checks;
3. fix failures;
4. continue to the next incomplete item.

If you finish early, do polish passes:
- UI polish pass;
- empty/loading/error states;
- accessibility pass;
- seed data realism pass;
- test coverage pass;
- PDF export pass;
- audit/security pass;
- README/demo script pass.

Only stop when:
- all screens exist;
- seeded demo flow works;
- packet export works or has a clearly documented local fallback;
- tests pass;
- README explains how to run;
- `.codex/progress.md` shows completed work and remaining risks.

## Implementation phases

### Phase 1 — Foundation
- Create app structure.
- Install dependencies.
- Add Tailwind theme.
- Add Prisma schema.
- Add seed script.
- Add auth/demo login.
- Add app shell.

### Phase 2 — Tasteful UI
- Build branded login.
- Build dashboard with KPI strip and urgent queue.
- Build case pages.
- Add responsive layout.
- Add loading/empty/error states.

### Phase 3 — Case workflow
- CRUD for synthetic cases.
- Document metadata and upload mock/local adapter.
- Extraction stub that uses seeded text.
- Denial parser with structured output from seeded docs.
- Denial review UI.

### Phase 4 — Evidence map
- Criteria generation.
- Evidence items with citations.
- Source quote drawer.
- Missing evidence checklist.
- Reviewer statuses.

### Phase 5 — Packet builder
- Packet markdown generator.
- Unsupported claim blocker.
- Packet editor.
- Version history.
- PDF export.

### Phase 6 — Outcomes and audit
- Communication log.
- Outcome tracker.
- Audit event stream.
- RBAC helpers.

### Phase 7 — Tests
- Unit tests for validation and blockers.
- Integration tests for case flow.
- Playwright demo flow tests.

### Phase 8 — Polish and docs
- Improve microcopy.
- Improve visual hierarchy.
- Add README.
- Add demo script.
- Add screenshots if practical.
- Check accessibility basics.

## Output expectations

At minimum:
- a working local app;
- seeded demo data;
- polished UI;
- tests;
- README;
- progress log.

Do not ask for product clarification. Use the docs in this kit as the source of truth. When ambiguous, choose the option that strengthens the narrow wedge: post-acute Medicare Advantage appeal packet generation.
