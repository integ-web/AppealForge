# Delivery Map

This kit contains strategy, product, design, engineering, compliance, GTM, demo data, templates, and Codex sprint prompts for AppealForge PAC.

## Root deliverables

- `AppealForge_PAC_Master_Brief.docx` — polished master brief.
- `AppealForge_PAC_Master_Brief.pdf` — PDF version of the master brief.
- `AppealForge_PAC_Founder_Deck.pptx` — founder/sales deck.
- `AppealForge_PAC_Founder_Deck.pdf` — PDF version of the deck.
- `AppealForge_PAC_Backlog_Validation_Tracker.xlsx` — build backlog, validation tracker, ROI calculator, risk and compliance sheets.
- `README.md` — root package overview.

## Directory tree

```text
├── 00_START_HERE/
│   └── START_HERE.md
├── 01_RESEARCH/
│   ├── Competitive_Positioning.md
│   ├── Problem_Brief.md
│   └── Source_Log.md
├── 02_PRODUCT/
│   ├── AI_Evidence_Pipeline.md
│   ├── Clinical_Appeal_Workflows.md
│   ├── MVP_Scope.md
│   ├── PRD.md
│   ├── Risk_Register.md
│   └── User_Stories_Acceptance_Criteria.md
├── 03_DESIGN/
│   ├── assets/
│   │   └── logo.svg
│   ├── static_mockups/
│   │   └── index.html
│   ├── appealforge_theme.css
│   ├── Design_Direction.md
│   ├── Design_System.md
│   ├── Screen_Specs.md
│   ├── tokens.json
│   └── UX_Copy.md
├── 04_ENGINEERING/
│   ├── Architecture.md
│   ├── Deployment_Runbook.md
│   ├── openapi.yaml
│   ├── RBAC_Audit_Log.md
│   ├── schema.prisma
│   └── Testing_QA.md
├── 05_CODEX/
│   ├── BUGFIX_PROMPT.md
│   ├── CONTINUE_PROMPT.md
│   ├── MASTER_TOKENMAX_PROMPT.md
│   ├── REVIEW_POLISH_PROMPT.md
│   ├── SPRINT_00_COMBINED_ULTRA.md
│   ├── SPRINT_01_FOUNDATION.md
│   ├── SPRINT_02_UI_DESIGN.md
│   ├── SPRINT_03_DOCUMENT_AI_WORKFLOW.md
│   ├── SPRINT_04_EVIDENCE_PACKET.md
│   ├── SPRINT_05_EXPORT_OUTCOME_AUDIT.md
│   └── SPRINT_06_TEST_SECURITY_POLISH.md
├── 06_COMPLIANCE/
│   ├── BAA_Vendor_Checklist.md
│   ├── Clinical_Safety_Guardrails.md
│   ├── HIPAA_Security_Checklist.md
│   └── Privacy_Logging_Rules.md
├── 07_GTM/
│   ├── Discovery_Call_Script.md
│   ├── ICP_and_Sales_Playbook.md
│   ├── One_Page_Buyer_Memo.md
│   ├── Pilot_Validation_Plan.md
│   └── Pricing_and_ROI.md
├── 08_DEMO_DATA/
│   ├── criteria_templates.json
│   ├── sample_clinical_packet_excerpt.txt
│   ├── sample_denial_letter.txt
│   └── synthetic_cases.json
├── 09_TEMPLATES/
│   ├── Appeal_Cover_Letter_Template.md
│   ├── Appeal_Packet_Template.md
│   ├── Packet_Quality_Checklist.md
│   └── Physician_Attestation_Template.md
├── 10_REPO_SEED/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── login/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/
│   │   │   └── cases/
│   │   │       └── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── brand/
│   │   │   └── Logo.tsx
│   │   └── ui/
│   │       └── AppShell.tsx
│   ├── lib/
│   │   ├── audit.ts
│   │   └── types.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── public/
│   │   └── logo.svg
│   ├── package.json
│   └── README.md
├── AppealForge_PAC_Backlog_Validation_Tracker.xlsx
├── AppealForge_PAC_Founder_Deck.pdf
├── AppealForge_PAC_Founder_Deck.pptx
├── AppealForge_PAC_Master_Brief.docx
├── AppealForge_PAC_Master_Brief.pdf
└── README.md
```

## Suggested usage order

1. Read `00_START_HERE/START_HERE.md`.
2. Open `03_DESIGN/static_mockups/index.html`.
3. Hand `05_CODEX/SPRINT_00_COMBINED_ULTRA.md` to Codex.
4. Use `AppealForge_PAC_Backlog_Validation_Tracker.xlsx` to track build and validation.
5. Use `07_GTM/Discovery_Call_Script.md` and `07_GTM/Pilot_Validation_Plan.md` to validate before overbuilding.
