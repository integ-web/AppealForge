"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

type Field = {
  label: string;
  value: string;
};

export function OutcomeTracker({ fields }: { fields: Field[] }) {
  const [values, setValues] = useState(fields);
  const [saved, setSaved] = useState(false);

  return (
    <section className="af-card p-5">
      <div className="grid gap-4 md:grid-cols-2">
        {values.map((field, index) => (
          <label key={field.label} className="block text-sm font-semibold text-slate-200">
            {field.label}
            <textarea
              className="mt-2 min-h-20 w-full rounded-2xl border border-white/10 bg-ink-950/45 px-4 py-3 text-white outline-none af-focus"
              value={field.value}
              onChange={(event) => {
                const next = [...values];
                next[index] = { ...field, value: event.target.value };
                setValues(next);
                setSaved(false);
              }}
            />
          </label>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button onClick={() => setSaved(true)} className="rounded-full bg-teal-500 px-5 py-3 text-sm font-black text-ink-950 shadow-teal af-focus">
          Save outcome update
        </button>
        {saved ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-green-500/25 bg-green-500/10 px-3 py-2 text-sm text-green-100">
            <CheckCircle2 className="h-4 w-4" />
            Saved to demo session
          </span>
        ) : null}
      </div>
    </section>
  );
}
