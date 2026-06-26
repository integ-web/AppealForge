import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/shell/AppShell";
import { AuditEventRow, DeadlineBadge, SectionHeader, StatCard, StatusPill } from "@/components/ui/primitives";
import { getCaseBundle } from "@/lib/demo-data";
import { getCaseEvidenceProgress } from "@/lib/evidence";

export default async function CaseOverviewPage({ params }: { params: Promise<{ caseId: string }> }) {
  const { caseId } = await params;
  const bundle = getCaseBundle(caseId);
  if (!bundle) notFound();
  const progress = getCaseEvidenceProgress(bundle);

  return (
    <AppShell>
      <SectionHeader
        eyebrow="Case overview"
        title={`${bundle.authCase.serviceType} appeal workspace`}
        action={<DeadlineBadge deadline={bundle.authCase.appealDeadlineAt} />}
      />

      <section className="grid gap-4 md:grid-cols-4">
        <StatCard label="Evidence progress" value={`${progress.percent}%`} detail={`${progress.criteriaWithEvidence} of ${progress.totalCriteria} criteria supported.`} />
        <StatCard label="Open gaps" value={String(progress.openGaps)} detail="Missing evidence is a checklist, not invented text." />
        <StatCard label="Needs review" value={String(progress.needsReview)} detail="Reviewer action required before approved export." />
        <StatCard label="Packet versions" value={String(bundle.packetVersions.length)} detail="Every draft is versioned." />
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1fr_380px]">
        <div className="af-card p-5">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold">{bundle.patient.syntheticLabel}</h2>
              <p className="mt-1 text-sm text-slate-300">{bundle.facility.name} | {bundle.authCase.planName}</p>
            </div>
            <StatusPill tone="amber">{bundle.authCase.status.replaceAll("_", " ")}</StatusPill>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Info label="Denial reason" value={bundle.denialFinding.denialReason} />
            <Info label="Payer rationale" value={bundle.denialFinding.payerRationale} />
            <Info label="Appeal route" value={bundle.denialFinding.appealRoute} />
            <Info label="Assigned reviewer" value={bundle.owner.name} />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link href={`/cases/${caseId}/denial`} className="rounded-full border border-white/10 px-4 py-2 text-sm af-focus">Review denial parser</Link>
            <Link href={`/cases/${caseId}/evidence`} className="rounded-full bg-teal-500 px-4 py-2 text-sm font-bold text-ink-950 af-focus">Open evidence map</Link>
            <Link href={`/cases/${caseId}/gaps`} className="rounded-full border border-white/10 px-4 py-2 text-sm af-focus">Missing evidence</Link>
            <Link href={`/cases/${caseId}/packet`} className="rounded-full border border-white/10 px-4 py-2 text-sm af-focus">Packet editor</Link>
          </div>
        </div>

        <aside className="af-card p-5">
          <h2 className="text-xl font-bold">Activity timeline</h2>
          <div className="mt-4 space-y-3">
            {bundle.auditEvents.slice(0, 5).map((event) => (
              <AuditEventRow key={event.id} event={event} />
            ))}
          </div>
        </aside>
      </section>
    </AppShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</div>
      <div className="mt-2 text-sm leading-6 text-mist-200">{value}</div>
    </div>
  );
}
