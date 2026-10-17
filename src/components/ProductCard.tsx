"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categoryLabel, type Product } from "@/content/catalogue";
import { media } from "@/content/media";
import { useTilt } from "@/lib/hooks";
import { useEnquiry } from "@/components/EnquiryContext";

export default function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const img = media[product.image];
  const tilt = useTilt<HTMLDivElement>(3.5);
  const { requestQuote } = useEnquiry();
  const href = `/products/${product.slug}`;

  return (
    <article className="group flex h-full flex-col border border-line bg-marble transition-shadow duration-500 hover:shadow-[0_30px_60px_-35px_rgb(28_28_27/0.45)]">
      <Link href={href} tabIndex={-1} aria-hidden className="block overflow-hidden">
        <div ref={tilt} className="relative aspect-[4/3.4] overflow-hidden">
          <div className="skeleton absolute inset-0" />
          <Image
            src={img.src}
            alt=""
            fill
            priority={priority}
            sizes="(min-width:1280px) 25vw, (min-width:768px) 33vw, (min-width:640px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1.1s] ease-[var(--ease-out-expo)] group-hover:scale-[1.08]"
          />
          <span className="absolute left-3 top-3 bg-charcoal/85 px-2.5 py-1.5 text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-ivory backdrop-blur-sm">
            {categoryLabel(product.category)}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-display text-[1.3rem] font-extrabold uppercase leading-[1.05] tracking-[-0.02em]">
          <Link href={href} className="hover:text-brass-deep focus-visible:text-brass-deep">
            {product.name}
          </Link>
        </h3>
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-y border-line py-3 text-[0.78rem]">
          <div>
            <dt className="font-bold uppercase tracking-[0.12em] text-slate-ink">Finish</dt>
            <dd className="mt-0.5 font-bold">{product.finish ?? "On request"}</dd>
          </div>
          <div>
            <dt className="font-bold uppercase tracking-[0.12em] text-slate-ink">Size</dt>
            <dd className="mt-0.5 font-bold">{product.size ?? "On request"}</dd>
          </div>
        </dl>
        <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-slate-ink">{product.summary}</p>
        <div className="mt-6 grid grid-cols-2 gap-2">
          <Link
            href={href}
            className="inline-flex min-h-12 items-center justify-center gap-1.5 border-2 border-charcoal px-3 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] transition-colors hover:bg-charcoal hover:text-ivory"
          >
            View Details
            <span className="sr-only">: {product.name}</span>
          </Link>
          <button
            type="button"
            onClick={() => requestQuote({ material: product.category, product: product.name })}
            className="inline-flex min-h-12 items-center justify-center gap-1.5 bg-charcoal px-3 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-ivory transition-colors hover:bg-brass-deep"
          >
            Request Price
            <span className="sr-only">for {product.name}</span>
            <ArrowUpRight aria-hidden className="size-3.5" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </article>
  );
}
