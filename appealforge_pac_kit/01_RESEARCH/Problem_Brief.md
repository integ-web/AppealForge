# Problem Brief — The Critical Unsolved Problem

## Problem statement

Medicare Advantage post-acute denials are frequently under-appealed because SNF, IRF, LTCH, and hospital discharge teams cannot assemble a precise, source-cited appeal packet quickly enough from fragmented denial letters, referral bundles, therapy notes, nursing notes, and payer-specific instructions.

## Why this is critical

This is critical because the failure mode is not just lost revenue. It can delay or block access to post-acute care after hospitalization. It also pushes clinicians and administrative staff into manual document hunts when the highest-leverage work is to show the right evidence, in the right format, by the right deadline.

## Why this is solvable digitally

The inputs are mostly documents:
- Denial letter
- Prior authorization request details
- Discharge summary
- History and physical
- Therapy evaluations
- Nursing notes
- Wound notes
- Medication list
- Vitals/labs
- Physician statements

The output is also a document:
- Reconsideration or appeal packet
- Evidence table
- Attachment index
- Physician attestation
- Deadline and status tracker

This is a strong fit for a digital workflow product because the hard operational task is evidence retrieval, citation, synthesis, checklisting, and formatting, not direct care delivery.

## Why now

The market has three converging forces:

1. **High denial and low appeal rates.** KFF reported that Medicare Advantage insurers made 52.8 million prior authorization determinations in 2024 and denied 4.1 million requests in full or in part. Only 11.5% of denied prior authorization requests were appealed, while more than 80% of appealed denials were overturned in each year from 2019 through 2024.

2. **Post-acute SNF data is even sharper.** HHS OIG reported that in June 2024, 19 Medicare Advantage organizations denied 12% of SNF admission requests; only 18% of SNF denials were appealed; and when appealed, 95% were overturned in favor of the enrollee.

3. **Regulatory pressure is rising.** CMS-0057-F pushes payers toward better prior authorization data exchange and API capabilities, with some provisions beginning January 1, 2026 and API requirements primarily by January 1, 2027. Meanwhile, the near-term provider reality still includes PDFs, fax, payer portals, and manual evidence assembly.

## The exact customer pain

For a regional SNF operator:

- "The denial letter says skilled care was not medically necessary."
- "The hospital notes have the evidence, but it is buried across PDFs."
- "Therapy notes and nursing notes are in different systems."
- "The medical director will sign only if the packet is clean."
- "Staff do not know which exact facts matter."
- "Payer portals and faxes make the workflow worse."
- "We lose admissions or covered days when the appeal is slow."

## Target buyer

Primary:
- VP Revenue Cycle
- COO
- VP Clinical Operations
- Regional Administrator
- Director of Admissions
- Utilization Review lead

Secondary:
- Hospital discharge planning teams
- IRF/LTCH operators
- Physician groups that handle appeals

## Why not build generic prior authorization software first

Generic prior authorization is crowded and integration-heavy. AppealForge PAC should begin after a denial because:
- the denial letter gives the reason;
- the appeal deadline creates urgency;
- staff already have the clinical packet;
- outcome is measurable;
- ROI can be proven with historical de-identified cases;
- no payer API integration is needed for v1.

## Wedge success criteria

The wedge is validated when a post-acute operator provides 5-10 de-identified denial packets and the product can:

- parse denial reasons and deadlines correctly;
- extract source-cited evidence;
- identify missing evidence;
- generate a packet staff would actually edit/send;
- reduce assembly time by at least 50%;
- produce a packet that a physician/medical director trusts enough to review.

## The durable company behind the wedge

Start with SNF MA denials, then expand to:
- continued-stay reviews,
- IRF admission denials,
- LTCH denials,
- home health denials,
- DME denials,
- payer-specific packet playbooks,
- FHIR/Prior Authorization Support integrations,
- analytics on denial patterns and overturn reasons.
