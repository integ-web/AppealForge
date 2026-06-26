"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, FileUp, Loader2, ShieldCheck } from "lucide-react";
import type { DocumentRecord } from "@/lib/types";

const steps = ["Classifying documents", "Extracting page text", "Parsing denial facts", "Creating evidence job"];

export function UploadSimulator({ documents, nextHref }: { documents: DocumentRecord[]; nextHref: string }) {
  const [stage, setStage] = useState<"idle" | "running" | "ready">("idle");

  function runSimulation() {
    setStage("running");
    window.setTimeout(() => setStage("ready"), 1200);
  }

  return (
    <div className="rounded-3xl border border-dashed border-teal-300/35 bg-teal-300/10 p-8 text-center">
      <FileUp className="mx-auto h-10 w-10 text-teal-300" />
      <h2 className="mt-4 text-2xl font-bold">Drop synthetic PDFs here</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-300">
        Demo mode simulates upload, classification, and page extraction using seeded documents. Live PHI is intentionally out of scope.
      </p>

      <div className="mx-auto mt-5 max-w-xl rounded-2xl border border-white/10 bg-ink-950/40 p-4 text-left">
        {stage === "idle" ? (
          <button onClick={runSimulation} className="w-full rounded-full bg-teal-500 px-5 py-3 text-sm font-black text-ink-950 shadow-teal af-focus">
            Use seeded demo packet
          </button>
        ) : null}

        {stage === "running" ? (
          <div className="space-y-3">
            {steps.map((step) => (
              <div key={step} className="flex items-center gap-3 text-sm text-slate-200">
                <Loader2 className="h-4 w-4 animate-spin text-teal-300" />
                {step}
              </div>
            ))}
          </div>
        ) : null}

        {stage === "ready" ? (
          <div className="space-y-3">
            {documents.map((document) => (
              <div key={document.id} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <div>
                  <div className="text-sm font-semibold">{document.title}</div>
                  <div className="text-xs text-slate-400">{document.docType} | {document.pageCount} pages</div>
                </div>
                <CheckCircle2 className="h-4 w-4 text-teal-300" />
              </div>
            ))}
            <Link href={nextHref} className="flex w-full items-center justify-center gap-2 rounded-full bg-teal-500 px-5 py-3 text-sm font-black text-ink-950 shadow-teal af-focus">
              <ShieldCheck className="h-4 w-4" />
              Continue to parser review
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
