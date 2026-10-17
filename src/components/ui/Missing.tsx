/** Clearly-marked placeholder for business details the owner hasn't supplied yet. */
export default function Missing({ children, tone = "dark" }: { children: React.ReactNode; tone?: "dark" | "light" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 border border-dashed px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.14em] ${
        tone === "light" ? "border-ivory/30 text-ivory/60" : "border-charcoal/30 text-slate-ink"
      }`}
    >
      {children}
    </span>
  );
}
