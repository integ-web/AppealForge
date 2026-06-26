# Source Log

Date reviewed: 2026-06-25

## 1. KFF — Medicare Advantage prior authorization determinations in 2024

URL: https://www.kff.org/medicare/medicare-advantage-insurers-made-nearly-53-million-prior-authorization-determinations-in-2024/

Relevant facts:
- Medicare Advantage insurers made 52.8 million prior authorization determinations in 2024.
- 4.1 million requests were denied in full or in part, or 7.7%.
- 11.5% of denied prior authorization requests were appealed.
- More than 80% of appealed denied requests were overturned in each year from 2019 through 2024.

How AppealForge uses this:
- Supports the market thesis that denials are under-appealed and many appealed denials are winnable.
- Supports positioning around "appeal execution" rather than generic prior authorization.

## 2. HHS OIG — MA SNF admission denials and appeal overturns

URL: https://oig.hhs.gov/reports/all/2026/medicare-advantage-organizations-overturned-nearly-all-appealed-prior-authorization-denials-for-skilled-nursing-facility-admission-raising-concerns-about-initial-denials/

Relevant facts:
- OIG identified prior authorization denials for post-acute care after a hospital stay as a particular concern.
- In June 2024, 19 Medicare Advantage organizations denied 12% of SNF admission requests.
- Enrollees and providers appealed 18% of SNF denials.
- When appealed, MA organizations overturned 95% of SNF denials in favor of the enrollee.

How AppealForge uses this:
- Provides the tightest wedge: SNF admission and continued-stay Medicare Advantage denials.
- Shows that the problem is acute even within one post-acute category.

## 3. CMS — Interoperability and Prior Authorization Final Rule CMS-0057-F

URL: https://www.cms.gov/initiatives/burden-reduction/overview/interoperability/policies-regulations/cms-interoperability-prior-authorization-final-rule-cms-0057-f

Relevant facts:
- CMS released CMS-0057-F on January 17, 2024.
- The rule focuses on improving prior authorization processes through policy and technology.
- Impacted payers have certain provisions by January 1, 2026 and API requirements primarily by January 1, 2027.

How AppealForge uses this:
- Supports "API-ready later, PDF/fax/portal reality now."
- Informs future FHIR Prior Authorization Support architecture, but v1 should not depend on payer APIs.

## 4. eCFR — 42 CFR 422.568

URL: https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-B/part-422/subpart-M/section-422.568

Relevant facts:
- Beginning on or after January 1, 2026, standard organization determinations for prior-authorized services or items are generally due within 7 calendar days after receiving the request.

How AppealForge uses this:
- Reinforces deadline-driven workflow and case timers.
- Supports urgency UX around "days left," "expedited candidate," and "response due."

## 5. CMS — Medicare Advantage Part C reconsideration

URL: https://www.cms.gov/medicare/appeals-grievances/managed-care/reconsideration-advantage-health-plan-part-c

Relevant facts:
- Reconsideration requests must be filed with the health plan within 65 calendar days from the date of the organization determination notice.
- Expedited requests can be made verbally or in writing.
- Expedited pre-service reconsiderations must be decided within 72 hours.

How AppealForge uses this:
- Informs appeal deadline parsing, user alerts, and packet routing.
- Reinforces that the app must track deadline metadata from the denial notice.

## 6. HHS OCR — HIPAA cloud computing guidance

URL: https://www.hhs.gov/hipaa/for-professionals/special-topics/health-information-technology/cloud-computing/index.html

Relevant facts:
- A cloud service provider that creates, receives, maintains, or transmits ePHI on behalf of a covered entity or business associate is a business associate under HIPAA.
- Covered entities/business associates must enter into a HIPAA-compliant BAA with a CSP that handles ePHI.
- The business associate is directly liable for applicable HIPAA obligations.

How AppealForge uses this:
- Requires BAAs with hosting, storage, OCR, logging, email, and LLM vendors before any live PHI.
- Requires architecture choices that prevent PHI leakage into logs, analytics, prompts cache, and error monitoring.
