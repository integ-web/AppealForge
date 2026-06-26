# HIPAA and Security Checklist

## Prototype mode

Use synthetic or properly de-identified data only.

- [ ] Demo data contains no real PHI.
- [ ] Upload warning shown.
- [ ] App clearly labels synthetic demo mode.
- [ ] Logs contain no PHI.
- [ ] External AI calls disabled or mocked.
- [ ] No production claims made.

## Production prerequisites

Before live PHI:

- [ ] BAA with hosting provider.
- [ ] BAA with database provider.
- [ ] BAA with object storage provider.
- [ ] BAA with OCR provider.
- [ ] BAA with LLM provider.
- [ ] BAA with logging/error monitoring provider or PHI-safe config.
- [ ] BAA with email/fax provider if used.
- [ ] Risk analysis completed.
- [ ] Security policies documented.
- [ ] Incident response plan documented.
- [ ] Workforce access controls.
- [ ] MFA enabled.
- [ ] Data retention policy approved.
- [ ] Backup/restore tested.
- [ ] Breach notification workflow documented.

## Technical safeguards

- [ ] TLS everywhere.
- [ ] Encryption at rest.
- [ ] Field-level encryption for identifiers.
- [ ] Key management documented.
- [ ] Organization/facility scoped authorization.
- [ ] Role-based access control.
- [ ] Audit logging for PHI actions.
- [ ] Session timeout.
- [ ] Secure cookies.
- [ ] CSRF protection where applicable.
- [ ] Rate limiting.
- [ ] File upload scanning/validation.
- [ ] Signed URLs with expiry.
- [ ] No public buckets.
- [ ] Backups encrypted.
- [ ] Secrets manager.

## Administrative safeguards

- [ ] Access approval process.
- [ ] User offboarding process.
- [ ] Minimum necessary policy.
- [ ] Vendor review.
- [ ] Workforce training.
- [ ] Periodic access review.
- [ ] Security incident tabletop.
- [ ] Change management process.

## Physical/environmental safeguards

Cloud-hosted:
- [ ] Provider security documentation collected.
- [ ] Data center controls reviewed via SOC 2/HITRUST/etc. where available.
- [ ] Regional data residency decision documented.

## AI-specific safeguards

- [ ] No PHI in model calls until BAA and retention terms confirmed.
- [ ] Prompt logging disabled or PHI-safe.
- [ ] Model output stored as draft.
- [ ] Human approval before export.
- [ ] Citations required.
- [ ] Unsupported claim blocker.
- [ ] Model/version logging.
- [ ] Prompt template versioning.
- [ ] Evaluation dataset with synthetic cases.
- [ ] Red-team tests for hallucination.

## Logging rules

Allowed:
- organization id;
- user id;
- case id;
- document id;
- action;
- status;
- counts;
- timing;
- non-PHI errors.

Not allowed:
- patient name;
- DOB;
- MRN;
- Medicare ID;
- diagnosis details;
- clinical quotes;
- document text;
- denial letter text;
- freeform user notes that may contain PHI.

## Production warning text

> This workspace may contain protected health information. Access, use, and disclosure are limited to authorized users and minimum necessary purposes. AI-generated content is draft and must be reviewed before use.

## Product safety promise

AppealForge PAC is an evidence assembly and workflow tool. It does not replace clinical judgment, legal review, payer rules, or physician approval.
