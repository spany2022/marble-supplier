"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useMagnetic } from "@/lib/hooks";

type Variant = "dark" | "light" | "brass" | "outline-light" | "outline-dark";

const styles: Record<Variant, string> = {
  dark: "bg-charcoal text-ivory hover:bg-brass-deep",
  light: "bg-ivory text-charcoal hover:bg-brass hover:text-charcoal",
  brass: "bg-brass text-charcoal hover:bg-ivory",
  "outline-light": "border-2 border-ivory/40 text-ivory hover:border-ivory hover:bg-ivory hover:text-charcoal",
  "outline-dark": "border-2 border-charcoal/25 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-ivory",
};

type Common = {
  children: React.ReactNode;
  variant?: Variant;
  magnetic?: boolean;
  icon?: boolean;
  className?: string;
};

type AsLink = Common & { href: string; onClick?: () => void; type?: never; external?: boolean };
type AsButton = Common & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export default function Button(props: AsLink | AsButton) {
  const { children, variant = "dark", magnetic = false, icon = true, className = "" } = props;
  const ref = useMagnetic<HTMLSpanElement>(magnetic ? 0.25 : 0);
  const cls = `group relative inline-flex min-h-[3.4rem] items-center justify-center gap-3 px-7 py-4 text-[0.78rem] font-extrabold uppercase tracking-[0.16em] transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {icon && (
        <ArrowUpRight
          aria-hidden
          className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2.5}
        />
      )}
    </>
  );

  const content =
    "href" in props && props.href !== undefined ? (
      props.external ? (
        <a href={props.href} target="_blank" rel="noopener noreferrer" className={cls} onClick={props.onClick}>
          {inner}
        </a>
      ) : (
        <Link href={props.href} className={cls} onClick={props.onClick}>
          {inner}
        </Link>
      )
    ) : (
      <button
        type={(props as AsButton).type ?? "button"}
        onClick={(props as AsButton).onClick}
        disabled={(props as AsButton).disabled}
        className={cls}
      >
        {inner}
      </button>
    );

  return magnetic ? (
    <span ref={ref} className="inline-flex">
      {content}
    </span>
  ) : (
    content
  );
}
