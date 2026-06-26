# Safety Guardrails

AppealForge PAC is evidence-first and human-reviewed.

## Non-Negotiables

- Never generate uncited clinical claims.
- Every evidence item stores document id, document title/type, page number, exact quote, normalized summary, and confidence.
- Missing evidence becomes a checklist gap.
- Packet content is marked `DRAFT` until approved.
- Human approval is required before an approved export state.
- Packet versions are immutable snapshots in the intended production flow.
- Sensitive actions are audit logged.
- Audit metadata must not include PHI, synthetic patient identifiers, raw quotes, or clinical note text.

## Local Demo Enforcement

- `validateCitation` rejects missing document ids, invalid page numbers, and empty quotes.
- `validateEvidenceItem` requires a valid citation, summary, title/type, and confidence from 0 to 1.
- `generatePacketMarkdown` filters to accepted evidence only.
- `blockUnsupportedClaims` flags clinical assertion sentences without evidence citation markers.
- `generateMissingEvidenceChecklist` exposes open gaps instead of inventing facts.

## Production Readiness Notes

- Add real authentication and organization/facility scoped authorization.
- Use Postgres and encrypted object storage.
- Add BAAs and retention controls before using any external AI or live PHI.
- Add log scrubbing in hosting, analytics, error reporting, and worker infrastructure.
- Require physician approval before approved PDF export.
