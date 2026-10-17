"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, DESKTOP_MOTION, MOTION_OK } from "@/lib/gsap";
import { media } from "@/content/media";
import Button from "@/components/ui/Button";

const lines: { text: React.ReactNode; key: string }[] = [
  { key: "a", text: "Built by" },
  { key: "b", text: <span className="text-brass">Nature.</span> },
  { key: "c", text: "Defined by" },
  { key: "d", text: <span className="serif-accent text-brass">Design.</span> },
];

/** Section 1 — cinematic hero. */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.fromTo("[data-hero-bg]", { scale: 1.28 }, { scale: 1.08, duration: 2.6, ease: "power2.out" }, 0)
          .to("[data-hero-line] > span", { y: 0, duration: 1.3, stagger: 0.11 }, 0.25)
          .fromTo("[data-hero-slab]", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "power3.inOut" }, 0.35)
          .fromTo("[data-hero-slab-img]", { scale: 1.35 }, { scale: 1, duration: 2, ease: "power3.out" }, 0.35)
          .to("[data-hero-fade]", { opacity: 1, duration: 1, stagger: 0.1, ease: "power2.out" }, 0.9)
          .from("[data-hero-fade]", { y: 24, duration: 1, stagger: 0.1, ease: "power3.out" }, 0.9);

        // Scroll-out: background drifts, content lifts away.
        gsap.to("[data-hero-bg-wrap]", {
          yPercent: 18,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero-content]", {
          y: -90,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });
      });

      // Layered parallax on the slab — desktop only.
      mm.add(DESKTOP_MOTION, () => {
        gsap.to("[data-hero-slab-wrap]", {
          yPercent: -22,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} aria-labelledby="hero-title" className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-charcoal text-ivory">
      <div data-hero-bg-wrap aria-hidden className="absolute inset-0 -z-10">
        <div data-hero-bg className="absolute inset-0 scale-[1.08]">
          <Image src={media.blackRipple.src} alt="" fill priority sizes="100vw" quality={80} className="object-cover saturate-[0.55]" />
        </div>
        <div className="light-sweep" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal/95 via-charcoal/70 to-charcoal/35" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />

      {/* Floating slab — a layered piece of stone over the backdrop */}
      <div data-hero-slab-wrap className="absolute right-[clamp(1rem,4vw,3.5rem)] top-[17%] hidden w-[min(25vw,25rem)] lg:block">
        <Link href="/products/statuarietto-white" className="group block" aria-label="View Statuarietto White, Italian marble">
          <div data-hero-slab className="relative aspect-[3/4.3] overflow-hidden shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)]">
            <div data-hero-slab-img className="absolute inset-0">
              <Image
                src={media.statuarietto.src}
                alt={media.statuarietto.alt}
                fill
                priority
                sizes="25vw"
                className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-105"
              />
            </div>
            <div className="light-sweep" />
          </div>
          <p data-hero-fade className="mt-4 flex items-baseline justify-between gap-4 text-xs font-bold uppercase tracking-[0.18em] text-ivory/70">
            <span>Statuarietto White</span>
            <span className="text-brass">Italian Marble →</span>
          </p>
        </Link>
      </div>

      <div data-hero-content className="site-x relative mx-auto flex w-full max-w-site flex-1 flex-col justify-end pb-14 pt-32 md:pb-20">
        <p data-hero-fade className="eyebrow mb-7 flex items-center gap-3 text-travertine">
          <span aria-hidden className="h-0.5 w-10 bg-brass" />
          Premium Natural Stone Collections
        </p>
        <h1
          id="hero-title"
          className="display-xl max-w-[11ch] lg:max-w-none"
          style={{ fontSize: "clamp(2.75rem, 9.3vw, 10.5rem)" }}
        >
          {lines.map((l) => (
            <span key={l.key} data-hero-line className="block overflow-hidden pb-[0.07em] -mb-[0.07em]">
              <span className="block">{l.text}</span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-8 md:mt-12 md:grid-cols-[minmax(0,30rem)_auto] md:items-end md:justify-between lg:pr-[calc(min(25vw,25rem)+2rem)]">
          <p data-hero-fade className="lede text-ivory/80">
            Discover exceptional marble, Italian marble, granite, and designer tiles selected to transform ordinary spaces into
            extraordinary architecture.
          </p>
          <div data-hero-fade className="flex flex-wrap gap-3">
            <Button href="/collections" variant="light" magnetic>
              Explore Collections
            </Button>
            <Button href="/contact#showroom" variant="outline-light" icon={false}>
              Visit Our Showroom
            </Button>
          </div>
        </div>
      </div>


      <div data-hero-fade aria-hidden className="absolute bottom-10 right-[clamp(1rem,4vw,3.5rem)] hidden flex-col items-center gap-3 lg:flex">
        <span className="text-[0.62rem] font-bold uppercase tracking-[0.3em] text-ivory/60 [writing-mode:vertical-rl]">Scroll</span>
        <span className="relative h-14 w-px bg-ivory/20">
          <span className="scroll-cue absolute inset-0 bg-brass" />
        </span>
      </div>
    </section>
  );
}
