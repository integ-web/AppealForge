import { notFound } from "next/navigation";
import { OutcomeTracker } from "@/components/cases/OutcomeTracker";
import { AppShell } from "@/components/shell/AppShell";
import { SectionHeader, StatusPill } from "@/components/ui/primitives";
import { getCaseBundle } from "@/lib/demo-data";

export default async function OutcomePage({ params }: { params: Promise<{ caseId: string }> }) {
  const { caseId } = await params;
  const bundle = getCaseBundle(caseId);
  if (!bundle) notFound();
  const outcome = bundle.appealOutcomes[0];

  return (
    <AppShell>
      <SectionHeader eyebrow="Outcome tracker" title="Close the loop and prove appeal ROI" />
      <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
        <OutcomeTracker
          fields={[
            { label: "Sent date", value: bundle.communicationLogs[0]?.sentAt ?? "" },
            { label: "Channel", value: bundle.communicationLogs[0]?.channel ?? "Not sent" },
            { label: "Confirmation number", value: bundle.communicationLogs[0]?.confirmationNumber ?? "" },
            { label: "Plan response due", value: "2026-07-01" },
            { label: "Outcome", value: outcome?.outcome ?? "PENDING" },
            { label: "Approved days", value: outcome?.approvedDays ? String(outcome.approvedDays) : "" },
            { label: "Escalation", value: "None" },
            { label: "Notes", value: outcome?.notes ?? "Awaiting submission." }
          ]}
        />
        <aside className="af-card p-5">
          <h2 className="text-xl font-bold">Communication log</h2>
          <div className="mt-4 space-y-3">
            {bundle.communicationLogs.length ? bundle.communicationLogs.map((log) => (
              <div key={log.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-semibold">{log.channel}</div>
                  <StatusPill tone="teal">recorded</StatusPill>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-300">{log.notes}</p>
              </div>
            )) : <p className="text-sm text-slate-300">No sent communication recorded yet.</p>}
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
