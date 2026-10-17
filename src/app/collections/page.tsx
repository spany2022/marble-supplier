import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ProductBrowser, { ProductBrowserFallback } from "@/components/ProductBrowser";
import Reveals from "@/components/Reveals";
import { collections } from "@/content/collections";
import { media } from "@/content/media";
import { CATALOGUE_IS_SAMPLE } from "@/content/catalogue";

export const metadata: Metadata = {
  title: "All Materials — Marble, Granite, Kota Stone & Tiles",
  description:
    "Browse marble, Italian marble, granite, Kota stone and designer tiles. Filter by colour, finish and application, then request a quotation.",
  alternates: { canonical: "/collections" },
};

export default function CollectionsPage() {
  return (
    <>
      <PageHero
        eyebrow="The Collections"
        crumbs={[{ href: "/collections", label: "Collections" }]}
        image={media.statuarietto2}
        lines={[
          "All",
          <span key="m" className="serif-accent text-brass">
            materials.
          </span>,
        ]}
        intro="Search and filter every material in the gallery. When something catches your eye, request a price — every quotation is tailored to your project."
      />

      <section aria-label="Collections" className="border-b border-line bg-marble">
        <ul className="no-scrollbar site-x mx-auto flex max-w-site gap-4 overflow-x-auto py-8">
          {collections.map((c) => (
            <li key={c.slug} className="shrink-0">
              <Link
                href={`/collections/${c.slug}`}
                className="group flex items-center gap-4 border-2 border-line bg-ivory p-2 pr-6 transition-colors hover:border-charcoal"
              >
                <span className="relative size-16 overflow-hidden">
                  <Image src={media[c.image].src} alt="" fill sizes="64px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                </span>
                <span>
                  <span className="block text-[0.66rem] font-extrabold text-brass-deep">{c.number}</span>
                  <span className="block font-display text-base font-extrabold uppercase">{c.title}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Product catalogue" className="bg-ivory">
        <div className="site-x mx-auto max-w-site py-16 md:py-24">
          {CATALOGUE_IS_SAMPLE && (
            <p className="mb-8 border-l-4 border-brass-deep bg-marble px-4 py-3 text-[0.85rem] font-semibold text-slate-ink">
              Sample listings for demonstration. Finish, sizes, thickness and availability are confirmed on enquiry; prices are quoted
              per project.
            </p>
          )}
          <Suspense fallback={<ProductBrowserFallback />}>
            <ProductBrowser syncUrl pageSize={12} />
          </Suspense>
        </div>
      </section>
      <Reveals />
    </>
  );
}
