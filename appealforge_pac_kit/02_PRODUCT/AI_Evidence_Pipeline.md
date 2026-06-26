# AI Evidence Pipeline

## Principle

The AI pipeline is quote-first. It must find source evidence before it writes a clinical sentence.

## Pipeline overview

1. Document ingestion
2. OCR/text extraction
3. Page-level chunking
4. Document classification
5. Denial parsing
6. Criteria generation
7. Evidence retrieval
8. Evidence normalization
9. Evidence gap detection
10. Packet drafting
11. Unsupported claim blocking
12. Human review and approval

## Step 1 — Document classification

Structured output:

```json
{
  "doc_type": "denial_letter | discharge_summary | h_and_p | therapy_note | nursing_note | wound_note | medication_list | lab_report | other",
  "confidence": 0.0,
  "key_dates": [],
  "warnings": []
}
```

Rules:
- Do not classify as a denial letter unless appeal/denial language is present.
- If multiple document types appear in one PDF, classify pages separately.
- Low confidence remains `other`.

## Step 2 — Denial parsing

Structured output:

```json
{
  "plan_name": "",
  "service_requested": "",
  "request_type": "admission | continued_stay | other",
  "denial_date": "",
  "appeal_deadline": "",
  "denial_reasons": [],
  "payer_rationale": "",
  "appeal_route": "",
  "expedited_language_present": false,
  "missing_info_requested_by_plan": [],
  "source_citations": [
    {
      "document_id": "",
      "page": 1,
      "quote": ""
    }
  ]
}
```

Rules:
- All extracted fields must have citations where possible.
- If deadline is not explicit, calculate only if rule source and notice date are confirmed.
- Label inferred deadlines as inferred.

## Step 3 — Criteria generation

Inputs:
- case type;
- service type;
- denial reason;
- payer rationale;
- customer-approved criteria templates.

Output:

```json
{
  "criteria": [
    {
      "label": "Daily skilled nursing need",
      "description": "Evidence that services require skilled nursing personnel.",
      "required_evidence": [
        "skilled intervention",
        "frequency",
        "clinical reason",
        "date"
      ],
      "priority": "high"
    }
  ]
}
```

Rules:
- Use public/general criteria templates or customer-provided licensed criteria only.
- Never scrape or infer proprietary payer guidelines.

## Step 4 — Evidence extraction

Structured output:

```json
{
  "criterion": "",
  "evidence_found": true,
  "evidence_summary": "",
  "source_citations": [
    {
      "document_id": "",
      "page": 1,
      "quote": ""
    }
  ],
  "confidence": 0.0,
  "missing_followup_question": ""
}
```

Rules:
- Evidence summary must be entailed by quote.
- Quotes must be short enough for review, not entire pages.
- If evidence is weak or ambiguous, mark low confidence.
- If no evidence found, create a gap.

## Step 5 — Packet drafting

Allowed sources:
- confirmed denial finding;
- reviewed evidence items;
- case metadata;
- reviewer-entered facts;
- approved templates.

Blocked sources:
- uncited AI inference;
- external clinical assumptions;
- unsupported payer policy statements;
- unverifiable patient facts.

## Unsupported claim blocker

Before packet version creation, run a claim audit:

For every sentence in the clinical summary:
- identify supporting evidence item ids;
- verify each evidence item has document/page/quote;
- mark sentence `supported`, `metadata`, `template`, or `blocked`.

Blocked sentences cannot be exported.

## Prompting style

Use small structured calls, not one giant freeform prompt, for production. Use deterministic schemas. Keep page ids and quote anchors intact.

## Human-in-loop states

- `ai_draft`
- `staff_reviewed`
- `clinical_reviewed`
- `physician_approved`
- `exported`

## Auditability

Persist:
- model name/version;
- prompt template version;
- input document ids;
- output schema;
- citations;
- reviewer actions;
- packet version.

Do not persist raw prompts containing PHI unless covered by compliance design and retention policy. Prefer structured, minimal, logged references.
