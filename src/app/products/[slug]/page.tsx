import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Info, MessageCircle } from "lucide-react";
import ProductGallery from "@/components/ProductGallery";
import ProductCard from "@/components/ProductCard";
import QuoteButton from "@/components/QuoteButton";
import Reveals from "@/components/Reveals";
import Enquiry from "@/components/sections/Enquiry";
import { CATALOGUE_IS_SAMPLE, categoryLabel, getProduct, products, relatedProducts } from "@/content/catalogue";
import { collections } from "@/content/collections";
import { media } from "@/content/media";
import { business, whatsappHref } from "@/content/business";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const img = media[p.image];
  return {
    title: `${p.name} — ${categoryLabel(p.category)}`,
    description: `${p.summary} ${p.description}`.slice(0, 300),
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: { images: [{ url: img.src, alt: img.alt }] },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const images = [p.image, ...(p.gallery ?? [])].map((k) => media[k]);
  const collection = collections.find((c) => c.category === p.category && !c.showroom)!;
  const related = relatedProducts(p, 4);

  const specs: [string, string][] = [
    ["Material", categoryLabel(p.category)],
    ["Colour", p.colour],
    ["Finish", p.finish ?? "On request"],
    ["Size / format", p.size ?? "On request"],
    ["Thickness", p.thickness ?? "On request"],
    ...(p.tileStyle ? ([["Tile style", p.tileStyle]] as [string, string][]) : []),
    ["Price", "Quoted per project"],
  ];

  return (
    <>
      <section className="grain relative isolate bg-charcoal pb-16 pt-28 text-ivory md:pb-24 md:pt-36">
        <div className="site-x mx-auto max-w-site">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ivory/60">
              <li>
                <Link href="/" className="hover:text-brass">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-1.5">
                <ChevronRight aria-hidden className="size-3" />
                <Link href={`/collections/${collection.slug}`} className="hover:text-brass">
                  {collection.title}
                </Link>
              </li>
              <li className="flex items-center gap-1.5">
                <ChevronRight aria-hidden className="size-3" />
                <span aria-current="page" className="text-ivory/85">
                  {p.name}
                </span>
              </li>
            </ol>
          </nav>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <ProductGallery images={images} name={p.name} />
            </div>

            <div className="lg:col-span-5">
              <p className="eyebrow flex items-center gap-3 text-travertine">
                <span aria-hidden className="h-0.5 w-10 bg-brass" />
                {categoryLabel(p.category)}
              </p>
              <h1 className="display-lg mt-5" style={{ fontSize: "clamp(2.4rem, 4.6vw, 4.5rem)" }}>{p.name}</h1>
              <p className="lede mt-6 text-ivory/80">{p.summary}</p>

              <dl className="mt-8 border-t border-line-light">
                {specs.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[9rem_1fr] gap-4 border-b border-line-light py-3.5 text-[0.92rem]">
                    <dt className="text-xs font-bold uppercase tracking-[0.14em] text-ivory/55">{k}</dt>
                    <dd className={`font-bold ${v === "On request" || k === "Price" ? "text-brass" : ""}`}>{v}</dd>
                  </div>
                ))}
                <div className="grid grid-cols-[9rem_1fr] gap-4 border-b border-line-light py-3.5 text-[0.92rem]">
                  <dt className="text-xs font-bold uppercase tracking-[0.14em] text-ivory/55">Typical uses</dt>
                  <dd>
                    <ul className="flex flex-wrap gap-1.5">
                      {p.applications.map((a) => (
                        <li key={a} className="border border-ivory/25 px-2 py-0.5 text-xs font-bold">
                          {a}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <QuoteButton material={p.category} product={p.name} label="Request a Quote" variant="brass" magnetic />
                {business.whatsapp && (
                  <a
                    href={whatsappHref(business.whatsapp, `Hello ${business.name}, I'd like a price for ${p.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[3.4rem] items-center gap-2 border-2 border-ivory/40 px-6 text-[0.78rem] font-extrabold uppercase tracking-[0.16em] hover:border-ivory hover:bg-ivory hover:text-charcoal"
                  >
                    <MessageCircle aria-hidden className="size-4" /> WhatsApp
                  </a>
                )}
                <Link
                  href="/contact#showroom"
                  className="inline-flex min-h-[3.4rem] items-center border-2 border-ivory/40 px-6 text-[0.78rem] font-extrabold uppercase tracking-[0.16em] hover:border-ivory hover:bg-ivory hover:text-charcoal"
                >
                  See it in the showroom
                </Link>
              </div>

              <p className="mt-8 flex gap-2.5 text-[0.82rem] leading-relaxed text-ivory/60">
                <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-brass" />
                <span>
                  Natural stone varies from slab to slab — colour and veining will differ from any photograph. We recommend viewing
                  material in person and confirming suitability for your application before ordering.
                  {CATALOGUE_IS_SAMPLE && " This is a sample listing for demonstration."}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="about-material" className="bg-ivory">
        <div className="site-x mx-auto grid max-w-site gap-8 py-16 md:py-24 lg:grid-cols-12">
          <h2 id="about-material" className="display-md lg:col-span-5">
            About this <span className="serif-accent text-brass-deep">material.</span>
          </h2>
          <p data-reveal className="lede text-slate-ink lg:col-span-6 lg:col-start-7">
            {p.description}
          </p>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-line bg-marble">
          <div className="site-x mx-auto max-w-site py-16 md:py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="related-title" className="display-md">
                You may also <span className="serif-accent text-brass-deep">consider.</span>
              </h2>
              <Link
                href={`/collections/${collection.slug}`}
                className="border-b-2 border-charcoal pb-1 text-[0.78rem] font-extrabold uppercase tracking-[0.16em] hover:border-brass-deep hover:text-brass-deep"
              >
                All {collection.title}
              </Link>
            </div>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <li key={r.slug} data-reveal>
                  <ProductCard product={r} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <Enquiry initial={{ material: p.category, product: p.name }} />
      <Reveals />
    </>
  );
}
