"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Download, History, LockKeyhole, Stamp } from "lucide-react";
import { WarningPanel } from "@/components/ui/primitives";

type PacketPaperProps = {
  markdown: string;
  warnings: string[];
  status: string;
  exportHref: string;
  versions: Array<{ id: string; versionNumber: number; status: string; createdAt: string; generatedBy: string }>;
};

export function PacketPaper({ markdown, warnings, status, exportHref, versions }: PacketPaperProps) {
  const [approved, setApproved] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [note, setNote] = useState("Physician review pending.");
  const currentStatus = approved ? "PHYSICIAN_APPROVED" : status;
  const sections = useMemo(
    () => ["Cover letter", "Patient/service summary", "Denial reason", "Clinical necessity summary", "Evidence table", "Missing documentation", "Physician attestation", "Attachment index"],
    []
  );

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.8fr)]">
      <section className="af-card p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-teal-300">Structured editor</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight">Appeal packet sections</h2>
          </div>
          <span className={`rounded-full border px-3 py-1 text-xs font-bold ${approved ? "border-green-500/30 bg-green-500/10 text-green-100" : "border-amber-400/30 bg-amber-400/10 text-amber-100"}`}>
            {currentStatus.replaceAll("_", " ")}
          </span>
        </div>

        <WarningPanel warnings={warnings} />

        <div className="mt-5 grid gap-3">
          {sections.map((section) => (
            <div key={section} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="font-semibold text-white">{section}</div>
                <span className="rounded-full border border-teal-300/20 bg-teal-300/10 px-3 py-1 text-xs text-teal-100">
                  citation checked
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Section content is generated from case metadata, denial finding citations, and approved evidence items only.
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-ink-950/35 p-4">
          <label className="text-sm font-semibold text-slate-200">
            Reviewer note
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              className="mt-2 min-h-24 w-full rounded-2xl border border-white/10 bg-ink-950/60 px-4 py-3 text-sm text-white outline-none af-focus"
            />
          </label>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              disabled={warnings.length > 0}
              onClick={() => setApproved(true)}
              className="rounded-full bg-teal-500 px-4 py-2 text-sm font-bold text-ink-950 shadow-teal disabled:cursor-not-allowed disabled:bg-slate-500 af-focus"
            >
              <CheckCircle2 className="mr-2 inline h-4 w-4" />
              Physician approve draft
            </button>
            {warnings.length > 0 ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-2 text-xs text-amber-100">
                <LockKeyhole className="h-3.5 w-3.5" />
                Approval locked until warnings clear
              </span>
            ) : null}
          </div>
        </div>
      </section>

      <aside className="space-y-4">
        <div className={`af-paper max-h-[82vh] overflow-auto p-8 ${approved ? "" : "paper-watermark"}`}>
          <div className="mb-6 flex items-start justify-between gap-4 border-b border-[#d8cfbf] pb-4">
            <div>
              <div className="font-serif text-3xl font-bold">Appeal Packet</div>
              <div className="mt-1 text-sm text-[#5d665e]">Source-cited draft for human review</div>
            </div>
            <Stamp className="h-8 w-8 text-[#9c6b3b]" />
          </div>
          <pre className="whitespace-pre-wrap font-serif text-[15px] leading-7 text-[#17202a]">{markdown}</pre>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <a href={exportHref} className="rounded-full bg-teal-500 px-4 py-3 text-center text-sm font-bold text-ink-950 shadow-teal af-focus">
            <Download className="mr-2 inline h-4 w-4" />
            Export draft
          </a>
          <button onClick={() => setShowHistory((value) => !value)} className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white af-focus">
            <History className="mr-2 inline h-4 w-4" />
            Version history
          </button>
        </div>
        {showHistory ? (
          <div className="af-card p-4">
            <h3 className="font-bold">Version history</h3>
            <div className="mt-3 space-y-2">
              {versions.map((version) => (
                <div key={version.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-sm">
                  <div className="font-semibold">Version {version.versionNumber} | {version.status.replaceAll("_", " ")}</div>
                  <div className="text-xs text-slate-400">{version.generatedBy} | {new Date(version.createdAt).toLocaleString()}</div>
                </div>
              ))}
              {approved ? (
                <div className="rounded-2xl border border-green-500/25 bg-green-500/10 p-3 text-sm text-green-100">
                  Version {versions.length + 1} | physician approved in this demo session
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
