# Screen Specs

## 1. Login

### Goal
Make the product feel premium and trustworthy before the user enters.

### Layout
- Full-screen dark gradient.
- Left hero area:
  - logo;
  - tagline;
  - evidence card mock;
  - compliance trust tags.
- Right login card:
  - email/password;
  - demo mode button;
  - SSO placeholder;
  - privacy note.

### Copy
Headline:
> Turn denials into evidence-ready appeal packets.

Subheadline:
> Source-cited appeal workflow for post-acute Medicare Advantage teams.

Trust tags:
- Citation-only drafts
- Human approval required
- Audit-ready workflow
- Synthetic demo mode

### Acceptance criteria
- No generic white login box.
- It should look like a premium B2B healthcare product.
- Demo mode obvious.

## 2. Dashboard

### Goal
Tell the user what needs action today.

### Sections
- KPI strip:
  - Open denials
  - Due within 72h
  - Packets drafted
  - Appeals won
- Urgent queue
- Case table/cards
- Payer pattern panel
- Recent audit activity

### Key interactions
- Create new case
- Open case
- Filter by facility/status/plan
- Sort by deadline

## 3. New case upload

### Goal
Make intake feel fast and safe.

### Sections
- Case metadata
- Upload zone
- Document type previews
- Extraction status
- "Use seeded demo packet" option

### States
- Empty upload
- Drag active
- Uploading
- Extracting
- Extraction warning
- Ready for parser review

## 4. Case overview

### Goal
Single source of truth for one appeal.

### Sections
- Case header
- Deadline status
- Denial summary
- Evidence progress
- Packet status
- Assigned reviewers
- Activity timeline

## 5. Denial parser review

### Goal
Confirm what the payer denied and what the appeal route requires.

### Layout
- Left: extracted fields.
- Right: source quote from denial letter.
- Bottom: confirm/edit controls.

### Required fields
- Plan
- Service requested
- Request type
- Denial date
- Appeal deadline
- Denial reason
- Payer rationale
- Appeal route
- Expedited language

## 6. Evidence map

### Goal
Make evidence assembly visual, scannable, and trustworthy.

### Layout
- Left: criteria/evidence cards.
- Right: source drawer.
- Top: progress meter and missing evidence count.

### Evidence card anatomy
- Criterion label
- Required evidence
- Evidence status
- Summary
- Citation pills
- Confidence
- Reviewer status
- Action buttons

### Source drawer
- Document title
- Page number
- Exact quote
- Why it matters
- Add reviewer note
- Mark reviewed

## 7. Missing evidence checklist

### Goal
Turn absence into action.

### Checklist item anatomy
- Gap text
- Why needed
- Suggested owner
- Priority
- Upload/request action
- Resolve control

## 8. Packet editor

### Goal
Draft the appeal packet from reviewed evidence.

### Layout
- Left: structured section editor.
- Right: warm paper packet preview.
- Bottom: export controls.

### Inline guardrails
- Unsupported sentence blocked.
- Citation chips next to clinical claims.
- Draft watermark until approved.

## 9. Packet PDF export

### Goal
Generate a clean, professional packet.

### Export options
- Draft PDF
- Approved PDF
- Include evidence table
- Include attachment index
- Include selected excerpts
- Redact synthetic identifiers in demo mode

## 10. Outcome tracker

### Goal
Close the loop and prove ROI.

### Fields
- Sent date
- Channel
- Confirmation number
- Response due
- Outcome
- Approved days
- Notes
- Escalation

## 11. Admin settings

### Sections
- Organization
- Facilities
- Users/roles
- Criteria templates
- Vendor/compliance
- Audit export
- Retention settings
