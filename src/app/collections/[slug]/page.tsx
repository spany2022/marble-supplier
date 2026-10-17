import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import ProductBrowser, { ProductBrowserFallback } from "@/components/ProductBrowser";
import Reveals from "@/components/Reveals";
import QuoteButton from "@/components/QuoteButton";
import { collections, getCollection } from "@/content/collections";
import { media } from "@/content/media";
import { productsIn } from "@/content/catalogue";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) return {};
  return {
    title: `${c.title} Collection`,
    description: c.blurb,
    alternates: { canonical: `/collections/${c.slug}` },
    openGraph: { images: [{ url: media[c.image].src, alt: media[c.image].alt }] },
  };
}

export default async function CollectionPage({ params }: PageProps<"/collections/[slug]">) {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) notFound();

  const items = productsIn(c.category);
  const styles = c.showroom
    ? Array.from(new Set(items.map((p) => p.tileStyle).filter((s) => s !== undefined))).map((style) => {
        const inStyle = items.filter((p) => p.tileStyle === style);
        return { style, image: media[inStyle[0].image], count: inStyle.length };
      })
    : [];
  const others = collections.filter((x) => x.slug !== c.slug);

  return (
    <>
      <PageHero
        eyebrow={`Collection ${c.number}`}
        number={c.number}
        crumbs={[
          { href: "/collections", label: "Collections" },
          { href: `/collections/${c.slug}`, label: c.title },
        ]}
        image={media[c.image]}
        lines={c.lines}
        intro={c.intro}
      >
        <div className="mt-10 flex flex-wrap gap-3">
          <QuoteButton material={c.category} label="Request a Quote" variant="brass" magnetic />
          <a
            href="#catalogue"
            className="inline-flex min-h-[3.4rem] items-center border-2 border-ivory/40 px-7 text-[0.78rem] font-extrabold uppercase tracking-[0.16em] transition-colors hover:border-ivory hover:bg-ivory hover:text-charcoal"
          >
            Browse {items.length} materials
          </a>
        </div>
      </PageHero>

      {c.showroom && (
        <section aria-labelledby="styles-title" className="bg-marble">
          <div className="site-x mx-auto max-w-site py-16 md:py-24">
            <h2 id="styles-title" className="display-md">
              Browse by <span className="serif-accent text-brass-deep">style.</span>
            </h2>
            <ul className="mt-10 grid gap-5 sm:grid-cols-3">
              {styles.map((s) => (
                <li key={s.style} data-reveal>
                  <Link href={`/collections/${c.slug}?style=${encodeURIComponent(s.style)}#catalogue`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden bg-travertine">
                      <Image src={s.image.src} alt="" fill sizes="(min-width:640px) 33vw, 100vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-4">
                      <span className="font-display text-xl font-extrabold uppercase">{s.style}</span>
                      <span className="flex items-center gap-1 text-xs font-extrabold uppercase tracking-[0.14em] text-brass-deep">
                        {s.count} {s.count === 1 ? "tile" : "tiles"} <ArrowUpRight aria-hidden className="size-4" />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section id="catalogue" aria-label={`${c.title} materials`} className="bg-ivory">
        <div className="site-x mx-auto max-w-site py-16 md:py-24">
          <Suspense fallback={<ProductBrowserFallback />}>
            <ProductBrowser key={c.slug} initialCategory={c.category} lockCategory syncUrl showTileStyle={c.category === "tiles"} />
          </Suspense>
        </div>
      </section>

      <section aria-labelledby="more-title" className="bg-charcoal text-ivory">
        <div className="site-x mx-auto max-w-site py-16 md:py-24">
          <h2 id="more-title" className="eyebrow text-brass">
            More collections
          </h2>
          <ul className="mt-8 border-t border-line-light">
            {others.map((o) => (
              <li key={o.slug} className="border-b border-line-light">
                <Link href={`/collections/${o.slug}`} className="group flex items-center gap-6 py-5">
                  <span className="text-sm font-extrabold text-brass">{o.number}</span>
                  <span className="display-sm flex-1 transition-transform duration-500 group-hover:translate-x-2">{o.title}</span>
                  <ArrowUpRight aria-hidden className="size-6 text-ivory/50 transition-colors group-hover:text-brass" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Reveals />
    </>
  );
}
