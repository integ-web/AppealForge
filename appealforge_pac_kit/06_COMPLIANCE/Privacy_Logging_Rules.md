# Privacy and Logging Rules

## Absolute rule

No PHI in application logs, analytics, error monitoring, or audit metadata.

## Log examples

### Safe
```json
{
  "event": "packet.exported",
  "caseId": "case_123",
  "organizationId": "org_456",
  "packetVersionId": "pv_789",
  "durationMs": 1420
}
```

### Unsafe
```json
{
  "event": "packet.exported",
  "patientName": "Jane Doe",
  "diagnosis": "stroke",
  "quote": "Patient requires..."
}
```

## Error handling

When an extraction fails:
- log document id, job id, error code;
- do not log document text;
- show user a safe error message;
- store detailed diagnostic info only if PHI-safe.

## Analytics

Allowed:
- count of cases;
- time to packet;
- user action counts;
- status transitions;
- feature usage;
- synthetic demo interactions.

Not allowed:
- clinical text;
- denial quotes;
- patient identifiers;
- note content;
- freeform packet text.

## Support access

- Support access disabled by default.
- Customer-approved break-glass.
- Time-bound.
- Audit logged.
- Minimum necessary.
