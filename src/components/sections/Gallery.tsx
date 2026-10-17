"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Expand, Loader2, X } from "lucide-react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { gallery } from "@/content/gallery";
import { media } from "@/content/media";
import { getLenis } from "@/lib/scroll";
import Eyebrow from "@/components/ui/Eyebrow";
import SplitHeading from "@/components/ui/SplitHeading";

const aspect = { tall: "aspect-[3/4]", wide: "aspect-[4/3]", square: "aspect-square" } as const;
const ratio = { tall: 4 / 3, wide: 3 / 4, square: 1 } as const;

/** Greedy masonry: each image goes to the currently shortest column, keeping columns balanced. */
function balance(n: number) {
  const cols: number[][] = Array.from({ length: n }, () => []);
  const heights = new Array(n).fill(0);
  gallery.forEach((g, i) => {
    const c = heights.indexOf(Math.min(...heights));
    cols[c].push(i);
    heights[c] += ratio[g.shape] + 0.06;
  });
  return cols;
}
const columns3 = balance(3);
const columns2 = balance(2);

/** Section 7 — architectural inspiration gallery with lightbox. */
export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const [index, setIndex] = useState<number | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>("[data-gal-item]").forEach((item) => {
          gsap.fromTo(item, { clipPath: "inset(14% 0% 0% 0%)", y: 60, opacity: 0.2 }, {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 92%", once: true },
          });
          const img = item.querySelector("[data-gal-img]");
          gsap.fromTo(img, { yPercent: -6 }, {
            yPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: true },
          });
        });
      });
    },
    { scope: ref }
  );

  const open = (i: number, el: HTMLButtonElement) => {
    openerRef.current = el;
    setIndex(i);
    dialogRef.current?.showModal();
    getLenis()?.stop();
  };

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const step = useCallback((d: number) => {
    setIndex((i) => (i === null ? i : (i + d + gallery.length) % gallery.length));
  }, []);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onClose = () => {
      setIndex(null);
      getLenis()?.start();
      openerRef.current?.focus();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    dlg.addEventListener("close", onClose);
    dlg.addEventListener("keydown", onKey);
    return () => {
      dlg.removeEventListener("close", onClose);
      dlg.removeEventListener("keydown", onKey);
    };
  }, [step]);

  const renderItem = (i: number) => {
    const g = gallery[i];
    const img = media[g.image];
    return (
      <li key={g.image} data-gal-item>
        <button
          type="button"
          onClick={(e) => open(i, e.currentTarget)}
          aria-label={`Open image: ${g.space}${g.material ? `, ${g.material}` : ""}`}
          className="group relative block w-full overflow-hidden text-left"
        >
          <div className={`relative ${aspect[g.shape]} overflow-hidden bg-stone`}>
            <div data-gal-img className="absolute inset-[-7%]">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105"
              />
            </div>
          </div>
          <span
            className={`absolute left-3 top-3 px-2.5 py-1.5 text-[0.6rem] font-extrabold uppercase tracking-[0.18em] ${
              g.kind === "project" ? "bg-brass text-charcoal" : "bg-ivory/90 text-charcoal"
            }`}
          >
            {g.kind === "project" ? "Our project" : "Inspiration"}
          </span>
          <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent p-5 opacity-100 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
            <span className="flex items-end justify-between gap-4">
              <span>
                <span className="block font-display text-xl font-extrabold uppercase leading-tight">{g.space}</span>
                {g.material && <span className="mt-1 block text-xs font-bold uppercase tracking-[0.16em] text-brass">{g.material}</span>}
              </span>
              <Expand aria-hidden className="size-5 shrink-0" />
            </span>
          </span>
        </button>
      </li>
    );
  };

  const current = index !== null ? gallery[index] : null;
  const currentImg = current ? media[current.image] : null;

  return (
    <section ref={ref} id="inspiration" aria-labelledby="gallery-title" className="grain relative isolate bg-charcoal text-ivory">
      <div className="site-x section-pad mx-auto max-w-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow tone="light">Architectural Inspiration</Eyebrow>
            <SplitHeading
              id="gallery-title"
              className="display-lg mt-6"
              lines={[
                "Designed to make",
                <>
                  an <span className="serif-accent text-brass">impression.</span>
                </>,
              ]}
            />
          </div>
          <p data-reveal className="text-[1rem] leading-relaxed text-ivory/70 lg:col-span-4 lg:pb-3">
            Ideas for kitchens, bathrooms, floors and feature walls. Images marked{" "}
            <strong className="font-extrabold text-ivory">Inspiration</strong> are reference photography — not projects completed
            by us. Our own installations will be labelled <strong className="font-extrabold text-brass">Our project</strong>.
          </p>
        </div>

        <div className="mt-16 hidden gap-5 lg:flex">
          {columns3.map((col, c) => (
            <ul key={c} className="flex flex-1 flex-col gap-5">
              {col.map(renderItem)}
            </ul>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-5 sm:flex-row lg:hidden">
          {columns2.map((col, c) => (
            <ul key={c} className="flex flex-1 flex-col gap-5">
              {col.map(renderItem)}
            </ul>
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Image viewer"
        className="lightbox m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 text-ivory"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        {current && currentImg && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-ivory/70" aria-live="polite">
                {String((index ?? 0) + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
              </p>
              <button type="button" onClick={close} aria-label="Close image viewer" className="grid size-12 place-items-center border-2 border-ivory/30 hover:border-ivory">
                <X className="size-5" strokeWidth={2.5} />
              </button>
            </div>
            <div className="relative flex-1" onClick={(e) => e.target === e.currentTarget && close()}>
              <Loader2 aria-hidden className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 animate-spin text-ivory/40" />
              <Image key={currentImg.src} src={currentImg.src} alt={currentImg.alt} fill sizes="100vw" className="object-contain px-4 md:px-24" />
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center bg-charcoal/70 hover:bg-brass hover:text-charcoal md:left-6 md:size-14"
              >
                <ArrowLeft className="size-5" strokeWidth={2.5} />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next image"
                className="absolute right-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center bg-charcoal/70 hover:bg-brass hover:text-charcoal md:right-6 md:size-14"
              >
                <ArrowRight className="size-5" strokeWidth={2.5} />
              </button>
            </div>
            <div className="px-4 py-5 md:px-8">
              <p className="font-display text-2xl font-extrabold uppercase">{current.space}</p>
              <p className="mt-1 text-sm font-semibold text-ivory/70">
                {current.material && <span className="text-brass">{current.material} · </span>}
                {current.kind === "project" ? "Our project" : "Inspiration — reference image, not our project"}
              </p>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
