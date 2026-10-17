"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  lines: React.ReactNode[];
  as?: "h1" | "h2" | "h3";
  className?: string;
  id?: string;
};

/** Oversized heading whose lines rise from a mask as it scrolls into view. */
export default function SplitHeading({ lines, as: Tag = "h2", className = "", id }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(ref.current!.querySelectorAll("[data-line]"), {
          yPercent: 108,
          duration: 1.15,
          ease: "power4.out",
          stagger: 0.09,
          scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <span data-line className="block">
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
