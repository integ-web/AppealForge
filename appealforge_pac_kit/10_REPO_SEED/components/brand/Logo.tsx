export function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <div className={`relative grid place-items-center rounded-2xl bg-[#08111F] shadow-xl ${className}`}>
      <svg viewBox="0 0 168 168" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="af-g" x1="25" y1="15" x2="145" y2="160" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5EEAD4" />
            <stop offset="0.52" stopColor="#00A88E" />
            <stop offset="1" stopColor="#F6B44B" />
          </linearGradient>
        </defs>
        <rect width="168" height="168" rx="42" fill="#08111F" />
        <path d="M84 25L130 42V80C130 111 111 137 84 148C57 137 38 111 38 80V42L84 25Z" fill="#0D1B2A" stroke="url(#af-g)" strokeWidth="5" />
        <path d="M61 80H107" stroke="#F8F5EF" strokeWidth="8" strokeLinecap="round" />
        <path d="M66 61H102" stroke="#F8F5EF" strokeWidth="8" strokeLinecap="round" opacity="0.9" />
        <path d="M70 99H98" stroke="#F8F5EF" strokeWidth="8" strokeLinecap="round" opacity="0.8" />
        <path d="M84 43L89 64L110 69L91 80L96 101L84 87L72 101L77 80L58 69L79 64L84 43Z" fill="url(#af-g)" opacity="0.95" />
      </svg>
    </div>
  );
}
