import { ShieldCheck, Users } from "lucide-react";
import { AppShell } from "@/components/shell/AppShell";
import { SectionHeader, StatusPill } from "@/components/ui/primitives";
import { demoStore } from "@/lib/demo-data";

export default function AdminPage() {
  return (
    <AppShell>
      <SectionHeader eyebrow="Admin settings" title="Organization, roles, and production hardening" />
      <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
        <section className="space-y-5">
          <div className="af-card p-5">
            <h2 className="text-2xl font-bold">{demoStore.organization.name}</h2>
            <p className="mt-2 text-sm text-slate-300">Synthetic regional post-acute operator workspace.</p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {demoStore.facilities.map((facility) => (
                <div key={facility.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="font-semibold">{facility.name}</div>
                  <div className="mt-1 text-sm text-slate-400">{facility.state} | facility scoped access ready</div>
                </div>
              ))}
            </div>
          </div>

          <div className="af-card p-5">
            <div className="mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-teal-300" />
              <h2 className="text-2xl font-bold">Users and roles</h2>
            </div>
            <div className="grid gap-3">
              {demoStore.users.map((user) => (
                <div key={user.id} className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:grid-cols-[1fr_.7fr_.4fr]">
                  <div>
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-sm text-slate-400">{user.email}</div>
                  </div>
                  <StatusPill tone="teal">{user.role.replaceAll("_", " ")}</StatusPill>
                  <StatusPill tone={user.mfaEnabled ? "green" : "amber"}>{user.mfaEnabled ? "MFA on" : "MFA pending"}</StatusPill>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="af-card p-5">
          <div className="mb-4 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-amber-400" />
            <h2 className="text-xl font-bold">Security checklist</h2>
          </div>
          <div className="space-y-3">
            {[
              ["No PHI in logs", "ready"],
              ["BAA/vendor review", "placeholder"],
              ["Retention policy", "placeholder"],
              ["Audit export", "ready"],
              ["External AI disabled", "ready"],
              ["Postgres production switch", "documented"]
            ].map(([item, state]) => (
              <div key={item} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-sm">
                <span>{item}</span>
                <StatusPill tone={state === "ready" ? "green" : "amber"}>{state}</StatusPill>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
