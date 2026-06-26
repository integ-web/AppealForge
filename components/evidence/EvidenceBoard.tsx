"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, MessageSquareText, Quote, XCircle } from "lucide-react";
import { CitationChip, ConfidenceMeter, StatusPill, StatusRail } from "@/components/ui/primitives";
import { buildEvidenceMap } from "@/lib/evidence";
import type { Criterion, EvidenceGap, EvidenceItem } from "@/lib/types";

type EvidenceBoardProps = {
  criteria: Criterion[];
  evidenceItems: EvidenceItem[];
  evidenceGaps: EvidenceGap[];
};

export function EvidenceBoard({ criteria, evidenceItems, evidenceGaps }: EvidenceBoardProps) {
  const rows = useMemo(() => buildEvidenceMap({ criteria, evidenceItems, evidenceGaps }), [criteria, evidenceGaps, evidenceItems]);
  const [selectedId, setSelectedId] = useState(evidenceItems[0]?.id ?? "");
  const selected = evidenceItems.find((item) => item.id === selectedId) ?? evidenceItems[0];

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
      <section className="space-y-4">
        {rows.map((row) => (
          <article key={row.criterion.id} className="af-card overflow-hidden">
            <div className="flex gap-4 p-5">
              <StatusRail status={row.status} />
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight">{row.criterion.label}</h2>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{row.criterion.description}</p>
                  </div>
                  <StatusPill tone={row.status === "supported" ? "green" : row.status === "gap" ? "coral" : "amber"}>
                    {row.status.replace("-", " ")}
                  </StatusPill>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {row.criterion.requiredEvidence.map((requirement) => (
                    <span key={requirement} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                      {requirement}
                    </span>
                  ))}
                </div>

                <div className="grid gap-3">
                  {row.evidence.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedId(item.id)}
                      className={`rounded-2xl border p-4 text-left transition af-focus ${
                        selected?.id === item.id ? "border-teal-300/50 bg-teal-300/10" : "border-white/10 bg-ink-950/30 hover:border-white/20"
                      }`}
                    >
                      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                        <p className="max-w-2xl text-sm leading-6 text-mist-200">{item.normalizedSummary}</p>
                        <StatusPill tone={item.reviewerStatus.includes("REVIEWED") ? "teal" : item.reviewerStatus === "NEEDS_FOLLOW_UP" ? "amber" : "slate"}>
                          {item.reviewerStatus.replaceAll("_", " ")}
                        </StatusPill>
                      </div>
                      <div className="mb-3 flex flex-wrap gap-2">
                        <CitationChip item={item} />
                      </div>
                      <ConfidenceMeter value={item.confidence} />
                    </button>
                  ))}
                </div>

                {row.gaps.length > 0 ? (
                  <div className="mt-4 rounded-2xl border border-coral-500/25 bg-coral-500/10 p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm font-bold text-coral-500">
                      <XCircle className="h-4 w-4" />
                      Checklist gaps
                    </div>
                    <ul className="space-y-2 text-sm text-coral-100">
                      {row.gaps.map((gap) => (
                        <li key={gap.id}>{gap.gapText} Owner: {gap.suggestedOwner}.</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </section>

      <aside className="af-card sticky top-6 h-fit p-5" aria-label="Source drawer">
        {selected ? (
          <>
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-teal-300">Source drawer</p>
                <h2 className="mt-1 text-xl font-bold">{selected.documentTitle}</h2>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">Page {selected.pageNumber}</span>
            </div>
            <div className="rounded-2xl border border-paper-100/20 bg-paper-50 p-5 font-serif text-lg leading-8 text-ink-950 shadow-paper">
              <Quote className="mb-3 h-5 w-5 text-teal-500" />
              &quot;{selected.quote}&quot;
            </div>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="mb-1 text-xs uppercase tracking-[0.2em] text-slate-400">Normalized support</div>
                <p className="text-sm leading-6 text-mist-200">{selected.normalizedSummary}</p>
              </div>
              <ConfidenceMeter value={selected.confidence} />
              <div className="grid grid-cols-2 gap-2">
                <button className="rounded-full bg-teal-500 px-4 py-2 text-sm font-bold text-ink-950 af-focus">
                  <CheckCircle2 className="mr-2 inline h-4 w-4" />
                  Accept
                </button>
                <button className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 af-focus">
                  <MessageSquareText className="mr-2 inline h-4 w-4" />
                  Note
                </button>
              </div>
            </div>
          </>
        ) : (
          <p className="text-sm text-slate-300">Select an evidence item to inspect its exact source quote.</p>
        )}
      </aside>
    </div>
  );
}
