# Product Requirements Document — AppealForge PAC

## Product name

AppealForge PAC

## Product category

B2B healthcare operations software for post-acute Medicare Advantage denial appeal packet generation.

## Product thesis

Medicare Advantage denials are often under-appealed because teams cannot assemble evidence fast enough. AppealForge PAC makes appeals operationally feasible by converting denial letters and clinical documents into source-cited, human-reviewed reconsideration packets.

## Target users

### Primary users
- Admissions coordinator
- Utilization review nurse
- Case manager
- Business office manager
- Medical director/physician reviewer

### Buyers
- VP Revenue Cycle
- COO
- VP Clinical Operations
- Regional Administrator

## Supported v1 case types

1. SNF admission denied for "does not meet skilled level of care."
2. SNF continued stay denied for "custodial care."
3. IRF admission denied for "could be treated at lower level of care."

## V1 out-of-scope

- Autonomous medical necessity decisions.
- Autonomous appeal submission.
- Live payer portal automation.
- Full EHR integration.
- Consumer app.
- Claim-level post-payment denials.
- Use of proprietary payer criteria unless provided/licensed by customer.
- Live PHI in demos or uncontracted pilots.

## User journey

### 1. Create case
User enters facility, patient display name or synthetic ID, payer, plan, service type, request type, and denial date.

### 2. Upload documents
User uploads denial letter and clinical PDFs. The system classifies files and extracts page-level text.

### 3. Review denial parser
The system extracts:
- plan name;
- member/patient metadata;
- service requested;
- denial date;
- appeal deadline;
- denial reason(s);
- payer rationale;
- appeal instructions;
- expedited language;
- citations from denial letter.

User confirms or edits.

### 4. Evidence map
System generates criteria rows based on denial reason and case type. Each row has:
- evidence requirement;
- evidence found;
- source quote;
- document/page;
- confidence;
- missing evidence question;
- reviewer status.

### 5. Missing evidence checklist
System asks targeted questions:
- Is there a PT/OT evaluation after hospital discharge?
- Are there IV medication orders?
- Is there a wound measurement note?
- Is there skilled nursing documentation?
- Is the physician willing to sign an expedited appeal statement?

### 6. Generate packet
System drafts:
- appeal cover letter;
- patient/service summary;
- denial reason and rebuttal;
- evidence table;
- missing/attached documentation list;
- physician attestation placeholder;
- attachment index.

### 7. Human approval
Staff and/or physician review the packet. Draft content cannot be exported as approved unless required reviewer statuses are complete.

### 8. Export
System exports a PDF packet and stores a versioned snapshot.

### 9. Track outcome
User records:
- sent date;
- channel;
- confirmation number;
- plan response due;
- outcome;
- approved days;
- denial upheld reason;
- escalation status.

## Functional requirements

### Case dashboard
- Show cases by status: New, Parsing, Needs Review, Packet Drafted, Approved, Sent, Won, Lost, Escalated.
- Show appeal deadline countdown.
- Show case type, plan, facility, assigned owner, next action.
- Filters: facility, plan, deadline, status, service type.

### Upload
- Support PDF upload.
- Store checksum.
- Extract page count.
- Run server-side text extraction.
- Persist page-level text with document id and page number.
- Classify document type.

### Denial parser
- Parse structured fields.
- Require user review before packet generation.
- Maintain original cited quote for each parsed field.

### Evidence map
- Evidence map must be explainable.
- Each evidence item requires a citation.
- Evidence confidence below threshold is marked "Needs review."
- Missing evidence creates a checklist task.

### Packet editor
- Use structured sections, not freeform hallucination.
- Unsupported clinical claims are blocked.
- Every generated paragraph must be traceable to evidence items or case metadata.
- User edits are tracked.

### PDF export
- Export must include:
  - cover page;
  - appeal letter;
  - evidence table;
  - attachment index;
  - physician attestation placeholder;
  - selected document excerpts if allowed.
- Export creates immutable packet version.

### Audit log
Audit the following:
- login;
- view case;
- create case;
- upload document;
- extract document;
- parse denial;
- generate evidence;
- edit evidence;
- generate packet;
- edit packet;
- approve packet;
- export packet;
- delete/retention action;
- user/role changes.

### RBAC
Roles:
- Owner
- Admin
- Clinical Reviewer
- Case Manager
- Admissions User
- Read-only Auditor

### Demo data
The product must seed three synthetic cases:
- SNF admission denial;
- SNF continued stay denial;
- IRF admission denial.

## Quality requirements

### Usability
- A trained user can create a case and reach an evidence map within 10 minutes.
- The UI shows what is found, what is missing, and what needs human review.
- No page should look like a default CRUD app.

### Safety
- Clinical claims require citations.
- AI output is always draft.
- Human approval before export.
- Missing data becomes a question, never a fabricated fact.

### Security
- No PHI in logs.
- Organization/facility scoped access.
- Audit log for PHI actions.
- Encryption at rest and in transit.
- Vendor BAA readiness.

### Performance
- Dashboard loads under 2 seconds with 500 cases.
- A 50-page PDF is processed asynchronously.
- Evidence map generation should be resumable.

## Acceptance criteria for MVP demo

1. User can log in with synthetic demo account.
2. User sees tasteful dashboard with real-looking case cards and deadline urgency.
3. User can upload synthetic PDFs or load seeded documents.
4. Denial parser extracts a denial reason with citations.
5. Evidence map shows at least 8 criteria/evidence rows for each seeded case.
6. Missing evidence checklist has targeted asks.
7. Packet editor produces a coherent appeal packet.
8. PDF export works.
9. Outcome tracker records results.
10. Audit log displays core events.
11. App passes lint/typecheck/tests.
12. UI is polished enough for a buyer demo.

## North-star metrics

- Appeal packet assembly time.
- Percent of denials appealed.
- Percent of appealed denials overturned.
- Staff time saved per appeal.
- Packet approval cycle time.
- Missing evidence resolved before submission.
- Days of coverage recovered.
- Facility-level ROI.

## v2 expansion

- EHR integrations.
- Payer portal upload assistant.
- FHIR PAS readiness.
- Criteria library by payer/service.
- Document request automation.
- Denial pattern analytics.
- Multi-facility benchmarking.
- Secure provider/physician review links.
