import { AppShell } from "@/components/shell/AppShell";
import { AuditEventRow, SectionHeader, StatCard } from "@/components/ui/primitives";
import { demoStore } from "@/lib/demo-data";

export default function AuditPage() {
  return (
    <AppShell>
      <SectionHeader eyebrow="Audit log" title="Sensitive action trail with scrubbed metadata" />
      <section className="mb-5 grid gap-4 md:grid-cols-3">
        <StatCard label="Audit events" value={String(demoStore.auditEvents.length)} detail="Login, view, upload, extraction, evidence, packet, export, outcomes." />
        <StatCard label="PHI in metadata" value="0" detail="Audit helper blocks patient identifiers and raw quotes." />
        <StatCard label="Retention mode" value="Demo" detail="Production retention placeholders are visible in admin." />
      </section>
      <section className="af-card p-5">
        <div className="space-y-3">
          {demoStore.auditEvents.map((event) => (
            <AuditEventRow key={event.id} event={event} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
