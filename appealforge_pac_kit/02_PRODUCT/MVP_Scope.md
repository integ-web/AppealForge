# MVP Scope

## MVP promise

A post-acute provider can process a de-identified Medicare Advantage denial packet from upload to downloadable appeal packet in one guided workflow.

## Build exactly this first

### 1. Auth and demo mode
- Login page.
- Seeded demo users.
- No live PHI.
- Session guard.

### 2. Case dashboard
- Case list with deadline urgency.
- Filters.
- KPI strip.
- "New case" action.

### 3. New case/upload
- Create case metadata.
- Upload PDF documents.
- Document classification.
- Page extraction queue.

### 4. Denial parser
- Extract denial facts.
- Show citations.
- User confirmation.

### 5. Evidence map
- Criteria rows.
- Source-cited evidence.
- Missing evidence gaps.
- Confidence and reviewer status.

### 6. Packet builder
- Appeal cover letter.
- Evidence table.
- Attachment index.
- Physician attestation placeholder.
- Version history.

### 7. Export
- PDF export.
- Watermark drafts.
- Approved packet version.

### 8. Outcome tracker
- Sent date/channel.
- Confirmation.
- Plan response due.
- Outcome.

### 9. Audit log
- Visible audit stream per case.
- Backend audit event writes.

## Do not build in MVP

- Payer portal scraping.
- Automated fax.
- Real EHR sync.
- Live PHI upload without BAAs.
- Proprietary payer criteria scraper.
- Autonomous appeals.
- Claims adjudication.
- Billing integration.

## Demo standards

The demo should feel "production-shaped":
- polished navigation;
- empty states;
- loading states;
- error states;
- deadline badges;
- source citation drawer;
- packet preview;
- audit event stream;
- high-trust language.

## MVP demo script

1. Log in as regional operator.
2. Show dashboard: 3 cases, one urgent.
3. Open SNF denial case.
4. Show denial reason extracted from letter.
5. Show evidence map with quotes from therapy/nursing notes.
6. Show missing wound note gap.
7. Mark one evidence item reviewed.
8. Generate packet.
9. Open packet preview and citation side panel.
10. Export draft PDF.
11. Record sent status.
12. Show audit trail.

## MVP proof

A buyer should leave the demo believing:
- this saves staff time;
- it reduces missed appeal opportunities;
- it helps physicians trust the packet;
- it can work before deep integrations;
- it is safer than manual copy/paste.
