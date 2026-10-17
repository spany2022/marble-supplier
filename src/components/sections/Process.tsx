"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger, DESKTOP_MOTION } from "@/lib/gsap";
import { media, type MediaKey } from "@/content/media";
import Eyebrow from "@/components/ui/Eyebrow";
import SplitHeading from "@/components/ui/SplitHeading";

const stages: { n: string; title: string; text: string; image: MediaKey; caption: string }[] = [
  {
    n: "01",
    title: "Natural Origins",
    text: "Marble, granite and Kota stone form over millions of years. Each deposit gives its stone a distinct colour, pattern and character — which is why no two slabs are ever identical.",
    image: "quarryMountains",
    caption: "Marble quarries in the Apuan Alps, Italy",
  },
  {
    n: "02",
    title: "Careful Selection",
    text: "The right stone depends on where it's going. A countertop, a bathroom wall and a driveway each ask different things of a material — we help you weigh appearance against hardness, porosity and upkeep.",
    image: "blackGalaxy",
    caption: "A polished granite slab ready for inspection",
  },
  {
    n: "03",
    title: "Precision & Finish",
    text: "Polished, honed, rough or diamond-cut — the finish changes how a stone looks, feels and performs underfoot. Ask which finishes and formats are available for the material you love.",
    image: "quarryBlocks",
    caption: "Marble blocks cut at a Carrara quarry",
  },
  {
    n: "04",
    title: "Designed for Your Space",
    text: "Floors, countertops, bathrooms and feature walls. Bring your plans and measurements, talk through the options, and leave with a clear quotation for your project.",
    image: "marbleKitchen",
    caption: "Veined marble waterfall island",
  },
];

/** Section 6 — four-stage story from raw stone to finished space. */
export default function Process() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        const frames = gsap.utils.toArray<HTMLElement>("[data-proc-frame]");
        const blocks = gsap.utils.toArray<HTMLElement>("[data-proc-stage]");
        gsap.set(frames.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
        blocks.forEach((block, i) => {
          ScrollTrigger.create({
            trigger: block,
            start: "top 55%",
            end: "bottom 55%",
            toggleClass: { targets: block, className: "is-active" },
          });
          if (i === 0) return;
          gsap.timeline({ scrollTrigger: { trigger: block, start: "top 85%", end: "top 35%", scrub: 0.6 } })
            .to(frames[i], { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.inOut" }, 0)
            .fromTo(frames[i].querySelector("img"), { scale: 1.3 }, { scale: 1, ease: "power2.out" }, 0);
        });
        gsap.fromTo("[data-proc-bar]", { scaleY: 0 }, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: "[data-proc-list]", start: "top 55%", end: "bottom 55%", scrub: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} aria-labelledby="process-title" className="relative bg-marble">
      <div className="site-x mx-auto max-w-site pt-24 md:pt-36">
        <Eyebrow>From Natural Stone to Extraordinary Spaces</Eyebrow>
        <SplitHeading
          id="process-title"
          className="display-lg mt-6 max-w-5xl"
          lines={[
            "From raw beauty",
            <>
              to refined <span className="serif-accent text-brass-deep">architecture.</span>
            </>,
          ]}
        />
      </div>

      <div className="site-x mx-auto grid max-w-site gap-12 pb-24 pt-16 md:pb-36 motion-safe:lg:grid-cols-2 motion-safe:lg:gap-20">
        {/* Sticky stacked frames — desktop */}
        <div className="hidden motion-safe:lg:block">
          <div className="sticky top-0 flex h-[100svh] items-center">
            <div className="relative aspect-[4/5] max-h-[80svh] w-full overflow-hidden bg-travertine">
              {stages.map((s, i) => {
                const img = media[s.image];
                return (
                  <figure key={s.n} data-proc-frame className="absolute inset-0" style={{ zIndex: i }}>
                    <Image src={img.src} alt={img.alt} fill sizes="45vw" className="object-cover" />
                    <figcaption className="absolute bottom-0 left-0 bg-charcoal/80 px-4 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-ivory backdrop-blur-sm">
                      {s.caption}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        </div>

        <ol data-proc-list className="relative motion-safe:lg:py-[20svh] motion-reduce:lg:grid motion-reduce:lg:grid-cols-2 motion-reduce:lg:gap-x-12">
          <span aria-hidden className="absolute left-0 top-0 hidden h-full w-0.5 bg-line motion-safe:lg:block">
            <span data-proc-bar className="block h-full w-full origin-top bg-brass-deep" />
          </span>
          {stages.map((s) => {
            const img = media[s.image];
            return (
              <li
                key={s.n}
                data-proc-stage
                className="group/stage border-t-2 border-charcoal py-10 motion-safe:lg:flex motion-safe:lg:min-h-[70svh] motion-safe:lg:flex-col motion-safe:lg:justify-center motion-safe:lg:border-t-0 motion-safe:lg:py-0 motion-safe:lg:pl-14"
              >
                <span className="num-outline block font-display text-[clamp(4.5rem,9vw,8.5rem)] font-extrabold leading-none tracking-[-0.05em] text-charcoal transition-colors duration-700 motion-safe:lg:text-charcoal/40 motion-safe:lg:group-[.is-active]/stage:text-brass-deep">
                  {s.n}
                </span>
                <h3 className="display-md mt-5">{s.title}</h3>
                <p className="lede mt-5 max-w-lg text-slate-ink">{s.text}</p>
                <figure className="mt-8 motion-safe:lg:hidden">
                  <div className="relative aspect-[4/3] overflow-hidden bg-travertine">
                    <Image src={img.src} alt={img.alt} fill sizes="100vw" className="object-cover" />
                  </div>
                  <figcaption className="mt-3 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-slate-ink">{s.caption}</figcaption>
                </figure>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
