import { AppShell } from "@/components/ui/AppShell";

const cases = [
  {
    title: "SNF admission · does not meet skilled level",
    plan: "Harbor MA Complete",
    facility: "Lakeside Skilled Nursing",
    deadline: "41h",
    status: "Needs clinical review"
  },
  {
    title: "Continued stay · custodial care",
    plan: "Northstar MA",
    facility: "Ridgeview Transitional Care",
    deadline: "6d",
    status: "Packet drafted"
  },
  {
    title: "IRF admission · lower level appropriate",
    plan: "Cascade MA Choice",
    facility: "Lakeside Skilled Nursing",
    deadline: "12d",
    status: "Evidence mapping"
  }
];

export default function CasesPage() {
  return (
    <AppShell>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-sm text-teal-200">Appeal queue</p>
          <h1 className="text-4xl font-black tracking-[-0.04em]">Today’s denial recovery work</h1>
        </div>
        <button className="rounded-full bg-[#00A88E] px-5 py-3 font-bold">New case</button>
      </div>
      <section className="grid gap-4 md:grid-cols-4">
        {[
          ["18", "Open denials"],
          ["3", "Due within 72h"],
          ["5", "Packets drafted"],
          ["82%", "Historical win rate"]
        ].map(([value, label]) => (
          <div key={label} className="af-card p-5">
            <div className="text-3xl font-black">{value}</div>
            <div className="text-sm text-slate-400">{label}</div>
          </div>
        ))}
      </section>
      <section className="mt-6 af-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Urgent cases</h2>
          <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs text-amber-100">Deadline-driven</span>
        </div>
        <div className="space-y-3">
          {cases.map((item) => (
            <article key={item.title} className="grid gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 md:grid-cols-[1.4fr_.7fr_.8fr_.8fr]">
              <div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.plan} · {item.facility}</p>
              </div>
              <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-2 text-center text-sm text-amber-100">Due {item.deadline}</span>
              <span className="rounded-full border border-teal-300/20 bg-teal-300/10 px-3 py-2 text-center text-sm text-teal-100">{item.status}</span>
              <button className="rounded-full border border-white/10 px-3 py-2 text-sm">Open</button>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
