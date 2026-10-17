"use client";

import type Lenis from "lenis";

let lenis: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};

export const getLenis = () => lenis;

const HEADER_OFFSET = -72;

/** Scroll to a section by id, using Lenis when active, and optionally focus an element after arriving. */
export function scrollToId(id: string, focusSelector?: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const focus = () => {
    if (!focusSelector) return;
    const target = el.querySelector<HTMLElement>(focusSelector);
    target?.focus({ preventScroll: true });
  };
  if (lenis) {
    lenis.scrollTo(el, { offset: HEADER_OFFSET, duration: 1.4, onComplete: focus });
  } else {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    window.setTimeout(focus, reduce ? 0 : 700);
  }
  history.replaceState(null, "", `#${id}`);
}
