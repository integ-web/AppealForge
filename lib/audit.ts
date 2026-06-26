type AuditInput = {
  organizationId: string;
  userId?: string;
  action: string;
  subjectType: string;
  subjectId: string;
  metadata?: Record<string, string | number | boolean | null>;
};

const bannedMetadataKeys = [
  "patientName",
  "dob",
  "dateOfBirth",
  "mrn",
  "medicareId",
  "diagnosis",
  "quote",
  "documentText",
  "clinicalNote"
];

export function assertNoPhiMetadata(metadata: Record<string, unknown> = {}) {
  for (const key of Object.keys(metadata)) {
    if (bannedMetadataKeys.includes(key)) {
      throw new Error(`Audit metadata may contain PHI: ${key}`);
    }
  }
}

export async function auditEvent(input: AuditInput) {
  assertNoPhiMetadata(input.metadata ?? {});
  // Replace with Prisma write in implementation.
  return {
    id: crypto.randomUUID(),
    ...input,
    createdAt: new Date().toISOString()
  };
}
