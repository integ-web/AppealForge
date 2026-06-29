import { Download, FileCheck2, Lock } from "lucide-react";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/shell/AppShell";
import { AlertLine, SectionHeader, StatusPill } from "@/components/ui/primitives";
import { getCaseBundle } from "@/lib/demo-data";

export default async function ExportPage({ params }: { params: Promise<{ caseId: string }> }) {
  const { caseId } = await params;
  const bundle = getCaseBundle(caseId);
  if (!bundle) notFound();
  const latest = bundle.packetVersions[0];

  return (
    <AppShell>
      <SectionHeader eyebrow="Packet export" title="Export draft or approved packet" />
      <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
        <section className="af-card p-5">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold">Version {latest.versionNumber}</h2>
              <p className="mt-1 text-sm text-slate-300">Markdown/HTML fallback export is implemented for local demo reliability.</p>
            </div>
            <StatusPill tone="amber">{latest.status.replaceAll("_", " ")}</StatusPill>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <ExportOption
              title="Print-ready HTML packet"
              description="Opens a warm paper packet with citation guard status, evidence table, gaps, and attestation placeholder."
              enabled
              href={`/api/cases/${caseId}/packet/export/html`}
            />
            <ExportOption
              title="Draft Markdown export"
              description="Downloads a reviewable source packet for internal editing and version comparison."
              enabled
              href={`/api/cases/${caseId}/packet/export`}
            />
            <ExportOption title="Approved export" description="Locked until physician approval is recorded." enabled={false} />
            <ExportOption title="PDF export" description="Production path; local demo uses print-ready HTML until PDF service is configured." enabled={false} />
          </div>
          <div className="mt-5">
            <AlertLine>Approved export requires human approval. Draft exports remain clearly marked DRAFT.</AlertLine>
          </div>
        </section>

        <aside className="af-card p-5">
          <h2 className="text-xl font-bold">Approval gate</h2>
          <div className="mt-4 space-y-3">
            {["Denial parser confirmed", "Evidence reviewed", "Unsupported claims clear", "Physician approval pending"].map((item, index) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-sm">
                {index < 3 ? <FileCheck2 className="h-4 w-4 text-teal-300" /> : <Lock className="h-4 w-4 text-amber-400" />}
                {item}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

function ExportOption({ title, description, enabled, href }: { title: string; description: string; enabled: boolean; href?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="font-semibold">{title}</div>
        <span className={`rounded-full px-3 py-1 text-xs ${enabled ? "bg-teal-300/10 text-teal-100" : "bg-amber-400/10 text-amber-100"}`}>
          {enabled ? "ready" : "locked"}
        </span>
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
      {enabled && href ? (
        <a href={href} className="mt-4 inline-flex rounded-full bg-teal-500 px-4 py-2 text-sm font-bold text-ink-950 af-focus">
          <Download className="mr-2 h-4 w-4" />
          Export
        </a>
      ) : (
        <button disabled className="mt-4 rounded-full bg-slate-500 px-4 py-2 text-sm font-bold text-ink-950 disabled:cursor-not-allowed">
          <Download className="mr-2 inline h-4 w-4" />
          Locked
        </button>
      )}
    </div>
  );
}
