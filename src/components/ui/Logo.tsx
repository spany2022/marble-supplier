import { business } from "@/content/business";

/** Wordmark: bold brand name over a spaced tagline, with a veined-stone monogram. */
export default function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const fg = tone === "light" ? "text-ivory" : "text-charcoal";
  return (
    <span className={`flex items-center gap-3 ${fg}`}>
      <svg aria-hidden viewBox="0 0 40 40" className="size-9 shrink-0">
        <rect x="1" y="1" width="38" height="38" fill="currentColor" />
        <path
          d="M6 31 C13 25 15 18 22 15 S32 9 35 5 M12 35 C17 30 22 29 26 24 M22 15 C24 20 29 22 34 21"
          fill="none"
          stroke="#A88A58"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.15rem] font-extrabold uppercase tracking-[0.06em]">{business.shortName}</span>
        <span className="mt-1 text-[0.58rem] font-bold uppercase tracking-[0.34em] opacity-70">Stone Gallery</span>
      </span>
    </span>
  );
}
