# User Stories and Acceptance Criteria

## Epic 1 — Case intake

### Story
As an admissions coordinator, I want to create a denial case quickly so that I can start appeal work before the deadline approaches.

### Acceptance criteria
- User can create a case with facility, plan, service type, denial date, and request type.
- Case status is set to `New`.
- Audit event is recorded.
- Required fields are validated.
- Synthetic demo mode is visibly labeled.

## Epic 2 — Document upload

### Story
As a utilization review nurse, I want to upload the denial letter and clinical packet so that AppealForge can find relevant evidence.

### Acceptance criteria
- User can upload multiple PDFs.
- Documents are stored with checksum, page count, and type.
- Extraction job creates page-level text records.
- Upload progress is visible.
- Errors are recoverable.
- Audit event is recorded.

## Epic 3 — Denial parsing

### Story
As a case manager, I want the denial reason and appeal deadline extracted so that I do not miss payer requirements.

### Acceptance criteria
- Parser extracts plan name, denial reason, denial date, appeal instructions, and deadline.
- Every extracted field has a citation to document/page/quote.
- User can confirm or edit parser output.
- Unconfirmed parser output cannot finalize packet generation.
- Audit event is recorded.

## Epic 4 — Evidence map

### Story
As a clinical reviewer, I want to see payer denial reasons mapped to clinical evidence so that I can quickly judge whether the appeal packet is supportable.

### Acceptance criteria
- Evidence map has rows for skilled need, therapy need, nursing need, medical complexity, safety risk, discharge barriers, and physician support when relevant.
- Every evidence item includes document/page/quote.
- Evidence items have confidence and reviewer status.
- Missing evidence rows become checklist tasks.
- Unsupported or low-confidence claims are clearly marked.

## Epic 5 — Packet generation

### Story
As a revenue cycle leader, I want a clean appeal packet generated from reviewed evidence so that my team can appeal more denials.

### Acceptance criteria
- Packet includes cover letter, summary, denial reason, evidence table, attachment index, and attestation placeholder.
- Packet uses only cited evidence.
- Draft packet is labeled `Draft`.
- Approved packet is versioned.
- User edits are preserved.
- Exported PDF is readable and professional.

## Epic 6 — Outcome tracking

### Story
As an administrator, I want to track appeal outcomes so that I can understand ROI and payer patterns.

### Acceptance criteria
- User can mark case as sent, won, lost, partially approved, or escalated.
- User can record sent date, channel, confirmation, decision date, approved days, and notes.
- Dashboard metrics update.
- Outcome is included in analytics export.

## Epic 7 — Audit and compliance

### Story
As an admin, I want a reliable audit trail so that we can govern PHI-related activity.

### Acceptance criteria
- Every sensitive action is logged.
- Logs include user, action, subject type, subject id, timestamp, and IP/device context where available.
- Logs do not contain PHI.
- Audit stream is available per case.
- Admin can export audit events.

## Epic 8 — Design quality

### Story
As a daily user, I want the app to feel modern, calm, and trustworthy so that I do not dread logging in.

### Acceptance criteria
- Login page has a branded, premium visual system.
- Dashboard is not a raw table-only CRUD screen.
- Deadline urgency is clear without alarm fatigue.
- Evidence map is scannable.
- Packet editor feels like a polished workbench.
- Empty/loading/error states are designed.
