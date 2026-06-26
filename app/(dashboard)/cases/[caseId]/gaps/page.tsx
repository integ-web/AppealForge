import { notFound } from "next/navigation";
import { AppShell } from "@/components/shell/AppShell";
import { SectionHeader, StatusPill } from "@/components/ui/primitives";
import { getCaseBundle } from "@/lib/demo-data";
import { generateMissingEvidenceChecklist } from "@/lib/evidence";

export default async function GapsPage({ params }: { params: Promise<{ caseId: string }> }) {
  const { caseId } = await params;
  const bundle = getCaseBundle(caseId);
  if (!bundle) notFound();
  const checklist = generateMissingEvidenceChecklist(bundle.evidenceGaps);

  return (
    <AppShell>
      <SectionHeader eyebrow="Missing evidence checklist" title="Turn absence into action" />
      <section className="grid gap-4">
        {checklist.map((item) => (
          <article key={item.id} className="af-card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold">{item.task}</h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">{item.whyNeeded}</p>
              </div>
              <StatusPill tone={item.priority === "high" ? "coral" : "amber"}>{item.priority} priority</StatusPill>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">Owner: {item.owner}</span>
              <button className="rounded-full bg-teal-500 px-4 py-2 text-sm font-bold text-ink-950 af-focus">{item.actionLabel}</button>
              <button className="rounded-full border border-white/10 px-4 py-2 text-sm af-focus">Mark resolved</button>
            </div>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
