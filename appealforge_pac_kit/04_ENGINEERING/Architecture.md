# Engineering Architecture

## Stack

- Next.js 15
- TypeScript
- PostgreSQL
- Prisma
- Server actions/API routes
- Object storage abstraction for PDF files
- Background worker for extraction and AI jobs
- PDF generation service
- Playwright for e2e tests
- Vitest for unit tests
- Tailwind with AppealForge design tokens

## Architecture principles

1. **No PHI in logs.**
2. **Every generated claim must be citation-backed.**
3. **Async document processing.**
4. **Human approval gates.**
5. **Versioned packet output.**
6. **Organization/facility scoped authorization.**
7. **Synthetic demo mode by default.**

## Services

### Web app
Handles user interactions, case dashboard, review screens, packet editor, and admin settings.

### API layer
Owns mutations and validation:
- case creation;
- document upload metadata;
- extraction job creation;
- parser confirmation;
- evidence review;
- packet versioning;
- outcome recording.

### Worker
Runs:
- PDF text extraction;
- document classification;
- denial parsing;
- evidence extraction;
- packet draft generation;
- unsupported claim audit;
- PDF export.

### Database
Stores case metadata, extracted page text, structured AI outputs, reviewer statuses, packet versions, outcomes, and audit events.

### Object storage
Stores original PDFs and exported packets. Use local filesystem adapter in demo mode and S3-compatible adapter in production.

## Data flow

1. User creates case.
2. User uploads denial letter and clinical docs.
3. Upload creates `documents` records and storage objects.
4. Worker extracts page text into `extracted_pages`.
5. Worker classifies documents.
6. User opens denial parser review.
7. Parser creates `denial_findings`.
8. User confirms denial finding.
9. Evidence job creates `criteria`, `evidence_items`, and `evidence_gaps`.
10. User reviews evidence.
11. Packet draft job creates `packet_versions` with draft markdown.
12. User edits and approves.
13. Export job creates PDF.
14. User records sent/outcome.
15. Audit log records all sensitive actions.

## Suggested repo structure

```text
app/
  (auth)/
    login/
  (dashboard)/
    cases/
    cases/[caseId]/
      overview/
      denial/
      evidence/
      packet/
      outcome/
  admin/
components/
  brand/
  shell/
  cases/
  evidence/
  packet/
  ui/
lib/
  auth/
  audit/
  db/
  documents/
  ai/
  packets/
  pdf/
  security/
prisma/
  schema.prisma
workers/
  document-extraction.ts
  ai-evidence.ts
  packet-export.ts
tests/
  unit/
  e2e/
```

## Authorization

Every query must be scoped by organization id and, when applicable, facility id.

Access rule pattern:
- user belongs to organization;
- user has role;
- case belongs to organization;
- if user is facility-scoped, case facility must match.

## Audit logging pattern

Use a central helper:

```ts
await auditEvent({
  organizationId,
  userId,
  action: "case.viewed",
  subjectType: "AuthCase",
  subjectId: caseId,
  metadata: { route: "/cases/:id" } // never PHI
});
```

## AI safety pattern

All model outputs must be parsed into schemas. The UI never trusts freeform AI text.

Suggested stages:
- `classifyDocumentPages`
- `parseDenialLetter`
- `generateCriteria`
- `extractEvidenceForCriterion`
- `draftPacketFromReviewedEvidence`
- `auditUnsupportedClaims`

## PDF export pattern

Use server-side PDF generation:
- render packet markdown/HTML to PDF;
- include citations;
- include draft watermark until approved;
- store immutable exported file;
- link to packet version.

## Testing strategy

### Unit tests
- denial parser schema validation;
- deadline inference;
- evidence item citation validation;
- unsupported claim blocker;
- RBAC helper;
- audit log helper.

### Integration tests
- create case -> upload doc -> extraction -> parser -> evidence -> packet.
- packet export creates immutable version.

### E2E tests
- login;
- open dashboard;
- create demo case;
- review denial;
- review evidence;
- generate/export packet;
- record outcome.

## Production checklist

Before live PHI:
- BAAs complete;
- external model retention disabled or covered;
- logs scrubbed;
- error monitoring scrubbed;
- encryption configured;
- backups configured;
- audit export working;
- data retention policy implemented;
- incident response runbook approved.
