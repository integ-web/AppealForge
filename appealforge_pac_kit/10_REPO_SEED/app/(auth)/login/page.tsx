import { Logo } from "@/components/brand/Logo";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center p-6 text-white">
      <section className="grid w-full max-w-6xl gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <div className="af-card p-10">
          <div className="mb-8 flex items-center gap-3">
            <Logo className="h-12 w-12" />
            <div>
              <div className="font-bold">AppealForge PAC</div>
              <div className="text-xs text-slate-400">Post-acute denial recovery workflow</div>
            </div>
          </div>
          <h1 className="max-w-2xl text-5xl font-black leading-[0.98] tracking-[-0.06em]">
            Turn denials into evidence-ready appeal packets.
          </h1>
          <p className="mt-5 max-w-xl text-slate-300">
            Source-cited Medicare Advantage appeal workflow for SNF, IRF, and post-acute teams.
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              ["95%", "SNF appealed denials overturned in OIG sample"],
              ["10m", "Target packet draft time"],
              ["0", "Unsupported clinical claims allowed"]
            ].map(([value, label]) => (
              <div key={value} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-3xl font-black">{value}</div>
                <div className="mt-1 text-xs text-slate-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="af-card p-8">
          <h2 className="text-2xl font-bold tracking-tight">Enter workspace</h2>
          <p className="mt-2 text-sm text-slate-400">Synthetic demo mode. No live PHI.</p>
          <form className="mt-8 space-y-5">
            <label className="block text-sm">
              <span className="text-slate-300">Email</span>
              <input className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-teal-300/70" defaultValue="demo@appealforge.local" />
            </label>
            <label className="block text-sm">
              <span className="text-slate-300">Password</span>
              <input type="password" className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-teal-300/70" defaultValue="synthetic" />
            </label>
            <button className="w-full rounded-full bg-gradient-to-r from-[#00A88E] to-[#067865] px-5 py-3 font-bold shadow-2xl shadow-teal-900/30">
              Enter demo workspace
            </button>
          </form>
          <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm text-amber-100">
            Do not upload live PHI unless production onboarding and BAAs are complete.
          </div>
        </div>
      </section>
    </main>
  );
}
