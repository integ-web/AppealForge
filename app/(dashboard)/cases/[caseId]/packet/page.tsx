import Link from "next/link";
import { notFound } from "next/navigation";
import { PacketPaper } from "@/components/packet/PacketPaper";
import { AppShell } from "@/components/shell/AppShell";
import { SectionHeader } from "@/components/ui/primitives";
import { getCaseBundle } from "@/lib/demo-data";
import { generatePacketMarkdown } from "@/lib/packets/generate";

export default async function PacketPage({ params }: { params: Promise<{ caseId: string }> }) {
  const { caseId } = await params;
  const bundle = getCaseBundle(caseId);
  if (!bundle) notFound();
  const packet = generatePacketMarkdown({
    ...bundle,
    generatedBy: bundle.owner.name,
    versionNumber: bundle.packetVersions.length + 1,
    exportedAt: new Date("2026-06-25T12:00:00.000Z").toISOString()
  });

  return (
    <AppShell>
      <SectionHeader
        eyebrow="Packet editor"
        title="Draft a citation-backed appeal packet"
        action={<Link href={`/cases/${caseId}/export`} className="rounded-full bg-teal-500 px-5 py-3 text-sm font-black text-ink-950 shadow-teal af-focus">Export workflow</Link>}
      />
      <PacketPaper
        markdown={packet.markdown}
        warnings={packet.warnings}
        status="AI_DRAFT"
        exportHref={`/api/cases/${caseId}/packet/export`}
        versions={bundle.packetVersions}
      />
    </AppShell>
  );
}
