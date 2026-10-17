import Image from "next/image";
import { Mail, MessageCircle, Phone } from "lucide-react";
import EnquiryForm from "@/components/EnquiryForm";
import Eyebrow from "@/components/ui/Eyebrow";
import SplitHeading from "@/components/ui/SplitHeading";
import Missing from "@/components/ui/Missing";
import { business, telHref, whatsappHref } from "@/content/business";
import { media } from "@/content/media";

/** Section 9 — enquiries and quotations. */
export default function Enquiry({ initial }: { initial?: { material?: string; product?: string } }) {
  const channels = [
    business.phone && { icon: Phone, label: "Call", value: business.phone, href: telHref(business.phone) },
    business.whatsapp && {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Message us",
      href: whatsappHref(business.whatsapp, `Hello ${business.name}, I'd like to enquire about your stone and tile collections.`),
      external: true,
    },
    business.email && { icon: Mail, label: "Email", value: business.email, href: `mailto:${business.email}` },
  ].filter(Boolean) as { icon: typeof Phone; label: string; value: string; href: string; external?: boolean }[];

  return (
    <section id="enquire" aria-labelledby="enquire-title" className="bg-ivory">
      <div className="site-x section-pad mx-auto max-w-site">
        <div className="grid overflow-hidden border-2 border-charcoal lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="grain relative isolate flex flex-col justify-between gap-12 overflow-hidden bg-charcoal p-7 text-ivory sm:p-10 md:p-12">
            <Image src={media.statuarietto2.src} alt="" fill sizes="40vw" className="-z-10 object-cover opacity-[0.12] grayscale" />
            <div>
              <Eyebrow tone="light">Enquiries &amp; Quotations</Eyebrow>
              <SplitHeading
                id="enquire-title"
                className="display-md mt-6"
                lines={[
                  "Let's build",
                  "something",
                  <span key="x" className="serif-accent text-brass">
                    extraordinary.
                  </span>,
                ]}
              />
              <p className="mt-6 max-w-sm text-[1rem] leading-relaxed text-ivory/75">
                Share a few details about your project and we&apos;ll come back with options and a quotation. Prefer to talk first? Reach
                us directly.
              </p>
            </div>

            <div>
              {channels.length > 0 ? (
                <ul className="space-y-2">
                  {channels.map((c) => (
                    <li key={c.label}>
                      <a
                        href={c.href}
                        {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group flex items-center gap-4 border-t border-line-light py-4 hover:text-brass"
                      >
                        <c.icon aria-hidden className="size-5 text-brass" />
                        <span className="text-xs font-bold uppercase tracking-[0.16em] text-ivory/60">{c.label}</span>
                        <span className="ml-auto font-display text-lg font-extrabold">{c.value}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="border-t border-line-light pt-6">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-ivory/60">Direct contact</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Missing tone="light">Phone</Missing>
                    <Missing tone="light">WhatsApp</Missing>
                    <Missing tone="light">Email</Missing>
                  </div>
                  <p className="mt-4 text-xs text-ivory/50">Contact channels appear here once the business details are confirmed.</p>
                </div>
              )}
            </div>
          </div>

          <EnquiryForm initial={initial} />
        </div>
      </div>
    </section>
  );
}
