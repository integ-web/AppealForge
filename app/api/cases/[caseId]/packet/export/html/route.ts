import { NextResponse } from "next/server";
import { getCaseBundle } from "@/lib/demo-data";
import { generatePacketHtml } from "@/lib/packets/generate";

export async function GET(_request: Request, { params }: { params: Promise<{ caseId: string }> }) {
  const { caseId } = await params;
  const bundle = getCaseBundle(caseId);

  if (!bundle) {
    return NextResponse.json({ error: "Case not found" }, { status: 404 });
  }

  const packet = generatePacketHtml({
    ...bundle,
    generatedBy: bundle.owner.name,
    versionNumber: bundle.packetVersions.length + 1,
    exportedAt: new Date().toISOString()
  });

  return new NextResponse(packet.html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `inline; filename="${caseId}-appealforge-draft-packet.html"`,
      "X-AppealForge-Status": "DRAFT",
      "X-AppealForge-Citation-Guard": packet.claimAudit.ok ? "pass" : "blocked"
    }
  });
}
