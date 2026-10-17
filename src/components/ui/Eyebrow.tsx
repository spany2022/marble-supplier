type Props = { children: React.ReactNode; className?: string; tone?: "dark" | "light" };

/** Uppercase eyebrow label with a short brass rule. */
export default function Eyebrow({ children, className = "", tone = "dark" }: Props) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${tone === "light" ? "text-travertine" : "text-brass-deep"} ${className}`}>
      <span aria-hidden className={`h-0.5 w-8 ${tone === "light" ? "bg-brass" : "bg-brass-deep"}`} />
      {children}
    </p>
  );
}
