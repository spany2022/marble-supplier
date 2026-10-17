"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { media } from "@/content/media";
import Eyebrow from "@/components/ui/Eyebrow";
import SplitHeading from "@/components/ui/SplitHeading";

const values = [
  {
    title: "Premium Materials",
    text: "Marble, Italian marble, granite, Kota stone and designer tiles — surfaces chosen for character as much as performance.",
  },
  {
    title: "Quality-Focused Selection",
    text: "Colour, veining, finish and consistency are weighed with every selection, and you're welcome to see slabs in person before you decide.",
  },
  {
    title: "Timeless Design",
    text: "Materials that outlast trends — surfaces that look as considered in twenty years as they do on the day they're laid.",
  },
];

const ticker = ["Marble", "Italian Marble", "Granite", "Kota Stone", "Designer Tiles"];

/** Section 2 — brand introduction. */
export default function Intro() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-intro-mask]",
          { clipPath: "inset(18% 12% 18% 12%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: { trigger: "[data-intro-mask]", start: "top 90%", end: "top 30%", scrub: 0.6 },
          }
        );
        gsap.fromTo(
          "[data-intro-img]",
          { scale: 1.3, yPercent: -6 },
          { scale: 1.05, yPercent: 6, ease: "none", scrollTrigger: { trigger: "[data-intro-mask]", start: "top bottom", end: "bottom top", scrub: true } }
        );
        gsap.fromTo(
          "[data-intro-inset]",
          { yPercent: 30 },
          { yPercent: -20, ease: "none", scrollTrigger: { trigger: "[data-intro-mask]", start: "top bottom", end: "bottom top", scrub: true } }
        );
        gsap.fromTo(
          "[data-ticker]",
          { xPercent: 0 },
          { xPercent: -30, ease: "none", scrollTrigger: { trigger: "[data-ticker]", start: "top bottom", end: "bottom top", scrub: true } }
        );
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="about" aria-labelledby="intro-title" className="relative overflow-hidden bg-ivory">
      <div className="site-x section-pad mx-auto grid max-w-site gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-6">
          <div data-intro-mask className="relative aspect-[4/5] overflow-hidden bg-travertine">
            <div data-intro-img className="absolute inset-0">
              <Image src={media.quarryFace.src} alt={media.quarryFace.alt} fill sizes="(min-width:1024px) 46vw, 100vw" className="object-cover" />
            </div>
          </div>
          <div
            data-intro-inset
            className="absolute -bottom-10 right-4 w-[42%] border-[10px] border-ivory shadow-[0_30px_60px_-30px_rgb(0_0_0/0.5)] sm:right-[-6%] lg:-bottom-16"
          >
            <div className="relative aspect-square">
              <Image src={media.whitePearl.src} alt={media.whitePearl.alt} fill sizes="20vw" className="object-cover" />
            </div>
          </div>
          <p className="eyebrow mt-6 max-w-[52%] leading-relaxed text-slate-ink">Carrara marble quarry, Italy — reference image</p>
        </div>

        <div className="flex flex-col justify-center lg:col-span-5 lg:col-start-8">
          <Eyebrow>The Stone Gallery</Eyebrow>
          <SplitHeading
            id="intro-title"
            className="display-lg mt-6"
            lines={[
              "Every",
              "surface.",
              <>
                A <span className="serif-accent text-brass-deep">statement</span>
              </>,
              "of style.",
            ]}
          />
          <p data-reveal className="lede mt-8 max-w-xl text-slate-ink">
            From the natural elegance of marble to the strength of granite and the versatility of designer tiles, discover materials
            that bring architectural visions to life.
          </p>

          <ol className="mt-12 border-t-2 border-charcoal">
            {values.map((v, i) => (
              <li key={v.title} data-reveal className="grid grid-cols-[3.5rem_1fr] gap-4 border-b border-line py-7">
                <span className="font-display text-2xl font-extrabold text-brass-deep">0{i + 1}</span>
                <div>
                  <h3 className="display-sm">{v.title}</h3>
                  <p className="mt-3 text-[1rem] leading-relaxed text-slate-ink">{v.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div aria-hidden className="overflow-hidden border-y-2 border-charcoal py-6 md:py-8">
        <div data-ticker className="flex w-max gap-10 whitespace-nowrap">
          {[...ticker, ...ticker, ...ticker].map((t, i) => (
            <span key={i} className="flex items-center gap-10 font-display text-[clamp(2.5rem,7vw,6.5rem)] font-extrabold uppercase leading-none tracking-[-0.04em]">
              <span className={i % 2 ? "num-outline text-charcoal" : "text-charcoal"}>{t}</span>
              <span className="size-3 rotate-45 bg-brass md:size-4" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
