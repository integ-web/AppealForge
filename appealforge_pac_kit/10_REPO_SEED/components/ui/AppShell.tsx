import { Logo } from "../brand/Logo";

const nav = ["Appeal Queue", "Evidence Maps", "Packet Builder", "Outcomes", "Audit Trail", "Settings"];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen p-6 text-white">
      <div className="mx-auto flex max-w-[1440px] gap-6">
        <aside className="af-card hidden w-72 shrink-0 p-5 lg:block">
          <div className="mb-8 flex items-center gap-3">
            <Logo />
            <div>
              <div className="font-bold tracking-tight">AppealForge PAC</div>
              <div className="text-xs text-slate-400">Synthetic demo</div>
            </div>
          </div>
          <nav className="space-y-1">
            {nav.map((item, index) => (
              <div
                key={item}
                className={`rounded-2xl px-4 py-3 text-sm ${index === 0 ? "border border-teal-300/10 bg-teal-400/10 text-white" : "text-slate-300 hover:bg-white/5"}`}
              >
                {item}
              </div>
            ))}
          </nav>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
