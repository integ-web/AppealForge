import { NextResponse } from "next/server";
import { getCaseBundle } from "@/lib/demo-data";
import { generatePacketMarkdown } from "@/lib/packets/generate";

export async function GET(_request: Request, { params }: { params: Promise<{ caseId: string }> }) {
  const { caseId } = await params;
  const bundle = getCaseBundle(caseId);

  if (!bundle) {
    return NextResponse.json({ error: "Case not found" }, { status: 404 });
  }

  const packet = generatePacketMarkdown({
    ...bundle,
    generatedBy: bundle.owner.name,
    versionNumber: bundle.packetVersions.length + 1,
    exportedAt: new Date().toISOString()
  });

  const safeFilename = `${caseId}-appealforge-draft-packet.md`;

  return new NextResponse(packet.markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${safeFilename}"`,
      "X-AppealForge-Status": "DRAFT",
      "X-AppealForge-Citation-Guard": packet.claimAudit.ok ? "pass" : "blocked"
    }
  });
}
