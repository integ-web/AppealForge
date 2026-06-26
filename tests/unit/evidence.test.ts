import { describe, expect, it } from "vitest";
import { demoStore } from "../../lib/demo-data";
import {
  buildEvidenceMap,
  classifySeededDocument,
  generateMissingEvidenceChecklist,
  getCaseEvidenceProgress,
  getDeadlineUrgency,
  parseSeededDenial,
  validateCitation,
  validateEvidenceItem
} from "../../lib/evidence";

describe("evidence safety helpers", () => {
  it("validates full citations", () => {
    expect(
      validateCitation({
        documentId: "doc_1",
        documentTitle: "Therapy Note",
        documentType: "THERAPY_NOTE",
        pageNumber: 2,
        quote: "Patient requires moderate assistance for transfers."
      })
    ).toBe(true);
    expect(validateCitation({ documentId: "", pageNumber: 0, quote: "" })).toBe(false);
  });

  it("validates evidence items with citation, summary, and bounded confidence", () => {
    expect(validateEvidenceItem(demoStore.evidenceItems[0])).toBe(true);
    expect(validateEvidenceItem({ ...demoStore.evidenceItems[0], quote: "" })).toBe(false);
    expect(validateEvidenceItem({ ...demoStore.evidenceItems[0], confidence: 1.7 })).toBe(false);
  });

  it("calculates case evidence progress using approved evidence only", () => {
    const progress = getCaseEvidenceProgress({
      criteria: demoStore.criteria.filter((criterion) => criterion.caseId === "case_snf_admission_001"),
      evidenceItems: demoStore.evidenceItems.filter((item) => item.caseId === "case_snf_admission_001"),
      evidenceGaps: demoStore.evidenceGaps.filter((gap) => gap.caseId === "case_snf_admission_001")
    });

    expect(progress.totalCriteria).toBe(3);
    expect(progress.criteriaWithEvidence).toBe(2);
    expect(progress.openGaps).toBe(2);
    expect(progress.percent).toBe(67);
  });

  it("classifies seeded documents deterministically", () => {
    expect(classifySeededDocument("denial.pdf", "This notice is denied.").docType).toBe("DENIAL_LETTER");
    expect(classifySeededDocument("therapy.pdf", "PT and OT assessment").docType).toBe("THERAPY_NOTE");
  });

  it("parses a seeded denial with citations", () => {
    const parsed = parseSeededDenial("The requested SNF Admission is denied because custodial care.", demoStore.cases[0]);
    expect(parsed.denialReason).toBe(demoStore.cases[0].denialReason);
    expect(parsed.citations[0].quote).toContain("denied");
  });

  it("builds evidence rows and missing evidence checklist", () => {
    const rows = buildEvidenceMap({
      criteria: demoStore.criteria,
      evidenceItems: demoStore.evidenceItems,
      evidenceGaps: demoStore.evidenceGaps
    });
    const checklist = generateMissingEvidenceChecklist(demoStore.evidenceGaps);

    expect(rows.length).toBeGreaterThanOrEqual(8);
    expect(checklist[0].task).toContain("not found");
  });

  it("labels deadline urgency", () => {
    expect(getDeadlineUrgency("2026-06-26T10:00:00.000Z", new Date("2026-06-25T12:00:00.000Z")).level).toBe("critical");
    expect(getDeadlineUrgency("2026-07-02T10:00:00.000Z", new Date("2026-06-25T12:00:00.000Z")).level).toBe("steady");
  });
});
