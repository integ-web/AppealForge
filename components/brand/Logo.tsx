import { Shield } from "lucide-react";
import { clsx } from "clsx";

export function Logo({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "grid h-10 w-10 place-items-center rounded-2xl border border-teal-300/25 bg-teal-300/10 shadow-teal",
        className
      )}
      aria-label="AppealForge PAC"
    >
      <Shield className="h-5 w-5 text-teal-300" />
    </div>
  );
}
