import Link from "next/link";
import { notFound } from "next/navigation";
import { EvidenceBoard } from "@/components/evidence/EvidenceBoard";
import { AppShell } from "@/components/shell/AppShell";
import { SectionHeader, StatCard } from "@/components/ui/primitives";
import { getCaseBundle } from "@/lib/demo-data";
import { getCaseEvidenceProgress } from "@/lib/evidence";

export default async function EvidencePage({ params }: { params: Promise<{ caseId: string }> }) {
  const { caseId } = await params;
  const bundle = getCaseBundle(caseId);
  if (!bundle) notFound();
  const progress = getCaseEvidenceProgress(bundle);

  return (
    <AppShell>
      <SectionHeader
        eyebrow="Evidence map"
        title="Map denial criteria to exact source quotes"
        action={
          <div className="flex flex-wrap gap-2">
            <Link href={`/cases/${caseId}/gaps`} className="rounded-full border border-white/10 px-5 py-3 text-sm text-white af-focus">Checklist</Link>
            <Link href={`/cases/${caseId}/packet`} className="rounded-full bg-teal-500 px-5 py-3 text-sm font-black text-ink-950 shadow-teal af-focus">Generate packet</Link>
          </div>
        }
      />
      <section className="mb-5 grid gap-4 md:grid-cols-4">
        <StatCard label="Supported criteria" value={`${progress.criteriaWithEvidence}/${progress.totalCriteria}`} detail="Only accepted cited evidence counts." />
        <StatCard label="Evidence progress" value={`${progress.percent}%`} detail="Source-backed progress calculation." />
        <StatCard label="Open gaps" value={String(progress.openGaps)} detail="Missing evidence becomes work." />
        <StatCard label="Review queue" value={String(progress.needsReview)} detail="Pending or follow-up items." />
      </section>
      <EvidenceBoard criteria={bundle.criteria} evidenceItems={bundle.evidenceItems} evidenceGaps={bundle.evidenceGaps} />
    </AppShell>
  );
}
