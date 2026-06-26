import Link from "next/link";
import { AppShell } from "@/components/shell/AppShell";
import { AuditEventRow, CaseCard, SectionHeader, StatCard, StatusPill } from "@/components/ui/primitives";
import { demoStore } from "@/lib/demo-data";
import { getCaseEvidenceProgress } from "@/lib/evidence";

export default function CasesPage() {
  const openCases = demoStore.cases.filter((item) => !["WON", "LOST", "ARCHIVED"].includes(item.status));
  const urgentCases = openCases.slice(0, 2);
  const drafted = demoStore.cases.filter((item) => item.status === "PACKET_DRAFTED").length;
  const evidenceProgress = getCaseEvidenceProgress({
    criteria: demoStore.criteria,
    evidenceItems: demoStore.evidenceItems,
    evidenceGaps: demoStore.evidenceGaps
  });

  return (
    <AppShell>
      <SectionHeader
        eyebrow="Appeal queue"
        title="Today's denial recovery work"
        action={
          <Link href="/cases/new" className="rounded-full bg-teal-500 px-5 py-3 text-sm font-black text-ink-950 shadow-teal af-focus">
            New case
          </Link>
        }
      />

      <section className="grid gap-4 md:grid-cols-4">
        <StatCard label="Open denials" value={String(openCases.length)} detail="SNF admission, continued stay, and IRF pathways." />
        <StatCard label="Due within 72h" value="2" detail="Deadline urgency is visible without panic." />
        <StatCard label="Packets drafted" value={String(drafted)} detail="Draft packets remain locked until review." />
        <StatCard label="Evidence coverage" value={`${evidenceProgress.percent}%`} detail="Accepted evidence mapped to criteria." />
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          <div className="af-card p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold">Urgent queue</h2>
              <StatusPill tone="amber">deadline-driven</StatusPill>
            </div>
            <div className="grid gap-4">
              {urgentCases.map((item) => (
                <CaseCard
                  key={item.id}
                  item={item}
                  facilityName={demoStore.facilities.find((facility) => facility.id === item.facilityId)?.name ?? "Facility"}
                  ownerName={demoStore.users.find((user) => user.id === item.assignedOwnerId)?.name ?? "Unassigned"}
                />
              ))}
            </div>
          </div>

          <div className="af-card p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-bold">All synthetic cases</h2>
              <div className="flex flex-wrap gap-2">
                {["All facilities", "Needs review", "Packet drafted"].map((filter) => (
                  <span key={filter} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                    {filter}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {demoStore.cases.map((item) => (
                <CaseCard
                  key={item.id}
                  item={item}
                  facilityName={demoStore.facilities.find((facility) => facility.id === item.facilityId)?.name ?? "Facility"}
                  ownerName={demoStore.users.find((user) => user.id === item.assignedOwnerId)?.name ?? "Unassigned"}
                />
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="af-card p-5">
            <h2 className="text-xl font-bold">Payer pattern panel</h2>
            <div className="mt-4 space-y-3">
              {[
                ["Harbor MA Complete", "Skilled level language", "2 gaps"],
                ["Northstar MA", "Custodial care framing", "1 drafted packet"],
                ["Cascade MA Choice", "Lower level alternative", "IRF criteria review"]
              ].map(([plan, pattern, signal]) => (
                <div key={plan} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="font-semibold">{plan}</div>
                  <div className="mt-1 text-sm text-slate-300">{pattern}</div>
                  <div className="mt-3 text-xs text-amber-100">{signal}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="af-card p-5">
            <h2 className="text-xl font-bold">Audit pulse</h2>
            <div className="mt-4 space-y-3">
              {demoStore.auditEvents.slice(0, 4).map((event) => (
                <AuditEventRow key={event.id} event={event} />
              ))}
            </div>
          </div>

          <div className="af-card p-5">
            <h2 className="text-xl font-bold">Outcome snapshot</h2>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl border border-green-500/25 bg-green-500/10 p-4">
                <div className="font-mono text-2xl font-black">1</div>
                <div className="text-xs text-green-100">pending</div>
              </div>
              <div className="rounded-2xl border border-teal-300/25 bg-teal-300/10 p-4">
                <div className="font-mono text-2xl font-black">0</div>
                <div className="text-xs text-teal-100">won</div>
              </div>
              <div className="rounded-2xl border border-coral-500/25 bg-coral-500/10 p-4">
                <div className="font-mono text-2xl font-black">0</div>
                <div className="text-xs text-coral-500">lost</div>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </AppShell>
  );
}
