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
npm run dev
```

Use [http://localhost:3000/login](http://localhost:3000/login).

Demo login:

- Email: `ur@appealforge.local`
- Password: `synthetic`

The demo session is local and deterministic; the login form links into the seeded workspace.

## Stable Preview

For a steadier demo than `next dev`, build once and run preview:

```bash
npm run build
npm run preview
```

Then open [http://127.0.0.1:3000/login](http://127.0.0.1:3000/login).

## Checks

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

Playwright may require browser installation in fresh environments:

```bash
npx playwright install chromium
```

## Seeded Data

The seed includes one organization, two facilities, four users, three synthetic patients, and three appeal cases:

- SNF admission denial for skilled level of care
- SNF continued-stay denial for custodial care
- IRF admission denial for lower level of care

Each case includes denial findings, criteria, documents, extracted pages, evidence items, evidence gaps, packet versions, communication logs, outcomes, and audit events.

## Export

The local demo supports two deterministic export paths:

- Print-ready HTML packet at `/api/cases/:caseId/packet/export/html`
- Draft Markdown packet at `/api/cases/:caseId/packet/export`

Both export paths run the same citation guard. PDF export is the production path, but print-ready HTML is the local fallback for reliable buyer demos.

## Local Notes From This Workspace

- `npm run db:generate` succeeded after Prisma downloaded its Windows engine binary.
- `prisma validate` passes.
- `prisma migrate dev` and `prisma db push` currently fail in this sandbox with an empty Prisma schema-engine error even though the schema is valid. The app does not depend on the database at runtime; it uses deterministic seeded demo data from `lib/demo-data.ts`.
- `npm run build` passes. Next reports non-fatal lockfile patch warnings because network access is restricted for SWC lockfile metadata.
- `npm run test:e2e` discovers the Playwright flow but is blocked in this sandbox because the Playwright Chromium binary is missing. `playwright install chromium` was attempted and timed out.

## PostgreSQL Switch

The checked-in Prisma schema uses SQLite to keep the demo runnable without local Postgres. For production, switch `datasource db.provider` to `postgresql`, restore JSON columns where appropriate, and set `DATABASE_URL` to a managed Postgres connection.
