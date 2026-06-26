import type { AuthCase, Criterion, DenialFinding, EvidenceGap, EvidenceItem } from "./types";

const supportedStatuses = new Set(["STAFF_REVIEWED", "CLINICAL_REVIEWED", "PHYSICIAN_APPROVED"]);

export function validateCitation(citation: {
  documentId: string;
  documentTitle?: string;
  documentType?: string;
  pageNumber: number;
  quote: string;
}) {
  return Boolean(
    citation.documentId.trim() &&
      citation.pageNumber > 0 &&
      citation.quote.trim().length >= 8 &&
      (!citation.documentTitle || citation.documentTitle.trim().length > 0) &&
      (!citation.documentType || citation.documentType.trim().length > 0)
  );
}

export function validateEvidenceItem(item: EvidenceItem) {
  return (
    validateCitation(item) &&
    item.documentTitle.trim().length > 0 &&
    item.documentType.trim().length > 0 &&
    item.normalizedSummary.trim().length > 0 &&
    item.confidence >= 0 &&
    item.confidence <= 1
  );
}

export function isEvidenceApprovedForPacket(item: EvidenceItem) {
  return supportedStatuses.has(item.reviewerStatus) && validateEvidenceItem(item);
}

export function getCaseEvidenceProgress(input: {
  criteria: Criterion[];
  evidenceItems: EvidenceItem[];
  evidenceGaps: EvidenceGap[];
}) {
  const totalCriteria = input.criteria.length;
  const supportedCriterionIds = new Set(
    input.evidenceItems.filter(isEvidenceApprovedForPacket).map((item) => item.criterionId)
  );
  const criteriaWithEvidence = input.criteria.filter((criterion) => supportedCriterionIds.has(criterion.id)).length;
  const openGaps = input.evidenceGaps.filter((gap) => !gap.resolvedAt).length;
  const needsReview = input.evidenceItems.filter(
    (item) => item.reviewerStatus === "AI_DRAFT" || item.reviewerStatus === "NEEDS_FOLLOW_UP"
  ).length;

  return {
    totalCriteria,
    criteriaWithEvidence,
    openGaps,
    needsReview,
    percent: totalCriteria === 0 ? 0 : Math.round((criteriaWithEvidence / totalCriteria) * 100)
  };
}

export function getDeadlineUrgency(deadlineIso: string, now = new Date()) {
  const deadline = new Date(deadlineIso);
  const hours = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60));

  if (hours < 0) {
    return { level: "overdue" as const, label: "Overdue", hoursRemaining: hours };
  }
  if (hours <= 24) {
    return { level: "critical" as const, label: `${hours}h left`, hoursRemaining: hours };
  }
  if (hours <= 72) {
    return { level: "urgent" as const, label: `${Math.ceil(hours / 24)}d left`, hoursRemaining: hours };
  }
  return { level: "steady" as const, label: `${Math.ceil(hours / 24)}d left`, hoursRemaining: hours };
}

export function buildEvidenceMap(input: {
  criteria: Criterion[];
  evidenceItems: EvidenceItem[];
  evidenceGaps: EvidenceGap[];
}) {
  return input.criteria.map((criterion) => {
    const evidence = input.evidenceItems.filter((item) => item.criterionId === criterion.id);
    const gaps = input.evidenceGaps.filter((gap) => gap.criterionId === criterion.id && !gap.resolvedAt);
    const approvedEvidence = evidence.filter(isEvidenceApprovedForPacket);
    const status = (approvedEvidence.length > 0 ? "supported" : gaps.length > 0 ? "gap" : "needs-review") as
      | "supported"
      | "gap"
      | "needs-review";

    return {
      criterion,
      evidence,
      gaps,
      status,
      confidence: evidence.length ? Math.round((evidence.reduce((sum, item) => sum + item.confidence, 0) / evidence.length) * 100) : 0
    };
  });
}

export function generateMissingEvidenceChecklist(gaps: EvidenceGap[]) {
  return gaps
    .filter((gap) => !gap.resolvedAt)
    .map((gap) => ({
      id: gap.id,
      task: gap.gapText,
      whyNeeded: gap.whyNeeded,
      owner: gap.suggestedOwner,
      priority: gap.priority,
      actionLabel: gap.priority === "high" ? "Request before packet approval" : "Queue follow-up"
    }));
}

export function parseSeededDenial(text: string, authCase: AuthCase): DenialFinding {
  return {
    id: `${authCase.id}_parsed_demo`,
    caseId: authCase.id,
    planName: authCase.planName,
    serviceRequested: authCase.serviceType,
    requestType: authCase.requestType,
    denialDate: authCase.denialDate,
    appealDeadline: authCase.appealDeadlineAt,
    denialReason: authCase.denialReason,
    payerRationale: text.includes("custodial") ? "Plan rationale references custodial care." : `Plan rationale references ${authCase.denialReason.toLowerCase()}.`,
    appealRoute: "Written reconsideration with source-cited clinical packet.",
    expeditedLanguagePresent: authCase.expeditedCandidate,
    reviewerConfirmed: false,
    citations: [
      {
        documentId: `${authCase.id}_denial`,
        documentTitle: "Denial Letter",
        documentType: "DENIAL_LETTER",
        pageNumber: 1,
        quote: text.slice(0, 180)
      }
    ]
  };
}

export function classifySeededDocument(filename: string, text: string) {
  const lower = `${filename} ${text}`.toLowerCase();
  if (lower.includes("denied") || lower.includes("denial")) {
    return { docType: "DENIAL_LETTER", confidence: 0.98, warnings: [] as string[] };
  }
  if (lower.includes("therapy") || lower.includes("pt") || lower.includes("ot")) {
    return { docType: "THERAPY_NOTE", confidence: 0.88, warnings: [] as string[] };
  }
  if (lower.includes("nursing") || lower.includes("wound") || lower.includes("medication")) {
    return { docType: "NURSING_NOTE", confidence: 0.84, warnings: [] as string[] };
  }
  return { docType: "OTHER", confidence: 0.46, warnings: ["Low confidence classification; reviewer should confirm."] };
}
