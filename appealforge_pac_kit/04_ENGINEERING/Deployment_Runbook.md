# Deployment Runbook

## Demo/local

1. Install dependencies.
2. Configure `.env`.
3. Run database migration.
4. Seed synthetic data.
5. Start app.
6. Start worker.
7. Run tests.
8. Open demo workspace.

## Environment variables

See `10_REPO_SEED/.env.example`.

Required:
- `DATABASE_URL`
- `NEXTAUTH_SECRET` or equivalent auth secret
- `STORAGE_ADAPTER`
- `LOCAL_STORAGE_PATH`
- `AI_PROVIDER`
- `AI_MODEL`
- `DEMO_MODE=true`

Production-only:
- `S3_BUCKET`
- `S3_REGION`
- `KMS_KEY_ID`
- `AUDIT_EXPORT_BUCKET`
- `ERROR_MONITORING_DSN`
- `OCR_PROVIDER`
- `LLM_VENDOR_BAA_STATUS`

## Production prerequisites

- BAAs signed with hosting/storage/OCR/LLM/logging/email vendors.
- PHI data flow diagram approved.
- Risk analysis completed.
- Incident response owner assigned.
- Data retention settings configured.
- Backups tested.
- Audit export tested.
- Security headers configured.
- MFA enabled.

## Release checklist

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm test:e2e`
- database migration reviewed
- seed data contains no live PHI
- visual QA completed
- packet PDF export manually inspected
- audit events verified
- rollback plan documented

## Rollback

- Keep previous application image.
- Keep reversible migrations where possible.
- Snapshot database before migrations.
- Preserve object storage versions.
- If security issue, disable document upload and export first.

## Operational metrics

- extraction job success rate;
- average document processing time;
- evidence generation time;
- packet export success rate;
- blocked unsupported claims count;
- deadline miss rate;
- user review completion time.
