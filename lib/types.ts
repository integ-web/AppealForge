export type UserRole =
  | "OWNER"
  | "ADMIN"
  | "CLINICAL_REVIEWER"
  | "CASE_MANAGER"
  | "ADMISSIONS_USER"
  | "READ_ONLY_AUDITOR";

export type CaseStatus =
  | "NEW"
  | "UPLOADING"
  | "EXTRACTING"
  | "NEEDS_DENIAL_REVIEW"
  | "EVIDENCE_MAPPING"
  | "NEEDS_EVIDENCE_REVIEW"
  | "PACKET_DRAFTED"
  | "PHYSICIAN_REVIEW"
  | "APPROVED"
  | "SENT"
  | "WON"
  | "LOST"
  | "PARTIAL"
  | "ESCALATED"
  | "ARCHIVED";

export type ReviewStatus =
  | "AI_DRAFT"
  | "STAFF_REVIEWED"
  | "CLINICAL_REVIEWED"
  | "PHYSICIAN_APPROVED"
  | "REJECTED"
  | "NEEDS_FOLLOW_UP";

export type Citation = {
  documentId: string;
  documentTitle: string;
  documentType: string;
  pageNumber: number;
  quote: string;
};

export type Organization = {
  id: string;
  name: string;
};

export type Facility = {
  id: string;
  organizationId: string;
  name: string;
  state: string;
};

export type User = {
  id: string;
  organizationId: string;
  email: string;
  name: string;
  role: UserRole;
  mfaEnabled: boolean;
};

export type Patient = {
  id: string;
  organizationId: string;
  syntheticLabel: string;
};

export type DocumentRecord = {
  id: string;
  caseId: string;
  title: string;
  docType: string;
  filename: string;
  pageCount: number;
  extractionState: "pending" | "extracted" | "warning";
  checksum: string;
};

export type ExtractedPage = {
  id: string;
  documentId: string;
  pageNumber: number;
  text: string;
  extractionConfidence: number;
};

export type DenialFinding = {
  id: string;
  caseId: string;
  planName: string;
  serviceRequested: string;
  requestType: string;
  denialDate: string;
  appealDeadline: string;
  denialReason: string;
  payerRationale: string;
  appealRoute: string;
  expeditedLanguagePresent: boolean;
  reviewerConfirmed: boolean;
  citations: Citation[];
};

export type Criterion = {
  id: string;
  caseId: string;
  label: string;
  description: string;
  requiredEvidence: string[];
  priority: "high" | "medium" | "low";
  sourceType: string;
};

export type EvidenceItem = {
  id: string;
  caseId: string;
  criterionId: string;
  documentId: string;
  documentTitle: string;
  documentType: string;
  pageNumber: number;
  quote: string;
  normalizedSummary: string;
  confidence: number;
  reviewerStatus: ReviewStatus;
  reviewerNote?: string;
};

export type EvidenceGap = {
  id: string;
  caseId: string;
  criterionId: string;
  gapText: string;
  whyNeeded: string;
  suggestedOwner: string;
  priority: "high" | "medium" | "low";
  resolvedAt?: string;
};

export type PacketVersion = {
  id: string;
  caseId: string;
  versionNumber: number;
  status: ReviewStatus;
  packetMarkdown: string;
  generatedBy: string;
  approvedBy?: string;
  approvedAt?: string;
  exportStorageKey?: string;
  createdAt: string;
};

export type CommunicationLog = {
  id: string;
  caseId: string;
  channel: string;
  sentAt?: string;
  destination?: string;
  confirmationNumber?: string;
  notes: string;
};

export type AppealOutcome = {
  id: string;
  caseId: string;
  outcome: "WON" | "LOST" | "PARTIAL" | "WITHDRAWN" | "ESCALATED" | "PENDING";
  decisionDate?: string;
  approvedDays?: number;
  denialUpheldReason?: string;
  notes: string;
};

export type AuditEvent = {
  id: string;
  organizationId: string;
  userId?: string;
  action: string;
  subjectType: string;
  subjectId: string;
  metadata: Record<string, string | number | boolean | null>;
  createdAt: string;
};

export type AuthCase = {
  id: string;
  organizationId: string;
  facilityId: string;
  patientId: string;
  serviceType: string;
  planName: string;
  requestType: "admission" | "continued_stay";
  status: CaseStatus;
  denialReason: string;
  denialDate: string;
  appealDeadlineAt: string;
  expeditedCandidate: boolean;
  assignedOwnerId: string;
  createdAt: string;
  updatedAt: string;
};

export type DemoStore = {
  organization: Organization;
  facilities: Facility[];
  users: User[];
  patients: Patient[];
  cases: AuthCase[];
  documents: DocumentRecord[];
  extractedPages: ExtractedPage[];
  denialFindings: DenialFinding[];
  criteria: Criterion[];
  evidenceItems: EvidenceItem[];
  evidenceGaps: EvidenceGap[];
  packetVersions: PacketVersion[];
  communicationLogs: CommunicationLog[];
  appealOutcomes: AppealOutcome[];
  auditEvents: AuditEvent[];
};
