import { AlertTriangle, CheckCircle2, Clock, FileText, ShieldAlert } from "lucide-react";
import Link from "next/link";
import type React from "react";
import type { AuthCase, AuditEvent, EvidenceItem, ReviewStatus } from "@/lib/types";
import { getDeadlineUrgency } from "@/lib/evidence";

export function StatCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="af-card p-5">
      <div className="font-mono text-3xl font-black text-white">{value}</div>
      <div className="mt-1 text-sm font-semibold text-mist-200">{label}</div>
      <div className="mt-3 text-xs leading-5 text-slate-400">{detail}</div>
    </div>
  );
}

export function DeadlineBadge({ deadline }: { deadline: string }) {
  const urgency = getDeadlineUrgency(deadline, new Date("2026-06-25T12:00:00.000Z"));
  const styles = {
    overdue: "border-coral-500/40 bg-coral-500/15 text-coral-500",
    critical: "border-coral-500/40 bg-coral-500/15 text-coral-500",
    urgent: "border-amber-400/40 bg-amber-400/15 text-amber-100",
    steady: "border-teal-300/25 bg-teal-300/10 text-teal-100"
  }[urgency.level];

  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}>
      <Clock className="h-3.5 w-3.5" />
      {urgency.label}
    </span>
  );
}

export function StatusRail({ status }: { status: "supported" | "gap" | "needs-review" | ReviewStatus }) {
  const color =
    status === "supported" || status === "CLINICAL_REVIEWED" || status === "PHYSICIAN_APPROVED"
      ? "bg-teal-300"
      : status === "gap" || status === "REJECTED"
        ? "bg-coral-500"
        : "bg-amber-400";

  return <span className={`block w-1.5 rounded-full ${color}`} aria-hidden="true" />;
}

export function StatusPill({ children, tone = "teal" }: { children: React.ReactNode; tone?: "teal" | "amber" | "coral" | "slate" | "green" }) {
  const styles = {
    teal: "border-teal-300/25 bg-teal-300/10 text-teal-100",
    amber: "border-amber-400/30 bg-amber-400/10 text-amber-100",
    coral: "border-coral-500/30 bg-coral-500/10 text-coral-500",
    slate: "border-white/10 bg-white/5 text-slate-300",
    green: "border-green-500/30 bg-green-500/10 text-green-100"
  }[tone];
  return <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}>{children}</span>;
}

export function CaseCard({ item, facilityName, ownerName }: { item: AuthCase; facilityName: string; ownerName: string }) {
  return (
    <article className="group af-card overflow-hidden p-0 transition hover:-translate-y-0.5">
      <div className="flex">
        <div className="w-1.5 bg-gradient-to-b from-teal-300 via-amber-400 to-coral-500" />
        <div className="min-w-0 flex-1 p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <StatusPill tone={item.status.includes("DRAFT") ? "amber" : item.status === "APPROVED" ? "green" : "teal"}>
              {item.status.replaceAll("_", " ")}
            </StatusPill>
            <DeadlineBadge deadline={item.appealDeadlineAt} />
          </div>
          <h3 className="text-lg font-bold tracking-tight text-white">{item.serviceType}</h3>
          <p className="mt-1 text-sm text-slate-300">{item.denialReason}</p>
          <div className="mt-4 grid gap-3 text-xs text-slate-400 sm:grid-cols-3">
            <span>{item.planName}</span>
            <span>{facilityName}</span>
            <span>Owner: {ownerName}</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href={`/cases/${item.id}/overview`} className="rounded-full bg-white px-4 py-2 text-sm font-bold text-ink-950 af-focus">
              Open case
            </Link>
            <Link href={`/cases/${item.id}/evidence`} className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 af-focus">
              Evidence map
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export function CitationChip({ item }: { item: EvidenceItem }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-300/25 bg-teal-300/10 px-2.5 py-1 text-xs font-semibold text-teal-100">
      <FileText className="h-3.5 w-3.5" />
      {item.documentTitle} p.{item.pageNumber}
    </span>
  );
}

export function ConfidenceMeter({ value }: { value: number }) {
  const percent = Math.round(value * 100);
  return (
    <div className="w-full">
      <div className="mb-1 flex justify-between text-xs text-slate-400">
        <span>Confidence</span>
        <span className="font-mono">{percent}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/8">
        <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-teal-300" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

export function WarningPanel({ warnings }: { warnings: string[] }) {
  return (
    <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-50">
      <div className="mb-2 flex items-center gap-2 font-bold text-amber-100">
        <ShieldAlert className="h-4 w-4" />
        Unsupported claim guardrail
      </div>
      {warnings.length ? (
        <ul className="space-y-1">
          {warnings.map((warning) => (
            <li key={warning}>{warning}</li>
          ))}
        </ul>
      ) : (
        <p>All clinical assertions in this draft are tied to accepted citations or metadata.</p>
      )}
    </div>
  );
}

export function EmptyState({ title, body, actionHref, actionLabel }: { title: string; body: string; actionHref: string; actionLabel: string }) {
  return (
    <div className="af-card grid place-items-center p-10 text-center">
      <div className="max-w-md">
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5">
          <FileText className="h-5 w-5 text-teal-300" />
        </div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">{body}</p>
        <Link href={actionHref} className="mt-5 inline-flex rounded-full bg-teal-500 px-5 py-3 text-sm font-bold text-ink-950 af-focus">
          {actionLabel}
        </Link>
      </div>
    </div>
  );
}

export function LoadingState({ label = "Preparing source-cited workspace" }: { label?: string }) {
  return (
    <div className="af-card animate-pulse p-5">
      <div className="mb-4 h-4 w-48 rounded bg-white/10" />
      <div className="space-y-3">
        <div className="h-16 rounded-2xl bg-white/8" />
        <div className="h-16 rounded-2xl bg-white/8" />
      </div>
      <p className="mt-4 text-sm text-slate-400">{label}</p>
    </div>
  );
}

export function AuditEventRow({ event }: { event: AuditEvent }) {
  return (
    <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:grid-cols-[1fr_.8fr_.8fr]">
      <div className="flex items-center gap-3">
        <CheckCircle2 className="h-4 w-4 text-teal-300" />
        <div>
          <div className="font-semibold text-white">{event.action}</div>
          <div className="text-xs text-slate-400">{event.subjectType} | {event.subjectId}</div>
        </div>
      </div>
      <div className="text-sm text-slate-300">{new Date(event.createdAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}</div>
      <div className="text-xs text-slate-400">Metadata scrubbed | synthetic={String(event.metadata.synthetic)}</div>
    </div>
  );
}

export function SectionHeader({ eyebrow, title, action }: { eyebrow: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-300">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">{title}</h1>
      </div>
      {action}
    </div>
  );
}

export function AlertLine({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 rounded-2xl border border-coral-500/25 bg-coral-500/10 p-3 text-sm text-coral-500">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{children}</span>
    </div>
  );
}
