"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP, DESKTOP_MOTION } from "@/lib/gsap";
import { collections } from "@/content/collections";
import { media } from "@/content/media";
import Eyebrow from "@/components/ui/Eyebrow";
import SplitHeading from "@/components/ui/SplitHeading";

/** Section 3 — six signature collections. Pinned horizontal scroll on desktop, swipe row elsewhere. */
export default function Collections() {
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        const track = trackRef.current!;
        gsap.set(track, { overflowX: "visible" });
        const distance = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: stageRef.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        gsap.fromTo("[data-col-progress]", { scaleX: 0 }, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: stageRef.current, start: "top top", end: () => `+=${distance()}`, scrub: true, invalidateOnRefresh: true },
        });
        // Each panel's image drifts against the horizontal movement.
        gsap.utils.toArray<HTMLElement>("[data-col-img]").forEach((img) => {
          gsap.fromTo(img, { xPercent: -8 }, {
            xPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
          });
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="collections" aria-labelledby="collections-title" className="relative bg-marble">
      <div className="site-x mx-auto flex max-w-site flex-col gap-8 pt-24 md:pt-36 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Eyebrow>Signature Collections</Eyebrow>
          <SplitHeading
            id="collections-title"
            className="display-lg mt-6"
            lines={[
              "Explore materials.",
              <>
                Elevate <span className="serif-accent text-brass-deep">spaces.</span>
              </>,
            ]}
          />
        </div>
        <div className="max-w-sm lg:pb-3">
          <p data-reveal className="text-[1.05rem] leading-relaxed text-slate-ink">
            Six ways into the gallery — from veined marble and hard-wearing granite to Kota stone and a full tile showroom.
          </p>
          <Link
            href="/collections"
            className="mt-5 inline-flex items-center gap-2 border-b-2 border-charcoal pb-1 text-[0.78rem] font-extrabold uppercase tracking-[0.16em] hover:border-brass hover:text-brass-deep"
          >
            View all materials <ArrowUpRight aria-hidden className="size-4" strokeWidth={2.5} />
          </Link>
        </div>
      </div>

      <div ref={stageRef} className="relative flex flex-col justify-center overflow-hidden py-10 motion-safe:lg:h-[100svh] motion-safe:lg:py-0">
        <ul
          ref={trackRef}
          className="no-scrollbar site-x flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pt-12 will-change-transform md:gap-8 lg:gap-12 lg:pr-[10vw] lg:pt-16"
        >
          {collections.map((c, i) => {
            const img = media[c.image];
            return (
              <li
                key={c.slug}
                className={`group relative w-[82vw] shrink-0 snap-start sm:w-[56vw] md:w-[44vw] lg:w-[min(32vw,29rem)] ${i % 2 ? "lg:mt-20" : ""}`}
              >
                <Link href={`/collections/${c.slug}`} className="block">
                  <span aria-hidden className="num-outline pointer-events-none absolute -top-[0.42em] right-2 z-10 font-display text-[clamp(4.5rem,9vw,9rem)] font-extrabold leading-none text-charcoal/70 transition-colors duration-500 group-hover:text-brass">
                    {c.number}
                  </span>
                  <div className="relative aspect-[4/5] overflow-hidden bg-travertine lg:aspect-auto lg:h-[min(52svh,34rem)]">
                    <div data-col-img className="absolute inset-[-10%]">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(min-width:1024px) 32vw, (min-width:640px) 56vw, 82vw"
                        className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.07]"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                  <div className="mt-6 flex items-start justify-between gap-4">
                    <h3 className="font-display text-[clamp(1.9rem,3vw,3rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.035em]">
                      {c.lines.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </h3>
                    <span className="mt-1 grid size-12 shrink-0 place-items-center border-2 border-charcoal transition-colors duration-300 group-hover:border-brass-deep group-hover:bg-brass-deep group-hover:text-ivory">
                      <ArrowUpRight aria-hidden className="size-5" strokeWidth={2.5} />
                    </span>
                  </div>
                  <p className="mt-4 max-w-sm text-[0.98rem] leading-relaxed text-slate-ink">{c.blurb}</p>
                  <span className="mt-5 inline-block text-[0.74rem] font-extrabold uppercase tracking-[0.18em] text-brass-deep">
                    Explore Collection
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div aria-hidden className="site-x mx-auto mt-10 hidden w-full max-w-site motion-safe:lg:block">
          <div className="h-0.5 w-full bg-line">
            <div data-col-progress className="h-full origin-left scale-x-0 bg-charcoal" />
          </div>
        </div>
      </div>
    </section>
  );
}
