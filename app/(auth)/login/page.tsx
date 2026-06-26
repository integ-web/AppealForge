import { ArrowRight, CheckCircle2, FileText, LockKeyhole, Sparkles } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

export default function LoginPage() {
  return (
    <main className="min-h-screen overflow-hidden p-5 text-white">
      <section className="mx-auto grid min-h-[calc(100vh-40px)] max-w-7xl items-center gap-8 lg:grid-cols-[1.12fr_.88fr]">
        <div className="relative af-card p-8 sm:p-10 lg:p-12">
          <div className="absolute right-8 top-8 hidden rounded-full border border-teal-300/20 bg-teal-300/10 px-4 py-2 text-xs text-teal-100 sm:block">
            Synthetic demo mode
          </div>
          <div className="mb-10 flex items-center gap-3">
            <Logo className="h-12 w-12" />
            <div>
              <div className="text-lg font-bold">AppealForge PAC</div>
              <div className="text-xs text-slate-400">Midnight Clinical Atelier</div>
            </div>
          </div>
          <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl">
            Turn denials into evidence-ready appeal packets.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Source-cited appeal workflow for post-acute Medicare Advantage teams. Built for human review, packet versioning, and audit-ready operations.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {["Citation-only drafts", "Human approval required", "Audit-ready workflow", "No live PHI"].map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-mist-200">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ["<10m", "Target draft assembly"],
              ["3", "Seeded denial pathways"],
              ["0", "Uncited clinical claims allowed"]
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-ink-950/35 p-5">
                <div className="font-mono text-3xl font-black">{value}</div>
                <div className="mt-2 text-xs leading-5 text-slate-400">{label}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-paper-100/20 bg-paper-50 p-5 text-ink-950 shadow-paper">
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-[#345047]">
              <FileText className="h-4 w-4" />
              Evidence preview
            </div>
            <p className="font-serif text-lg leading-8">
              &quot;Patient requires IV cefazolin every 8 hours through 06/30 and daily skilled wound assessment.&quot;
            </p>
            <div className="mt-3 inline-flex rounded-full border border-[#c9beaa] bg-white/60 px-3 py-1 text-xs font-bold text-[#345047]">
              Discharge Summary | page 3 | 94% confidence
            </div>
          </div>
        </div>

        <div className="af-card p-8 sm:p-10">
          <div className="mb-7 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-teal-300">Secure workspace</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight">Enter demo</h2>
            </div>
            <LockKeyhole className="h-7 w-7 text-amber-400" />
          </div>
          <form className="space-y-5">
            <label className="block text-sm font-semibold text-slate-200">
              Email
              <input className="mt-2 w-full rounded-2xl border border-white/10 bg-ink-950/45 px-4 py-3 text-white outline-none af-focus" defaultValue="ur@appealforge.local" />
            </label>
            <label className="block text-sm font-semibold text-slate-200">
              Password
              <input type="password" className="mt-2 w-full rounded-2xl border border-white/10 bg-ink-950/45 px-4 py-3 text-white outline-none af-focus" defaultValue="synthetic" />
            </label>
            <Link href="/cases" className="flex w-full items-center justify-center gap-2 rounded-full bg-teal-500 px-5 py-3 font-black text-ink-950 shadow-teal af-focus">
              Enter demo workspace
              <ArrowRight className="h-4 w-4" />
            </Link>
          </form>
          <div className="mt-5 grid gap-3">
            {[
              "Local deterministic evidence logic",
              "No external AI or healthcare services",
              "Sensitive audit metadata is scrubbed"
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-teal-300" />
                {item}
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-2 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-6 text-amber-50">
            <Sparkles className="h-4 w-4 shrink-0 text-amber-400" />
            This demo is safe for synthetic records only. Do not upload live PHI.
          </div>
        </div>
      </section>
    </main>
  );
}
