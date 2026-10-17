import type { Metadata } from "next";
import Image from "next/image";
import { Clock, MapPin, Navigation } from "lucide-react";
import PageHero from "@/components/PageHero";
import Enquiry from "@/components/sections/Enquiry";
import Missing from "@/components/ui/Missing";
import Reveals from "@/components/Reveals";
import { business, formatAddress, mapsDirectionsHref } from "@/content/business";
import { getProduct } from "@/content/catalogue";
import { media } from "@/content/media";

export const metadata: Metadata = {
  title: "Contact & Showroom",
  description: `Request a quotation or plan a showroom visit to see marble, granite, Kota stone and tiles in person at ${business.name}.`,
  alternates: { canonical: "/contact" },
};

const tips = [
  ["Bring measurements", "Room sizes or drawings help us talk about quantities and formats."],
  ["Bring a sample", "A cabinet door, fabric or paint chip shows how the stone sits with your palette."],
  ["Think about use", "Kitchen, bathroom, outdoor or high-traffic? Use guides which materials and finishes suit."],
];

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const sp = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const material = one(sp.material);
  const productParam = one(sp.product);
  // Only accept product names that exist in the catalogue.
  const product = productParam && (getProduct(productParam)?.name ?? (productParam.length <= 120 ? productParam : undefined));

  return (
    <>
      <PageHero
        eyebrow="Contact & Showroom"
        crumbs={[{ href: "/contact", label: "Contact" }]}
        image={media.blackGalaxy}
        lines={[
          "Visit. Talk.",
          <span key="c" className="serif-accent text-brass">
            Choose.
          </span>,
        ]}
        intro="Send an enquiry for a quotation, or plan a visit to see slabs and tiles under real light before you decide."
      />

      <Enquiry initial={{ material, product }} />

      <section id="showroom" aria-labelledby="showroom-title" className="border-t border-line bg-marble">
        <div className="site-x mx-auto grid max-w-site gap-12 py-16 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="showroom-title" className="display-md">
              Visit the <span className="serif-accent text-brass-deep">showroom.</span>
            </h2>
            <p className="lede mt-6 text-slate-ink">
              Photographs can only suggest a stone. In person you see the true colour, the depth of the polish and how the veining
              moves across a full slab.
            </p>

            <dl className="mt-10 space-y-6 border-t-2 border-charcoal pt-8">
              <div className="flex gap-4">
                <dt>
                  <MapPin aria-label="Address" className="size-5 text-brass-deep" />
                </dt>
                <dd className="font-semibold">
                  {business.address ? (
                    <>
                      <span className="block">{formatAddress(business.address)}</span>
                      <a
                        href={mapsDirectionsHref(business.address)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-brass-deep hover:text-charcoal"
                      >
                        <Navigation aria-hidden className="size-3.5" /> Get directions
                      </a>
                    </>
                  ) : (
                    <Missing>Showroom address to be supplied</Missing>
                  )}
                </dd>
              </div>
              <div className="flex gap-4">
                <dt>
                  <Clock aria-label="Opening hours" className="size-5 text-brass-deep" />
                </dt>
                <dd className="flex-1 font-semibold">
                  {business.hours ? (
                    <ul className="space-y-1">
                      {business.hours.map((h) => (
                        <li key={h.label} className="flex justify-between gap-6">
                          <span>{h.label}</span>
                          <span>{h.opens && h.closes ? `${h.opens} – ${h.closes}` : "Closed"}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Missing>Business hours to be supplied</Missing>
                  )}
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="relative aspect-[16/11] overflow-hidden bg-travertine">
              <Image src={media.kotaSemiPolished.src} alt={media.kotaSemiPolished.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <h3 className="eyebrow mt-10 text-brass-deep">Before you visit</h3>
            <ol className="mt-5 grid gap-6 sm:grid-cols-3">
              {tips.map(([t, d], i) => (
                <li key={t} data-reveal>
                  <span className="font-display text-3xl font-extrabold text-charcoal/25">0{i + 1}</span>
                  <p className="mt-2 font-display text-lg font-extrabold uppercase leading-tight">{t}</p>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-slate-ink">{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <Reveals />
    </>
  );
}
