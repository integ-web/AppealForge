# AppealForge PAC — Complete Founder + Codex Kit

**Date:** 2026-06-25  
**Product:** AppealForge PAC  
**Wedge:** Post-acute Medicare Advantage denial-to-appeal evidence assembly.

This kit is designed to be dropped into a repo and handed to Codex. It contains the product strategy, source-backed problem brief, PRD, design system, screen specs, engineering architecture, data model, safety/compliance guardrails, validation plan, GTM materials, templates, demo data, and long-running Codex prompts.

## What to open first

1. `00_START_HERE/START_HERE.md`
2. `05_CODEX/MASTER_TOKENMAX_PROMPT.md`
3. `05_CODEX/SPRINT_00_COMBINED_ULTRA.md`
4. `03_DESIGN/static_mockups/index.html`
5. `AppealForge_PAC_Master_Brief.docx`
6. `AppealForge_PAC_Founder_Deck.pptx`
7. `AppealForge_PAC_Backlog_Validation_Tracker.xlsx`

## Core product rule

AppealForge PAC does **not** make medical necessity decisions. It creates **source-cited, human-reviewed appeal packets** from denial letters and clinical documents.

Every clinical assertion must trace back to:

- `document_id`
- `page_number`
- exact quote
- reviewer status

Unsupported claims must be blocked, not generated.

## Current source stack

- KFF, Medicare Advantage prior authorization determinations and appeal overturns, 2024 data.
- HHS OIG, Medicare Advantage SNF admission denials and overturns, June 2024 sample.
- CMS Interoperability and Prior Authorization final rule CMS-0057-F.
- eCFR 42 CFR 422.568 for standard organization determination timeframes.
- CMS Part C reconsideration guidance.
- HHS OCR HIPAA cloud-computing guidance.

See `01_RESEARCH/Source_Log.md`.
