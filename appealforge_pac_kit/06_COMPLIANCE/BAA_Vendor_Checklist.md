# BAA Vendor Checklist

## Vendor categories

- Hosting
- Database
- Object storage
- File processing/OCR
- LLM/model provider
- Logging/observability
- Error monitoring
- Email
- Fax/e-signature if used
- Analytics
- Support tooling

## For each vendor collect

- Legal name
- Service used
- Data handled
- PHI/ePHI exposure
- BAA available?
- BAA signed date
- Subprocessors
- Data retention settings
- Regional storage
- Encryption at rest
- Encryption in transit
- Access controls
- Incident notification terms
- Deletion/return terms
- Logging/prompt retention terms
- Support access controls
- SOC 2/HITRUST/ISO docs if available

## Red flags

- No BAA for service touching ePHI.
- "HIPAA-ready" marketing but no BAA.
- Default prompt retention for PHI.
- Support staff can access production PHI without controls.
- Logs capture request/response bodies.
- Analytics records user-entered clinical content.
- Public object storage.
- No data deletion path.

## LLM vendor questions

1. Will you sign a BAA?
2. Is customer data used for training?
3. Are prompts/responses retained?
4. Can retention be disabled?
5. Are logs encrypted?
6. Are subprocessors listed?
7. Is PHI allowed under contract?
8. Can we restrict region?
9. What is incident notification SLA?
10. How is abuse monitoring handled without exposing PHI?

## Hosting/storage questions

1. Is a BAA available?
2. Can storage be private by default?
3. Can signed URL expiry be configured?
4. Is encryption at rest default?
5. Is customer-managed key support available?
6. How are backups handled?
7. How is deletion performed?
8. How are access logs retained?
9. Is support access audited?
10. What regions are available?
