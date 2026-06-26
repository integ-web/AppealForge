import {
  Activity,
  ClipboardCheck,
  FileStack,
  Gauge,
  Home,
  PlusCircle,
  Settings,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import type React from "react";
import { Logo } from "@/components/brand/Logo";
import { demoStore } from "@/lib/demo-data";

const nav = [
  { label: "Command Center", href: "/cases", icon: Home },
  { label: "New Case", href: "/cases/new", icon: PlusCircle },
  { label: "Evidence Maps", href: `/cases/${demoStore.cases[0].id}/evidence`, icon: ClipboardCheck },
  { label: "Packet Builder", href: `/cases/${demoStore.cases[0].id}/packet`, icon: FileStack },
  { label: "Outcomes", href: `/cases/${demoStore.cases[1].id}/outcome`, icon: Gauge },
  { label: "Audit Trail", href: "/audit", icon: Activity },
  { label: "Admin Settings", href: "/admin", icon: Settings }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen p-4 text-white sm:p-6">
      <div className="mx-auto flex max-w-[1480px] gap-6">
        <aside className="af-card sticky top-6 hidden h-[calc(100vh-48px)] w-72 shrink-0 flex-col p-5 lg:flex">
          <Link href="/cases" className="mb-8 flex items-center gap-3 af-focus rounded-xl">
            <Logo className="h-11 w-11" />
            <div>
              <div className="font-bold tracking-tight">AppealForge PAC</div>
              <div className="text-xs text-slate-400">Synthetic command center</div>
            </div>
          </Link>

          <nav className="space-y-1">
            {nav.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition af-focus ${
                    index === 0
                      ? "border border-teal-300/20 bg-teal-300/10 text-white shadow-teal"
                      : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-xs leading-5 text-amber-50">
            <div className="mb-2 flex items-center gap-2 font-semibold text-amber-100">
              <ShieldCheck className="h-4 w-4" />
              Demo safety mode
            </div>
            Synthetic data only. No external AI calls. No PHI is written to logs.
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <Topbar />
          {children}
        </main>
      </div>
    </div>
  );
}

function Topbar() {
  return (
    <header className="mb-5 flex flex-col gap-3 rounded-2xl border border-white/10 bg-ink-950/45 px-4 py-3 backdrop-blur md:flex-row md:items-center md:justify-between">
      <div>
        <div className="text-xs uppercase tracking-[0.22em] text-teal-300">Harbor Post-Acute Group</div>
        <div className="text-sm text-slate-300">Lakeside + Ridgeview facilities | demo reviewer: Maya Patel</div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200">
          Search cases, plans, deadlines
        </div>
        <Link href="/cases/new" className="rounded-full bg-teal-500 px-4 py-2 text-sm font-bold text-ink-950 shadow-teal af-focus">
          New case
        </Link>
      </div>
    </header>
  );
}
