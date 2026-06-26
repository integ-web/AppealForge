# AppealForge PAC

AppealForge PAC is a local, synthetic demo of a post-acute Medicare Advantage denial-to-appeal workflow. It turns a denial letter and clinical packet into a source-cited, human-reviewed draft appeal packet.

## Demo Rules

- Synthetic data only.
- No external AI calls.
- No external healthcare services.
- The app does not make medical necessity decisions.
- Packet text remains `DRAFT` until human approval.
- Clinical assertions must be citation-backed.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Prisma
- SQLite for local demo fallback
- Vitest
- Playwright

## Setup

```bash
npm install
copy .env.example .env
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

Use [http://localhost:3000/login](http://localhost:3000/login).

Demo login:

- Email: `ur@appealforge.local`
- Password: `synthetic`

The demo session is local and deterministic; the login form links into the seeded workspace.

## Checks

```bash
npm run lint
npm run typecheck
npm run test
npm run test:e2e
```

Playwright may require browser installation in fresh environments.

## Local Notes From This Workspace

- `npm run db:generate` succeeded after Prisma downloaded its Windows engine binary.
- `prisma migrate dev` and `prisma db push` currently fail in this sandbox with an empty Prisma schema-engine error even though `prisma validate` passes. The app itself does not depend on the database at runtime; it uses deterministic seeded demo data from `lib/demo-data.ts`.
- `npm run build` passes. Next reports non-fatal lockfile patch warnings because network access is restricted for SWC lockfile metadata.
- The Playwright spec is checked in at `tests/e2e/demo-flow.spec.ts`; in this sandbox it is blocked because the Playwright Chromium binary is missing. `playwright install chromium` was attempted but timed out before the browser finished downloading.

## Local Notes From This Workspace

- `npm run db:generate` succeeded after Prisma downloaded its Windows engine binary.
- `prisma migrate dev` and `prisma db push` currently fail in this sandbox with an empty Prisma schema-engine error even though `prisma validate` passes. The app itself does not depend on the database at runtime; it uses deterministic seeded demo data from `lib/demo-data.ts`.
- `npm run build` passes. Next reports non-fatal lockfile patch warnings because network access is restricted for SWC lockfile metadata.
- The Playwright spec is checked in at `tests/e2e/demo-flow.spec.ts`; in this sandbox it is blocked because the Playwright Chromium binary is missing. `playwright install chromium` was attempted but timed out before the browser finished downloading.

## Seeded Data

The seed includes one organization, two facilities, four users, three synthetic patients, and three appeal cases:

- SNF admission denial for skilled level of care
- SNF continued-stay denial for custodial care
- IRF admission denial for lower level of care

Each case includes denial findings, criteria, documents, extracted pages, evidence items, evidence gaps, packet versions, communication logs, outcomes, and audit events.

## Export

The local demo implements a Markdown/HTML-style packet export workflow. PDF export is documented as the production path, but the fallback is intentional for local reliability.

## PostgreSQL Switch

The checked-in Prisma schema uses SQLite to keep the demo runnable without local Postgres. For production, switch `datasource db.provider` to `postgresql`, restore JSON columns where appropriate, and set `DATABASE_URL` to a managed Postgres connection.
