# Testing and QA Plan

## Quality bar

The product is not done when routes compile. It is done when a buyer can complete the demo flow without a developer explaining anything.

## Unit tests

### Denial parser
- Parses plan name.
- Parses denial reason.
- Parses appeal deadline.
- Requires citations.
- Handles missing deadline.

### Evidence validator
- Rejects evidence without document id.
- Rejects evidence without page number.
- Rejects evidence without quote.
- Marks low confidence appropriately.

### Unsupported claim blocker
- Allows metadata sentence.
- Allows cited evidence sentence.
- Blocks uncited clinical claim.
- Explains block reason.

### RBAC
- Admin can view org cases.
- Facility-scoped user cannot view other facility cases.
- Auditor cannot edit.
- Clinical reviewer can approve evidence.

### Audit
- Action writes audit event.
- PHI fields are not in metadata.

## Integration tests

1. Create synthetic case.
2. Upload documents.
3. Extract pages.
4. Parse denial.
5. Confirm denial.
6. Generate evidence map.
7. Review evidence.
8. Generate packet.
9. Export PDF.
10. Record outcome.

## E2E tests

Use Playwright.

### Test 1 — demo login
- Open login.
- Click demo workspace.
- Dashboard loads.

### Test 2 — evidence map
- Open seeded SNF case.
- Confirm denial parser.
- Open evidence map.
- Open source quote drawer.
- Mark evidence reviewed.

### Test 3 — packet generation
- Generate packet.
- Confirm unsupported claims are not present.
- Export draft PDF.
- Verify export status.

### Test 4 — outcome
- Mark case sent.
- Record won outcome.
- Dashboard KPI updates.

## Visual QA

Screens to inspect manually:
- Login.
- Dashboard.
- Case overview.
- Denial parser review.
- Evidence map.
- Packet editor.
- PDF export.
- Outcome tracker.

Design must not look like raw CRUD. If it does, run the polish sprint.

## Security QA

- No PHI in console logs.
- No PHI in server logs.
- No PHI in audit metadata.
- All case routes require auth.
- All case queries are org scoped.
- Export links require authorization.
- Uploaded file names sanitized.
- PDF rendering sanitizes HTML/markdown.

## Demo QA

- Seed data feels real but synthetic.
- Every case has at least one missing evidence item.
- Every packet has citations.
- Deadline urgency displays correctly.
- Exported PDF has clean typography.
