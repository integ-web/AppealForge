import { CheckCircle2, Quote } from "lucide-react";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/shell/AppShell";
import { SectionHeader, StatusPill } from "@/components/ui/primitives";
import { getCaseBundle } from "@/lib/demo-data";

export default async function DenialReviewPage({ params }: { params: Promise<{ caseId: string }> }) {
  const { caseId } = await params;
  const bundle = getCaseBundle(caseId);
  if (!bundle) notFound();
  const finding = bundle.denialFinding;

  return (
    <AppShell>
      <SectionHeader eyebrow="Denial parser review" title="Confirm what the payer denied" />
      <div className="grid gap-5 xl:grid-cols-[1fr_420px]">
        <section className="af-card p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-2xl font-bold">Parsed denial fields</h2>
            <StatusPill tone={finding.reviewerConfirmed ? "green" : "amber"}>{finding.reviewerConfirmed ? "confirmed" : "needs review"}</StatusPill>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["Plan", finding.planName],
              ["Service requested", finding.serviceRequested],
              ["Request type", finding.requestType],
              ["Denial date", finding.denialDate],
              ["Appeal deadline", finding.appealDeadline],
              ["Denial reason", finding.denialReason],
              ["Payer rationale", finding.payerRationale],
              ["Appeal route", finding.appealRoute],
              ["Expedited language", finding.expeditedLanguagePresent ? "Present" : "Not found"]
            ].map(([label, value]) => (
              <label key={label} className="block text-sm font-semibold text-slate-200">
                {label}
                <textarea className="mt-2 min-h-20 w-full rounded-2xl border border-white/10 bg-ink-950/45 px-4 py-3 text-white outline-none af-focus" defaultValue={value} />
              </label>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <button className="rounded-full bg-teal-500 px-5 py-3 text-sm font-black text-ink-950 shadow-teal af-focus">
              <CheckCircle2 className="mr-2 inline h-4 w-4" />
              Confirm parser review
            </button>
            <button className="rounded-full border border-white/10 px-5 py-3 text-sm text-white af-focus">Save edits</button>
          </div>
        </section>

        <aside className="af-card p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-teal-300">Denial letter citation</p>
          <h2 className="mt-2 text-xl font-bold">{finding.citations[0].documentTitle}</h2>
          <div className="mt-4 rounded-2xl border border-paper-100/20 bg-paper-50 p-5 font-serif text-lg leading-8 text-ink-950 shadow-paper">
            <Quote className="mb-3 h-5 w-5 text-teal-500" />
            &quot;{finding.citations[0].quote}&quot;
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            Parser fields keep the original cited quote. If a fact is missing, the reviewer edits it or leaves it blank; the system does not infer unsupported facts.
          </p>
        </aside>
      </div>
    </AppShell>
  );
}
