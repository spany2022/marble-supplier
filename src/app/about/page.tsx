import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import QuoteButton from "@/components/QuoteButton";
import Button from "@/components/ui/Button";
import Reveals from "@/components/Reveals";
import { business } from "@/content/business";
import { collections } from "@/content/collections";
import { media } from "@/content/media";

export const metadata: Metadata = {
  title: "About",
  description: `${business.name} is a gallery for marble, Italian marble, granite, Kota stone and designer tiles.`,
  alternates: { canonical: "/about" },
};

/**
 * About copy is deliberately free of history, years in business, project counts or
 * certifications. Add the owner's real story and verified facts here.
 */
export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the Gallery"
        crumbs={[{ href: "/about", label: "About" }]}
        image={media.quarryInterior}
        lines={[
          "A gallery",
          <>
            for <span className="serif-accent text-brass">stone.</span>
          </>,
        ]}
        intro={`${business.name} brings marble, Italian marble, granite, Kota stone and designer tiles together in one place — so choosing a surface feels less like shopping for building material and more like choosing a piece of architecture.`}
      />

      <section aria-labelledby="approach-title" className="bg-ivory">
        <div className="site-x section-pad mx-auto grid max-w-site gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-travertine">
              <Image src={media.creamVeined.src} alt={media.creamVeined.alt} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 id="approach-title" className="display-lg">
              Our <span className="serif-accent text-brass-deep">approach.</span>
            </h2>
            <div className="mt-10 space-y-10">
              {[
                [
                  "See it, don't guess it",
                  "Stone is natural and every slab is different. We encourage every customer to view materials in person and compare finishes side by side.",
                ],
                [
                  "Material first, then the space",
                  "We start with where the surface is going — kitchen, bathroom, floor, façade — and narrow the choice to materials that suit it.",
                ],
                [
                  "Clear quotations",
                  "Pricing depends on material, format, finish and quantity, so every quotation is prepared for your project rather than taken from a list.",
                ],
              ].map(([t, d], i) => (
                <div key={t} data-reveal className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-line pt-8">
                  <span className="font-display text-2xl font-extrabold text-brass-deep">0{i + 1}</span>
                  <div>
                    <h3 className="display-sm">{t}</h3>
                    <p className="mt-3 text-[1.02rem] leading-relaxed text-slate-ink">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="range-title" className="grain relative isolate bg-charcoal text-ivory">
        <div className="site-x section-pad mx-auto max-w-site">
          <h2 id="range-title" className="display-lg">
            The <span className="serif-accent text-brass">range.</span>
          </h2>
          <ul className="mt-12 grid gap-px bg-line-light sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((c) => (
              <li key={c.slug} className="bg-charcoal p-7 md:p-9">
                <span className="text-sm font-extrabold text-brass">{c.number}</span>
                <h3 className="display-sm mt-3">{c.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ivory/65">{c.blurb}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap gap-3">
            <Button href="/collections" variant="light" magnetic>
              Explore Collections
            </Button>
            <QuoteButton variant="outline-light" />
          </div>
        </div>
      </section>
      <Reveals />
    </>
  );
}
