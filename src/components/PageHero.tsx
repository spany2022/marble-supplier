import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import SplitHeading from "@/components/ui/SplitHeading";
import type { Media } from "@/content/media";

type Props = {
  eyebrow: string;
  lines: React.ReactNode[];
  intro?: React.ReactNode;
  image?: Media;
  crumbs?: { href: string; label: string }[];
  number?: string;
  children?: React.ReactNode;
};

/** Dark page header shared by inner pages (keeps the transparent header legible). */
export default function PageHero({ eyebrow, lines, intro, image, crumbs = [], number, children }: Props) {
  return (
    <section className="grain relative isolate overflow-hidden bg-charcoal pb-16 pt-36 text-ivory md:pb-24 md:pt-44">
      {image && (
        <>
          <Image src={image.src} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-45" style={{ objectPosition: image.position }} />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal/30" />
          <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-charcoal to-transparent" />
        </>
      )}
      {number && (
        <span aria-hidden className="num-outline pointer-events-none absolute -right-4 bottom-[-0.12em] -z-10 font-display text-[clamp(10rem,30vw,28rem)] font-extrabold leading-none text-ivory/25">
          {number}
        </span>
      )}
      <div className="site-x mx-auto max-w-site">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ivory/60">
            <li>
              <Link href="/" className="hover:text-brass">
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.href} className="flex items-center gap-1.5">
                <ChevronRight aria-hidden className="size-3" />
                <Link href={c.href} className="hover:text-brass">
                  {c.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <p className="eyebrow mt-10 flex items-center gap-3 text-travertine">
          <span aria-hidden className="h-0.5 w-10 bg-brass" />
          {eyebrow}
        </p>
        <SplitHeading as="h1" className="display-xl mt-6 max-w-6xl" lines={lines} />
        {intro && <div className="lede mt-8 max-w-2xl text-ivory/75">{intro}</div>}
        {children}
      </div>
    </section>
  );
}
