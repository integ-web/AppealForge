import { PrismaClient } from "@prisma/client";
import { demoStore } from "../lib/demo-data";

const prisma = new PrismaClient();

async function main() {
  await prisma.auditEvent.deleteMany();
  await prisma.appealOutcome.deleteMany();
  await prisma.communicationLog.deleteMany();
  await prisma.packetVersion.deleteMany();
  await prisma.evidenceGap.deleteMany();
  await prisma.evidenceItem.deleteMany();
  await prisma.criterion.deleteMany();
  await prisma.denialFinding.deleteMany();
  await prisma.extractedPage.deleteMany();
  await prisma.document.deleteMany();
  await prisma.authCase.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.user.deleteMany();
  await prisma.facility.deleteMany();
  await prisma.organization.deleteMany();

  await prisma.organization.create({ data: demoStore.organization });

  for (const facility of demoStore.facilities) {
    await prisma.facility.create({ data: facility });
  }

  for (const user of demoStore.users) {
    await prisma.user.create({ data: user });
  }

  for (const patient of demoStore.patients) {
    await prisma.patient.create({ data: patient });
  }

  for (const authCase of demoStore.cases) {
    await prisma.authCase.create({
      data: {
        ...authCase,
        denialDate: new Date(authCase.denialDate),
        appealDeadlineAt: new Date(authCase.appealDeadlineAt),
        createdAt: new Date(authCase.createdAt),
        updatedAt: new Date(authCase.updatedAt)
      }
    });
  }

  for (const document of demoStore.documents) {
    await prisma.document.create({
      data: {
        id: document.id,
        caseId: document.caseId,
        docType: document.docType,
        title: document.title,
        filename: document.filename,
        storageKey: `/demo/${document.filename}`,
        sha256: document.checksum,
        pageCount: document.pageCount,
        extractionState: document.extractionState
      }
    });
  }

  for (const page of demoStore.extractedPages) {
    await prisma.extractedPage.create({ data: page });
  }

  for (const finding of demoStore.denialFindings) {
    await prisma.denialFinding.create({
      data: {
        id: finding.id,
        caseId: finding.caseId,
        denialReason: finding.denialReason,
        payerRationale: finding.payerRationale,
        appealInstructions: finding.appealRoute,
        parsedJson: JSON.stringify(finding),
        reviewerConfirmed: finding.reviewerConfirmed,
        sourceCitationJson: JSON.stringify(finding.citations)
      }
    });
  }

  for (const criterion of demoStore.criteria) {
    await prisma.criterion.create({
      data: {
        id: criterion.id,
        caseId: criterion.caseId,
        label: criterion.label,
        description: criterion.description,
        sourceType: criterion.sourceType,
        requiredEvidenceJson: JSON.stringify(criterion.requiredEvidence),
        priority: criterion.priority
      }
    });
  }

  for (const item of demoStore.evidenceItems) {
    await prisma.evidenceItem.create({
      data: {
        id: item.id,
        caseId: item.caseId,
        criterionId: item.criterionId,
        documentId: item.documentId,
        pageNumber: item.pageNumber,
        quote: item.quote,
        normalizedSummary: item.normalizedSummary,
        confidence: item.confidence,
        reviewerStatus: item.reviewerStatus,
        reviewerNote: item.reviewerNote
      }
    });
  }

  for (const gap of demoStore.evidenceGaps) {
    await prisma.evidenceGap.create({
      data: {
        ...gap,
        resolvedAt: gap.resolvedAt ? new Date(gap.resolvedAt) : undefined
      }
    });
  }

  for (const packet of demoStore.packetVersions) {
    await prisma.packetVersion.create({
      data: {
        id: packet.id,
        caseId: packet.caseId,
        versionNumber: packet.versionNumber,
        status: packet.status,
        packetMarkdown: packet.packetMarkdown,
        pdfStorageKey: packet.exportStorageKey,
        generatedBy: packet.generatedBy,
        approvedBy: packet.approvedBy,
        approvedAt: packet.approvedAt ? new Date(packet.approvedAt) : undefined,
        createdAt: new Date(packet.createdAt)
      }
    });
  }

  for (const communication of demoStore.communicationLogs) {
    await prisma.communicationLog.create({
      data: {
        ...communication,
        sentAt: communication.sentAt ? new Date(communication.sentAt) : undefined
      }
    });
  }

  for (const outcome of demoStore.appealOutcomes) {
    await prisma.appealOutcome.create({
      data: {
        ...outcome,
        decisionDate: outcome.decisionDate ? new Date(outcome.decisionDate) : undefined
      }
    });
  }

  for (const event of demoStore.auditEvents) {
    await prisma.auditEvent.create({
      data: {
        ...event,
        metadata: JSON.stringify(event.metadata),
        createdAt: new Date(event.createdAt)
      }
    });
  }

  console.log(`Seeded ${demoStore.cases.length} synthetic appeal cases for AppealForge PAC.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
