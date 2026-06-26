import type {
  AppealOutcome,
  AuditEvent,
  AuthCase,
  CommunicationLog,
  Criterion,
  DemoStore,
  DenialFinding,
  DocumentRecord,
  EvidenceGap,
  EvidenceItem,
  ExtractedPage,
  Facility,
  Organization,
  PacketVersion,
  Patient,
  User
} from "./types";
import { generatePacketMarkdown } from "./packets/generate";

const organization: Organization = {
  id: "org_harbor",
  name: "Harbor Post-Acute Group"
};

const facilities: Facility[] = [
  { id: "fac_lakeside", organizationId: organization.id, name: "Lakeside Skilled Nursing", state: "IL" },
  { id: "fac_ridgeview", organizationId: organization.id, name: "Ridgeview Transitional Care", state: "IN" }
];

const users: User[] = [
  { id: "usr_owner", organizationId: organization.id, email: "owner@appealforge.local", name: "Priya Shah", role: "OWNER", mfaEnabled: true },
  { id: "usr_ur", organizationId: organization.id, email: "ur@appealforge.local", name: "Maya Patel", role: "CLINICAL_REVIEWER", mfaEnabled: true },
  { id: "usr_admissions", organizationId: organization.id, email: "admissions@appealforge.local", name: "Ari Singh", role: "ADMISSIONS_USER", mfaEnabled: false },
  { id: "usr_audit", organizationId: organization.id, email: "audit@appealforge.local", name: "Jordan Lee", role: "READ_ONLY_AUDITOR", mfaEnabled: true }
];

const patients: Patient[] = [
  { id: "pat_a", organizationId: organization.id, syntheticLabel: "Patient A" },
  { id: "pat_b", organizationId: organization.id, syntheticLabel: "Patient B" },
  { id: "pat_c", organizationId: organization.id, syntheticLabel: "Patient C" }
];

const cases: AuthCase[] = [
  {
    id: "case_snf_admission_001",
    organizationId: organization.id,
    facilityId: "fac_lakeside",
    patientId: "pat_a",
    serviceType: "SNF Admission",
    planName: "Harbor MA Complete",
    requestType: "admission",
    status: "NEEDS_EVIDENCE_REVIEW",
    denialReason: "Does not meet skilled level of care",
    denialDate: "2026-06-22",
    appealDeadlineAt: "2026-06-28T17:00:00.000Z",
    expeditedCandidate: true,
    assignedOwnerId: "usr_ur",
    createdAt: "2026-06-22T15:35:00.000Z",
    updatedAt: "2026-06-25T08:15:00.000Z"
  },
  {
    id: "case_snf_continued_002",
    organizationId: organization.id,
    facilityId: "fac_ridgeview",
    patientId: "pat_b",
    serviceType: "SNF Continued Stay",
    planName: "Northstar MA",
    requestType: "continued_stay",
    status: "PACKET_DRAFTED",
    denialReason: "Custodial care",
    denialDate: "2026-06-20",
    appealDeadlineAt: "2026-07-02T17:00:00.000Z",
    expeditedCandidate: false,
    assignedOwnerId: "usr_owner",
    createdAt: "2026-06-20T18:10:00.000Z",
    updatedAt: "2026-06-24T19:20:00.000Z"
  },
  {
    id: "case_irf_admission_003",
    organizationId: organization.id,
    facilityId: "fac_lakeside",
    patientId: "pat_c",
    serviceType: "IRF Admission",
    planName: "Cascade MA Choice",
    requestType: "admission",
    status: "EVIDENCE_MAPPING",
    denialReason: "Could be treated at lower level of care",
    denialDate: "2026-06-18",
    appealDeadlineAt: "2026-07-08T17:00:00.000Z",
    expeditedCandidate: true,
    assignedOwnerId: "usr_ur",
    createdAt: "2026-06-18T14:05:00.000Z",
    updatedAt: "2026-06-25T06:45:00.000Z"
  }
];

const documents: DocumentRecord[] = cases.flatMap((item) => [
  {
    id: `${item.id}_denial`,
    caseId: item.id,
    title: "Denial Letter",
    docType: "DENIAL_LETTER",
    filename: `${item.id}_denial_letter.pdf`,
    pageCount: 2,
    extractionState: "extracted",
    checksum: `sha256-${item.id}-denial`
  },
  {
    id: `${item.id}_clinical`,
    caseId: item.id,
    title: item.serviceType.includes("IRF") ? "Rehab Clinical Packet" : "Clinical Packet",
    docType: "THERAPY_NOTE",
    filename: `${item.id}_clinical_packet.pdf`,
    pageCount: 8,
    extractionState: "extracted",
    checksum: `sha256-${item.id}-clinical`
  },
  {
    id: `${item.id}_nursing`,
    caseId: item.id,
    title: "Nursing and Medication Notes",
    docType: "NURSING_NOTE",
    filename: `${item.id}_nursing_notes.pdf`,
    pageCount: 6,
    extractionState: "extracted",
    checksum: `sha256-${item.id}-nursing`
  }
]);

const criteria: Criterion[] = [
  {
    id: "crit_a_daily_skilled",
    caseId: "case_snf_admission_001",
    label: "Daily skilled nursing need",
    description: "Evidence that nursing services require skilled personnel and daily monitoring.",
    requiredEvidence: ["skilled intervention", "frequency", "clinical reason", "date"],
    priority: "high",
    sourceType: "customer-approved general criteria"
  },
  {
    id: "crit_a_therapy",
    caseId: "case_snf_admission_001",
    label: "Skilled therapy need",
    description: "Functional deficits requiring skilled PT or OT rather than custodial support.",
    requiredEvidence: ["functional limitation", "skilled cueing", "therapy plan"],
    priority: "high",
    sourceType: "customer-approved general criteria"
  },
  {
    id: "crit_a_wound",
    caseId: "case_snf_admission_001",
    label: "Wound complexity",
    description: "Wound care needs that require skilled observation or dressing management.",
    requiredEvidence: ["wound assessment", "dressing frequency", "measurement"],
    priority: "medium",
    sourceType: "customer-approved general criteria"
  },
  {
    id: "crit_b_therapy",
    caseId: "case_snf_continued_002",
    label: "Ongoing skilled therapy",
    description: "Continued measurable therapy goals and skilled interventions.",
    requiredEvidence: ["progression", "remaining limitation", "skilled plan"],
    priority: "high",
    sourceType: "customer-approved general criteria"
  },
  {
    id: "crit_b_medication",
    caseId: "case_snf_continued_002",
    label: "Medication complexity",
    description: "Medication monitoring that requires skilled nursing judgment.",
    requiredEvidence: ["risk monitoring", "medication adjustment", "clinical escalation"],
    priority: "medium",
    sourceType: "customer-approved general criteria"
  },
  {
    id: "crit_b_discharge",
    caseId: "case_snf_continued_002",
    label: "Discharge barrier",
    description: "Documented barrier showing continued stay is not simply custodial.",
    requiredEvidence: ["barrier", "plan", "target date"],
    priority: "medium",
    sourceType: "customer-approved general criteria"
  },
  {
    id: "crit_c_multidisciplinary",
    caseId: "case_irf_admission_003",
    label: "Multidisciplinary rehab need",
    description: "Need for coordinated intensive rehab across multiple disciplines.",
    requiredEvidence: ["PT", "OT", "speech or nursing", "coordinated plan"],
    priority: "high",
    sourceType: "customer-approved general criteria"
  },
  {
    id: "crit_c_supervision",
    caseId: "case_irf_admission_003",
    label: "Medical supervision",
    description: "Need for physician oversight during rehabilitation.",
    requiredEvidence: ["medical complexity", "active management", "rehab impact"],
    priority: "high",
    sourceType: "customer-approved general criteria"
  },
  {
    id: "crit_c_tolerance",
    caseId: "case_irf_admission_003",
    label: "Therapy tolerance",
    description: "Evidence of ability to participate in an IRF-level program.",
    requiredEvidence: ["participation", "tolerance", "goals"],
    priority: "medium",
    sourceType: "customer-approved general criteria"
  }
];

const evidenceItems: EvidenceItem[] = [
  {
    id: "ev_a_iv",
    caseId: "case_snf_admission_001",
    criterionId: "crit_a_daily_skilled",
    documentId: "case_snf_admission_001_clinical",
    documentTitle: "Discharge Summary",
    documentType: "DISCHARGE_SUMMARY",
    pageNumber: 3,
    quote: "Patient requires IV cefazolin every 8 hours through 06/30 and daily skilled wound assessment.",
    normalizedSummary: "IV antibiotic administration and daily wound assessment require skilled nursing monitoring.",
    confidence: 0.94,
    reviewerStatus: "CLINICAL_REVIEWED"
  },
  {
    id: "ev_a_therapy",
    caseId: "case_snf_admission_001",
    criterionId: "crit_a_therapy",
    documentId: "case_snf_admission_001_clinical",
    documentTitle: "Therapy Evaluation",
    documentType: "THERAPY_NOTE",
    pageNumber: 4,
    quote: "Patient requires moderate assistance for transfers and is unable to ambulate safely without skilled cueing.",
    normalizedSummary: "Therapy note supports skilled PT or OT need for transfers and gait safety.",
    confidence: 0.91,
    reviewerStatus: "STAFF_REVIEWED"
  },
  {
    id: "ev_a_dressing",
    caseId: "case_snf_admission_001",
    criterionId: "crit_a_wound",
    documentId: "case_snf_admission_001_nursing",
    documentTitle: "Nursing Wound Note",
    documentType: "WOUND_NOTE",
    pageNumber: 2,
    quote: "Sacral wound dressing changed per order with drainage monitoring; notify provider for increased drainage or odor.",
    normalizedSummary: "Nursing note supports wound monitoring, but latest measurement is missing.",
    confidence: 0.72,
    reviewerStatus: "NEEDS_FOLLOW_UP"
  },
  {
    id: "ev_b_therapy",
    caseId: "case_snf_continued_002",
    criterionId: "crit_b_therapy",
    documentId: "case_snf_continued_002_clinical",
    documentTitle: "PT Progress Note",
    documentType: "THERAPY_NOTE",
    pageNumber: 2,
    quote: "Patient progressed from max assist to mod assist for sit-to-stand but remains unsafe for independent transfers.",
    normalizedSummary: "Progress note shows measurable gains and remaining skilled transfer goals.",
    confidence: 0.93,
    reviewerStatus: "CLINICAL_REVIEWED"
  },
  {
    id: "ev_b_medication",
    caseId: "case_snf_continued_002",
    criterionId: "crit_b_medication",
    documentId: "case_snf_continued_002_nursing",
    documentTitle: "Nursing Note",
    documentType: "NURSING_NOTE",
    pageNumber: 5,
    quote: "Nursing to monitor anticoagulation precautions and report signs of bleeding or mental status change.",
    normalizedSummary: "Anticoagulation monitoring requires skilled nursing observation and escalation.",
    confidence: 0.88,
    reviewerStatus: "CLINICAL_REVIEWED"
  },
  {
    id: "ev_b_barrier",
    caseId: "case_snf_continued_002",
    criterionId: "crit_b_discharge",
    documentId: "case_snf_continued_002_clinical",
    documentTitle: "Care Conference Note",
    documentType: "OTHER",
    pageNumber: 7,
    quote: "Family training scheduled for 06/27 because caregiver cannot safely complete transfers without instruction.",
    normalizedSummary: "Caregiver training remains a documented discharge barrier.",
    confidence: 0.81,
    reviewerStatus: "STAFF_REVIEWED"
  },
  {
    id: "ev_c_multi",
    caseId: "case_irf_admission_003",
    criterionId: "crit_c_multidisciplinary",
    documentId: "case_irf_admission_003_clinical",
    documentTitle: "Rehab Consult",
    documentType: "THERAPY_NOTE",
    pageNumber: 2,
    quote: "Patient demonstrates new deficits requiring coordinated PT, OT, and speech therapy with physician oversight.",
    normalizedSummary: "Consult supports a multidisciplinary rehabilitation need.",
    confidence: 0.95,
    reviewerStatus: "CLINICAL_REVIEWED"
  },
  {
    id: "ev_c_supervision",
    caseId: "case_irf_admission_003",
    criterionId: "crit_c_supervision",
    documentId: "case_irf_admission_003_clinical",
    documentTitle: "H&P",
    documentType: "H_AND_P",
    pageNumber: 6,
    quote: "Rehabilitation course complicated by labile blood pressure and medication adjustments requiring close medical supervision.",
    normalizedSummary: "Medical complexity supports physician supervision during rehabilitation.",
    confidence: 0.9,
    reviewerStatus: "STAFF_REVIEWED"
  },
  {
    id: "ev_c_tolerance",
    caseId: "case_irf_admission_003",
    criterionId: "crit_c_tolerance",
    documentId: "case_irf_admission_003_clinical",
    documentTitle: "Therapy Screen",
    documentType: "THERAPY_NOTE",
    pageNumber: 4,
    quote: "Patient tolerated 45 minute therapy screen with rest breaks and remained motivated to participate.",
    normalizedSummary: "Therapy tolerance is promising but needs clinical reviewer confirmation.",
    confidence: 0.76,
    reviewerStatus: "NEEDS_FOLLOW_UP"
  }
];

const evidenceGaps: EvidenceGap[] = [
  {
    id: "gap_a_wound_measurement",
    caseId: "case_snf_admission_001",
    criterionId: "crit_a_wound",
    gapText: "Latest wound measurement note not found.",
    whyNeeded: "The packet can cite wound monitoring, but a current measurement would strengthen the skilled nursing argument.",
    suggestedOwner: "Wound nurse",
    priority: "high"
  },
  {
    id: "gap_a_physician_statement",
    caseId: "case_snf_admission_001",
    criterionId: "crit_a_daily_skilled",
    gapText: "Physician expedited appeal statement not uploaded.",
    whyNeeded: "Expedited handling requires a physician statement when delay could affect health or function.",
    suggestedOwner: "Medical director",
    priority: "high"
  },
  {
    id: "gap_b_discharge_update",
    caseId: "case_snf_continued_002",
    criterionId: "crit_b_discharge",
    gapText: "Updated discharge plan barrier note not found.",
    whyNeeded: "A more current barrier note would help rebut the custodial care rationale.",
    suggestedOwner: "Case manager",
    priority: "medium"
  },
  {
    id: "gap_c_tolerance_confirm",
    caseId: "case_irf_admission_003",
    criterionId: "crit_c_tolerance",
    gapText: "Therapy tolerance note needs reviewer confirmation.",
    whyNeeded: "Evidence exists but requires human review before packet use.",
    suggestedOwner: "Clinical reviewer",
    priority: "medium"
  }
];

const denialFindings: DenialFinding[] = cases.map((item) => ({
  id: `${item.id}_finding`,
  caseId: item.id,
  planName: item.planName,
  serviceRequested: item.serviceType,
  requestType: item.requestType,
  denialDate: item.denialDate,
  appealDeadline: item.appealDeadlineAt,
  denialReason: item.denialReason,
  payerRationale:
    item.id === "case_snf_admission_001"
      ? "Plan stated the submitted records did not show a daily skilled level of care."
      : item.id === "case_snf_continued_002"
        ? "Plan characterized the requested stay as custodial and not requiring skilled services."
        : "Plan stated the member could be treated safely at a lower level of care.",
  appealRoute: "Medicare Advantage organization reconsideration by written appeal or secure plan portal.",
  expeditedLanguagePresent: item.expeditedCandidate,
  reviewerConfirmed: item.status !== "EVIDENCE_MAPPING",
  citations: [
    {
      documentId: `${item.id}_denial`,
      documentTitle: "Denial Letter",
      documentType: "DENIAL_LETTER",
      pageNumber: 1,
      quote: `The requested ${item.serviceType} is denied because ${item.denialReason.toLowerCase()}.`
    }
  ]
}));

const extractedPages: ExtractedPage[] = [
  ...denialFindings.map((finding) => ({
    id: `${finding.caseId}_denial_p1`,
    documentId: `${finding.caseId}_denial`,
    pageNumber: 1,
    text: finding.citations[0].quote,
    extractionConfidence: 0.98
  })),
  ...evidenceItems.map((item) => ({
    id: `${item.id}_page`,
    documentId: item.documentId,
    pageNumber: item.pageNumber,
    text: item.quote,
    extractionConfidence: item.confidence
  }))
];

const packetVersions: PacketVersion[] = cases.map((item, index) => {
  const caseEvidence = evidenceItems.filter((evidence) => evidence.caseId === item.id);
  const caseGaps = evidenceGaps.filter((gap) => gap.caseId === item.id);
  const markdown = generatePacketMarkdown({
    authCase: item,
    facility: facilities.find((facility) => facility.id === item.facilityId)!,
    patient: patients.find((patient) => patient.id === item.patientId)!,
    denialFinding: denialFindings.find((finding) => finding.caseId === item.id)!,
    criteria: criteria.filter((criterion) => criterion.caseId === item.id),
    evidenceItems: caseEvidence,
    evidenceGaps: caseGaps,
    generatedBy: "Maya Patel",
    versionNumber: 1,
    exportedAt: "2026-06-25T10:00:00.000Z"
  });

  return {
    id: `${item.id}_packet_v1`,
    caseId: item.id,
    versionNumber: 1,
    status: index === 1 ? "STAFF_REVIEWED" : "AI_DRAFT",
    packetMarkdown: markdown.markdown,
    generatedBy: "Maya Patel",
    approvedBy: undefined,
    createdAt: "2026-06-25T10:00:00.000Z",
    exportStorageKey: index === 1 ? `/exports/${item.id}-draft.md` : undefined
  };
});

const communicationLogs: CommunicationLog[] = [
  {
    id: "comm_b_sent",
    caseId: "case_snf_continued_002",
    channel: "Plan portal",
    sentAt: "2026-06-24T20:00:00.000Z",
    confirmationNumber: "SYN-NORTH-8821",
    destination: "Northstar MA reconsideration queue",
    notes: "Draft packet staged for physician approval before final submission."
  }
];

const appealOutcomes: AppealOutcome[] = [
  {
    id: "outcome_b_pending",
    caseId: "case_snf_continued_002",
    outcome: "PENDING",
    notes: "Plan response due after packet approval and submission."
  }
];

const auditActions = [
  "auth.login",
  "case.viewed",
  "document.uploaded",
  "document.extracted",
  "denial.parsed",
  "denial.confirmed",
  "evidence.generated",
  "evidence.reviewed",
  "packet.generated",
  "packet.edited",
  "packet.exported",
  "outcome.recorded"
];

const auditEvents: AuditEvent[] = auditActions.flatMap((action, actionIndex) =>
  cases.map((item, caseIndex) => ({
    id: `audit_${actionIndex}_${caseIndex}`,
    organizationId: organization.id,
    userId: users[actionIndex % users.length].id,
    action,
    subjectType: action.startsWith("document") ? "Document" : "AuthCase",
    subjectId: item.id,
    metadata: {
      caseStatus: item.status,
      route: `/cases/${item.id}`,
      synthetic: true
    },
    createdAt: new Date(Date.UTC(2026, 5, 25, 6 + actionIndex, caseIndex * 7)).toISOString()
  }))
);

export const demoStore: DemoStore = {
  organization,
  facilities,
  users,
  patients,
  cases,
  documents,
  extractedPages,
  denialFindings,
  criteria,
  evidenceItems,
  evidenceGaps,
  packetVersions,
  communicationLogs,
  appealOutcomes,
  auditEvents
};

export function getCaseById(caseId: string) {
  return demoStore.cases.find((item) => item.id === caseId);
}

export function getCaseBundle(caseId: string) {
  const authCase = getCaseById(caseId);
  if (!authCase) {
    return null;
  }

  return {
    authCase,
    facility: demoStore.facilities.find((facility) => facility.id === authCase.facilityId)!,
    patient: demoStore.patients.find((patient) => patient.id === authCase.patientId)!,
    owner: demoStore.users.find((user) => user.id === authCase.assignedOwnerId)!,
    documents: demoStore.documents.filter((document) => document.caseId === caseId),
    denialFinding: demoStore.denialFindings.find((finding) => finding.caseId === caseId)!,
    criteria: demoStore.criteria.filter((criterion) => criterion.caseId === caseId),
    evidenceItems: demoStore.evidenceItems.filter((evidence) => evidence.caseId === caseId),
    evidenceGaps: demoStore.evidenceGaps.filter((gap) => gap.caseId === caseId),
    packetVersions: demoStore.packetVersions.filter((packet) => packet.caseId === caseId),
    communicationLogs: demoStore.communicationLogs.filter((communication) => communication.caseId === caseId),
    appealOutcomes: demoStore.appealOutcomes.filter((outcome) => outcome.caseId === caseId),
    auditEvents: demoStore.auditEvents.filter((event) => event.subjectId === caseId)
  };
}

export function getPrimaryCaseId() {
  return "case_snf_admission_001";
}
