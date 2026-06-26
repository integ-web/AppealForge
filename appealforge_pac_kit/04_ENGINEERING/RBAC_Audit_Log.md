# RBAC and Audit Log Spec

## Roles

| Role | Capabilities |
|---|---|
| Owner | Full org control, billing, users, all cases |
| Admin | Facilities, users, settings, cases |
| Clinical Reviewer | Review evidence, approve clinical sections |
| Case Manager | Create/manage cases, upload docs, edit packet drafts |
| Admissions User | Create cases, upload docs, view evidence |
| Read-only Auditor | View cases/audit exports, no edits |

## Permission matrix

| Action | Owner | Admin | Clinical Reviewer | Case Manager | Admissions | Auditor |
|---|---:|---:|---:|---:|---:|---:|
| Create case | Yes | Yes | No | Yes | Yes | No |
| Upload document | Yes | Yes | Yes | Yes | Yes | No |
| View case | Yes | Yes | Yes | Yes | Yes | Yes |
| Confirm denial parser | Yes | Yes | Yes | Yes | No | No |
| Review evidence | Yes | Yes | Yes | Yes | No | No |
| Approve clinical evidence | Yes | Yes | Yes | No | No | No |
| Generate packet | Yes | Yes | Yes | Yes | No | No |
| Approve packet | Yes | Yes | Yes | No | No | No |
| Export packet | Yes | Yes | Yes | Yes | No | No |
| Record outcome | Yes | Yes | No | Yes | No | No |
| Manage users | Yes | Yes | No | No | No | No |
| View audit log | Yes | Yes | No | No | No | Yes |

## Audit event names

- `auth.login`
- `auth.logout`
- `case.created`
- `case.viewed`
- `case.updated`
- `document.uploaded`
- `document.extracted`
- `document.deleted`
- `denial.parsed`
- `denial.confirmed`
- `evidence.generated`
- `evidence.reviewed`
- `gap.created`
- `gap.resolved`
- `packet.generated`
- `packet.edited`
- `packet.approved`
- `packet.exported`
- `communication.sent_recorded`
- `outcome.recorded`
- `admin.user_created`
- `admin.role_changed`
- `admin.audit_exported`
- `retention.case_archived`
- `retention.case_deleted`

## Audit event shape

```ts
type AuditEvent = {
  id: string;
  organizationId: string;
  userId?: string;
  action: string;
  subjectType: string;
  subjectId: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, string | number | boolean | null>;
  createdAt: string;
};
```

## PHI rule

Do not put patient names, MRNs, Medicare IDs, dates of birth, diagnosis details, document text, or quotes in audit metadata.

Good metadata:
```json
{
  "caseStatus": "PACKET_DRAFTED",
  "documentType": "DENIAL_LETTER",
  "pageCount": 6
}
```

Bad metadata:
```json
{
  "patientName": "Jane Smith",
  "quote": "Patient has..."
}
```

## Enforcement

- Wrap sensitive routes with `requirePermission`.
- Use database queries scoped by organization id.
- Deny by default.
- Add test cases for cross-org access.
