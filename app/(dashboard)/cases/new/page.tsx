import { ShieldCheck, WandSparkles } from "lucide-react";
import { UploadSimulator } from "@/components/cases/UploadSimulator";
import { AppShell } from "@/components/shell/AppShell";
import { SectionHeader, StatusPill } from "@/components/ui/primitives";
import { demoStore, getPrimaryCaseId } from "@/lib/demo-data";

export default function NewCasePage() {
  return (
    <AppShell>
      <SectionHeader eyebrow="New case intake" title="Upload a denial letter and clinical packet" />

      <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
        <section className="af-card p-5">
          <div className="grid gap-4 md:grid-cols-2">
            {["Facility", "Plan", "Service type", "Request type", "Denial date", "Assigned owner"].map((label, index) => (
              <label key={label} className="block text-sm font-semibold text-slate-200">
                {label}
                <input
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-ink-950/45 px-4 py-3 text-white outline-none af-focus"
                  defaultValue={[
                    "Lakeside Skilled Nursing",
                    "Harbor MA Complete",
                    "SNF Admission",
                    "Admission",
                    "2026-06-22",
                    "Maya Patel"
                  ][index]}
                />
              </label>
            ))}
          </div>

          <UploadSimulator
            documents={demoStore.documents.filter((document) => document.caseId === getPrimaryCaseId())}
            nextHref={`/cases/${getPrimaryCaseId()}/denial`}
          />
        </section>

        <aside className="space-y-5">
          <div className="af-card p-5">
            <h2 className="text-xl font-bold">Document classification</h2>
            <div className="mt-4 space-y-3">
              {demoStore.documents.slice(0, 3).map((document) => (
                <div key={document.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-semibold">{document.title}</div>
                    <StatusPill tone="teal">{document.extractionState}</StatusPill>
                  </div>
                  <div className="mt-2 text-xs text-slate-400">{document.docType} | {document.pageCount} pages | checksum stored</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-5 text-sm leading-6 text-amber-50">
            <div className="mb-2 flex items-center gap-2 font-bold">
              <ShieldCheck className="h-4 w-4" />
              Intake guardrail
            </div>
            Uploaded files create audit events, extracted pages, and checklist gaps. This local demo uses deterministic seeded text only.
          </div>
          <div className="af-card p-5">
            <div className="mb-2 flex items-center gap-2 text-teal-300">
              <WandSparkles className="h-4 w-4" />
              <span className="text-sm font-bold">Next action</span>
            </div>
            <p className="text-sm leading-6 text-slate-300">Review parsed denial facts before evidence mapping or packet generation.</p>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
