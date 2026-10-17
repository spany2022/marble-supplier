"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK, DESKTOP_MOTION } from "@/lib/gsap";
import { media, type MediaKey } from "@/content/media";
import Eyebrow from "@/components/ui/Eyebrow";
import SplitHeading from "@/components/ui/SplitHeading";

const plates: { image: MediaKey; label: string; note: string; cls: string; aspect: string }[] = [
  { image: "statuarietto2", label: "Marble veining", note: "No two veins ever repeat.", cls: "lg:col-span-7", aspect: "aspect-[4/3]" },
  { image: "whiteMarbleTiles", label: "Italian marble patterns", note: "Bright grounds, fine grey movement.", cls: "lg:col-span-4 lg:col-start-9 lg:mt-48", aspect: "aspect-[4/5]" },
  { image: "granitePolished", label: "Granite grains", note: "Crystal by crystal, polished to depth.", cls: "lg:col-span-4 lg:col-start-2 lg:-mt-24", aspect: "aspect-square" },
  { image: "porcelainFloor", label: "Matte & polished finishes", note: "Finish changes how light lands.", cls: "lg:col-span-6 lg:col-start-7 lg:mt-10", aspect: "aspect-[16/10]" },
  { image: "bandedStone", label: "Natural stone colours", note: "Bands of colour laid down over ages.", cls: "lg:col-span-6 lg:mt-6", aspect: "aspect-[16/10]" },
  { image: "travertineWall", label: "Stone in architecture", note: "Surfaces that shape whole streets.", cls: "lg:col-span-4 lg:col-start-8 lg:mt-28", aspect: "aspect-[4/5]" },
];

const wipes: { image: MediaKey; word: string; caption: string }[] = [
  { image: "blackRipple", word: "Vein", caption: "Black marble, white veins" },
  { image: "statuarietto", word: "Light", caption: "Italian white marble" },
  { image: "graniteGold", word: "Grain", caption: "Polished granite" },
  { image: "kotaSemiPolished", word: "Tone", caption: "Semi-polished Kota stone" },
];

/** Section 4 — immersive visual storytelling on charcoal. */
export default function ArtOfStone() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>("[data-plate]").forEach((plate, i) => {
          const frame = plate.querySelector("[data-plate-frame]");
          const img = plate.querySelector("[data-plate-img]");
          const from = ["inset(0% 0% 100% 0%)", "inset(0% 100% 0% 0%)", "inset(100% 0% 0% 0%)", "inset(0% 0% 0% 100%)"][i % 4];
          gsap.fromTo(frame, { clipPath: from }, {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power2.out",
            scrollTrigger: { trigger: plate, start: "top 92%", end: "top 45%", scrub: 0.7 },
          });
          gsap.fromTo(img, { yPercent: -10, scale: 1.25 }, {
            yPercent: 10,
            scale: 1.1,
            ease: "none",
            scrollTrigger: { trigger: plate, start: "top bottom", end: "bottom top", scrub: true },
          });
        });
      });

      // Pinned texture theatre: each stone wipes over the last.
      mm.add(DESKTOP_MOTION, () => {
        const layers = gsap.utils.toArray<HTMLElement>("[data-wipe]");
        const words = gsap.utils.toArray<HTMLElement>("[data-wipe-word]");
        gsap.set(layers.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(words.slice(1), { yPercent: 110 });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: "[data-wipe-stage]", start: "top top", end: `+=${layers.length * 90}%`, pin: true, scrub: 0.8, anticipatePin: 1 },
        });
        layers.slice(1).forEach((layer, i) => {
          tl.to(layer, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power2.inOut" }, i * 1.2)
            .fromTo(layer.querySelector("img"), { scale: 1.25 }, { scale: 1, duration: 1.2, ease: "power2.out" }, i * 1.2)
            .to(words[i], { yPercent: -110, duration: 0.6, ease: "power3.in" }, i * 1.2)
            .to(words[i + 1], { yPercent: 0, duration: 0.6, ease: "power3.out" }, i * 1.2 + 0.45);
        });
        tl.to({}, { duration: 0.4 });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} aria-labelledby="art-title" className="grain relative isolate bg-charcoal text-ivory">
      <div className="site-x section-pad mx-auto max-w-site">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-12">
            <Eyebrow tone="light">The Art of Natural Stone</Eyebrow>
            <SplitHeading
              id="art-title"
              className="display-lg mt-6"
              lines={[
                "Nature creates it.",
                "Design makes it",
                <span key="t" className="serif-accent text-brass">
                  timeless.
                </span>,
              ]}
            />
          </div>
          <p data-reveal className="lede text-ivory/70 lg:col-span-5 lg:col-start-8">
            Veins drawn by heat and pressure, grains grown crystal by crystal, colours laid down over millennia. Our role is to help you
            see them clearly — and choose well.
          </p>
        </div>

        <ul className="mt-20 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-28 lg:grid-cols-12 lg:gap-y-0">
          {plates.map((p, i) => {
            const img = media[p.image];
            return (
              <li key={p.label} data-plate className={`${p.cls} ${i % 2 ? "sm:mt-16" : ""}`}>
                <figure>
                  <div data-plate-frame className={`relative overflow-hidden bg-stone ${p.aspect}`}>
                    <div data-plate-img className="absolute inset-0">
                      <Image src={img.src} alt={img.alt} fill sizes="(min-width:1024px) 50vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
                    </div>
                  </div>
                  <figcaption className="mt-5 flex items-baseline gap-4 border-t border-line-light pt-4">
                    <span className="text-xs font-extrabold text-brass">0{i + 1}</span>
                    <span>
                      <span className="block font-display text-lg font-extrabold uppercase tracking-[-0.01em]">{p.label}</span>
                      <span className="mt-1 block text-sm font-medium text-ivory/60">{p.note}</span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>

      <div data-wipe-stage className="relative motion-safe:lg:h-[100svh] motion-safe:lg:overflow-hidden">
        <div className="site-x grid gap-6 pb-24 sm:grid-cols-2 motion-safe:lg:contents">
          {wipes.map((w, i) => {
            const img = media[w.image];
            return (
              <figure key={w.word} data-wipe className="relative aspect-[4/3] overflow-hidden motion-safe:lg:absolute motion-safe:lg:inset-0 motion-safe:lg:aspect-auto" style={{ zIndex: i }}>
                <Image src={img.src} alt={img.alt} fill sizes="100vw" className="object-cover" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-charcoal/30" />
                <figcaption className="absolute bottom-4 left-4 text-xs font-bold uppercase tracking-[0.18em] text-ivory/85 motion-safe:lg:bottom-10 motion-safe:lg:left-auto motion-safe:lg:right-[clamp(1rem,4vw,3.5rem)]">
                  {w.caption}
                </figcaption>
                <span aria-hidden className="absolute left-4 top-4 font-display text-4xl font-extrabold uppercase text-ivory motion-safe:lg:hidden">
                  {w.word}
                </span>
              </figure>
            );
          })}
          <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden items-end motion-safe:lg:flex">
            <div className="site-x mx-auto w-full max-w-site pb-10">
              <p className="eyebrow mb-4 text-travertine">Read the stone by its</p>
              <div className="relative h-[0.86em] overflow-hidden font-display text-[clamp(5rem,17vw,17rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.05em]">
                {wipes.map((w) => (
                  <span key={w.word} data-wipe-word className="absolute left-0 top-0 block">
                    {w.word}.
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
