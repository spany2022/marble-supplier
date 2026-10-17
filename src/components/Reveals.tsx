"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Site-wide [data-reveal] entrances. Render it LAST inside a page so it runs
 * after that page has hydrated (styles are only touched client-side).
 */
export default function Reveals() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const items = gsap.utils
        .toArray<HTMLElement>("[data-reveal]")
        .filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.9);
      gsap.set(items, { autoAlpha: 0, y: 36 });
      ScrollTrigger.batch(items, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.08, overwrite: true }),
      });
    });
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => {
      window.clearTimeout(refresh);
      mm.revert();
    };
  }, []);

  return null;
}
