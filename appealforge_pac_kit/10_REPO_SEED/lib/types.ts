export type Citation = {
  documentId: string;
  pageNumber: number;
  quote: string;
};

export type EvidenceItem = {
  id: string;
  criterionId: string;
  documentId: string;
  pageNumber: number;
  quote: string;
  normalizedSummary: string;
  confidence: number;
  reviewerStatus: "AI_DRAFT" | "STAFF_REVIEWED" | "CLINICAL_REVIEWED" | "PHYSICIAN_APPROVED" | "REJECTED";
};

export function validateCitation(citation: Citation): boolean {
  return Boolean(citation.documentId && citation.pageNumber > 0 && citation.quote.trim().length >= 8);
}

export function validateEvidenceItem(item: EvidenceItem): boolean {
  return validateCitation({
    documentId: item.documentId,
    pageNumber: item.pageNumber,
    quote: item.quote
  }) && item.normalizedSummary.trim().length > 0 && item.confidence >= 0 && item.confidence <= 1;
}
