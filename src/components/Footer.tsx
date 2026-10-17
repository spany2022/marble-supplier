"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import Missing from "@/components/ui/Missing";
import { useEnquiry } from "@/components/EnquiryContext";
import { business, formatAddress, mapsDirectionsHref, telHref, whatsappHref } from "@/content/business";
import { collections } from "@/content/collections";
import { media } from "@/content/media";
import { gsap, useGSAP } from "@/lib/gsap";

/** Section 10 — final call to action and footer. */
export default function Footer() {
  const { requestQuote } = useEnquiry();
  const ref = useRef<HTMLElement>(null);
  const year = new Date().getFullYear();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-footer-bg]",
          { scale: 1.18, yPercent: -6 },
          { scale: 1, yPercent: 6, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom bottom", scrub: true } }
        );
        gsap.from("[data-footer-word]", {
          yPercent: 110,
          stagger: 0.08,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: "[data-footer-cta]", start: "top 80%", once: true },
        });
      });
    },
    { scope: ref }
  );

  const headline = [
    ["Your", "vision."],
    ["Our", "materials."],
    ["Timeless", "results."],
  ];

  return (
    <footer ref={ref} className="grain relative isolate overflow-hidden bg-charcoal text-ivory">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div data-footer-bg className="absolute inset-0">
          <Image src={media.blackRipple.src} alt="" fill sizes="100vw" className="object-cover opacity-[0.16] grayscale" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/70 to-charcoal" />
      </div>

      <div data-footer-cta className="site-x mx-auto max-w-site pb-20 pt-28 md:pt-40">
        <h2 className="display-xl">
          {headline.map(([a, b], i) => (
            <span key={i} className="block overflow-hidden pb-[0.06em]">
              <span data-footer-word className="block">
                {a} <span className={i === 2 ? "text-brass" : ""}>{b}</span>
              </span>
            </span>
          ))}
        </h2>
        <div className="mt-12 flex flex-col gap-10 border-t border-line-light pt-10 md:flex-row md:items-end md:justify-between">
          <p className="lede max-w-md text-ivory/75">Discover the surfaces that bring your architectural ideas to life.</p>
          <div className="flex flex-wrap gap-3">
            <Button variant="brass" magnetic onClick={() => requestQuote()}>
              Request a Quote
            </Button>
            <Button variant="outline-light" href="/contact#showroom">
              Visit Our Showroom
            </Button>
          </div>
        </div>
      </div>

      <div className="site-x mx-auto grid max-w-site gap-12 border-t border-line-light py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-6 max-w-xs text-[0.95rem] leading-relaxed text-ivory/65">{business.description}</p>
          {business.social.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-4">
              {business.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm font-bold uppercase tracking-[0.14em] hover:text-brass">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6">
              <Missing tone="light">Social links to be added</Missing>
            </p>
          )}
        </div>

        <nav aria-labelledby="f-collections">
          <h3 id="f-collections" className="eyebrow text-brass">
            Collections
          </h3>
          <ul className="mt-5 space-y-3">
            {collections.map((c) => (
              <li key={c.slug}>
                <Link href={`/collections/${c.slug}`} className="text-[0.95rem] font-bold text-ivory/85 hover:text-brass">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="f-company">
          <h3 id="f-company" className="eyebrow text-brass">
            Company
          </h3>
          <ul className="mt-5 space-y-3">
            {[
              ["/about", "About"],
              ["/contact", "Contact"],
              ["/collections", "All materials"],
              ["/#inspiration", "Inspiration"],
              ["/privacy", "Privacy policy"],
              ["/credits", "Image credits"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="text-[0.95rem] font-bold text-ivory/85 hover:text-brass">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="eyebrow text-brass">Visit &amp; Contact</h3>
          <ul className="mt-5 space-y-4 text-[0.95rem] font-semibold text-ivory/85">
            <li className="flex gap-3">
              <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-brass" />
              {business.address ? (
                <a href={mapsDirectionsHref(business.address)} target="_blank" rel="noopener noreferrer" className="hover:text-brass">
                  {formatAddress(business.address)}
                </a>
              ) : (
                <Missing tone="light">Showroom address</Missing>
              )}
            </li>
            <li className="flex gap-3">
              <Phone aria-hidden className="mt-0.5 size-4 shrink-0 text-brass" />
              {business.phone ? (
                <a href={telHref(business.phone)} className="hover:text-brass">
                  {business.phone}
                </a>
              ) : (
                <Missing tone="light">Phone number</Missing>
              )}
            </li>
            <li className="flex gap-3">
              <MessageCircle aria-hidden className="mt-0.5 size-4 shrink-0 text-brass" />
              {business.whatsapp ? (
                <a href={whatsappHref(business.whatsapp)} target="_blank" rel="noopener noreferrer" className="hover:text-brass">
                  WhatsApp us
                </a>
              ) : (
                <Missing tone="light">WhatsApp number</Missing>
              )}
            </li>
            <li className="flex gap-3">
              <Mail aria-hidden className="mt-0.5 size-4 shrink-0 text-brass" />
              {business.email ? (
                <a href={`mailto:${business.email}`} className="break-all hover:text-brass">
                  {business.email}
                </a>
              ) : (
                <Missing tone="light">Email address</Missing>
              )}
            </li>
          </ul>
          <h3 className="eyebrow mt-8 text-brass">Hours</h3>
          {business.hours ? (
            <dl className="mt-4 space-y-1.5 text-[0.95rem] font-semibold text-ivory/85">
              {business.hours.map((h) => (
                <div key={h.label} className="flex justify-between gap-6">
                  <dt>{h.label}</dt>
                  <dd>{h.opens && h.closes ? `${h.opens} – ${h.closes}` : "Closed"}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-4">
              <Missing tone="light">Business hours</Missing>
            </p>
          )}
        </div>
      </div>

      <div className="site-x mx-auto flex max-w-site flex-col gap-3 border-t border-line-light py-7 text-xs font-semibold text-ivory/55 md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {business.name}. All rights reserved.
        </p>
        <p>
          Imagery is illustrative reference photography — see{" "}
          <Link href="/credits" className="underline underline-offset-4 hover:text-brass">
            image credits
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
